"use client";

import {
  TAKE,
  fmt,
  fmtK,
  paintRange,
  proceedsAt,
} from "@/lib/calculator";
import { exportStatementPdf } from "@/lib/statementPdf";
import { useCallback, useEffect, useRef, useState } from "react";

type CostInputs = {
  hoa: number;
  ins: number;
  tax: number;
  util: number;
  clean: number;
  maint: number;
};

const COST_DEFAULTS: CostInputs = {
  hoa: 12000,
  ins: 3500,
  tax: 8000,
  util: 2400,
  clean: 1800,
  maint: 2000,
};

const PRESETS = [
  { id: "y1", name: "Year 1 Estimate", adr: 1750, occ: 50 },
  { id: "y2", name: "Year 2 Estimate", adr: 1750, occ: 55 },
] as const;

export function Calculator() {
  const [activePreset, setActivePreset] = useState("y1");
  const [adr, setAdr] = useState(1750);
  const [occ, setOcc] = useState(50);
  const [personal, setPersonal] = useState(21);
  const [price, setPrice] = useState(2500000);
  const [costs, setCosts] = useState({ ...COST_DEFAULTS });

  const adrRef = useRef<HTMLInputElement>(null);
  const occRef = useRef<HTMLInputElement>(null);
  const personalRef = useRef<HTMLInputElement>(null);

  const r = proceedsAt(adr, occ / 100, personal);
  const y1 = proceedsAt(adr, 0.5, personal);
  const y2 = proceedsAt(adr, 0.55, personal);
  const totalCosts = Object.values(costs).reduce((s, v) => s + v, 0);
  const trueNet = r.proceeds - totalCosts;

  const updateRanges = useCallback(() => {
    [adrRef, occRef, personalRef].forEach((ref) => {
      if (ref.current) paintRange(ref.current);
    });
  }, []);

  useEffect(() => {
    updateRanges();
  }, [adr, occ, personal, updateRanges]);

  const applyPreset = (preset: (typeof PRESETS)[number]) => {
    setActivePreset(preset.id);
    setAdr(preset.adr);
    setOcc(preset.occ);
  };

  const handleExportPdf = () => {
    exportStatementPdf({
      adr,
      occ,
      personal,
      price,
      costs,
      result: r,
      y1Proceeds: y1.proceeds,
      y2Proceeds: y2.proceeds,
      totalCosts,
      trueNet,
    });
  };

  return (
    <section className="calc" id="calculator">
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">Net Proceeds Estimator</div>
          <h2>Model your unit, your assumptions</h2>
          <p>
            Actual rates and occupancy will be established by the hotel based on market conditions at
            the time. The figures below are <b>your own illustrative assumptions</b>, not
            projections, forecasts, or guarantees from the developer, the hotel, the brand, or the
            brokerage.
          </p>
        </div>

        <div className="est-banner">
          <b>Estimates Only. Please Read</b>
          All numbers produced by this tool are estimates, are subject to change without notice, and
          depend on seasonality, market demand, competitive conditions, operating decisions of the
          hotel, currency and tax changes, and other factors outside of our control. Actual results
          will vary and may be materially lower. Rental income is not guaranteed. The rental program
          split, fees, and terms are subject to the final executed Rental Management Agreement,
          which controls over anything shown here.
        </div>

        <div className="calc-grid">
          <div className="panel">
            <h3>Assumptions</h3>
            <div className="presets">
              {PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  className={`preset${activePreset === preset.id ? " on" : ""}`}
                  onClick={() => applyPreset(preset)}
                >
                  <div className="p-name">{preset.name}</div>
                  <div className="p-adr">{fmt(preset.adr)}</div>
                  <div className="p-occ">{preset.occ}% occupancy</div>
                </button>
              ))}
            </div>
            <div className="field">
              <label>
                Average Daily Rate (ADR) <output>{fmt(adr)}</output>
              </label>
              <input
                ref={adrRef}
                type="range"
                min={600}
                max={3500}
                step={50}
                value={adr}
                onChange={(e) => {
                  setAdr(+e.target.value);
                  setActivePreset("");
                }}
              />
              <div className="hint">
                Estimate only. The hotel sets actual rates by season, demand & comp set
              </div>
            </div>
            <div className="field">
              <label>
                Occupancy of available nights <output>{occ}%</output>
              </label>
              <input
                ref={occRef}
                type="range"
                min={20}
                max={90}
                step={1}
                value={occ}
                onChange={(e) => {
                  setOcc(+e.target.value);
                  setActivePreset("");
                }}
              />
              <div className="hint">
                Estimate only. No occupancy is guaranteed; rotation is &ldquo;fair &amp;
                equitable,&rdquo; not equal
              </div>
            </div>
            <div className="field">
              <label>
                Your personal-use nights / year <output>{personal}</output>
              </label>
              <input
                ref={personalRef}
                type="range"
                min={0}
                max={120}
                step={1}
                value={personal}
                onChange={(e) => setPersonal(+e.target.value)}
              />
              <div className="hint">
                Nights you occupy earn no rental revenue, even if relocated to another unit
              </div>
            </div>
            <div className="field">
              <label>Unit purchase price</label>
              <input
                type="number"
                value={price}
                min={0}
                step={25000}
                onChange={(e) => setPrice(+e.target.value || 0)}
              />
              <div className="hint">Used only to compute estimated yield on cost below</div>
            </div>
          </div>

          <div>
            <div className="panel stmt">
              <div className="stmt-head">
                <div>
                  <h3>Illustrative Owner Statement</h3>
                  <div className="per">Annual · USD · Estimates</div>
                </div>
                <button type="button" className="stmt-export" onClick={handleExportPdf}>
                  Download PDF
                </button>
              </div>
              <div className="rows">
                <div className="row">
                  <div className="lbl">
                    <b>Rentable nights</b>
                    <span className="sub">
                      365 − personal use − 5 complimentary nights (program cap)
                    </span>
                  </div>
                  <div className="val">
                    {Math.round(r.nights)} of {r.rentable}
                  </div>
                </div>
                <div className="row pos">
                  <div className="lbl">
                    <b>Gross Unit Revenue</b>
                    <span className="sub">
                      ADR × occupied nights · excludes 13% VAT & all hotel ancillaries
                    </span>
                  </div>
                  <div className="val">{fmt(r.gross)}</div>
                </div>
                <div className="row neg">
                  <div className="lbl">
                    <b>Management Service Fee</b>
                    <span className="sub">10% of Gross Unit Revenue</span>
                  </div>
                  <div className="val">({fmt(r.fee)})</div>
                </div>
                <div className="row mid">
                  <div className="lbl">
                    <b>Net Rental Revenue</b>
                  </div>
                  <div className="val">{fmt(r.net)}</div>
                </div>
                <div className="row neg">
                  <div className="lbl">
                    <b>Hotel Owner&apos;s 40% share</b>
                    <span className="sub">Per current developer terms. Final RMA controls.</span>
                  </div>
                  <div className="val">({fmt(r.hotelShare)})</div>
                </div>
                <div className="row neg">
                  <div className="lbl">
                    <b>FF&amp;E Reserve deposit</b>
                    <span className="sub">5% of Gross Unit Revenue → hotel-controlled account</span>
                  </div>
                  <div className="val">({fmt(r.reserve)})</div>
                </div>
                <div className="row total">
                  <div className="lbl">
                    <b>Owner&apos;s Rental Proceeds (est.)</b>
                    <span className="sub">
                      Before repairs billed above reserve & any tax withholding
                    </span>
                  </div>
                  <div className="val">{fmt(r.proceeds)}</div>
                </div>
              </div>
              <div className="paysched">
                {(["Q1", "Q2", "Q3", "Q4"] as const).map((q) => (
                  <div key={q} className="q">
                    <div className="q-n">{q} → paid</div>
                    <div className="q-v">{fmtK(r.proceeds / 4)}</div>
                    <div className="q-d">stmt within 60 days, paid ≤ 15 days after</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="years">
              <div className="year-card">
                <div className="y-l">Year 1 · 50% occupancy (est.)</div>
                <div className="y-v">{fmt(y1.proceeds)}</div>
                <div className="y-s">
                  ≈ {fmt(y1.proceeds / 12)}/month est. at {fmt(adr)} ADR
                </div>
              </div>
              <div className="year-card y2">
                <div className="y-l">Year 2 · 55% occupancy (est.)</div>
                <div className="y-v">{fmt(y2.proceeds)}</div>
                <div className="y-s">
                  ≈ {fmt(y2.proceeds / 12)}/month est. at {fmt(adr)} ADR
                </div>
              </div>
            </div>
            <div className="year-note">
              Ramp-up scenarios use your current ADR and personal-use inputs. Occupancy assumptions
              are estimates only and are not a forecast of actual performance.
            </div>

            <div className="metrics">
              <div className="metric">
                <div className="m-l">Effective take of gross</div>
                <div className="m-v">
                  {r.gross > 0 ? Math.round((r.proceeds / r.gross) * 100) + "%" : "N/A"}
                </div>
                <div className="m-s">Proceeds ÷ Gross Unit Revenue</div>
              </div>
              <div className="metric">
                <div className="m-l">Est. gross yield on cost</div>
                <div className="m-v">
                  {price > 0 ? ((r.proceeds / price) * 100).toFixed(2) + "%" : "N/A"}
                </div>
                <div className="m-s">Proceeds ÷ purchase price</div>
              </div>
              <div className="metric">
                <div className="m-l">Per rented night, to you</div>
                <div className="m-v">{fmt(adr * TAKE)}</div>
                <div className="m-s">≈ 49% of ADR (est.)</div>
              </div>
            </div>
          </div>
        </div>

        <div className="costs">
          <div className="sec-head">
            <div className="eyebrow">The Second Half of the Math</div>
            <h2>Owner carrying costs, paid by you outside the program</h2>
            <p>
              These stay your responsibility whether or not the unit rents. If unpaid, the hotel may
              pay them from your proceeds or terminate the agreement. All figures below are
              placeholders; enter real numbers once HOA budgets and insurance quotes are published.
            </p>
          </div>
          <div className="costs-grid">
            <div className="panel">
              <h3>Annual cost inputs (USD · estimates)</h3>
              <div className="cost-fields">
                <CostField
                  label="HOA / association dues"
                  hint="No title liens permitted for unpaid dues"
                  value={costs.hoa}
                  step={500}
                  onChange={(v) => setCosts((c) => ({ ...c, hoa: v }))}
                />
                <CostField
                  label="Insurance package"
                  hint="$1M liability + all-risk incl. flood & quake"
                  value={costs.ins}
                  step={250}
                  onChange={(v) => setCosts((c) => ({ ...c, ins: v }))}
                />
                <CostField
                  label="Property taxes"
                  hint="CR ad valorem + luxury tax if applicable"
                  value={costs.tax}
                  step={250}
                  onChange={(v) => setCosts((c) => ({ ...c, tax: v }))}
                />
                <CostField
                  label="Utilities & telecom"
                  hint="Owner-paid even while hotel guests occupy"
                  value={costs.util}
                  step={100}
                  onChange={(v) => setCosts((c) => ({ ...c, util: v }))}
                />
                <CostField
                  label="Deep cleans & pest control"
                  hint="Min. 2 interior deep cleans/yr at owner cost"
                  value={costs.clean}
                  step={100}
                  onChange={(v) => setCosts((c) => ({ ...c, clean: v }))}
                />
                <CostField
                  label="Maintenance above reserve"
                  hint="Non-routine repairs & outside vendors billed to owner"
                  value={costs.maint}
                  step={100}
                  onChange={(v) => setCosts((c) => ({ ...c, maint: v }))}
                />
              </div>
            </div>
            <div className="truenet">
              <h3>Estimated annual net, after everything</h3>
              <div className="tn-row">
                <span>Owner&apos;s Rental Proceeds (est.)</span>
                <span>{fmt(r.proceeds)}</span>
              </div>
              <div className="tn-row deduct">
                <span>Total carrying costs (est.)</span>
                <span>({fmt(totalCosts)})</span>
              </div>
              <div className="tn-row deduct">
                <span>Income taxes / withholding</span>
                <span>Ask your CPA</span>
              </div>
              <div className="tn-final">
                <span className="l">Owner keeps (est.)</span>
                <span className="v" style={{ color: trueNet < 0 ? "#e0a795" : undefined }}>
                  {trueNet < 0 ? "−" : ""}
                  {fmt(Math.abs(trueNet))}
                </span>
              </div>
              <div className="tn-yield">
                Est. net yield on cost:{" "}
                <b>{price > 0 ? ((trueNet / price) * 100).toFixed(2) + "%" : "N/A"}</b> ·{" "}
                {fmt(trueNet / 12)}/month avg.
              </div>
              <div className="tn-est">
                ESTIMATES ONLY · SUBJECT TO CHANGE · ACTUAL RESULTS WILL VARY AND ARE NOT GUARANTEED
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CostField({
  label,
  hint,
  value,
  step,
  onChange,
}: {
  label: string;
  hint: string;
  value: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="field">
      <label>{label}</label>
      <input
        type="number"
        value={value}
        step={step}
        onChange={(e) => onChange(+e.target.value || 0)}
      />
      <div className="hint">{hint}</div>
    </div>
  );
}
