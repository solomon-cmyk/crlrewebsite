import { LegalPageShell } from "@/components/LegalPageShell";
import { cookiePolicySections } from "@/lib/legal/cookies";
import { SITE } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `Cookie Policy for ${SITE.productName} at ${SITE.domain}.`,
};

export default function CookiePolicyPage() {
  return (
    <LegalPageShell
      title="Cookie Policy"
      intro="This page describes the cookies and similar technologies used on crlre.com and how you can control them."
      sections={cookiePolicySections}
    />
  );
}
