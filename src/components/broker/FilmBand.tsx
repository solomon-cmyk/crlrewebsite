"use client";

import { useEffect, useRef, useState } from "react";

const VIDEO_SRC = "/media/marave/videos/residences-hero.mp4";
/** Gallery + film poster only — do not reuse collection/hero/marquee images. */
const POSTER_SRC = "/media/marave/images/beach-club-aerial.webp";

async function playWhenReady(video: HTMLVideoElement) {
  video.muted = true;
  try {
    await video.play();
    return;
  } catch {
    // wait until the element can play, then retry
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

export function FilmBand() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lightboxVideoRef = useRef<HTMLVideoElement>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!wrap || !video) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) playWhenReady(video);
        else video.pause();
      },
      { threshold: 0.35 }
    );

    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!expanded) return;

    const inline = videoRef.current;
    const expandedVideo = lightboxVideoRef.current;
    if (!expandedVideo) return;

    if (inline && Number.isFinite(inline.currentTime)) {
      try {
        expandedVideo.currentTime = inline.currentTime;
      } catch {
        // ignore seek before metadata
      }
    }

    playWhenReady(expandedVideo);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [expanded]);

  const closeExpanded = () => {
    const inline = videoRef.current;
    const expandedVideo = lightboxVideoRef.current;
    if (inline && expandedVideo) {
      try {
        inline.currentTime = expandedVideo.currentTime;
      } catch {
        // ignore
      }
      playWhenReady(inline);
    }
    setExpanded(false);
  };

  const openExpanded = () => {
    videoRef.current?.pause();
    setExpanded(true);
  };

  return (
    <>
      <section className="block filmband">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">The Film</span>
            <span className="rule" />
            <h2>
              A closer <em>look</em>
            </h2>
            <p>Step inside the residences, the beach club, and the canopy.</p>
          </div>
          <div className="film reveal" ref={wrapRef}>
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={POSTER_SRC}
              aria-label="Maravé Resort & Residences film"
              onClick={openExpanded}
            >
              <source src={VIDEO_SRC} type="video/mp4" />
            </video>
            <button
              type="button"
              className="film-expand"
              aria-label="Expand video"
              onClick={openExpanded}
            >
              <span aria-hidden="true">Expand</span>
            </button>
          </div>
        </div>
      </section>

      {expanded && (
        <div
          className="film-lightbox film-lightbox--open"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded Maravé film"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeExpanded();
          }}
        >
          <button type="button" className="film-lightbox__close" aria-label="Close" onClick={closeExpanded}>
            ×
          </button>
          <div className="film-lightbox__inner">
            <video
              ref={lightboxVideoRef}
              autoPlay
              muted
              loop
              playsInline
              controls
              preload="auto"
              poster={POSTER_SRC}
            >
              <source src={VIDEO_SRC} type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </>
  );
}
