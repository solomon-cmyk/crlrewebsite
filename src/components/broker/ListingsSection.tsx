import { ListingCard } from "@/components/broker/ListingCard";
import { getAllListings, getFeaturedListings } from "@/lib/listings";
import Link from "next/link";

export async function ListingsSection() {
  const [listings, allListings] = await Promise.all([
    getFeaturedListings(6),
    getAllListings(),
  ]);
  const totalCount = allListings.length;

  return (
    <section className="block" id="listings">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">Costa Rica Luxury Real Estate</span>
          <span className="rule" />
          <h2>
            Exclusive <em>listings</em>
          </h2>
          <p>
            Beyond Maravé, explore exclusive homes, land, and new construction across Manuel
            Antonio, Uvita, and the Southern Pacific coast.
          </p>
        </div>
        <div className="grid">
          {listings.map((listing) => (
            <ListingCard key={listing.slug} listing={listing} />
          ))}
        </div>
        <div className="center-cta reveal">
          <Link href="/listings" className="btn btn-ink">
            View all {totalCount} properties →
          </Link>
        </div>
      </div>
    </section>
  );
}
