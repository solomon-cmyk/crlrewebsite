# Maravé LXR Website — Cowork Agent Handoff

**Purpose:** Gather assets and content from existing Maravé materials and organize them for the rental program guide website.

**Who you are:** Claude cowork agent pulling from Maravé website files and related materials.

**Who approves copy:** **Solomon** — he is the final approver. Do not wait on external legal sign-off. Disclosure/legal language will be adapted from similar branded residence programs and reviewed by Solomon later.

**Website code location:**
`/Users/solomonkravitz/Desktop/Side Projects/Mark Dalton/CRLE Website/CRLE Website v1.0`

**Assets folder (save everything here):**
`/Users/solomonkravitz/Desktop/Side Projects/Mark Dalton/CRLE Website/CRLE Website v1.0/Marave-Website-Assets`

---

## Folder structure (already created)

```text
Marave-Website-Assets/
├── README.md                  ← overview
├── README.txt                 ← fill out when done
├── source-files/              ← dump raw Maravé pulls here first
├── images/
│   ├── hero/                  ← 1 hero image
│   ├── gallery/               ← 3+ gallery images
│   ├── og-image/              ← 1 social share image (1200×630)
│   └── image-manifest.csv     ← caption + alt text for every image
├── logos/                     ← Maravé, LXR, PPP logos
├── copy/                      ← copy drafts / updates for Solomon to review
└── numbers/
    └── calculator-defaults.csv
```

Each subfolder has its own `README.md` with exact instructions.

---

## Your workflow

1. **Pull** — Gather images, logos, and copy from existing Maravé website files into `source-files/`
2. **Sort** — Move the best assets into the correct final folders
3. **Document** — Fill in `image-manifest.csv` and `calculator-defaults.csv`
4. **Draft copy** — Put any FAQ/disclosure/footer updates in `copy/` for Solomon
5. **Close out** — Complete `README.txt` with anything still pending

If something is missing, write **PENDING** and why. Do not leave items blank.

---

## Section 1 — Images (REQUIRED)

### Minimum: 4 photos

| Save to | Count | What to look for | Specs |
|---------|-------|------------------|-------|
| `images/hero/` | 1 | Wide exterior, aerial, ocean view, property overview | Landscape, min **2400px** wide, JPG/WebP |
| `images/gallery/` | 3+ | Interior, exterior, pool/amenities/view | Min **1600px** long side, JPG/WebP |
| `images/og-image/` | 1 | Social link preview | Exactly **1200 × 630** px |

### For every image
Add a row to `images/image-manifest.csv`:

| Column | Example |
|--------|---------|
| filename | `marave-hero-aerial-pacific.jpg` |
| folder | `hero` |
| caption | `Manuel Antonio · Pacific views` |
| alt_text | `Aerial view of Maravé overlooking the Pacific Ocean` |
| source | `marave-website / deck page 4` |
| notes | optional |

### Image rules
- Pull from **Maravé materials first**
- No random stock photos
- No screenshots, watermarks, or PDFs-of-photos
- Label renderings clearly in the caption if used

### Checklist
- [ ] Hero image in `images/hero/`
- [ ] 3+ gallery images in `images/gallery/`
- [ ] OG image in `images/og-image/`
- [ ] `image-manifest.csv` complete

---

## Section 2 — Logos (REQUIRED)

Save to `logos/`:

| File | Priority |
|------|----------|
| `marave-logo.svg` or `.png` | Required |
| `lxr-logo.svg` or `.png` | If found in Maravé materials |
| `property-pro-partners-logo.svg` or `.png` | If available |

### Checklist
- [ ] Maravé logo saved
- [ ] Other logos saved or marked PENDING

---

## Section 3 — Copy (for Solomon to review)

Solomon handles final copy approval. Your job is to **organize and draft**, not get external legal sign-off.

### What to do
- Pull relevant FAQ/disclosure language from **similar branded residence rental programs** as reference drafts
- Save drafts in `copy/` as markdown files (e.g. `disclosures-draft.md`, `faq-updates.md`)
- If footer contact info needs changing, save corrections in `copy/footer-contact.md`

### Current footer on site (update only if wrong)
- Brandon Talalaevsky · Principal Broker & Head of Sales
- Property Pro Partners · 18300 W Dixie Hwy, Miami, FL 33160
- (786) 859-2628 · Brandon@propertypropartners.com
- License BK3298943 · Brokerage CQ1069862

### Checklist
- [ ] Copy drafts saved in `copy/` if any changes suggested
- [ ] Solomon flagged for final review (note in `README.txt`)

---

## Section 4 — Calculator numbers

Edit `numbers/calculator-defaults.csv`.

Current defaults are pre-filled. Update `new_value` and `source_notes` only where you find better numbers in Maravé materials.

| Field | Current default |
|-------|-----------------|
| Year 1 ADR | $1,800/night |
| Year 1 occupancy | 50% |
| Year 2 occupancy | 55% |
| Purchase price | $1,500,000 |
| HOA | $24,000/yr |
| Insurance | $6,500/yr |
| Property tax | $4,500/yr |
| Utilities | $3,600/yr |
| Deep clean & pest | $1,400/yr |
| Maintenance above reserve | $2,000/yr |

Do **not** invent projections. If no source exists, leave blank and mark PENDING in `README.txt`.

### Checklist
- [ ] CSV reviewed
- [ ] Updates sourced from real materials or left as defaults

---

## Section 5 — Deployment info (ask Solomon if unknown)

Fill in `README.txt`:

| Question | Answer |
|----------|--------|
| Final website URL | |
| Domain purchased? | Yes / No |
| Public or password-protected? | |
| Target launch date | |

---

## Section 6 — Optional features (ask Solomon)

| Feature | Yes / No |
|---------|----------|
| Sticky nav with jump links | |
| Contact button (email / phone / calendar link) | |
| Analytics | |
| Password protection | |
| PDF export of calculator statement | |

Record answers in `README.txt`.

---

## Minimum to launch

- [ ] 1 hero photo
- [ ] 3 gallery photos
- [ ] Maravé logo
- [ ] OG image (1200×630)
- [ ] `image-manifest.csv` filled out
- [ ] `README.txt` completed

Copy/legal can be iterated after launch — Solomon approves.

---

## What NOT to do

- Do not redesign the website layout
- Do not block on legal/external approvals
- Do not invent ADR, occupancy, or income numbers
- Do not use random web images — use Maravé source files
- Do not leave everything in `source-files/` — sort into final folders before handoff

---

## Final checklist

- [ ] Raw materials processed from `source-files/`
- [ ] Images sorted + manifest complete
- [ ] Logos in `logos/`
- [ ] Copy drafts in `copy/` (if any)
- [ ] Calculator CSV updated (if applicable)
- [ ] `README.txt` filled out
