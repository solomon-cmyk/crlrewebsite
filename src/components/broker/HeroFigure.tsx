"use client";

import { useEffect, useRef } from "react";

const HERO_DESKTOP = "/media/marave/videos/hero.mp4";
const HERO_MOBILE = "/media/marave/videos/hero-mobile.mp4";
const HERO_POSTER = "/media/marave/images/villas-day.webp";

export function HeroFigure() {
  const figureRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const figure = figureRef.current;
    const video = videoRef.current;
    if (!figure || !video) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 660px)");

    const applySource = () => {
      const next = mobile.matches ? HERO_MOBILE : HERO_DESKTOP;
      if (video.getAttribute("src") === next) return;
      video.setAttribute("src", next);
      video.load();
      if (!reduce) video.play().catch(() => {});
    };

    applySource();
    mobile.addEventListener("change", applySource);

    if (reduce) {
      video.pause();
      return () => mobile.removeEventListener("change", applySource);
    }

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
      mobile.removeEventListener("change", applySource);
    };
  }, []);

  return (
    <div className="hero-figure reveal hero-figure--motion" ref={figureRef}>
      <video
        ref={videoRef}
        className="hero-image"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={HERO_POSTER}
        aria-label="Maravé Resort & Residences, Manuel Antonio"
      />
      <span className="hero-cap">Maravé · Resort & Residences</span>
    </div>
  );
}
