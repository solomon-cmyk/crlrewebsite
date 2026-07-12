import { LISTINGS_DATA } from "@/lib/listings-data";
import type { Listing } from "@/lib/listings";
import { del, get, list, put } from "@vercel/blob";
import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

export const LISTINGS_STATE_PATH = "listings/state.json";
export const LISTINGS_MEDIA_PREFIX = "listings/media/";
/** Legacy per-listing files from the first admin revision. */
const LEGACY_BLOB_PREFIX = "listings/data/";
const LEGACY_META_PATH = "listings/meta.json";

type ListingsState = {
  version: number;
  deleted: string[];
  overrides: Record<string, Listing>;
};

const EMPTY_STATE: ListingsState = {
  version: 0,
  deleted: [],
  overrides: {},
};

class StoreReadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "StoreReadError";
  }
}

function hasBlobStorage(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

export function requirePersistentStorage(): void {
  // Local/dev can use `.data/`; Vercel serverless filesystem is ephemeral.
  if (process.env.VERCEL && !hasBlobStorage()) {
    throw new Error(
      "Blob storage is required for listing admin on Vercel. Link a Blob store to this project."
    );
  }
}

function localRoot() {
  return path.join(process.cwd(), ".data", "listings");
}

function localStatePath() {
  return path.join(localRoot(), "state.json");
}

function localMediaDir(slug: string) {
  return path.join(process.cwd(), "public", "listings", "uploads", "managed", slug);
}

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

function sortListings(listings: Listing[]): Listing[] {
  return [...listings].sort((a, b) => {
    if (a.sold !== b.sold) return a.sold ? 1 : -1;
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return a.title.localeCompare(b.title);
  });
}

function normalizeListing(input: Listing): Listing {
  const images = (input.images ?? []).filter(Boolean);
  const image = input.image || images[0] || "";
  return {
    ...input,
    slug: input.slug.trim(),
    tag: input.tag.trim(),
    image,
    alt: input.alt.trim() || input.title.trim(),
    location: input.location.trim(),
    title: input.title.trim(),
    price: input.price.trim(),
    specs: input.specs ?? [],
    excerpt: input.excerpt.trim(),
    sold: Boolean(input.sold),
    featured: Boolean(input.featured),
    images: images.length ? images : image ? [image] : [],
    description: (input.description ?? []).map((p) => p.trim()).filter(Boolean),
    features: (input.features ?? []).map((f) => f.trim()).filter(Boolean),
  };
}

export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function isValidState(value: unknown): value is ListingsState {
  if (!value || typeof value !== "object") return false;
  const state = value as ListingsState;
  return (
    typeof state.version === "number" &&
    Array.isArray(state.deleted) &&
    !!state.overrides &&
    typeof state.overrides === "object"
  );
}

function mergeCatalog(state: ListingsState): Listing[] {
  const deleted = new Set(state.deleted);
  const bySlug = new Map<string, Listing>();

  for (const listing of LISTINGS_DATA) {
    if (deleted.has(listing.slug)) continue;
    bySlug.set(listing.slug, listing);
  }

  for (const listing of Object.values(state.overrides)) {
    if (!listing?.slug || deleted.has(listing.slug)) continue;
    bySlug.set(listing.slug, normalizeListing(listing));
  }

  return sortListings(Array.from(bySlug.values()));
}

async function readAllBlobs(prefix: string): Promise<Array<{ pathname: string; url?: string }>> {
  const items: Array<{ pathname: string; url?: string }> = [];
  let cursor: string | undefined;

  do {
    const page = await list({ prefix, cursor });
    items.push(...page.blobs.map((blob) => ({ pathname: blob.pathname, url: blob.url })));
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);

  return items;
}

async function migrateLegacyBlobState(): Promise<ListingsState | null> {
  try {
    const blobs = await readAllBlobs(LEGACY_BLOB_PREFIX);
    if (!blobs.length) {
      // Still check legacy meta-only tombstones.
      try {
        const metaResult = await get(LEGACY_META_PATH, { access: "private" });
        if (metaResult?.statusCode === 200) {
          const raw = await new Response(metaResult.stream).text();
          const meta = JSON.parse(raw) as { deleted?: string[] };
          if (Array.isArray(meta.deleted) && meta.deleted.length) {
            return { version: 1, deleted: meta.deleted, overrides: {} };
          }
        }
      } catch {
        // no legacy meta
      }
      return null;
    }

    const overrides: Record<string, Listing> = {};
    await Promise.all(
      blobs.map(async (blob) => {
        const result = await get(blob.pathname, { access: "private" });
        if (!result || result.statusCode !== 200) return;
        const raw = await new Response(result.stream).text();
        const listing = normalizeListing(JSON.parse(raw) as Listing);
        if (listing.slug) overrides[listing.slug] = listing;
      })
    );

    let deleted: string[] = [];
    try {
      const metaResult = await get(LEGACY_META_PATH, { access: "private" });
      if (metaResult?.statusCode === 200) {
        const raw = await new Response(metaResult.stream).text();
        const meta = JSON.parse(raw) as { deleted?: string[] };
        deleted = Array.isArray(meta.deleted) ? meta.deleted : [];
      }
    } catch {
      // ignore
    }

    return { version: 1, deleted, overrides };
  } catch {
    return null;
  }
}

async function readStateBlob(): Promise<ListingsState> {
  try {
    const result = await get(LISTINGS_STATE_PATH, { access: "private" });
    if (result?.statusCode === 200) {
      const raw = await new Response(result.stream).text();
      const parsed = JSON.parse(raw) as unknown;
      if (!isValidState(parsed)) {
        throw new StoreReadError("Listings state blob is corrupt");
      }
      return {
        version: parsed.version,
        deleted: [...parsed.deleted],
        overrides: { ...parsed.overrides },
      };
    }
  } catch (error) {
    if (error instanceof StoreReadError) throw error;
    // Missing blob falls through to legacy migration / empty.
  }

  const migrated = await migrateLegacyBlobState();
  if (migrated) {
    await writeStateBlob(migrated);
    return migrated;
  }

  return { ...EMPTY_STATE, overrides: {} };
}

async function writeStateBlob(state: ListingsState): Promise<void> {
  await put(LISTINGS_STATE_PATH, JSON.stringify(state), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

async function readStateLocal(): Promise<ListingsState> {
  try {
    const raw = await fs.readFile(localStatePath(), "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (!isValidState(parsed)) {
      throw new StoreReadError("Local listings state is corrupt");
    }
    return {
      version: parsed.version,
      deleted: [...parsed.deleted],
      overrides: { ...parsed.overrides },
    };
  } catch (error) {
    if (error instanceof StoreReadError) throw error;
    if ((error as NodeJS.ErrnoException)?.code === "ENOENT") {
      return { ...EMPTY_STATE, overrides: {} };
    }
    throw new StoreReadError(
      error instanceof Error ? error.message : "Unable to read local listings state"
    );
  }
}

async function writeStateLocal(state: ListingsState): Promise<void> {
  await ensureDir(localRoot());
  const tmp = `${localStatePath()}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(state, null, 2));
  await fs.rename(tmp, localStatePath());
}

async function readState(): Promise<ListingsState> {
  return hasBlobStorage() ? readStateBlob() : readStateLocal();
}

async function writeState(state: ListingsState): Promise<void> {
  if (hasBlobStorage()) await writeStateBlob(state);
  else await writeStateLocal(state);
}

async function updateState(
  mutator: (state: ListingsState) => ListingsState | Promise<ListingsState>
): Promise<ListingsState> {
  requirePersistentStorage();
  const current = await readState();
  const next = await mutator({
    version: current.version,
    deleted: [...current.deleted],
    overrides: { ...current.overrides },
  });
  next.version = current.version + 1;
  await writeState(next);
  return next;
}

export const getMergedListings = cache(async (): Promise<Listing[]> => {
  try {
    const state = await readState();
    return mergeCatalog(state);
  } catch (error) {
    // Public pages should stay up if storage is briefly unavailable.
    console.error("[listings] failed to load overrides; serving static catalog", error);
    return sortListings([...LISTINGS_DATA]);
  }
});

export async function getMergedListingBySlug(slug: string): Promise<Listing | undefined> {
  const listings = await getMergedListings();
  return listings.find((listing) => listing.slug === slug);
}

export async function saveListing(
  input: Listing,
  options?: { previousSlug?: string }
): Promise<Listing> {
  const listing = normalizeListing(input);
  if (!listing.slug) throw new Error("Slug is required");
  if (!listing.title) throw new Error("Title is required");
  const previousSlug = options?.previousSlug;

  await updateState((state) => {
    const live = mergeCatalog(state);
    const takenByOther = live.some(
      (item) => item.slug === listing.slug && item.slug !== previousSlug
    );
    if (takenByOther) {
      throw new Error("A listing with that slug already exists");
    }

    if (previousSlug && previousSlug !== listing.slug) {
      delete state.overrides[previousSlug];
      if (!state.deleted.includes(previousSlug)) state.deleted.push(previousSlug);
    }

    state.deleted = state.deleted.filter((slug) => slug !== listing.slug);
    state.overrides[listing.slug] = listing;
    return state;
  });

  return listing;
}

export async function deleteListing(slug: string): Promise<void> {
  await updateState((state) => {
    delete state.overrides[slug];
    if (!state.deleted.includes(slug)) state.deleted.push(slug);
    return state;
  });
}

export async function uploadListingImage(
  slug: string,
  file: File
): Promise<{ url: string }> {
  requirePersistentStorage();
  if (!slug) throw new Error("Slug is required");

  const allowed = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"]);
  if (file.type && !allowed.has(file.type)) {
    throw new Error("Only JPEG, PNG, WebP, GIF, or AVIF images are allowed");
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const sharp = (await import("sharp")).default;
  const image = sharp(bytes, { failOn: "error", limitInputPixels: 40_000_000 });
  const meta = await image.metadata();
  if (!meta.format || !["jpeg", "png", "webp", "gif", "avif", "tiff"].includes(meta.format)) {
    throw new Error("File is not a valid image");
  }

  const webp = await image
    .rotate()
    .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 78, effort: 4 })
    .toBuffer();

  const stamp = `${Date.now()}-${createHash("sha1").update(webp).digest("hex").slice(0, 8)}`;
  const filename = `${stamp}.webp`;

  if (hasBlobStorage()) {
    const blob = await put(`${LISTINGS_MEDIA_PREFIX}${slug}/${filename}`, webp, {
      access: "public",
      contentType: "image/webp",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return { url: blob.url };
  }

  const dir = localMediaDir(slug);
  await ensureDir(dir);
  await fs.writeFile(path.join(dir, filename), webp);
  return { url: `/listings/uploads/managed/${slug}/${filename}` };
}

export async function deleteListingImage(url: string): Promise<void> {
  requirePersistentStorage();
  if (!url) return;

  if (url.startsWith("/listings/uploads/managed/")) {
    const relative = url.replace(/^\//, "");
    const full = path.join(process.cwd(), "public", relative);
    const managedRoot = path.join(process.cwd(), "public", "listings", "uploads", "managed");
    if (!full.startsWith(managedRoot)) {
      throw new Error("Invalid local media path");
    }
    try {
      await fs.unlink(full);
    } catch (error) {
      if ((error as NodeJS.ErrnoException)?.code !== "ENOENT") throw error;
    }
    return;
  }

  if (hasBlobStorage() && url.includes("blob.vercel-storage.com")) {
    try {
      await del(url);
    } catch {
      // Blob may already be gone.
    }
  }
}

export function storageMode(): "blob" | "local" {
  return hasBlobStorage() ? "blob" : "local";
}
