import { CollectionMedia } from "@/components/broker/CollectionMedia";
import { COLLECTIONS } from "@/lib/broker-content";

export function CollectionsSection() {
  return (
    <section className="block" id="collections">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">The Collections</span>
          <span className="rule" />
          <h2>
            Three ways to <em>belong</em>
          </h2>
        </div>
        <div className="tiers">
          {COLLECTIONS.map((tier) => (
            <div className="tier reveal" key={tier.title}>
              <CollectionMedia
                video={tier.video}
                poster={tier.image}
                alt={tier.alt}
                num={tier.num}
              />
              <div className="body">
                <span className="kind">{tier.kind}</span>
                <h3>{tier.title}</h3>
                <div className="spec">
                  {tier.specs.map((spec) => (
                    <span key={spec.label}>
                      <b>{spec.label}</b>
                      {spec.suffix}
                    </span>
                  ))}
                </div>
                <div className="price">
                  <span>From</span>
                  {tier.price}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
