import { CONTACT } from "@/lib/contact";
import { SITE_URL } from "@/lib/assets";

export const SITE = {
  name: "CRLE",
  domain: "crlre.com",
  url: SITE_URL,
  productName: "Maravé LXR Rental Program Guide",
  publisher: CONTACT.company,
  lastUpdated: "July 7, 2026",
  contactEmail: CONTACT.email,
  contactPhone: CONTACT.phone,
  address: CONTACT.address,
  license: CONTACT.license,
  brokerage: CONTACT.brokerage,
} as const;

export const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
  { href: "/cookie-policy", label: "Cookie Policy" },
] as const;

export const COOKIE_CONSENT_KEY = "crle-cookie-consent-v1";
