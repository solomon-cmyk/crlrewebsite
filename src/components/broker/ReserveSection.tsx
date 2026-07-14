"use client";

import { OWNERSHIP_INCLUDES, RESERVE_STEPS } from "@/lib/broker-content";
import { useLeadModal } from "@/components/broker/LeadModal";

export function ReserveSection() {
  const { openModal } = useLeadModal();

  return (
    <section className="block reserve" id="reserve">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">Pre-Construction · First Release</span>
          <span className="rule" />
          <h2>
            Reserve before the <em>world</em> arrives
          </h2>
          <p>
            Pre-construction pricing and the best selection exist only in this earliest phase. As
            Maravé moves toward construction and its global launch, pricing rises and choice narrows.
            A reservation now protects your unit and today&apos;s price.
          </p>
        </div>
        <div className="res-cols">
          <div className="steps reveal">
            {RESERVE_STEPS.map((step) => (
              <div className="step" key={step.title}>
                <span className="no" />
                <div>
                  <h4>{step.title}</h4>
                  <p>{step.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="incl reveal">
            <h3>What ownership includes</h3>
            <div className="deposit">
              $10,000
              <small>Refundable reservation to secure your unit & price</small>
            </div>
            <ul>
              {OWNERSHIP_INCLUDES.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="res-cta">
              <button type="button" className="btn btn-bronze" onClick={() => openModal("reserve")}>
                Start a reservation
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => openModal("info")}>
                Request information
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
