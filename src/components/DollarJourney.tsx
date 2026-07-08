"use client";

import { flowSteps } from "@/lib/content";
import { useEffect, useRef } from "react";

export function DollarJourney() {
  const flowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = flowRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll<HTMLElement>(".bar i").forEach((bar) => {
              bar.style.width = bar.dataset.w + "%";
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="journey" id="journey">
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">The Dollar Journey</div>
          <h2>From guest folio to your account</h2>
          <p>
            Illustrative flow of $100 of room revenue. Costa Rica&apos;s 13% VAT sits on top of the
            room rate and is excluded from Gross Unit Revenue, so it never enters the split. All
            amounts are estimates.
          </p>
        </div>
        <div className="flow" ref={flowRef}>
          {flowSteps.map((step) => (
            <div key={step.stage} className={`flow-step ${step.className}`}>
              <div className="stage">{step.stage}</div>
              <div className="amt">{step.amount}</div>
              <div className="who">{step.who}</div>
              <div className="bar">
                <i data-w={step.barWidth} />
              </div>
            </div>
          ))}
        </div>
        <div className="journey-note">
          <div>
            <b>The &ldquo;60/40&rdquo; headline is really 54% of gross.</b> The management fee comes
            off the top before the split, and the reserve comes out of your side after it. The
            honest working number: an estimated 49% of room revenue reaches the owner.
          </div>
          <div>
            <b>The reserve is not lost. It is earmarked.</b> It funds your unit&apos;s furniture,
            furniture, fixtures, and equipment to keep it at brand standard. On exit from the
            program, the remaining balance (less amounts owed) is returned to you.
          </div>
        </div>
      </div>
    </section>
  );
}
