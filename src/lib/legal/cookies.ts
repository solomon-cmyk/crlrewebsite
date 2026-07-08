import type { LegalSection } from "@/components/LegalPageShell";
import { SITE } from "@/lib/site";

export const cookiePolicySections: LegalSection[] = [
  {
    id: "what-are-cookies",
    title: "What cookies are",
    paragraphs: [
      "Cookies are small text files stored on your device when you visit a website. Similar technologies, such as local storage, may be used for the same purposes described here. Cookies can be session-based (deleted when you close your browser) or persistent (remaining until they expire or you delete them).",
    ],
  },
  {
    id: "how-we-use-cookies",
    title: "How we use cookies on this Site",
    paragraphs: [
      "We use cookies and comparable technologies to make the Site work, remember your privacy choices, and, with your consent, understand how the Site is used. We do not use advertising or cross-site tracking cookies on this Site.",
    ],
  },
  {
    id: "categories",
    title: "Cookie categories",
    paragraphs: ["We group cookies into the following categories:"],
    list: [
      "Essential cookies: Required for core functionality, including storing your cookie consent decision and maintaining basic security. These cannot be switched off through our banner because the Site needs them to honor your choices.",
      "Analytics cookies: Optional cookies that help us measure aggregate traffic, page views, and performance through Vercel Analytics. These cookies are placed only if you click Accept all or enable analytics in Manage preferences.",
    ],
  },
  {
    id: "cookie-table",
    title: "Cookies and storage we use",
    paragraphs: ["The following table describes key technologies currently in use:"],
    list: [
      "crle-cookie-consent-v1 (local storage, essential): Stores your cookie preference, including whether analytics is enabled, and a timestamp of your decision. Retained until you clear site data or reset preferences.",
      "Vercel Analytics (analytics, optional): Privacy-focused analytics provided by Vercel, Inc. to help us understand Site usage. Enabled only with your consent. See Vercel's documentation for current retention and processing details.",
    ],
  },
  {
    id: "consent",
    title: "How we obtain consent",
    paragraphs: [
      "When you first visit the Site, we show a cookie banner that lets you accept all cookies, continue with essential cookies only, or manage preferences. We record your choice before loading optional analytics.",
      "You may withdraw or change consent at any time by selecting Reset cookie preferences in the Site footer, which clears your saved choice and displays the banner again.",
    ],
  },
  {
    id: "browser-controls",
    title: "Browser controls",
    paragraphs: [
      "Most browsers let you block or delete cookies through settings. Blocking essential cookies may affect Site functionality, including our ability to remember that you dismissed the cookie banner.",
    ],
  },
  {
    id: "do-not-track",
    title: "Do Not Track",
    paragraphs: [
      "Some browsers transmit Do Not Track signals. Because there is no consistent industry standard, we currently respond to the cookie choices you make in our banner rather than to DNT signals alone.",
    ],
  },
  {
    id: "updates-cookie",
    title: "Updates to this Cookie Policy",
    paragraphs: [
      "We may update this Cookie Policy when our technology or legal requirements change. Please review this page periodically. Material updates will be reflected in the last updated date.",
    ],
  },
  {
    id: "contact-cookie",
    title: "Contact",
    paragraphs: [
      `Questions about cookies on ${SITE.url}? Contact ${SITE.contactEmail}.`,
    ],
  },
];
