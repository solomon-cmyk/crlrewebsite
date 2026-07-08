import { peakDates } from "@/lib/content";

export function PeakDates() {
  return (
    <section className="peak">
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">Personal Use</div>
          <h2>Your villa, on the hotel&apos;s calendar</h2>
          <p>
            Reserve by <b>September 1</b> for the following year and personal use is{" "}
            <b>unlimited</b>, except where a hotel guest booked a Peak Date before April 30. After
            Sept 1, requests need 180 days&apos; notice and are subject to availability.
          </p>
        </div>
        <div className="peak-grid">
          {peakDates.map((date) => (
            <div key={date.title} className="peak-chip">
              <div className="pc-t">{date.title}</div>
              <div className="pc-s">{date.subtitle}</div>
            </div>
          ))}
        </div>
        <div className="peak-rule">
          During any stay you check in like a guest, keep a card on file, follow hotel
          arrival/departure procedure, and take housekeeping at least every third night at your cost.
          The hotel holds the keys year-round; no private locks. Remember:{" "}
          <b>zero rental revenue accrues during your own stays</b>, even if the hotel relocates you
          to a different unit.
        </div>
      </div>
    </section>
  );
}
