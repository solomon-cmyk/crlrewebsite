"use client";

import { COLLECTION_OPTIONS } from "@/lib/broker-content";
import { CONTACT } from "@/lib/contact";
import { submitLeadForm } from "@/lib/forms";
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
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openModal = useCallback((nextIntent: LeadIntent = "info") => {
    setIntent(nextIntent);
    setSubmitted(false);
    setSubmitting(false);
    setError(null);
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

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      await submitLeadForm({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        phone: String(data.get("phone") ?? ""),
        collection: String(data.get("collection") ?? ""),
        message: String(data.get("message") ?? ""),
        intent: intent === "reserve" ? "Reservation Agreement" : "More Information",
        tcpaConsent: data.get("tcpaConsent") === "on",
      });
      setSubmitted(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to send your request.");
    } finally {
      setSubmitting(false);
    }
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
                <p>
                  Your message has been received. Mark personally responds within 24 hours on
                  business days.
                </p>
                <p style={{ marginTop: 16 }}>
                  You can also reach Mark directly at {CONTACT.email} · {CONTACT.phoneCr}
                </p>
                <button type="button" className="btn btn-ink modal-submit" onClick={closeModal}>
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="intent-toggle">
                  <button
                    type="button"
                    className={intent === "info" ? "active" : undefined}
                    onClick={() => setIntent("info")}
                    disabled={submitting}
                  >
                    More Information
                  </button>
                  <button
                    type="button"
                    className={intent === "reserve" ? "active" : undefined}
                    onClick={() => setIntent("reserve")}
                    disabled={submitting}
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
                  {error && <p className="form-error">{error}</p>}
                  <button type="submit" className="btn btn-bronze modal-submit" disabled={submitting}>
                    {submitting
                      ? "Sending..."
                      : intent === "reserve"
                        ? "Request reservation →"
                        : "Send to Mark →"}
                  </button>
                  <p className="modal-note">
                    Or reach Mark directly at {CONTACT.email} · {CONTACT.phoneCr}
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
