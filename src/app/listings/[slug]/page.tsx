import { BrokerFooter } from "@/components/broker/BrokerFooter";
import { SiteNav } from "@/components/broker/SiteNav";
import { getAllListings, getListingBySlug } from "@/lib/listings";
import { organizationJsonLd, jsonLdScript, websiteJsonLd } from "@/lib/seo/jsonld";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type ListingPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllListings().map((listing) => ({ slug: listing.slug }));
}

export async function generateMetadata({ params }: ListingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const listing = getListingBySlug(slug);

  if (!listing) {
    return { title: "Listing not found" };
  }

  return {
    title: `${listing.title} · Costa Rica Luxury Real Estate`,
    description: listing.excerpt || `${listing.title} in ${listing.location}. ${listing.price}.`,
    alternates: {
      canonical: `/listings/${listing.slug}`,
    },
    openGraph: {
      title: listing.title,
      description: listing.excerpt || `${listing.price} · ${listing.location}`,
      images: [{ url: listing.image }],
      type: "website",
    },
  };
}

export default async function ListingDetailPage({ params }: ListingPageProps) {
  const { slug } = await params;
  const listing = getListingBySlug(slug);

  if (!listing) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([organizationJsonLd(), websiteJsonLd()])}
      />
      <SiteNav />
      <div className="listing-detail">
        <header className="listing-detail__hero">
          <div className="wrap">
            <Link href="/listings" className="listing-detail__back">
              All listings
            </Link>
            <p className="eyebrow">{listing.location}</p>
            <h1>{listing.title}</h1>
            <div className="listing-detail__meta">
              <span className={`tag${listing.sold ? " tag--sold" : ""}`}>{listing.tag}</span>
              <span className="listing-detail__price">{listing.price}</span>
            </div>
          </div>
        </header>

        <div className="wrap listing-detail__content">
          <div className="listing-detail__photo">
            <Image
              src={listing.image}
              alt={listing.alt}
              width={1400}
              height={900}
              unoptimized
              priority
            />
          </div>

          {listing.specs.length > 0 && (
            <div className="listing-detail__specs">
              {listing.specs.map((spec) => (
                <span key={`${spec.label}${spec.suffix}`}>
                  <b>{spec.label}</b>
                  {spec.suffix}
                </span>
              ))}
            </div>
          )}

          {listing.excerpt && <p className="listing-detail__excerpt">{listing.excerpt}</p>}

          <div className="listing-detail__actions">
            <a
              href={listing.href}
              className="btn btn-bronze"
              target="_blank"
              rel="noopener noreferrer"
            >
              View full listing on CRLRE.com →
            </a>
            <Link href="/#contact" className="btn btn-line">
              Contact Mark
            </Link>
          </div>
        </div>

        <BrokerFooter />
      </div>
    </>
  );
}
