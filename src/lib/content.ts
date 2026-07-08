export const heroStripItems = [
  { value: "60 / 40", label: "Owner's share of Net Rental Revenue" },
  { value: "10%", label: "Management fee on gross" },
  { value: "5%", label: "FF&E reserve on gross" },
  { value: "Quarterly", label: "Statements & distributions" },
] as const;

export const flowSteps = [
  {
    className: "f-vat",
    stage: "Guest Pays",
    amount: "$113",
    who: "$100 room + 13% VAT. VAT is remitted to the tax authority.",
    barWidth: 100,
  },
  {
    className: "f-gross",
    stage: "Gross Unit Revenue",
    amount: "$100",
    who: "Room revenue only. No F&B, spa, minibar, or resort fees.",
    barWidth: 100,
  },
  {
    className: "f-fee",
    stage: "Mgmt Service Fee",
    amount: "−$10",
    who: "10% of gross, retained by Hotel Owner for program administration & marketing",
    barWidth: 10,
  },
  {
    className: "f-split",
    stage: "Net → 60/40 Split",
    amount: "$54",
    who: "Your 60% of the $90 Net Rental Revenue",
    barWidth: 54,
  },
  {
    className: "f-res",
    stage: "FF&E Reserve",
    amount: "−$5",
    who: "5% of gross, held in a hotel-controlled account for your unit's upkeep",
    barWidth: 5,
  },
  {
    className: "f-you",
    stage: "Owner's Rental Proceeds",
    amount: "$49",
    who: "Invoiced by owner + 13% VAT · paid quarterly",
    barWidth: 49,
  },
] as const;

export const peakDates = [
  { title: "Dec 22 to 31", subtitle: "Last 10 days of the year" },
  { title: "Jan 1 to 7", subtitle: "First 7 days of the year" },
  { title: "Easter Week", subtitle: "Semana Santa, Costa Rica's biggest travel week" },
  { title: "Thanksgiving", subtitle: "Full week" },
  { title: "Presidents' Day", subtitle: "Holiday weekend" },
  { title: "July 4th", subtitle: "Holiday weekend" },
] as const;

export const programFacts = [
  {
    key: "Exclusivity",
    title: "No Airbnb. Ever.",
    body: "The hotel is your exclusive rental agent. Renting outside the program, or accepting any payment or exchange for the unit, is a default that can suspend the unit or make it permanently ineligible.",
  },
  {
    key: "Term",
    title: "Auto-renews annually",
    body: "The initial term runs through the first full calendar year-end, then renews in 12-month cycles. Exiting takes written notice 5 months before year-end. Proposed amendments take effect at renewal unless you object within 30 days.",
  },
  {
    key: "Hotel Discretion",
    title: "Comps & discounts",
    body: "Up to 5 complimentary nights per year for promotion (no revenue to you), and discounts up to 100% to resolve guest-satisfaction issues. Package revenue is allocated at the hotel's standard pricing.",
  },
  {
    key: "Entry Cost",
    title: "One-time enrollment fee",
    body: "Non-refundable, and covers supplies and amenities to bring the unit online. On resale, the new owner pays to replace missing or worn items. Worth pricing into any exit analysis.",
  },
  {
    key: "No Pooling",
    title: "Your unit, your revenue only",
    body: "U.S. securities law requires it: revenue is never pooled across units. Your income tracks your unit's actual bookings. A view unit and an interior unit will not earn the same, and the agreement says so plainly.",
  },
  {
    key: "FF&E",
    title: "Hotel picks the furniture",
    body: "Units must carry the hotel-selected furnishing package to Hilton brand standard, refreshed at owner cost when required. Refusing a required refurbishment, or not funding it within 30 days, lets the hotel terminate.",
  },
  {
    key: "Insurance",
    title: "$1M liability, named insureds",
    body: "All-risk property cover at 100% replacement cost including flood and earthquake, with Hotel Owner, Manager, and lenders as additional insureds, subrogation waived, 30-day cancellation notice to the hotel.",
  },
  {
    key: "Resale",
    title: "The agreement dies at closing",
    body: "Sale automatically terminates the agreement unless the hotel approves assignment. Buyers should underwrite the unit, not an assumable income stream. Showings are barred while a guest is in-house.",
  },
  {
    key: "Disputes",
    title: "Costa Rica law, CICA arbitration",
    body: "Disputes go to arbitration at the Costa Rican-American Chamber of Commerce under CR law. Both sides waive punitive and consequential damages; fiduciary duties are contractually limited. Costa Rican counsel is essential.",
  },
] as const;

