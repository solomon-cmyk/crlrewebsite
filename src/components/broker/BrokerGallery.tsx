import Image from "next/image";
import { GALLERY_ITEMS } from "@/lib/broker-content";

export function BrokerGallery() {
  return (
    <section className="block marave" id="gallery">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">Gallery</span>
          <span className="rule" />
          <h2>
            Interiors & <em>exteriors</em>
          </h2>
        </div>
        <div className="gal-grid reveal">
          {GALLERY_ITEMS.map((item) => (
            <a
              className={`gal${item.hero ? " g-hero" : ""}`}
              href={item.href}
              key={item.label}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={item.src} alt={item.alt} width={800} height={600} unoptimized />
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
