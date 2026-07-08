import Image from "next/image";
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
              <div className="ph">
                <span className="num">{tier.num}</span>
                <Image src={tier.image} alt={tier.alt} width={600} height={248} unoptimized />
              </div>
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
