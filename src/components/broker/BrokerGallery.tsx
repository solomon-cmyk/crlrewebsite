"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  GALLERY_CATEGORIES,
  GALLERY_ITEMS,
  type GalleryCategory,
} from "@/lib/broker-content";

const PREVIEW_COUNT = 7;

type FilterId = GalleryCategory | "all";

export function BrokerGallery() {
  const [filter, setFilter] = useState<FilterId>("all");
  const [active, setActive] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const touchStartX = useRef(0);

  const filtered = useMemo(
    () =>
      filter === "all"
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter((item) => item.category === filter),
    [filter]
  );

  const preview = filtered.slice(0, PREVIEW_COUNT);
  const remaining = Math.max(0, filtered.length - PREVIEW_COUNT);

  const openAt = (index: number) => {
    setZoomed(false);
    setActive(index);
  };
  const close = () => {
    setZoomed(false);
    setActive(null);
  };

  const goPrev = useCallback(() => {
    setActive((index) => {
      if (index === null) return index;
      return index === 0 ? filtered.length - 1 : index - 1;
    });
  }, [filtered.length]);

  const goNext = useCallback(() => {
    setActive((index) => {
      if (index === null) return index;
      return index === filtered.length - 1 ? 0 : index + 1;
    });
  }, [filtered.length]);

  useEffect(() => {
    if (active === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (zoomed) setZoomed(false);
        else close();
      }
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
      if (event.key === "+" || event.key === "=") setZoomed(true);
      if (event.key === "-" || event.key === "_") setZoomed(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active, goNext, goPrev, zoomed]);

  useEffect(() => {
    setActive(null);
    setZoomed(false);
  }, [filter]);

  const current = active !== null ? filtered[active] : null;

  return (
    <section className="block marave" id="gallery">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">Gallery</span>
          <span className="rule" />
          <h2>
            Interiors & <em>exteriors</em>
          </h2>
          <p>{GALLERY_ITEMS.length} photos · browse by collection</p>
        </div>

        <div className="gal-filters reveal" role="tablist" aria-label="Gallery collections">
          {GALLERY_CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={filter === category.id}
              className={`gal-filter${filter === category.id ? " is-active" : ""}`}
              onClick={() => setFilter(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="gal-grid reveal">
          {preview.map((item, index) => {
            const isLast = index === preview.length - 1 && remaining > 0;
            return (
              <button
                type="button"
                className={`gal${item.hero && filter === "all" && index === 0 ? " g-hero" : ""}${isLast ? " gal--more" : ""}`}
                key={`${item.src}-${index}`}
                onClick={() => openAt(index)}
                aria-label={isLast ? `View all ${filtered.length} photos` : `View ${item.label}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={800}
                  height={600}
                  sizes="(max-width: 660px) 50vw, (max-width: 1100px) 33vw, 360px"
                  loading={index < 3 ? "eager" : "lazy"}
                />
                {isLast ? (
                  <span className="gal-more-label">+{remaining} more</span>
                ) : (
                  <span>{item.label}</span>
                )}
              </button>
            );
          })}
        </div>

        <div className="center-cta reveal">
          <button type="button" className="btn btn-ink" onClick={() => openAt(0)}>
            Open gallery · {filtered.length} photos
          </button>
        </div>
      </div>

      {current && active !== null && (
        <div
          className={`gal-lightbox${zoomed ? " gal-lightbox--zoomed" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label={`${current.label} — photo ${active + 1} of ${filtered.length}`}
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
          onTouchStart={(event) => {
            touchStartX.current = event.changedTouches[0]?.clientX ?? 0;
          }}
          onTouchEnd={(event) => {
            const delta = (event.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
            if (Math.abs(delta) < 40) return;
            if (delta > 0) goPrev();
            else goNext();
          }}
        >
          <button type="button" className="gal-lightbox__close" aria-label="Close gallery" onClick={close}>
            ×
          </button>

          <button
            type="button"
            className="gal-lightbox__zoom"
            aria-label={zoomed ? "Exit full view" : "Fill the page"}
            aria-pressed={zoomed}
            onClick={() => setZoomed((value) => !value)}
          >
            {zoomed ? "↘" : "↖"}
          </button>

          <button type="button" className="gal-lightbox__nav gal-lightbox__nav--prev" aria-label="Previous photo" onClick={goPrev}>
            ‹
          </button>
          <button type="button" className="gal-lightbox__nav gal-lightbox__nav--next" aria-label="Next photo" onClick={goNext}>
            ›
          </button>

          <div className="gal-lightbox__stage">
            <button
              type="button"
              className="gal-lightbox__frame"
              onClick={() => setZoomed((value) => !value)}
              aria-label={zoomed ? "Exit full view" : "Fill the page"}
            >
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                quality={95}
                className="gal-lightbox__image"
                priority
              />
            </button>
            <div className="gal-lightbox__meta">
              <span>{current.label}</span>
              <span>
                {active + 1} / {filtered.length}
                <span className="gal-lightbox__hint">
                  {zoomed ? " · arrows keep full view" : " · click for full page"}
                </span>
              </span>
            </div>
          </div>

          {!zoomed && (
            <div className="gal-lightbox__thumbs" role="tablist" aria-label="Gallery thumbnails">
              {filtered.map((item, index) => (
                <button
                  key={`${item.src}-thumb`}
                  type="button"
                  role="tab"
                  aria-selected={index === active}
                  aria-label={`View ${item.label}`}
                  className={`gal-lightbox__thumb${index === active ? " is-active" : ""}`}
                  onClick={() => setActive(index)}
                >
                  <Image src={item.src} alt="" width={96} height={64} sizes="72px" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
