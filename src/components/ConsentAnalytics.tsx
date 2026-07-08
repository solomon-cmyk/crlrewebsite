"use client";

import { Analytics } from "@vercel/analytics/react";
import { useCookieConsent } from "./CookieConsentProvider";

export function ConsentAnalytics() {
  const { analyticsAllowed } = useCookieConsent();
  if (!analyticsAllowed) return null;
  return <Analytics />;
}
