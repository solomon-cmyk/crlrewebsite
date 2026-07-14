"use client";

import { useEffect, useRef, useState } from "react";
import { COLLECTIONS } from "@/lib/broker-content";

type Reel = (typeof COLLECTIONS)[number];

function pauseOthers(except?: HTMLVideoElement | null) {
  document.querySelectorAll<HTMLVideoElement>(".reel-video").forEach((other) => {
    if (other !== except) {
      other.pause();
    }
  });
}

async function playWithSound(el: HTMLVideoElement) {
  el.muted = false;
  el.defaultMuted = false;
  el.volume = 1;
  try {
    await el.play();
  } catch {
    // Click gesture should allow sound; last resort unmute after start
    el.muted = true;
    await el.play().catch(() => {});
    el.muted = false;
  }
}

function ReelCard({
  reel,
  onExpand,
}: {
  reel: Reel;
  onExpand: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => {
      setPlaying(false);
      el.currentTime = 0;
    };

    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("ended", onEnded);
    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ended", onEnded);
    };
  }, []);

  const start = async () => {
    const el = videoRef.current;
    if (!el) return;
    pauseOthers(el);
    await playWithSound(el);
  };

  return (
    <article className="reel-card reveal">
      <div className="reel-card__stage">
        <video
          ref={videoRef}
          className="reel-card__video reel-video"
          playsInline
          preload="auto"
          poster={reel.image}
          controls={playing}
          controlsList="nodownload"
        >
          <source src={reel.video} type="video/mp4" />
        </video>
        {!playing && (
          <button
            type="button"
            className="reel-card__play"
            onClick={start}
            aria-label={`Play ${reel.title} video with sound`}
          >
            <span aria-hidden="true">▶</span>
            <span className="reel-card__play-label">Play with sound</span>
          </button>
        )}
        <button
          type="button"
          className="reel-card__expand"
          onClick={() => {
            videoRef.current?.pause();
            onExpand();
          }}
          aria-label={`Enlarge ${reel.title} video`}
        >
          Expand
        </button>
      </div>
      <div className="reel-card__meta">
        <span className="reel-card__kind">{reel.kind}</span>
        <h3>{reel.title}</h3>
      </div>
    </article>
  );
}

export function VideosSection() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const lightboxRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (expanded === null) return;

    const el = lightboxRef.current;
    if (!el) return;

    pauseOthers(el);
    el.currentTime = 0;
    playWithSound(el);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      el.pause();
    };
  }, [expanded]);

  const current = expanded !== null ? COLLECTIONS[expanded] : null;

  return (
    <section className="block videos-section" id="videos">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">Videos</span>
          <span className="rule" />
          <h2>
            Watch the <em>residences</em>
          </h2>
          <p>Click to play with sound — or expand for the full-screen reel.</p>
        </div>
        <div className="reel-grid">
          {COLLECTIONS.map((tier, index) => (
            <ReelCard key={tier.title} reel={tier} onExpand={() => setExpanded(index)} />
          ))}
        </div>
      </div>

      {current && (
        <div
          className="reel-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${current.title} video`}
          onClick={(event) => {
            if (event.target === event.currentTarget) setExpanded(null);
          }}
        >
          <button
            type="button"
            className="reel-lightbox__close"
            aria-label="Close video"
            onClick={() => setExpanded(null)}
          >
            ×
          </button>
          <div className="reel-lightbox__inner">
            <video
              ref={lightboxRef}
              className="reel-video"
              playsInline
              controls
              autoPlay
              preload="auto"
              poster={current.image}
              controlsList="nodownload"
            >
              <source src={current.video} type="video/mp4" />
            </video>
            <div className="reel-lightbox__meta">
              <span>{current.kind}</span>
              <strong>{current.title}</strong>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
