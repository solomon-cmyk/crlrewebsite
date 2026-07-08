"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/broker/BrandLogo";
import { NAV_LINKS } from "@/lib/broker-content";
import { useSmartNav } from "@/hooks/useSmartNav";

export function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrolled, hidden } = useSmartNav(menuOpen);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 660) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`nav${scrolled ? " scrolled" : ""}${hidden ? " nav--hidden" : ""}${menuOpen ? " nav--menu-open" : ""}`}
        id="nav"
      >
        <div className="wrap nav-inner">
          <BrandLogo onClick={closeMenu} compact={scrolled} />
          <nav className={`links${menuOpen ? " open" : ""}`} id="links" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={closeMenu}>
                {link.label}
              </a>
            ))}
            <Link href="/blog" onClick={closeMenu}>
              Blog
            </Link>
            <a href="#contact" className="btn btn-ghost nav-contact" onClick={closeMenu}>
              Contact
            </a>
          </nav>
          <button
            type="button"
            className="menu-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="links"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
      <button
        type="button"
        className={`nav-backdrop${menuOpen ? " nav-backdrop--open" : ""}`}
        aria-label="Close menu"
        tabIndex={menuOpen ? 0 : -1}
        onClick={closeMenu}
      />
    </>
  );
}
