import { faqItems } from "@/lib/content";

export function FAQ() {
  return (
    <section className="faq" id="faq">
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">Owner FAQ</div>
          <h2>The questions every buyer asks</h2>
        </div>
        <p className="faq-intro">
          These answers are for general information only. They should not be your sole basis for
          buying at Maravé or joining the Rental Program. Terms can change without notice, and
          your executed Rental Management Agreement controls over this summary.
        </p>

        {faqItems.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <div className="a">{item.answer}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
