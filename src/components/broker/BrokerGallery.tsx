"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { GALLERY_ITEMS } from "@/lib/broker-content";

const INITIAL_COUNT = 12;

export function BrokerGallery() {
  const [expanded, setExpanded] = useState(false);
  const visible = useMemo(
    () => (expanded ? GALLERY_ITEMS : GALLERY_ITEMS.slice(0, INITIAL_COUNT)),
    [expanded]
  );
  const remaining = GALLERY_ITEMS.length - INITIAL_COUNT;

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
          {visible.map((item, index) => (
            <a
              className={`gal${item.hero ? " g-hero" : ""}`}
              href={item.href}
              key={item.label}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={800}
                height={600}
                sizes="(max-width: 660px) 50vw, (max-width: 1100px) 33vw, 360px"
                loading={index < 4 ? "eager" : "lazy"}
              />
              <span>{item.label}</span>
            </a>
          ))}
        </div>
        {!expanded && remaining > 0 && (
          <div className="center-cta reveal">
            <button type="button" className="btn btn-ink" onClick={() => setExpanded(true)}>
              View all {GALLERY_ITEMS.length} photos →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
