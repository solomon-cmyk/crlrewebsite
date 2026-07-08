"use client";

import Link from "next/link";
import { useState } from "react";
import { useCookieConsent } from "./CookieConsentProvider";

export function CookieConsentBanner() {
  const {
    showBanner,
    showPreferences,
    acceptAll,
    acceptEssentialOnly,
    openPreferences,
    closePreferences,
    savePreferences,
  } = useCookieConsent();
  const [analyticsPref, setAnalyticsPref] = useState(true);

  if (!showBanner) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-labelledby="cookie-banner-title" aria-modal="false">
      <div className="cookie-banner__panel">
        {!showPreferences ? (
          <>
            <p className="cookie-banner__eyebrow">Your privacy</p>
            <h2 id="cookie-banner-title" className="cookie-banner__title">
              We use cookies to keep this site running smoothly
            </h2>
            <p className="cookie-banner__text">
              Essential cookies are required for basic site functions, including remembering your
              cookie choice. With your permission, we also use analytics cookies to understand how
              visitors use this guide so we can improve it. We do not sell your personal
              information.
            </p>
            <p className="cookie-banner__links">
              Read our{" "}
              <Link href="/cookie-policy">Cookie Policy</Link>,{" "}
              <Link href="/privacy">Privacy Policy</Link>, and{" "}
              <Link href="/terms">Terms of Use</Link>.
            </p>
            <div className="cookie-banner__actions">
              <button type="button" className="cookie-banner__btn cookie-banner__btn--primary" onClick={acceptAll}>
                Accept all
              </button>
              <button type="button" className="cookie-banner__btn" onClick={acceptEssentialOnly}>
                Essential only
              </button>
              <button type="button" className="cookie-banner__btn cookie-banner__btn--ghost" onClick={openPreferences}>
                Manage preferences
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="cookie-banner__eyebrow">Cookie preferences</p>
            <h2 className="cookie-banner__title">Choose what we can use</h2>
            <div className="cookie-pref">
              <div className="cookie-pref__row">
                <div>
                  <b>Essential</b>
                  <p>Required for security, consent storage, and core site features. Always on.</p>
                </div>
                <span className="cookie-pref__always">Always on</span>
              </div>
              <div className="cookie-pref__row">
                <div>
                  <b>Analytics</b>
                  <p>
                    Helps us measure traffic and page performance through Vercel Analytics. No
                    advertising cookies are used.
                  </p>
                </div>
                <label className="cookie-pref__toggle">
                  <input
                    type="checkbox"
                    checked={analyticsPref}
                    onChange={(e) => setAnalyticsPref(e.target.checked)}
                  />
                  <span>{analyticsPref ? "On" : "Off"}</span>
                </label>
              </div>
            </div>
            <div className="cookie-banner__actions">
              <button
                type="button"
                className="cookie-banner__btn cookie-banner__btn--primary"
                onClick={() => savePreferences(analyticsPref)}
              >
                Save preferences
              </button>
              <button type="button" className="cookie-banner__btn" onClick={closePreferences}>
                Back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
