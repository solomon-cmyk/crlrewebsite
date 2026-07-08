"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export function HeroFigure() {
  const figureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const figure = figureRef.current;
    if (!figure) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = figure.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, 1 - rect.top / window.innerHeight));
        figure.style.setProperty("--hero-shift", `${progress * 18}px`);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="hero-figure reveal hero-figure--motion" ref={figureRef}>
      <Image
        src="/media/marave/images/villas-day.webp"
        alt="Maravé Resort & Residences, Manuel Antonio"
        width={900}
        height={540}
        className="hero-image"
        priority
        unoptimized
      />
      <span className="hero-cap">Maravé · Resort & Residences</span>
    </div>
  );
}
