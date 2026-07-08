import { CREDIBILITY_POINTS } from "@/lib/broker-content";

export function CredibilityStrip() {
  return (
    <section className="credibility" aria-label="Why buyers work with CRLRE">
      <div className="wrap credibility__grid">
        {CREDIBILITY_POINTS.map((point, index) => (
          <article className="credibility__item reveal" key={point.title} style={{ transitionDelay: `${index * 90}ms` }}>
            <span className="credibility__index">{String(index + 1).padStart(2, "0")}</span>
            <h3>{point.title}</h3>
            <p>{point.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
