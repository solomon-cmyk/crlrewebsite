"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function scrollToHash(hash: string) {
  const id = hash.replace(/^#/, "");
  if (!id) return;

  const el = document.getElementById(id);
  if (!el) return;

  // Offset for fixed nav
  const nav = document.getElementById("nav");
  const offset = nav?.offsetHeight ?? 80;
  const top = el.getBoundingClientRect().top + window.scrollY - offset - 8;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}

/**
 * Next.js App Router often skips hash scrolling on client navigations
 * (e.g. /listings → /#gallery). This restores that behavior.
 */
export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const run = () => {
      if (window.location.hash) {
        // Wait a tick for the destination page to paint
        requestAnimationFrame(() => {
          setTimeout(() => scrollToHash(window.location.hash), 50);
        });
      }
    };

    run();
    window.addEventListener("hashchange", run);
    return () => window.removeEventListener("hashchange", run);
  }, [pathname]);

  return null;
}
