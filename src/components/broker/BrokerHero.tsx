import Image from "next/image";

export function BrokerHero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy reveal">
          <span className="eyebrow">Costa Rica · Pacific Coast</span>
          <h1>
            Introducing <em>Maravé</em>.
          </h1>
          <p className="lead">
            A landmark collection of 116 LXR-branded residences in the heart of Manuel Antonio,
            Costa Rica&apos;s most anticipated arrival on the Pacific coast.
          </p>
          <div className="hero-cta">
            <a href="#marave" className="btn btn-ink">
              Discover Maravé
            </a>
            <a href="#listings" className="btn btn-line">
              View exclusive listings
            </a>
          </div>
        </div>
        <div className="hero-figure reveal">
          <Image
            src="https://www.maraveresidences.com/Marave%20Final%20Renders/Exterior%20Shots%20and%20Beach%20Hero/H_OC_Exterior_14_Villas%20Day_b.jpg"
            alt="Maravé Resort & Residences, Manuel Antonio"
            width={900}
            height={540}
            className="hero-image"
            priority
            unoptimized
          />
          <span className="hero-cap">Maravé · Resort & Residences</span>
        </div>
      </div>
    </section>
  );
}
