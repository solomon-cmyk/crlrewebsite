import { fmt, fmtK, type ProceedsResult } from "@/lib/calculator";
import { jsPDF } from "jspdf";

type CostInputs = {
  hoa: number;
  ins: number;
  tax: number;
  util: number;
  clean: number;
  maint: number;
};

type StatementPdfInput = {
  adr: number;
  occ: number;
  personal: number;
  price: number;
  costs: CostInputs;
  result: ProceedsResult;
  y1Proceeds: number;
  y2Proceeds: number;
  totalCosts: number;
  trueNet: number;
};

export function exportStatementPdf(input: StatementPdfInput): void {
  const { adr, occ, personal, price, costs, result: r, y1Proceeds, y2Proceeds, totalCosts, trueNet } =
    input;

  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const margin = 48;
  let y = margin;
  const line = 16;
  const pageWidth = doc.internal.pageSize.getWidth();

  const heading = (text: string, size = 14) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(size);
    doc.text(text, margin, y);
    y += line + 4;
  };

  const row = (label: string, value: string, indent = 0) => {
    if (y > 720) {
      doc.addPage();
      y = margin;
    }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(label, margin + indent, y);
    doc.text(value, pageWidth - margin, y, { align: "right" });
    y += line;
  };

  heading("Maravé LXR · Illustrative Owner Statement", 16);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(100);
  doc.text("Annual · USD · Estimates only, not a projection or guarantee", margin, y);
  y += line + 8;
  doc.setTextColor(0);

  heading("Assumptions", 12);
  row("Average daily rate (ADR)", fmt(adr));
  row("Occupancy of available nights", `${occ}%`);
  row("Personal-use nights / year", String(personal));
  row("Unit purchase price", fmt(price));
  y += 8;

  heading("Owner statement", 12);
  row("Rentable nights occupied", `${Math.round(r.nights)} of ${r.rentable}`);
  row("Gross unit revenue", fmt(r.gross));
  row("Management service fee (10%)", `(${fmt(r.fee)})`);
  row("Net rental revenue", fmt(r.net));
  row("Hotel owner's 40% share", `(${fmt(r.hotelShare)})`);
  row("FF&E reserve deposit (5%)", `(${fmt(r.reserve)})`);
  doc.setFont("helvetica", "bold");
  row("Owner's rental proceeds (est.)", fmt(r.proceeds));
  doc.setFont("helvetica", "normal");
  y += 8;

  heading("Quarterly distributions (est.)", 12);
  (["Q1", "Q2", "Q3", "Q4"] as const).forEach((q) => {
    row(q, fmtK(r.proceeds / 4));
  });
  y += 8;

  heading("Ramp-up scenarios (est.)", 12);
  row("Year 1 · 50% occupancy", fmt(y1Proceeds));
  row("Year 2 · 55% occupancy", fmt(y2Proceeds));
  y += 8;

  heading("Annual carrying costs (est.)", 12);
  row("HOA / association dues", fmt(costs.hoa));
  row("Insurance", fmt(costs.ins));
  row("Property taxes", fmt(costs.tax));
  row("Utilities & telecom", fmt(costs.util));
  row("Deep cleans & pest control", fmt(costs.clean));
  row("Maintenance above reserve", fmt(costs.maint));
  row("Total carrying costs", `(${fmt(totalCosts)})`);
  y += 8;

  heading("Estimated net after carrying costs", 12);
  row("Owner keeps (est.)", fmt(trueNet));
  if (price > 0) {
    row("Est. net yield on cost", `${((trueNet / price) * 100).toFixed(2)}%`);
    row("Monthly average (est.)", fmt(trueNet / 12));
  }

  y += 12;
  doc.setFontSize(8);
  doc.setTextColor(100);
  const disclaimer =
    "ESTIMATES ONLY · SUBJECT TO CHANGE · ACTUAL RESULTS WILL VARY AND ARE NOT GUARANTEED. " +
    "The executed Rental Management Agreement controls over this summary.";
  const lines = doc.splitTextToSize(disclaimer, pageWidth - margin * 2);
  doc.text(lines, margin, y);

  doc.save(`marave-owner-statement-estimate-${new Date().toISOString().slice(0, 10)}.pdf`);
}
