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
      intro="This policy explains how Property Pro Partners handles information when you visit the Maravé rental program guide at crlre.com."
      sections={privacySections}
    />
  );
}
