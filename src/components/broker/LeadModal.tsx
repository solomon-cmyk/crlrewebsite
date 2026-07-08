"use client";

import { COLLECTION_OPTIONS } from "@/lib/broker-content";
import { CONTACT } from "@/lib/contact";
import { TCPA_CONSENT_LABEL, TCPA_CONSENT_NOTE } from "@/lib/legal/consent";
import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

type LeadIntent = "info" | "reserve";

type LeadModalContextValue = {
  openModal: (intent?: LeadIntent) => void;
  closeModal: () => void;
};

const LeadModalContext = createContext<LeadModalContextValue | null>(null);

export function useLeadModal() {
  const ctx = useContext(LeadModalContext);
  if (!ctx) throw new Error("useLeadModal must be used within LeadModalProvider");
  return ctx;
}

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [intent, setIntent] = useState<LeadIntent>("info");
  const [submitted, setSubmitted] = useState(false);

  const openModal = useCallback((nextIntent: LeadIntent = "info") => {
    setIntent(nextIntent);
    setSubmitted(false);
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) closeModal();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeModal, open]);

  const value = useMemo(() => ({ openModal, closeModal }), [closeModal, openModal]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const phone = String(data.get("phone") ?? "");
    const collection = String(data.get("collection") ?? "");
    const message = String(data.get("message") ?? "");
    const tcpaConsent = data.get("tcpaConsent") === "on";
    const subject = encodeURIComponent(
      `${intent === "reserve" ? "Maravé Reservation Request" : "Maravé Information Request"} | ${name}`
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCollection: ${collection}\nIntent: ${intent === "reserve" ? "Reservation Agreement" : "More Information"}\nTCPA Consent: ${tcpaConsent ? "Yes" : "No"}\n\n${message}`
    );
    window.location.href = `mailto:${CONTACT.emailMarave}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <LeadModalContext.Provider value={value}>
      {children}
      <button
        type="button"
        className="btn btn-bronze float-cta"
        id="floatCta"
        onClick={() => openModal("reserve")}
        style={{ display: open ? "none" : undefined }}
      >
        Reserve a Residence
      </button>
      <div
        className={`modal-overlay${open ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
        onClick={(event) => {
          if (event.target === event.currentTarget) closeModal();
        }}
      >
        <div className="modal">
          <div className="modal-head">
            <button type="button" className="modal-close" aria-label="Close" onClick={closeModal}>
              ×
            </button>
            <span className="eyebrow">Maravé · Manuel Antonio</span>
            <h3 id="modalTitle">
              {intent === "reserve" ? "Reservation Agreement" : "Request Information"}
            </h3>
            <p id="modalSub">
              {intent === "reserve"
                ? "Begin your $10,000 reservation to lock your unit and today's price. Mark will send the documents personally."
                : "Tell us what you are looking for and Mark will follow up directly."}
            </p>
          </div>
          <div className="modal-body">
            {submitted ? (
              <div className="modal-success">
                <div className="ck">✓</div>
                <h3>Thank you.</h3>
                <p>Your request is ready to send. Mark personally responds within 24 hours.</p>
                <p style={{ marginTop: 16 }}>
                  Or reach Mark directly at {CONTACT.emailMarave} · {CONTACT.phoneCr}
                </p>
              </div>
            ) : (
              <>
                <div className="intent-toggle">
                  <button
                    type="button"
                    className={intent === "info" ? "active" : undefined}
                    onClick={() => setIntent("info")}
                  >
                    More Information
                  </button>
                  <button
                    type="button"
                    className={intent === "reserve" ? "active" : undefined}
                    onClick={() => setIntent("reserve")}
                  >
                    Reservation Agreement
                  </button>
                </div>
                <form id="leadForm" onSubmit={onSubmit}>
                  <div className="field">
                    <label htmlFor="lf-name">Full name</label>
                    <input id="lf-name" name="name" type="text" autoComplete="name" required />
                  </div>
                  <div className="field">
                    <label htmlFor="lf-email">Email</label>
                    <input id="lf-email" name="email" type="email" autoComplete="email" required />
                  </div>
                  <div className="field">
                    <label htmlFor="lf-phone">Phone</label>
                    <input
                      id="lf-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="lf-collection">Collection of interest</label>
                    <select id="lf-collection" name="collection" defaultValue={COLLECTION_OPTIONS[0]}>
                      {COLLECTION_OPTIONS.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="lf-msg">Anything else?</label>
                    <textarea id="lf-msg" name="message" rows={3} />
                  </div>
                  <div className="field field--consent">
                    <label className="consent-label" htmlFor="lf-tcpa">
                      <input id="lf-tcpa" name="tcpaConsent" type="checkbox" required />
                      <span>{TCPA_CONSENT_LABEL}</span>
                    </label>
                    <p className="consent-note">
                      {TCPA_CONSENT_NOTE}{" "}
                      <Link href="/privacy#communications-consent">Privacy Policy</Link>.
                    </p>
                  </div>
                  <button type="submit" className="btn btn-bronze modal-submit">
                    {intent === "reserve" ? "Request reservation →" : "Send to Mark →"}
                  </button>
                  <p className="modal-note">
                    Or reach Mark directly at {CONTACT.emailMarave} · {CONTACT.phoneCr}
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </LeadModalContext.Provider>
  );
}
