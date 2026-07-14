"use client";

import { useEffect, useRef } from "react";

type CollectionMediaProps = {
  video: string;
  poster: string;
  alt: string;
  num: string;
};

export function CollectionMedia({ video, poster, alt, num }: CollectionMediaProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const el = videoRef.current;
    if (!wrap || !el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.35 }
    );

    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  return (
    <div className="ph" ref={wrapRef}>
      <span className="num">{num}</span>
      <video
        ref={videoRef}
        className="tier-video"
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={alt}
      >
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
}
