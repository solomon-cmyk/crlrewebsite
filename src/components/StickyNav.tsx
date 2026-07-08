"use client";

import { CONTACT } from "@/lib/contact";
import { LOGOS } from "@/lib/assets";
import { navSections } from "@/lib/content";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function StickyNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`site-nav${visible ? " site-nav--visible" : ""}`} aria-label="Page sections">
      <div className="wrap site-nav__inner">
        <a href="#" className="site-nav__brand" aria-label="Maravé LXR Residences, back to top">
          <Image
            src={LOGOS.horizontalWhite}
            alt="Maravé LXR Residences"
            width={160}
            height={36}
            className="site-nav__logo"
            priority
          />
        </a>
        <div className="site-nav__links">
          <Link href="/blog" className="site-nav__link">
            Blog
          </Link>
          {navSections.map((section) => (
            <a key={section.id} href={`#${section.id}`} className="site-nav__link">
              {section.label}
            </a>
          ))}
        </div>
        <div className="site-nav__cta">
          <a href={CONTACT.phoneHref} className="site-nav__btn site-nav__btn--ghost">
            Call
          </a>
          <a href={CONTACT.emailHref} className="site-nav__btn">
            Email
          </a>
        </div>
      </div>
    </nav>
  );
}
