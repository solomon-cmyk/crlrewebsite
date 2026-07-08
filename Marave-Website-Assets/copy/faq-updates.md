# FAQ updates — deltas for Solomon to review

The CRLE site FAQ (`src/lib/content.ts`) is already more detailed than the Maravé Rental Guide app's FAQ. No wholesale replacement needed. Differences worth a decision:

## 1. Program manager name

- **Site says:** "a professional hotel manager affiliated with LXR Hotels & Resorts, part of Hilton"
- **Rental app says:** "**Remington Hospitality** manages the program to LXR standards"
- **Decision:** name Remington on the site, or keep it generic? Naming is more concrete; generic is safer if the operator could change.

## 2. Payment timing

- **Site says:** statement within 60 days of quarter-end, payment within 15 days after.
- **Rental app says:** just "quarterly distributions."
- Site is more specific — keep site version.

## 3. Comp nights

- Rental app codifies a **5 comp-night allowance** (`COMP_NIGHTS = 5`). Site FAQ doesn't mention a number. Add if Solomon confirms it's in the current RMA draft.

## 4. Peak dates

- Rental app lists explicit peak periods: Christmas/New Year (Dec 20–Jan 5), Easter/Semana Santa, US Thanksgiving, CR Independence (Sep 15 weekend), Spring Break (Mar–Apr), Summer high season (Jul–Aug).
- Site FAQ defines peak dates as "last 10 days and first 7 days of the year, Easter week, and Thanksgiving week" — narrower.
- **Decision:** which list matches the current RMA draft? Align both properties.

## 5. Enrollment fee

- Both mention a one-time enrollment fee; neither states the amount. Leave as-is (amount set in executed agreement).

## 6. Gallery placeholders (dev note, not FAQ)

- `galleryImages` in `content.ts` currently uses **Unsplash stock URLs** — the handoff forbids stock photos. Replace with the new files in `images/gallery/` (see `image-manifest.csv` for captions/alt text).
