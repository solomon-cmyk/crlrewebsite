import { FINISHES } from "@/lib/broker-content";

export function FinishesSection() {
  return (
    <section className="block finishes">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">Material Palette</span>
          <span className="rule" />
          <h2>
            Selected to <em>endure</em>
          </h2>
          <p>Every surface chosen for beauty, longevity, and performance in the tropics.</p>
        </div>
        <div className="fin-grid">
          {FINISHES.map((group) => (
            <div className="fin reveal" key={group.title}>
              <h4>{group.title}</h4>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
