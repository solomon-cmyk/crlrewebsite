"use client";

import { ADMIN_PATH } from "@/lib/admin/constants";
import type { Listing } from "@/lib/listings";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminListingsPage() {
  const router = useRouter();
  const [listings, setListings] = useState<Listing[]>([]);
  const [storage, setStorage] = useState("local");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch("/api/admin/listings");
        if (response.status === 401) {
          router.replace(ADMIN_PATH);
          return;
        }
        const data = (await response.json()) as {
          ok: boolean;
          listings?: Listing[];
          storage?: string;
          error?: string;
        };
        if (!response.ok || !data.ok) {
          if (!cancelled) setError(data.error || "Unable to load listings");
          return;
        }
        if (!cancelled) {
          setListings(data.listings ?? []);
          setStorage(data.storage ?? "local");
        }
      } catch {
        if (!cancelled) setError("Unable to load listings");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [router]);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace(ADMIN_PATH);
    router.refresh();
  }

  async function removeListing(slug: string, title: string) {
    if (!window.confirm(`Delete “${title}”? This removes it from the public site.`)) return;

    const response = await fetch(`/api/admin/listings/${encodeURIComponent(slug)}`, {
      method: "DELETE",
    });
    const data = (await response.json()) as { ok: boolean; error?: string };
    if (!response.ok || !data.ok) {
      setError(data.error || "Delete failed");
      return;
    }
    setListings((current) => current.filter((listing) => listing.slug !== slug));
  }

  return (
    <div className="admin-wrap">
      <div className="admin-top">
        <div>
          <h1>Listings</h1>
          <p className="admin-muted">
            Edit every property on the site. Storage: <strong>{storage}</strong>
          </p>
        </div>
        <div className="admin-actions">
          <Link className="admin-btn" href={`${ADMIN_PATH}/listings/new`}>
            Add listing
          </Link>
          <button className="admin-btn admin-btn--line" type="button" onClick={logout}>
            Sign out
          </button>
        </div>
      </div>

      <div className="admin-card">
        {error ? <p className="admin-error">{error}</p> : null}
        {loading ? (
          <p className="admin-muted">Loading listings…</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Location</th>
                <th>Price</th>
                <th>Flags</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((listing) => (
                <tr key={listing.slug}>
                  <td>
                    <strong>{listing.title}</strong>
                    <div className="admin-muted">{listing.tag}</div>
                  </td>
                  <td>{listing.location}</td>
                  <td>{listing.price}</td>
                  <td>
                    {listing.featured ? <span className="admin-pill admin-pill--featured">Featured</span> : null}{" "}
                    {listing.sold ? <span className="admin-pill admin-pill--sold">Sold</span> : null}
                  </td>
                  <td>
                    <div className="admin-actions">
                      <Link
                        className="admin-btn admin-btn--line"
                        href={`${ADMIN_PATH}/listings/${encodeURIComponent(listing.slug)}`}
                      >
                        Edit
                      </Link>
                      <a
                        className="admin-btn admin-btn--line"
                        href={`/listings/${listing.slug}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View
                      </a>
                      <button
                        className="admin-btn admin-btn--danger"
                        type="button"
                        onClick={() => removeListing(listing.slug, listing.title)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
