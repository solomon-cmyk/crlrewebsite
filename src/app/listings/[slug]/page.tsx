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

  const description =
    listing.description[0] ?? listing.excerpt ?? `${listing.title} in ${listing.location}. ${listing.price}.`;

  return {
    title: `${listing.title} · Costa Rica Luxury Real Estate`,
    description,
    alternates: {
      canonical: `/listings/${listing.slug}`,
    },
    openGraph: {
      title: listing.title,
      description,
      images: listing.images.slice(0, 4).map((url) => ({ url })),
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

  const gallery = listing.images.length > 0 ? listing.images : [listing.image];

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
          <div className="listing-detail__gallery">
            {gallery.map((src, index) => (
              <div className="listing-detail__photo" key={`${listing.slug}-${index}`}>
                <Image
                  src={src}
                  alt={`${listing.title} photo ${index + 1}`}
                  width={1400}
                  height={900}
                  unoptimized
                  priority={index === 0}
                />
              </div>
            ))}
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

          {listing.description.length > 0 && (
            <div className="listing-detail__description">
              {listing.description.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          )}

          {listing.features.length > 0 && (
            <div className="listing-detail__features">
              <h2>Property features</h2>
              <ul>
                {listing.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="listing-detail__actions">
            <Link href="/#contact" className="btn btn-bronze">
              Contact Mark about this property →
            </Link>
            <Link href="/listings" className="btn btn-line">
              Back to all listings
            </Link>
          </div>
        </div>

        <BrokerFooter />
      </div>
    </>
  );
}
