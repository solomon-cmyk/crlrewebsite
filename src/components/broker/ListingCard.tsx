import type { Listing } from "@/lib/listings";
import Image from "next/image";
import Link from "next/link";

type ListingCardProps = {
  listing: Listing;
  className?: string;
};

export function ListingCard({ listing, className = "card reveal" }: ListingCardProps) {
  return (
    <Link
      className={`${className}${listing.sold ? " card--sold" : ""}`}
      href={`/listings/${listing.slug}`}
    >
      <div className="photo">
        <span className={`tag${listing.sold ? " tag--sold" : ""}`}>{listing.tag}</span>
        <Image src={listing.image} alt={listing.alt} width={600} height={250} sizes="(max-width: 660px) 100vw, (max-width: 1100px) 50vw, 360px" />
      </div>
      <div className="body">
        <span className="loc">{listing.location}</span>
        <h3>{listing.title}</h3>
        <div className="price">{listing.price}</div>
        {listing.specs.length > 0 && (
          <div className="specs">
            {listing.specs.map((spec) => (
              <span key={`${spec.label}${spec.suffix}`}>
                <b>{spec.label}</b>
                {spec.suffix}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
