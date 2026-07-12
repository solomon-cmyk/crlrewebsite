import { LISTINGS_DATA } from "@/lib/listings-data";
import type { Listing } from "@/lib/listings";
import { get, list, put, del } from "@vercel/blob";
import fs from "node:fs/promises";
import path from "node:path";

export const LISTINGS_BLOB_PREFIX = "listings/data/";
export const LISTINGS_META_PATH = "listings/meta.json";
export const LISTINGS_MEDIA_PREFIX = "listings/media/";

type ListingsMeta = {
  deleted: string[];
};

const EMPTY_META: ListingsMeta = { deleted: [] };

function hasBlobStorage(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

function localRoot() {
  return path.join(process.cwd(), ".data", "listings");
}

function localListingPath(slug: string) {
  return path.join(localRoot(), "data", `${slug}.json`);
}

function localMetaPath() {
  return path.join(localRoot(), "meta.json");
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

async function readMetaLocal(): Promise<ListingsMeta> {
  try {
    const raw = await fs.readFile(localMetaPath(), "utf8");
    const parsed = JSON.parse(raw) as ListingsMeta;
    return { deleted: Array.isArray(parsed.deleted) ? parsed.deleted : [] };
  } catch {
    return { ...EMPTY_META };
  }
}

async function writeMetaLocal(meta: ListingsMeta): Promise<void> {
  await ensureDir(localRoot());
  await fs.writeFile(localMetaPath(), JSON.stringify(meta, null, 2));
}

async function readMetaBlob(): Promise<ListingsMeta> {
  try {
    const result = await get(LISTINGS_META_PATH, { access: "private" });
    if (!result || result.statusCode !== 200) return { ...EMPTY_META };
    const raw = await new Response(result.stream).text();
    const parsed = JSON.parse(raw) as ListingsMeta;
    return { deleted: Array.isArray(parsed.deleted) ? parsed.deleted : [] };
  } catch {
    return { ...EMPTY_META };
  }
}

async function writeMetaBlob(meta: ListingsMeta): Promise<void> {
  await put(LISTINGS_META_PATH, JSON.stringify(meta), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

async function readMeta(): Promise<ListingsMeta> {
  return hasBlobStorage() ? readMetaBlob() : readMetaLocal();
}

async function writeMeta(meta: ListingsMeta): Promise<void> {
  if (hasBlobStorage()) await writeMetaBlob(meta);
  else await writeMetaLocal(meta);
}

async function listOverridesLocal(): Promise<Listing[]> {
  const dir = path.join(localRoot(), "data");
  try {
    const files = await fs.readdir(dir);
    const listings = await Promise.all(
      files
        .filter((file) => file.endsWith(".json"))
        .map(async (file) => {
          const raw = await fs.readFile(path.join(dir, file), "utf8");
          return normalizeListing(JSON.parse(raw) as Listing);
        })
    );
    return listings.filter((listing) => Boolean(listing.slug));
  } catch {
    return [];
  }
}

async function listOverridesBlob(): Promise<Listing[]> {
  try {
    const { blobs } = await list({ prefix: LISTINGS_BLOB_PREFIX });
    const listings = await Promise.all(
      blobs.map(async (blob) => {
        const result = await get(blob.pathname, { access: "private" });
        if (!result || result.statusCode !== 200) return null;
        const raw = await new Response(result.stream).text();
        return normalizeListing(JSON.parse(raw) as Listing);
      })
    );
    return listings.filter((listing): listing is Listing => Boolean(listing?.slug));
  } catch {
    return [];
  }
}

async function listOverrides(): Promise<Listing[]> {
  return hasBlobStorage() ? listOverridesBlob() : listOverridesLocal();
}

export async function getMergedListings(): Promise<Listing[]> {
  const [meta, overrides] = await Promise.all([readMeta(), listOverrides()]);
  const deleted = new Set(meta.deleted);
  const bySlug = new Map<string, Listing>();

  for (const listing of LISTINGS_DATA) {
    if (deleted.has(listing.slug)) continue;
    bySlug.set(listing.slug, listing);
  }

  for (const listing of overrides) {
    if (deleted.has(listing.slug)) continue;
    bySlug.set(listing.slug, listing);
  }

  return sortListings(Array.from(bySlug.values()));
}

export async function getMergedListingBySlug(slug: string): Promise<Listing | undefined> {
  const listings = await getMergedListings();
  return listings.find((listing) => listing.slug === slug);
}

export async function saveListing(input: Listing): Promise<Listing> {
  const listing = normalizeListing(input);
  if (!listing.slug) throw new Error("Slug is required");
  if (!listing.title) throw new Error("Title is required");

  const meta = await readMeta();
  meta.deleted = meta.deleted.filter((slug) => slug !== listing.slug);
  await writeMeta(meta);

  if (hasBlobStorage()) {
    await put(`${LISTINGS_BLOB_PREFIX}${listing.slug}.json`, JSON.stringify(listing), {
      access: "private",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
  } else {
    await ensureDir(path.join(localRoot(), "data"));
    await fs.writeFile(localListingPath(listing.slug), JSON.stringify(listing, null, 2));
  }

  return listing;
}

export async function deleteListing(slug: string): Promise<void> {
  const meta = await readMeta();
  if (!meta.deleted.includes(slug)) {
    meta.deleted.push(slug);
    await writeMeta(meta);
  }

  if (hasBlobStorage()) {
    try {
      await del(`${LISTINGS_BLOB_PREFIX}${slug}.json`);
    } catch {
      // Override may not exist for static-only listings.
    }
  } else {
    try {
      await fs.unlink(localListingPath(slug));
    } catch {
      // Same as above.
    }
  }
}

export async function uploadListingImage(
  slug: string,
  file: File
): Promise<{ url: string }> {
  if (!slug) throw new Error("Slug is required");

  const bytes = Buffer.from(await file.arrayBuffer());
  const sharp = (await import("sharp")).default;
  const webp = await sharp(bytes, { failOn: "none" })
    .rotate()
    .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 78, effort: 4 })
    .toBuffer();

  const stamp = Date.now();
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

export function storageMode(): "blob" | "local" {
  return hasBlobStorage() ? "blob" : "local";
}
