import { LegalPageShell } from "@/components/LegalPageShell";
import { privacySections } from "@/lib/legal/privacy";
import { SITE } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${SITE.productName} at ${SITE.domain}.`,
};

export default function PrivacyPage() {
  return (
    <LegalPageShell
      title="Privacy Policy"
      intro="This policy explains how Costa Rica Luxury Real Estate handles information when you visit crlre.com."
      sections={privacySections}
    />
  );
}
