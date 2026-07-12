import { BrokerFooter } from "@/components/broker/BrokerFooter";
import { ListingDescription } from "@/components/broker/ListingDescription";
import { ListingFeatures } from "@/components/broker/ListingFeatures";
import { ListingGallery } from "@/components/broker/ListingGallery";
import { SiteNav } from "@/components/broker/SiteNav";
import { getAllListings, getListingBySlug } from "@/lib/listings";
import { organizationJsonLd, jsonLdScript, websiteJsonLd } from "@/lib/seo/jsonld";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type ListingPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getAllListings()).map((listing) => ({ slug: listing.slug }));
}

export async function generateMetadata({ params }: ListingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);

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
  const listing = await getListingBySlug(slug);

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
        <div className="wrap listing-detail__layout">
          <div className="listing-detail__media">
            <Link href="/listings" className="listing-detail__back">
              ← All listings
            </Link>
            <ListingGallery images={gallery} title={listing.title} />
          </div>

          <div className="listing-detail__panel">
            <header className="listing-detail__intro">
              <p className="eyebrow">{listing.location}</p>
              <h1>{listing.title}</h1>
              <div className="listing-detail__meta">
                <span className={`tag${listing.sold ? " tag--sold" : ""}`}>{listing.tag}</span>
                <span className="listing-detail__price">{listing.price}</span>
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
            </header>

            <ListingDescription paragraphs={listing.description} />

            <ListingFeatures features={listing.features} />

            <div className="listing-detail__actions">
              <Link href="/#contact" className="btn btn-bronze">
                Contact Mark →
              </Link>
            </div>
          </div>
        </div>

        <BrokerFooter />
      </div>
    </>
  );
}
