"use client";

import { useEffect, useRef, useState } from "react";
import { COLLECTIONS } from "@/lib/broker-content";

function ReelCard({
  video,
  poster,
  title,
  kind,
}: {
  video: string;
  poster: string;
  title: string;
  kind: string;
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

  const playWithSound = async () => {
    const el = videoRef.current;
    if (!el) return;

    document.querySelectorAll<HTMLVideoElement>(".reel-card__video").forEach((other) => {
      if (other !== el) {
        other.pause();
        other.currentTime = 0;
      }
    });

    el.muted = false;
    el.volume = 1;
    try {
      await el.play();
    } catch {
      el.muted = true;
      await el.play().catch(() => {});
      el.muted = false;
    }
  };

  return (
    <article className="reel-card reveal">
      <div className="reel-card__stage">
        <video
          ref={videoRef}
          className="reel-card__video"
          playsInline
          preload="metadata"
          poster={poster}
          controls={playing}
          controlsList="nodownload"
        >
          <source src={video} type="video/mp4" />
        </video>
        {!playing && (
          <button
            type="button"
            className="reel-card__play"
            onClick={playWithSound}
            aria-label={`Play ${title} video with sound`}
          >
            <span aria-hidden="true">▶</span>
            <span className="reel-card__play-label">Play</span>
          </button>
        )}
      </div>
      <div className="reel-card__meta">
        <span className="reel-card__kind">{kind}</span>
        <h3>{title}</h3>
      </div>
    </article>
  );
}

export function VideosSection() {
  return (
    <section className="block videos-section" id="videos">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">Videos</span>
          <span className="rule" />
          <h2>
            Watch the <em>residences</em>
          </h2>
          <p>Click to play with sound — condominiums, villas, and penthouses.</p>
        </div>
        <div className="reel-grid">
          {COLLECTIONS.map((tier) => (
            <ReelCard
              key={tier.title}
              video={tier.video}
              poster={tier.image}
              title={tier.title}
              kind={tier.kind}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
