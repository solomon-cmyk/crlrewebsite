export function ControlSplit() {
  return (
    <section className="section-white">
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">Setting Expectations</div>
          <h2>Who decides what</h2>
        </div>
        <div className="control-grid">
          <div className="ctl hotel">
            <div className="who">Hotel Owner / Manager decides</div>
            <h4>Operations & revenue</h4>
            <ul>
              <li>All nightly rates, discounts, packages & loyalty pricing</li>
              <li>Which unit gets which booking (rotation system)</li>
              <li>Guest-satisfaction remedies, incl. 100% rate refunds</li>
              <li>Hotel Standards, and whether your unit meets them</li>
              <li>Emergency repairs, deducted from proceeds or reserve</li>
              <li>Assignment to a new operator if Manager exits, with no owner consent required</li>
            </ul>
          </div>
          <div className="ctl owner">
            <div className="who">You, the owner, decide</div>
            <h4>Participation & use</h4>
            <ul>
              <li>Whether to join at all. Enrollment is strictly voluntary.</li>
              <li>Personal-use calendar (within program rules & peak-date limits)</li>
              <li>Pets allowed in your unit, or not (service animals excepted)</li>
              <li>Whether to renew. Exiting requires 5 months&apos; written notice.</li>
              <li>Whether to accept proposed amendments at renewal</li>
              <li>Your insurance carrier (subject to hotel approval standards)</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
