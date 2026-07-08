import Image from "next/image";
import Link from "next/link";
import { FOOTER_DISCLAIMER } from "@/lib/broker-content";
import { CONTACT } from "@/lib/contact";
import { LOGOS } from "@/lib/assets";
import { LEGAL_LINKS } from "@/lib/site";
import { ManageCookiesButton } from "@/components/ManageCookiesButton";

export function BrokerFooter() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand">
            <Image
              src={LOGOS.crlreWordmark}
              alt="Costa Rica Luxury Real Estate"
              width={900}
              height={220}
              className="foot-logo"
            />
            <p>
              Developer & exclusive representative of Maravé, Resort & Residences · Manuel Antonio,
              Costa Rica. Pura vida.
            </p>
          </div>
          <div>
            <h5>Maravé</h5>
            <a href="#marave">Overview</a>
            <a href="#collections">Residences</a>
            <a href="#gallery">Gallery</a>
            <a href="#reserve">Reserve</a>
          </div>
          <div>
            <h5>Listings</h5>
            <Link href="/listings">All listings</Link>
          </div>
          <div>
            <h5>Contact</h5>
            <a href={CONTACT.emailHref}>{CONTACT.email}</a>
            <a href={CONTACT.phoneCrHref}>{CONTACT.phoneCr}</a>
            <a href={CONTACT.phoneUsHref}>{CONTACT.phoneUs}</a>
            <Link href="/blog">Blog</Link>
          </div>
        </div>
        <p className="disc">{FOOTER_DISCLAIMER}</p>
        <div className="foot-bottom">
          <span>© 2026 Costa Rica Luxury Real Estate · Maravé, Resort & Residences</span>
          <span>Equal Housing Opportunity</span>
        </div>
        <div className="foot-legal">
          {LEGAL_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          <ManageCookiesButton />
        </div>
      </div>
    </footer>
  );
}
