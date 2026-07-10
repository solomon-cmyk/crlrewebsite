"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/broker/BrandLogo";
import { NAV_LINKS } from "@/lib/broker-content";
import { useSmartNav } from "@/hooks/useSmartNav";

function NavItem({
  href,
  children,
  className,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  // Native anchors for hash routes so /listings → /#gallery always navigates + scrolls
  if (href.includes("#")) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

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
          <BrandLogo onClick={closeMenu} compact={scrolled || menuOpen} />
          <nav className={`links${menuOpen ? " open" : ""}`} id="links" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <NavItem key={link.href} href={link.href} onClick={closeMenu}>
                {link.label}
              </NavItem>
            ))}
            <NavItem href="/blog" onClick={closeMenu}>
              Blog
            </NavItem>
            <NavItem href="/#contact" className="btn btn-ghost nav-contact" onClick={closeMenu}>
              Contact
            </NavItem>
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