export const faqItems = [
  {
    question: "What is the Rental Program?",
    answer:
      "It is an optional, voluntary arrangement offered by the Hotel Owner. While you are not occupying your residence, it may be rented to guests as part of the hotel inventory, with full access to LXR service, housekeeping, and the Hilton global reservation system. Participation is never required to own at Maravé, and the decision to buy should stay separate from the decision to enroll.",
  },
  {
    question: "What portion of the rental income is paid to me?",
    answer:
      "After applicable taxes are excluded, a Management Service Fee of 10% is deducted from your residence's gross rental income. Under current developer terms, you receive 60% of the balance, less (a) an amount equal to 5% of gross for your unit's FF&E Reserve, (b) any applicable deductions such as tax withholding, and (c) outstanding unpaid amounts, if any. In practice, an estimated 49% of room revenue reaches the owner before personal carrying costs. The split in your executed agreement controls.",
  },
  {
    question: "Can I estimate the rate and occupancy for Maravé?",
    answer:
      "Maravé has not yet set hotel rates or occupancy levels. Those will be established based on market conditions at the time of operation. Due to legal restrictions, neither the Hotel Owner nor the brokerage can provide rental income projections or guarantees. Any figures you model in the estimator are your own assumptions, are estimates only, and can change because of factors no one controls.",
  },
  {
    question: "What is the FF&E Reserve?",
    answer:
      "It is an account funded by 5% of your unit's gross rental revenue, used to maintain, repair, and replace the furniture, fixtures, and equipment in your residence so it stays at LXR brand standard. If the reserve is not enough for a required repair or refurbishment, you fund the difference. When you exit the program, the remaining balance (less amounts owed) is returned to you.",
  },
  {
    question: "Is there a rental pool?",
    answer:
      "No. Under U.S. securities law, revenues from your residence are never pooled with other residences. You are paid based on what your unit actually earns. Units differ by size, view, and layout, so there is no guarantee your residence will rent the same number of nights or produce the same revenue as any other unit.",
  },
  {
    question: "How does the rotation system work?",
    answer:
      "Participating residences are rented through an impartial rotational booking system designed to treat units fairly, taking into account guest requests for room types and views, unit size and configuration, your personal use, and seasonality. When a guest requests a specific residence, that request is honored where possible and the unit returns to the rotation.",
  },
  {
    question: "How often may I use my residence?",
    answer:
      "Personal use is unlimited when you reserve by September 1 for the following calendar year, except where a hotel guest booked a Peak Date before April 30 (including the last 10 days and first 7 days of the year, Easter week, and Thanksgiving week). After September 1, requests need 180 days' notice and are subject to availability. Shorter-notice requests are accommodated when the unit is open. No rental revenue accrues during your own stays.",
  },
  {
    question: "Can I rent my residence outside the program?",
    answer:
      "No. As a participant, the Hotel Owner is your exclusive rental agent. You may not provide the residence in exchange for payment or compensation of any kind, including property exchanges, and all rental inquiries must go to the hotel. Violations can suspend the unit or make it permanently ineligible for the program.",
  },
  {
    question: "Who will manage the Rental Program, and for how long?",
    answer:
      "The Hotel Owner has engaged Remington Hospitality to manage the program to LXR Residences standards under Hilton, under a long-term operating agreement. As with every branded residence program, there is no guarantee how long the manager will operate the hotel or the Rental Program. If the manager changes, the agreement may be assigned to the successor operator.",
  },
  {
    question: "What ongoing expenses am I responsible for?",
    answer:
      "Owners remain responsible for HOA assessments, property taxes, insurance, utilities, debt service, two interior deep cleans per year, pest control, non-routine maintenance, and refurbishments required to maintain brand standards. If these go unpaid, the hotel may pay them from your rental proceeds. Routine minor maintenance (light bulbs, small adjustments, guest service calls) is performed by the hotel at its expense.",
  },
  {
    question: "What happens if a guest damages my residence?",
    answer:
      "The hotel will use commercially reasonable efforts to collect material damage amounts (beyond normal wear and tear) from the guest, including charging the guest's card on file. Owners must also carry property insurance at full replacement cost and $1,000,000 per-occurrence liability coverage, with the Hotel Owner and Manager as additional insureds. Routine wear and tear is addressed through the FF&E Reserve.",
  },
  {
    question: "What happens when I sell my residence?",
    answer:
      "The agreement automatically terminates on sale unless the hotel approves an assignment to your buyer. Confirmed guest reservations must be honored either way. A buyer who opts out agrees in writing to honor in-place reservations. If the agreement is assigned, the FF&E Reserve balance stays with the unit for the new owner's benefit. Buyers should underwrite the residence itself, not an assumable income stream.",
  },
  {
    question: "Do I receive statements, and when am I paid?",
    answer:
      "Yes. A statement is provided at least quarterly, within 60 days of quarter-end, itemizing gross revenue, the management fee, your share, reserve deposits, and any deductions. Amounts due to you are paid within 15 days of the statement. Owners are responsible for their own bank wire charges and all taxes on rental income.",
  },
] as const;

