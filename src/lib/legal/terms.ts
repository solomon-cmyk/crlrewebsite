import type { LegalSection } from "@/components/LegalPageShell";
import { SITE } from "@/lib/site";

export const termsSections: LegalSection[] = [
  {
    id: "agreement",
    title: "Agreement to these terms",
    paragraphs: [
      `These Terms of Use ("Terms") govern your access to and use of ${SITE.url} and ${SITE.productName} (collectively, the "Site"), published by ${SITE.publisher}. By accessing or using the Site, you agree to these Terms and our Privacy Policy and Cookie Policy. If you do not agree, do not use the Site.`,
    ],
  },
  {
    id: "purpose",
    title: "Purpose of the Site",
    paragraphs: [
      "The Site presents Maravé Resort & Residences in Manuel Antonio, pre-construction reservation information, and selected Costa Rica luxury real estate listings. The Site is published for general informational purposes in connection with brokerage marketing.",
      "Nothing on the Site is legal, tax, accounting, investment, or real estate advice. You should consult qualified professionals before making a purchase decision.",
    ],
  },
  {
    id: "no-offer",
    title: "No offer or guarantee",
    paragraphs: [
      "The Site does not constitute an offer to sell or solicitation to buy real property where prohibited. Availability, pricing, inventory, and project timelines are subject to change without notice and to the final executed purchase documents.",
      "Any pricing, renderings, or descriptive copy on the Site are illustrative and may not reflect current inventory or final specifications.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    paragraphs: [
      "The Site, including text, design, logos, renderings, and software, is owned by or licensed to the applicable rights holders and is protected by intellectual property laws. You may view and print pages for personal, non-commercial evaluation of Maravé residences and listings.",
      "You may not copy, scrape, republish, reverse engineer, frame, or commercially exploit the Site or its content without prior written permission, except as permitted by law.",
    ],
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    paragraphs: ["You agree not to:"],
    list: [
      "Use the Site in violation of any applicable law or regulation.",
      "Attempt to gain unauthorized access to the Site, servers, or related systems.",
      "Introduce malware or interfere with the Site's operation.",
      "Misrepresent Site content as a binding offer, guarantee, or official hotel projection.",
      "Use automated means to access the Site in a manner that imposes an unreasonable load on our infrastructure.",
    ],
  },
  {
    id: "third-party",
    title: "Third-party links and services",
    paragraphs: [
      "The Site may reference or link to third-party websites, including maraveresidences.com, crlre.com, and brand partner resources. We do not control third-party sites and are not responsible for their content, policies, or practices.",
    ],
  },
  {
    id: "disclaimer",
    title: "Disclaimers",
    paragraphs: [
      `THE SITE IS PROVIDED "AS IS" AND "AS AVAILABLE." TO THE FULLEST EXTENT PERMITTED BY LAW, ${SITE.publisher.toUpperCase()} AND ITS AFFILIATES, OFFICERS, AGENTS, AND LICENSORS DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.`,
      "We do not warrant that the Site will be uninterrupted, error-free, or free of harmful components, or that any information on the Site is complete or current.",
    ],
  },
  {
    id: "liability",
    title: "Limitation of liability",
    paragraphs: [
      `To the fullest extent permitted by law, neither ${SITE.publisher} nor its affiliates shall be liable for any indirect, incidental, special, consequential, or punitive damages, or for lost profits, revenue, data, or business opportunities arising from or related to your use of the Site, even if advised of the possibility of such damages.`,
      "Our total liability for any claim relating to the Site shall not exceed one hundred U.S. dollars (US$100), except where such limitation is prohibited by law.",
    ],
  },
  {
    id: "indemnity",
    title: "Indemnity",
    paragraphs: [
      `You agree to defend, indemnify, and hold harmless ${SITE.publisher} and its officers, agents, and employees from claims, damages, losses, and expenses (including reasonable attorneys' fees) arising from your misuse of the Site or violation of these Terms.`,
    ],
  },
  {
    id: "governing-law",
    title: "Governing law and disputes",
    paragraphs: [
      "These Terms are governed by the laws of the State of Florida, without regard to conflict-of-law principles, except that mandatory consumer protections in your jurisdiction may still apply.",
      "Any dispute arising from these Terms or the Site shall be brought in the state or federal courts located in Miami-Dade County, Florida, and you consent to personal jurisdiction in those courts.",
    ],
  },
  {
    id: "changes-terms",
    title: "Changes",
    paragraphs: [
      "We may modify these Terms at any time by posting an updated version on this page. Your continued use of the Site after changes become effective constitutes acceptance of the revised Terms.",
    ],
  },
  {
    id: "contact-terms",
    title: "Contact",
    paragraphs: [
      `${SITE.publisher} · ${SITE.address}`,
      `${SITE.contactEmail} · ${SITE.contactPhone}`,
    ],
  },
];
