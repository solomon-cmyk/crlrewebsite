import { COOKIE_CONSENT_KEY } from "@/lib/site";

export type CookieConsent = {
  essential: true;
  analytics: boolean;
  decidedAt: string;
};

export type CookieConsentInput = Pick<CookieConsent, "analytics">;

export function readCookieConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CookieConsent;
    if (parsed.essential !== true || typeof parsed.analytics !== "boolean") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeCookieConsent(input: CookieConsentInput): CookieConsent {
  const consent: CookieConsent = {
    essential: true,
    analytics: input.analytics,
    decidedAt: new Date().toISOString(),
  };
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
  return consent;
}
