import { HeroFigure } from "@/components/broker/HeroFigure";

export function BrokerHero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy hero-copy--enter">
          <span className="eyebrow">Costa Rica · Pacific Coast</span>
          <h1>
            Introducing <em>Maravé</em>.
          </h1>
          <p className="lead">
            A landmark collection of 116 LXR-branded residences in the heart of Manuel Antonio. This
            is the Pacific coast&apos;s most anticipated new address, developed and represented by
            Costa Rica Luxury Real Estate.
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
        <HeroFigure />
      </div>
    </section>
  );
}
