import { ListingCard } from "@/components/broker/ListingCard";
import { BrokerFooter } from "@/components/broker/BrokerFooter";
import { SiteNav } from "@/components/broker/SiteNav";
import { getActiveListings, getAllListings } from "@/lib/listings";
import { organizationJsonLd, jsonLdScript, websiteJsonLd } from "@/lib/seo/jsonld";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    absolute: "Exclusive Listings · Costa Rica Luxury Real Estate",
  },
  description:
    "Browse exclusive homes, land, and new construction across Manuel Antonio, Uvita, Dominical, and Costa Rica's Southern Pacific coast.",
  alternates: {
    canonical: "/listings",
  },
  openGraph: {
    title: "CRLRE Exclusive Listings",
    description:
      "Homes, estates, land, and commercial opportunities represented by Costa Rica Luxury Real Estate.",
    type: "website",
  },
};

export default function ListingsIndexPage() {
  const listings = getAllListings();
  const activeCount = getActiveListings().length;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([organizationJsonLd(), websiteJsonLd()])}
      />
      <SiteNav />
      <div className="listings-index">
        <header className="listings-index__hero">
          <div className="wrap">
            <Link href="/" className="listings-index__home">
              Back to home
            </Link>
            <p className="eyebrow">Costa Rica Luxury Real Estate</p>
            <h1>
              Exclusive <em>listings</em>
            </h1>
            <p className="listings-index__intro">
              {activeCount} active properties across Manuel Antonio, Uvita, Dominical, Quepos, and
              the Southern Pacific coast, curated by Mark Dalton and Costa Rica Luxury Real Estate.
            </p>
          </div>
        </header>
        <div className="wrap listings-index__grid">
          <div className="grid">
            {listings.map((listing) => (
              <ListingCard key={listing.slug} listing={listing} className="card" />
            ))}
          </div>
        </div>
        <BrokerFooter />
      </div>
    </>
  );
}
