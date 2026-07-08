import { MARAVE_STATS } from "@/lib/broker-content";

export function MaraveIntro() {
  return (
    <section className="block marave" id="marave">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">Now in Pre-Construction · LXR Hotels & Resorts</span>
          <span className="rule" />
          <h2>
            Maravé, <em>Resort & Residences</em>
          </h2>
          <p>
            116 branded residences descending from rainforest ridge to Pacific shore, in the Manuel
            Antonio area. Developed and exclusively represented by Costa Rica Luxury Real Estate.
          </p>
        </div>
        <div className="mv-stats reveal">
          {MARAVE_STATS.map((stat) => (
            <div className="st" key={stat.label}>
              <b>{stat.value}</b>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
        <div className="mv-flag reveal">
          <p>
            <b>A genuine first.</b>
            <br />
            The very first hotel flag ever to fly in Manuel Antonio, and its first five-star,
            LXR-branded address. Freehold titled ownership, with buyers welcomed as Hilton Honors
            Diamond Members.
          </p>
        </div>
      </div>
    </section>
  );
}
