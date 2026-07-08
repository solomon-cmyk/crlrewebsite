import { programFacts } from "@/lib/content";

export function ProgramFacts() {
  return (
    <section className="facts">
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">The Fine Print, Decoded</div>
          <h2>Nine terms every buyer should hear from you first</h2>
        </div>
        <div className="cards">
          {programFacts.map((fact) => (
            <div key={fact.key} className="card">
              <div className="c-k">{fact.key}</div>
              <h4>{fact.title}</h4>
              <p>{fact.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
