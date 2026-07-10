"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type ListingGalleryProps = {
  images: string[];
  title: string;
};

export function ListingGallery({ images, title }: ListingGalleryProps) {
  const [active, setActive] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const total = images.length;

  const goPrev = useCallback(() => {
    setActive((index) => (index === 0 ? total - 1 : index - 1));
  }, [total]);

  const goNext = useCallback(() => {
    setActive((index) => (index === total - 1 ? 0 : index + 1));
  }, [total]);

  useEffect(() => {
    if (total <= 1) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev, total]);

  useEffect(() => {
    if (total <= 1) return;

    const hero = heroRef.current;
    if (!hero) return;

    let touchStartX = 0;

    const onTouchStart = (event: Event) => {
      const touchEvent = event as TouchEvent;
      touchStartX = touchEvent.changedTouches[0]?.clientX ?? 0;
    };

    const onTouchEnd = (event: Event) => {
      const touchEvent = event as TouchEvent;
      const delta = (touchEvent.changedTouches[0]?.clientX ?? 0) - touchStartX;
      if (Math.abs(delta) < 40) return;
      if (delta > 0) goPrev();
      else goNext();
    };

    hero.addEventListener("touchstart", onTouchStart, { passive: true });
    hero.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      hero.removeEventListener("touchstart", onTouchStart);
      hero.removeEventListener("touchend", onTouchEnd);
    };
  }, [goNext, goPrev, total]);

  if (total === 0) return null;

  return (
    <div className="listing-gallery">
      <div className="listing-gallery__hero" ref={heroRef}>
        <Image
          src={images[active]}
          alt={`${title} — photo ${active + 1} of ${total}`}
          fill
          priority={active === 0}
          sizes="(max-width: 660px) 100vw, 55vw"
          className="listing-gallery__hero-img"
        />
        {total > 1 && (
          <>
            <button
              type="button"
              className="listing-gallery__nav listing-gallery__nav--prev"
              onClick={goPrev}
              aria-label="Previous photo"
            >
              ‹
            </button>
            <button
              type="button"
              className="listing-gallery__nav listing-gallery__nav--next"
              onClick={goNext}
              aria-label="Next photo"
            >
              ›
            </button>
            <span className="listing-gallery__count">
              {active + 1} / {total}
            </span>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="listing-gallery__thumbs" role="tablist" aria-label={`${title} photos`}>
          {images.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-label={`View photo ${index + 1}`}
              className={`listing-gallery__thumb${index === active ? " is-active" : ""}`}
              onClick={() => setActive(index)}
            >
              <Image src={src} alt="" width={140} height={92} sizes="92px" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
