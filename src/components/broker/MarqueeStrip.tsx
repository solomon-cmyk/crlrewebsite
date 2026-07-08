"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { MARQUEE_ITEMS } from "@/lib/broker-content";

export function MarqueeStrip() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    const track = trackRef.current;
    if (!marquee || !track) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let paused = false;
    let dragging = false;
    let startX = 0;
    let startScroll = 0;
    let frame = 0;

    const halfW = () => track.scrollWidth / 2;

    const loopFix = () => {
      const h = halfW();
      if (h <= 0) return;
      if (marquee.scrollLeft >= h) marquee.scrollLeft -= h;
      else if (marquee.scrollLeft <= 0) marquee.scrollLeft += h;
    };

    const tick = () => {
      if (!paused && !dragging && !reduce) {
        marquee.scrollLeft += 0.6;
        loopFix();
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    const onEnter = () => {
      paused = true;
    };
    const onLeave = () => {
      if (!dragging) paused = false;
    };
    const onTouchStart = () => {
      paused = true;
    };
    const onTouchEnd = () => {
      paused = false;
      loopFix();
    };
    const onScroll = () => loopFix();
    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      dragging = true;
      paused = true;
      startX = event.clientX;
      startScroll = marquee.scrollLeft;
      marquee.classList.add("grabbing");
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return;
      marquee.scrollLeft = startScroll - (event.clientX - startX);
    };
    const onPointerUp = () => {
      if (!dragging) return;
      dragging = false;
      paused = false;
      marquee.classList.remove("grabbing");
      loopFix();
    };

    marquee.addEventListener("mouseenter", onEnter);
    marquee.addEventListener("mouseleave", onLeave);
    marquee.addEventListener("touchstart", onTouchStart, { passive: true });
    marquee.addEventListener("touchend", onTouchEnd, { passive: true });
    marquee.addEventListener("scroll", onScroll, { passive: true });
    marquee.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      cancelAnimationFrame(frame);
      marquee.removeEventListener("mouseenter", onEnter);
      marquee.removeEventListener("mouseleave", onLeave);
      marquee.removeEventListener("touchstart", onTouchStart);
      marquee.removeEventListener("touchend", onTouchEnd);
      marquee.removeEventListener("scroll", onScroll);
      marquee.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="marquee-wrap">
      <div className="marquee" ref={marqueeRef} id="marquee">
        <div className="marquee-track" ref={trackRef} id="mqTrack">
          {items.map((item, index) => (
            <div className="mq-card" key={`${item.label}-${index}`}>
              <Image src={item.src} alt={item.alt} width={380} height={262} unoptimized />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