export const lifecycleSteps = [
  {
    number: "01",
    title: "Close & enroll",
    description:
      "Sign after your purchase contract is binding. Pay the one-time enrollment fee, furnish to the hotel's FF&E package, bind required insurance, and place a card on file.",
  },
  {
    number: "02",
    title: "Reserve your dates",
    description:
      "Submit personal-use requests by Sept 1 for next year. Nights are unlimited, peak dates permitting. Later requests need 180 days' notice and are subject to availability.",
  },
  {
    number: "03",
    title: "Earn quarterly",
    description:
      "You receive a statement within 60 days of quarter-end and payment within 15 days after. The statement itemizes gross revenue, the fee, your share, reserve deposits, and any deductions.",
  },
  {
    number: "04",
    title: "Exit cleanly",
    description:
      "Non-renew with 5 months' notice, or sell (the agreement terminates unless assigned). Final reconciliation and reserve refund follow, with in-place guest reservations honored.",
  },
] as const;

export const galleryImages = [
  {
    src: "/images/gallery/marave-gallery-infinity-pool.jpg",
    alt: "Rendering of the Maravé infinity pool with ocean horizon view",
    caption: "Infinity pool overlooking the Pacific (rendering)",
  },
  {
    src: "/images/gallery/marave-gallery-great-room.jpg",
    alt: "Rendering of an open-plan Maravé residence great room with floor-to-ceiling ocean views",
    caption: "Residence great room (rendering)",
  },
  {
    src: "/images/gallery/marave-gallery-villa-pool.jpg",
    alt: "Rendering of a Maravé villa private pool terrace surrounded by jungle",
    caption: "Private villa pool (rendering)",
  },
  {
    src: "/images/gallery/marave-gallery-beach-club.jpg",
    alt: "Rendering of the Maravé beach club at the shoreline",
    caption: "Beach club (rendering)",
  },
  {
    src: "/images/gallery/marave-gallery-primary-bedroom.jpg",
    alt: "Rendering of a Maravé primary bedroom with panoramic windows",
    caption: "Primary bedroom (rendering)",
  },
] as const;

export const navSections = [
  { id: "property", label: "Property" },
  { id: "journey", label: "The Math" },
  { id: "calculator", label: "Calculator" },
  { id: "faq", label: "FAQ" },
  { id: "disclosures", label: "Disclosures" },
] as const;
