import Image from "next/image";
import { CONTACT } from "@/lib/contact";
import { LISTINGS } from "@/lib/broker-content";

export function ListingsSection() {
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
            Beyond Maravé, a selection of our exclusive homes across Manuel Antonio and the Southern
            Pacific coast.
          </p>
        </div>
        <div className="grid">
          {LISTINGS.map((listing) => (
            <a className="card reveal" href={listing.href} key={listing.title} target="_blank" rel="noopener noreferrer">
              <div className="photo">
                <span className="tag">{listing.tag}</span>
                <Image src={listing.image} alt={listing.alt} width={600} height={250} unoptimized />
              </div>
              <div className="body">
                <span className="loc">{listing.location}</span>
                <h3>{listing.title}</h3>
                <div className="price">{listing.price}</div>
                <div className="specs">
                  {listing.specs.map((spec) => (
                    <span key={spec.label}>
                      <b>{spec.label}</b>
                      {spec.suffix}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
        <div className="center-cta reveal">
          <a href={CONTACT.propertiesHref} className="btn btn-ink">
            View all properties →
          </a>
        </div>
      </div>
    </section>
  );
}
