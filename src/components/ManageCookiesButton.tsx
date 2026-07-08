"use client";

import { COOKIE_CONSENT_KEY } from "@/lib/site";

export function ManageCookiesButton() {
  return (
    <button
      type="button"
      className="footer-legal__button"
      onClick={() => {
        localStorage.removeItem(COOKIE_CONSENT_KEY);
        window.location.reload();
      }}
    >
      Reset cookie preferences
    </button>
  );
}
