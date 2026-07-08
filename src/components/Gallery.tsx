import { galleryImages } from "@/lib/content";
import Image from "next/image";

export function Gallery() {
  return (
    <section className="gallery" id="property">
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">The Property</div>
          <h2>Maravé · LXR Residences</h2>
          <p>
            Branded residences on Costa Rica&apos;s Pacific coast. Renderings of the Maravé program
            in Manuel Antonio.
          </p>
        </div>
        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <div key={image.src} className="gallery-item">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={
                  index === 0
                    ? "(max-width: 960px) 100vw, 50vw"
                    : "(max-width: 960px) 100vw, 25vw"
                }
                quality={80}
              />
              <div className="gallery-caption">{image.caption}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
