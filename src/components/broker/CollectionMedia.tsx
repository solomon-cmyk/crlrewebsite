"use client";

import { useEffect, useRef } from "react";

type CollectionMediaProps = {
  video: string;
  poster: string;
  alt: string;
  num: string;
};

async function playWhenReady(video: HTMLVideoElement) {
  video.muted = true;
  try {
    await video.play();
    return;
  } catch {
    // retry after enough data is buffered
  }

  await new Promise<void>((resolve) => {
    const start = () => {
      video.play().catch(() => {});
      cleanup();
      resolve();
    };
    const cleanup = () => {
      video.removeEventListener("canplay", start);
      video.removeEventListener("loadeddata", start);
    };
    video.addEventListener("canplay", start, { once: true });
    video.addEventListener("loadeddata", start, { once: true });
    if (video.readyState >= 2) start();
    else video.load();
  });
}

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
        if (entry.isIntersecting) playWhenReady(el);
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
        autoPlay
        preload="auto"
        poster={poster}
        aria-label={alt}
        onClick={() => {
          const el = videoRef.current;
          if (!el) return;
          if (el.paused) playWhenReady(el);
          else el.pause();
        }}
      >
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
}
