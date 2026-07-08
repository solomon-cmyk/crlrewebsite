"use client";

import { useEffect, useRef, useState } from "react";

export function useSmartNav(menuOpen: boolean) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const stopTimer = useRef<number | null>(null);

  useEffect(() => {
    if (menuOpen) {
      setHidden(false);
      return;
    }

    const update = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;
      const isMobile = window.matchMedia("(max-width: 660px)").matches;

      setScrolled(y > 40);

      if (isMobile) {
        setHidden(false);
      } else if (y < 96) {
        setHidden(false);
      } else if (delta > 10) {
        setHidden(true);
      } else if (delta < -10) {
        setHidden(false);
      }

      lastScrollY.current = y;
      ticking.current = false;

      if (stopTimer.current) window.clearTimeout(stopTimer.current);
      if (!isMobile) {
        stopTimer.current = window.setTimeout(() => {
          if (window.scrollY > 96) setHidden(false);
        }, 220);
      }
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (stopTimer.current) window.clearTimeout(stopTimer.current);
    };
  }, [menuOpen]);

  return { scrolled, hidden };
}
