import { LegalPageShell } from "@/components/LegalPageShell";
import { termsSections } from "@/lib/legal/terms";
import { SITE } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms of Use for ${SITE.productName} at ${SITE.domain}.`,
};

export default function TermsPage() {
  return (
    <LegalPageShell
      title="Terms of Use"
      intro="Please read these terms before using the Site. They explain what crlre.com is for, what it is not, and how you may use it."
      sections={termsSections}
    />
  );
}
