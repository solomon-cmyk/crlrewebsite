import { lifecycleSteps } from "@/lib/content";

export function Lifecycle() {
  return (
    <section className="section-sand">
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">Owner Lifecycle</div>
          <h2>From closing to quarterly statements</h2>
        </div>
        <div className="tl">
          {lifecycleSteps.map((step) => (
            <div key={step.number} className="tl-step">
              <div className="t-n">{step.number}</div>
              <h5>{step.title}</h5>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
