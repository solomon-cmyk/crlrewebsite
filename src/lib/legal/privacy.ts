import type { LegalSection } from "@/components/LegalPageShell";
import { SITE } from "@/lib/site";

export const privacySections: LegalSection[] = [
  {
    id: "overview",
    title: "Overview",
    paragraphs: [
      `${SITE.publisher} ("we," "us," or "our") publishes ${SITE.productName} at ${SITE.url} (the "Site") for informational and marketing purposes related to Maravé branded residences and exclusive Costa Rica listings. This Privacy Policy explains what information we collect, how we use it, and the choices available to you.`,
      "You may browse most of the Site without creating an account. If you choose to contact us through the inquiry form, your browser may open your email client with the details you provide.",
    ],
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    paragraphs: [
      "Depending on how you use the Site, we may process the following categories of information:",
    ],
    list: [
      "Usage and device data, such as pages viewed, referring URL, browser type, approximate location derived from IP address, and timestamps. This data is collected through analytics tools only if you consent to analytics cookies.",
      "Cookie and consent records, including your cookie preference selection and the date you made it. This is stored locally in your browser and may also be reflected in essential server logs.",
      "Information you choose to send us outside the Site, such as the content of an email or phone call if you contact our sales team directly.",
    ],
  },
  {
    id: "how-we-use-information",
    title: "How we use information",
    paragraphs: [
      "We use information for legitimate business purposes, including:",
    ],
    list: [
      "Operating, securing, and maintaining the Site.",
      "Understanding aggregate traffic patterns so we can improve content and performance.",
      "Responding to inquiries you initiate by email or phone.",
      "Complying with applicable law, regulatory requests, and brokerage record-keeping obligations.",
    ],
  },
  {
    id: "legal-bases",
    title: "Legal bases for processing",
    paragraphs: [
      "Where applicable privacy laws require a legal basis, we rely on one or more of the following: your consent (for analytics cookies), our legitimate interests in operating and improving the Site, and compliance with legal obligations.",
    ],
  },
  {
    id: "sharing",
    title: "How we share information",
    paragraphs: [
      "We do not sell your personal information. We may share limited technical data with service providers who help us run the Site, such as our hosting and analytics vendors, subject to appropriate contractual safeguards.",
      "We may also disclose information if required by law, court order, or governmental request, or when we believe disclosure is necessary to protect our rights, users, or the public.",
    ],
  },
  {
    id: "retention",
    title: "Data retention",
    paragraphs: [
      "Analytics data retention is governed by our analytics provider's settings. Cookie consent choices remain in your browser until you clear site data or reset your preferences using the footer control. Communications you send us directly are retained according to our brokerage record-keeping policies.",
    ],
  },
  {
    id: "security",
    title: "Security",
    paragraphs: [
      "We use commercially reasonable administrative, technical, and organizational measures designed to protect information processed through the Site. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    id: "your-rights",
    title: "Your privacy rights",
    paragraphs: [
      "Depending on where you live, you may have rights to access, correct, delete, or restrict certain processing of your personal information, and to withdraw consent where processing is consent-based.",
      "California residents may have additional rights under the California Consumer Privacy Act, as amended, including the right to know what categories of information are collected and the right to opt out of sale or sharing. We do not sell or share personal information for cross-context behavioral advertising.",
      "To exercise privacy rights, contact us using the details below. We may need to verify your request before responding.",
    ],
  },
  {
    id: "international",
    title: "International visitors",
    paragraphs: [
      "The Site is operated from the United States. If you access the Site from outside the U.S., you understand that information may be processed in the U.S. and other countries that may not provide the same level of data protection as your home jurisdiction.",
    ],
  },
  {
    id: "children",
    title: "Children's privacy",
    paragraphs: [
      "The Site is intended for adults evaluating a real estate purchase. We do not knowingly collect personal information from children under 13. If you believe a child has provided us information, contact us and we will take appropriate steps to delete it.",
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time. The last updated date at the top of this page indicates when it was most recently revised. Material changes will be posted on this page.",
    ],
  },
  {
    id: "contact",
    title: "Contact us",
    paragraphs: [
      `${SITE.publisher}`,
      `${SITE.address}`,
      `Email: ${SITE.contactEmail}`,
      `Phone: ${SITE.contactPhone} (US) · +506 8887-0547 (CR)`,
    ],
  },
];
