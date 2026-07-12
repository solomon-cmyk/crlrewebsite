"use client";

import { ADMIN_PATH } from "@/lib/admin/constants";
import type { Listing, ListingSpec } from "@/lib/listings";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useMemo, useState } from "react";

type ListingEditorProps = {
  mode: "create" | "edit";
  initial?: Listing;
};

const EMPTY: Listing = {
  slug: "",
  tag: "Sale",
  image: "",
  alt: "",
  location: "",
  title: "",
  price: "",
  specs: [],
  excerpt: "",
  sold: false,
  featured: false,
  images: [],
  description: [],
  features: [],
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function ListingEditor({ mode, initial }: ListingEditorProps) {
  const router = useRouter();
  const [listing, setListing] = useState<Listing>(initial ?? EMPTY);
  const [slugLocked, setSlugLocked] = useState(mode === "edit");
  const [descriptionText, setDescriptionText] = useState((initial?.description ?? []).join("\n\n"));
  const [featuresText, setFeaturesText] = useState((initial?.features ?? []).join("\n"));
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const imageCount = listing.images.length;
  const draftSlug = useMemo(() => listing.slug || slugify(listing.title), [listing.slug, listing.title]);

  function update<K extends keyof Listing>(key: K, value: Listing[K]) {
    setListing((current) => ({ ...current, [key]: value }));
  }

  function updateSpec(index: number, key: keyof ListingSpec, value: string) {
    setListing((current) => {
      const specs = current.specs.map((spec, i) => (i === index ? { ...spec, [key]: value } : spec));
      return { ...current, specs };
    });
  }

  async function uploadFiles(files: FileList | null) {
    if (!files?.length) return;
    const slug = draftSlug;
    if (!slug) {
      setError("Add a title (or slug) before uploading photos.");
      return;
    }

    setUploading(true);
    setError("");
    setStatus("");

    let uploaded = 0;
    const failures: string[] = [];

    for (const file of Array.from(files)) {
      try {
        const form = new FormData();
        form.set("slug", slug);
        form.set("file", file);
        const response = await fetch("/api/admin/upload", { method: "POST", body: form });
        const data = (await response.json()) as { ok: boolean; url?: string; error?: string };
        if (!response.ok || !data.ok || !data.url) {
          throw new Error(data.error || `Upload failed for ${file.name}`);
        }
        uploaded += 1;
        setListing((current) => {
          const images = [...current.images, data.url!];
          return {
            ...current,
            slug: current.slug || slug,
            images,
            image: current.image || images[0] || "",
          };
        });
      } catch (err) {
        failures.push(err instanceof Error ? err.message : file.name);
      }
    }

    if (uploaded) {
      setStatus(`Uploaded ${uploaded} photo${uploaded === 1 ? "" : "s"}. Remember to save.`);
    }
    if (failures.length) {
      setError(failures.join(" · "));
    }
    setUploading(false);
  }

  async function removeImage(url: string, index: number) {
    setListing((current) => {
      const images = current.images.filter((_, i) => i !== index);
      return { ...current, images, image: images[0] || "" };
    });

    try {
      await fetch("/api/admin/media/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
    } catch {
      // UI already removed the image; storage cleanup is best-effort.
    }
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setStatus("");

    const payload: Listing = {
      ...listing,
      slug: draftSlug,
      description: descriptionText
        .split(/\n{2,}/)
        .map((part) => part.trim())
        .filter(Boolean),
      features: featuresText
        .split(/\n/)
        .map((part) => part.trim())
        .filter(Boolean),
      image: listing.images[0] || listing.image || "",
      images: listing.images,
      alt: listing.alt || listing.title,
    };

    try {
      const response = await fetch(
        mode === "create"
          ? "/api/admin/listings"
          : `/api/admin/listings/${encodeURIComponent(initial?.slug || payload.slug)}`,
        {
          method: mode === "create" ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = (await response.json()) as { ok: boolean; listing?: Listing; error?: string };
      if (!response.ok || !data.ok || !data.listing) {
        setError(data.error || "Save failed");
        return;
      }

      setStatus("Saved. Public pages will refresh shortly.");
      if (mode === "create" || data.listing.slug !== initial?.slug) {
        router.replace(`${ADMIN_PATH}/listings/${encodeURIComponent(data.listing.slug)}`);
      } else {
        setListing(data.listing);
      }
      router.refresh();
    } catch {
      setError("Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="admin-wrap">
      <div className="admin-top">
        <div>
          <h1>{mode === "create" ? "New listing" : "Edit listing"}</h1>
          <p className="admin-muted">
            Same fields as the public cards and detail pages. Photos convert to WebP automatically.
          </p>
        </div>
        <div className="admin-actions">
          <Link className="admin-btn admin-btn--line" href={`${ADMIN_PATH}/listings`}>
            Back to list
          </Link>
          {mode === "edit" ? (
            <a
              className="admin-btn admin-btn--line"
              href={`/listings/${listing.slug}`}
              target="_blank"
              rel="noreferrer"
            >
              View live
            </a>
          ) : null}
        </div>
      </div>

      <form className="admin-card admin-editor" onSubmit={onSubmit}>
        {error ? <p className="admin-error">{error}</p> : null}
        {status ? <p className="admin-status">{status}</p> : null}

        <div className="admin-row">
          <div className="admin-field">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              value={listing.title}
              onChange={(event) => {
                const title = event.target.value;
                update("title", title);
                if (!slugLocked) update("slug", slugify(title));
              }}
              required
            />
          </div>
          <div className="admin-field">
            <label htmlFor="slug">Slug (URL)</label>
            <input
              id="slug"
              value={listing.slug}
              onChange={(event) => {
                setSlugLocked(true);
                update("slug", slugify(event.target.value));
              }}
              required
            />
          </div>
        </div>

        <div className="admin-row">
          <div className="admin-field">
            <label htmlFor="tag">Tag</label>
            <input id="tag" value={listing.tag} onChange={(event) => update("tag", event.target.value)} />
          </div>
          <div className="admin-field">
            <label htmlFor="price">Price</label>
            <input
              id="price"
              value={listing.price}
              onChange={(event) => update("price", event.target.value)}
              placeholder="$1,250,000"
            />
          </div>
        </div>

        <div className="admin-row">
          <div className="admin-field">
            <label htmlFor="location">Location</label>
            <input
              id="location"
              value={listing.location}
              onChange={(event) => update("location", event.target.value)}
              placeholder="Manuel Antonio · Quepos"
            />
          </div>
          <div className="admin-field">
            <label htmlFor="alt">Image alt text</label>
            <input id="alt" value={listing.alt} onChange={(event) => update("alt", event.target.value)} />
          </div>
        </div>

        <div className="admin-field">
          <label htmlFor="excerpt">Excerpt</label>
          <textarea
            id="excerpt"
            value={listing.excerpt}
            onChange={(event) => update("excerpt", event.target.value)}
          />
        </div>

        <div className="admin-check">
          <input
            id="featured"
            type="checkbox"
            checked={listing.featured}
            onChange={(event) => update("featured", event.target.checked)}
          />
          <label htmlFor="featured">Featured on homepage</label>
        </div>
        <div className="admin-check">
          <input
            id="sold"
            type="checkbox"
            checked={listing.sold}
            onChange={(event) => update("sold", event.target.checked)}
          />
          <label htmlFor="sold">Marked as sold</label>
        </div>

        <div className="admin-field">
          <label>Specs</label>
          <div className="admin-specs">
            {listing.specs.map((spec, index) => (
              <div className="admin-spec-row" key={`spec-${index}`}>
                <input
                  value={spec.label}
                  placeholder="5"
                  onChange={(event) => updateSpec(index, "label", event.target.value)}
                />
                <input
                  value={spec.suffix}
                  placeholder=" beds"
                  onChange={(event) => updateSpec(index, "suffix", event.target.value)}
                />
                <button
                  className="admin-btn admin-btn--danger"
                  type="button"
                  onClick={() =>
                    update(
                      "specs",
                      listing.specs.filter((_, i) => i !== index)
                    )
                  }
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            className="admin-btn admin-btn--line"
            type="button"
            onClick={() => update("specs", [...listing.specs, { label: "", suffix: "" }])}
          >
            Add spec
          </button>
        </div>

        <div className="admin-field">
          <label htmlFor="description">Description (blank line = new paragraph)</label>
          <textarea
            id="description"
            value={descriptionText}
            onChange={(event) => setDescriptionText(event.target.value)}
            style={{ minHeight: 180 }}
          />
        </div>

        <div className="admin-field">
          <label htmlFor="features">Features (one per line)</label>
          <textarea
            id="features"
            value={featuresText}
            onChange={(event) => setFeaturesText(event.target.value)}
          />
        </div>

        <div className="admin-field">
          <label htmlFor="photos">Photos ({imageCount})</label>
          <input
            id="photos"
            type="file"
            accept="image/*"
            multiple
            disabled={uploading}
            onChange={(event) => {
              void uploadFiles(event.target.files);
              event.target.value = "";
            }}
          />
        </div>

        {listing.images.length > 0 ? (
          <div className="admin-thumb-grid">
            {listing.images.map((url, index) => (
              <div className="admin-thumb" key={`${url}-${index}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" />
                <div className="admin-thumb__actions">
                  <button
                    type="button"
                    onClick={() => {
                      const images = [...listing.images];
                      const [item] = images.splice(index, 1);
                      images.unshift(item);
                      update("images", images);
                      update("image", images[0] || "");
                    }}
                  >
                    Hero
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (index === 0) return;
                      const images = [...listing.images];
                      [images[index - 1], images[index]] = [images[index], images[index - 1]];
                      update("images", images);
                      update("image", images[0] || "");
                    }}
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (index >= listing.images.length - 1) return;
                      const images = [...listing.images];
                      [images[index + 1], images[index]] = [images[index], images[index + 1]];
                      update("images", images);
                      update("image", images[0] || "");
                    }}
                  >
                    →
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      void removeImage(url, index);
                    }}
                  >
                    Del
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="admin-muted">No photos yet.</p>
        )}

        <div className="admin-actions">
          <button className="admin-btn" type="submit" disabled={saving || uploading}>
            {saving ? "Saving…" : uploading ? "Uploading…" : "Save listing"}
          </button>
        </div>
      </form>
    </div>
  );
}
