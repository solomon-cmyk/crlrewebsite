"use client";

import {
  readCookieConsent,
  writeCookieConsent,
  type CookieConsent,
} from "@/lib/cookie-consent";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type CookieConsentContextValue = {
  consent: CookieConsent | null;
  showBanner: boolean;
  showPreferences: boolean;
  analyticsAllowed: boolean;
  acceptAll: () => void;
  acceptEssentialOnly: () => void;
  openPreferences: () => void;
  closePreferences: () => void;
  savePreferences: (analytics: boolean) => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return ctx;
}

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = readCookieConsent();
    setConsent(stored);
    setShowBanner(!stored);
    setHydrated(true);
  }, []);

  const persist = useCallback((analytics: boolean) => {
    const next = writeCookieConsent({ analytics });
    setConsent(next);
    setShowBanner(false);
    setShowPreferences(false);
  }, []);

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      consent,
      showBanner: hydrated && showBanner,
      showPreferences,
      analyticsAllowed: consent?.analytics ?? false,
      acceptAll: () => persist(true),
      acceptEssentialOnly: () => persist(false),
      openPreferences: () => setShowPreferences(true),
      closePreferences: () => setShowPreferences(false),
      savePreferences: persist,
    }),
    [consent, hydrated, showBanner, showPreferences, persist]
  );

  return (
    <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>
  );
}
