"use client";

import { CONTACT } from "@/lib/contact";
import { useLeadModal } from "@/components/broker/LeadModal";

export function ContactSection() {
  const { openModal } = useLeadModal();

  return (
    <section className="block contact" id="contact">
      <div className="wrap">
        <span className="eyebrow">Speak With Mark</span>
        <span className="rule rule--center" />
        <h2>
          Claim your place <em>before</em> the world reads about it.
        </h2>
        <p>
          Mark works directly with buyers on Maravé reservations, pricing, floor plans, and
          ownership details. Reach out when you are ready to move from research to a conversation.
        </p>
        <div className="contact-rows">
          <button type="button" className="btn btn-bronze" onClick={() => openModal("reserve")}>
            Reserve a residence →
          </button>
          <button type="button" className="btn btn-line" onClick={() => openModal("info")}>
            Request information
          </button>
        </div>
        <div className="contact-meta">
          <a href={CONTACT.emailHref}>{CONTACT.email}</a>
          <a href={CONTACT.phoneCrHref}>{CONTACT.phoneCr} (CR)</a>
          <a href={CONTACT.phoneUsHref}>{CONTACT.phoneUs} (US)</a>
        </div>
      </div>
    </section>
  );
}
