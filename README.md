# Costa Rica Luxury Real Estate (crlre.com)

Next.js 15 site for **Costa Rica Luxury Real Estate**, the developer and exclusive representative of **Maravé Resort & Residences** (LXR-branded) in Manuel Antonio, plus exclusive Pacific coast listings.

**Production:** https://crlre.com  
**Repo:** https://github.com/solomon-cmyk/crlrewebsite  
**Host:** Vercel

---

## Stack

- Next.js 15 App Router + TypeScript
- Vercel (deploy + Analytics)
- Vercel Blob (Soro blog posts only)
- Formspree (lead forms)
- Local optimized WebP media in `public/`

---

## Site map

| Route | Purpose |
|-------|---------|
| `/` | Maravé homepage (hero, collections, gallery, reserve, listings preview, team, contact) |
| `/listings` | Full exclusive listings catalog |
| `/listings/[slug]` | Listing detail with gallery |
| `/blog` | Blog index |
| `/blog/[slug]` | Blog article |
| `/api/soro/publish` | Soro autopublish webhook |
| `/feed.xml` | RSS |
| `/sitemap.xml` | Sitemap |
| `/llms.txt` | AI crawler summary |
| `/privacy`, `/terms`, `/cookie-policy` | Legal |

Lead listing (featured first): **Mercadito Gastronómico** (`/listings/mercadito-gastronomico-manuel-antonio`).

---

## Local development

```bash
npm install
cp .env.example .env.local   # fill Formspree / Soro / Blob as needed
npm run dev
```

Open http://localhost:3000.

```bash
npm run build
npm run start
```

---

## Environment variables

See `.env.example`.

| Variable | Required | Notes |
|----------|----------|-------|
| `NEXT_PUBLIC_SITE_URL` | Yes | `https://crlre.com` |
| `NEXT_PUBLIC_FORMSPREE_FORM_URL` | Yes (leads) | Formspree endpoint |
| `SORO_WEBHOOK_SECRET` | For Soro | Same secret configured in Soro |
| `BLOB_STORE_ID` | For Soro | Private Blob store linked in Vercel |
| `BLOB_READ_WRITE_TOKEN` | Optional | Alternate Blob auth if used |

---

## Media

Listing and Maravé photos are stored **locally** under:

- `public/listings/uploads/` — property photos (WebP)
- `public/media/marave/` — Maravé renders + hero video
- `public/images/headshots/` — Mark & Gladis portraits
- `public/logos/` — brand marks (WebP / SVG)

Do **not** point listing images at `crlre.com/wp-content/...` after DNS is on Vercel. Those URLs 403.

### Scripts

| Script | Purpose |
|--------|---------|
| `python3 scripts/sync-listings.py` | Re-scrape listing text from a live WordPress source (if available) |
| `python3 scripts/migrate-listing-images.py --source …` | Download WP uploads into `public/listings/uploads/` |
| `node scripts/setup-local-media.mjs` | Download Maravé media + convert to WebP |
| `node scripts/optimize-production.mjs` | Recompress oversized assets for deploy |

---

## Listings

Data lives in `src/lib/listings-data.ts`.

- Featured listings appear first on `/` and `/listings`
- Mercadito is the lead commercial listing
- Add a new listing by appending an object (slug, images under `public/listings/uploads/`, description without em dashes)

---

## Maravé gallery

Homepage gallery is a compact mosaic with category filters (Exteriors, Residences, Beach Club, Lifestyle). Full set opens in a lightbox. Items are defined in `src/lib/broker-content.ts` (`GALLERY_ITEMS`).

---

## Soro blog autopublish

See [SORO-INTEGRATION.md](./SORO-INTEGRATION.md).

Summary:

1. Blob store linked in Vercel
2. `SORO_WEBHOOK_SECRET` set
3. Soro publishes to `POST https://crlre.com/api/soro/publish` with Bearer auth
4. Soro’s self-serve UI may not list Next.js; use **Other** / ask Soro support for custom webhook

---

## Deploy

Push to `main` → Vercel auto-deploys.

Point DNS for `crlre.com` at Vercel when going live. Keep WordPress hosting available only if you still need to re-export media.

---

## Contact shown on site

- Email: mark@crlre.com
- Forms: Formspree → Mark’s inbox
