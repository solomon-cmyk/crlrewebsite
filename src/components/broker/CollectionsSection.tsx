"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLeadModal } from "@/components/broker/LeadModal";
import { COLLECTIONS } from "@/lib/broker-content";

export function CollectionsSection() {
  const [active, setActive] = useState<number | null>(null);
  const { openModal } = useLeadModal();
  const current = active !== null ? COLLECTIONS[active] : null;

  useEffect(() => {
    if (active === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowLeft") {
        setActive((index) => (index === null ? index : index === 0 ? COLLECTIONS.length - 1 : index - 1));
      }
      if (event.key === "ArrowRight") {
        setActive((index) => (index === null ? index : index === COLLECTIONS.length - 1 ? 0 : index + 1));
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active]);

  return (
    <section className="block" id="collections">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">The Collections</span>
          <span className="rule" />
          <h2>
            Three ways to <em>belong</em>
          </h2>
          <p>Condominiums, villas, and penthouses — open any residence for pricing and next steps.</p>
        </div>
        <div className="tiers">
          {COLLECTIONS.map((tier, index) => (
            <button
              type="button"
              className="tier reveal tier--clickable"
              key={tier.title}
              onClick={() => setActive(index)}
              aria-label={`View ${tier.title} fullscreen`}
            >
              <div className="ph">
                <span className="num">{tier.num}</span>
                <Image
                  src={tier.image}
                  alt={tier.alt}
                  width={600}
                  height={248}
                  sizes="(max-width: 660px) 100vw, 33vw"
                />
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
            </button>
          ))}
        </div>
      </div>

      {current && active !== null && (
        <div
          className="collection-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${current.title} — fullscreen`}
          onClick={(event) => {
            if (event.target === event.currentTarget) setActive(null);
          }}
        >
          <button
            type="button"
            className="collection-lightbox__close"
            aria-label="Close"
            onClick={() => setActive(null)}
          >
            ×
          </button>
          <button
            type="button"
            className="collection-lightbox__nav collection-lightbox__nav--prev"
            aria-label="Previous residence"
            onClick={() => setActive(active === 0 ? COLLECTIONS.length - 1 : active - 1)}
          >
            ‹
          </button>
          <div className="collection-lightbox__inner">
            <div className="collection-lightbox__media">
              <Image
                src={current.image}
                alt={current.alt}
                fill
                sizes="100vw"
                quality={95}
                priority
                className="collection-lightbox__image"
              />
            </div>
            <div className="collection-lightbox__copy">
              <span className="kind">{current.kind}</span>
              <h3>{current.title}</h3>
              <div className="spec">
                {current.specs.map((spec) => (
                  <span key={spec.label}>
                    <b>{spec.label}</b>
                    {spec.suffix}
                  </span>
                ))}
              </div>
              <div className="price">
                <span>From</span>
                {current.price}
              </div>
              <div className="collection-lightbox__actions">
                <button
                  type="button"
                  className="btn btn-bronze"
                  onClick={() => {
                    setActive(null);
                    openModal("reserve");
                  }}
                >
                  Reserve a residence
                </button>
                <a href="#reserve" className="btn btn-line" onClick={() => setActive(null)}>
                  See how reserve works
                </a>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="collection-lightbox__nav collection-lightbox__nav--next"
            aria-label="Next residence"
            onClick={() => setActive(active === COLLECTIONS.length - 1 ? 0 : active + 1)}
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
