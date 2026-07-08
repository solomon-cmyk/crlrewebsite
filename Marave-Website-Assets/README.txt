PROJECT: Maravé LXR Rental Program Guide Website
PREPARED BY: Claude (Cowork agent) for Solomon
DATE: 2026-07-07

FINAL DOMAIN:
PENDING — awaiting Solomon (Section 5 of ASSISTANT-HANDOFF.md)

LAUNCH DATE:
PENDING — awaiting Solomon

COPY APPROVER:
Solomon (final approver — no separate legal sign-off needed)

DEPLOYMENT (Section 5) — per Solomon 2026-07-07:
- Final website URL: PENDING (domain purchased; Solomon to provide exact URL)
- Domain purchased?: Yes
- Public or password-protected?: Public
- Target launch date: PENDING

OPTIONAL FEATURES (Section 6) — per Solomon 2026-07-07:
- Sticky nav with jump links: Yes
- Contact button (email / phone / calendar link): Yes
- Analytics: Yes
- Password protection: No (site is public)
- PDF export of calculator statement: Yes

ITEMS STILL PENDING:
1. Property Pro Partners logo — RESOLVED 2026-07-07. Official SVGs (black + white) supplied by Solomon from propertypropartners.com, saved as logos/property-pro-partners-logo-black.svg and -white.svg, and copied to public/logos/ as ppp-logo-black.svg and ppp-logo-white.svg.
2. LXR standalone logo — only found as .ai master files (New Logos/Production/LXR_XXXXX_Logo_Master_*.ai) and inside the combined lockup (logos/marave-lxr-lockup.png). PENDING: export a standalone PNG/SVG from the .ai if needed. VERIFIED: all logos in logos/ visually checked — every one reads "LXR Residences" (the old "Hotels & Resorts" lockup from HTML Sources was caught and replaced with the corrected version from Fact Sheet_files, per the Hilton revision).
3. Final website URL + target launch date (Section 5) — rest answered.
4. Calculator defaults: new sourced values recorded in numbers/calculator-defaults.csv (from Marave Rental app lib/constants.js + Guide.jsx). Solomon to approve before applying to site code — several differ from current site defaults (HOA 12k vs 24k, taxes 8k vs 4.5k, purchase price 2.5M vs 1.5M).
5. Copy decisions in copy/faq-updates.md (Remington naming, comp-night count, peak-date list) — Solomon to decide.

FOOTER CONTACT:
Verified against src/components/Footer.tsx — matches handoff doc exactly (Brandon Talalaevsky, PPP Miami, (786) 859-2628, BK3298943 / CQ1069862). No changes needed; no footer-contact.md filed.

NOTES FOR DEV TEAM:
- Replace Unsplash placeholder URLs in src/lib/content.ts (galleryImages) with the local files in images/gallery/ — captions and alt text are in images/image-manifest.csv.
- Hero: images/hero/marave-hero-aerial-sunset-pacific.jpg (4000x2667).
- OG image: images/og-image/marave-og-aerial-sunset-1200x630.jpg (exactly 1200x630).
- All photos are RENDERINGS (pre-construction) and are labeled as such in captions — keep the label on-site.
- Logos: black + white horizontal, stacked, tagline variants and monogram SVG in logos/.
- Raw pulls kept in source-files/ for reference.
