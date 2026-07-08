import { CONTACT } from "@/lib/contact";
import { LOGOS } from "@/lib/assets";
import { LEGAL_LINKS } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import { ManageCookiesButton } from "./ManageCookiesButton";

export function Footer() {
  return (
    <footer>
      <div className="wrap footer__grid">
        <div>
          <Image
            src={LOGOS.pppWhite}
            alt="Property Pro Partners"
            width={180}
            height={40}
            className="footer__ppp-logo"
          />
          <b>
            {CONTACT.name} · {CONTACT.title}
          </b>
          {CONTACT.address}
          <div className="lic">
            License {CONTACT.license} · Brokerage {CONTACT.brokerage} ·{" "}
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a> ·{" "}
            <a href={CONTACT.emailHref}>{CONTACT.email}</a> ·{" "}
            <a href={CONTACT.websiteHref}>{CONTACT.website}</a>
          </div>
        </div>
        <div className="footer__right">
          <b>Maravé · LXR Residences</b>
          Exclusive sales by Property Pro Partners
          <div className="lic">
            Prepared July 2026 · v3.0 · Estimates only. Final executed RMA controls.
          </div>
        </div>
      </div>
      <div className="wrap footer-legal">
        {LEGAL_LINKS.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
        <ManageCookiesButton />
      </div>
    </footer>
  );
}
