"use client";

import { useEffect } from "react";

export function RevealOnScroll({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      nodes.forEach((node) => node.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    nodes.forEach((node, index) => {
      (node as HTMLElement).style.transitionDelay = `${(index % 3) * 80}ms`;
      io.observe(node);
    });

    return () => io.disconnect();
  }, []);

  return <div className={className}>{children}</div>;
}
