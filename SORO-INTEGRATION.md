# Soro integration for crlre.com

[Soro](https://trysoro.com/) is an SEO autopilot that can research keywords, write articles, and publish to connected sites. This project supports Soro through a **custom webhook** and **Vercel Blob** storage.

## What is already built

| Item | Location |
|------|----------|
| Blog index | `/blog` |
| Blog articles | `/blog/[slug]` |
| RSS feed | `/feed.xml` |
| AI discovery file | `/llms.txt` |
| Soro webhook | `POST /api/soro/publish` |
| Webhook docs | `GET /api/soro/publish` |

Starter SEO articles live in `src/lib/blog/posts.ts`. Soro-published articles are stored in Vercel Blob and merged at runtime.

## Setup checklist

### 1. Vercel Blob (required for autopublish)

1. Open the Vercel project `crlrewebsite`.
2. Go to **Storage** → **Create** → **Blob** (private store is fine).
3. Link the Blob store to the project.
4. Confirm `BLOB_STORE_ID` appears in project environment variables (or `BLOB_READ_WRITE_TOKEN` if using token auth).
5. Redeploy.

### 2. Webhook secret

1. Generate a long random string.
2. Add to Vercel env: `SORO_WEBHOOK_SECRET=your-secret` (Production / Preview / Development).
3. Redeploy.

### 3. Connect Soro

Soro’s onboarding dropdown often **does not show Next.js**. That is expected.

1. Sign up at [trysoro.com](https://trysoro.com/).
2. Add website: `https://crlre.com`
3. Choose **Other** (custom / webhook). Do **not** use the embed widget, Ghost, RSS, or FTP options.
4. If webhook fields are missing, email Soro support and ask them to enable a custom webhook with:

   - **Publish URL:** `https://crlre.com/api/soro/publish`
   - **Method:** `POST`
   - **Auth:** `Authorization: Bearer <SORO_WEBHOOK_SECRET>`
   - Or header: `x-soro-secret: <SORO_WEBHOOK_SECRET>`

5. Map Soro fields to the payload below.

### 4. Test the endpoint

```bash
curl -X POST https://crlre.com/api/soro/publish \
  -H "Authorization: Bearer YOUR_SECRET" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Article From Soro",
    "slug": "test-article-from-soro",
    "description": "Short meta description for SEO.",
    "body": "First paragraph.\n\nSecond paragraph.",
    "tags": ["Maravé", "Costa Rica luxury real estate"],
    "category": "Insights"
  }'
```

Expected response:

```json
{ "ok": true, "slug": "test-article-from-soro", "url": "/blog/test-article-from-soro" }
```

Then open `https://crlre.com/blog/test-article-from-soro`.

`GET https://crlre.com/api/soro/publish` returns live field docs.

## Webhook payload

Required:

- `title` (string)
- `slug` (string)

Recommended:

- `description` or `metaDescription`
- `body`, `content`, or `html`
- `publishedAt` (YYYY-MM-DD)
- `tags` (string array)
- `category`
- `author`

Optional:

- `sections` array of `{ heading?, paragraphs: string[] }` for structured content

## How publishing works

1. Soro sends `POST /api/soro/publish`.
2. The route validates the secret.
3. The post is normalized and saved to Vercel Blob at `blog/posts/{slug}.json`.
4. Next.js revalidates `/blog`, the article page, sitemap, and RSS feed.
5. The article appears on the site within seconds (ISR revalidate: 300s max).

## SEO surfaces updated automatically

- `/sitemap.xml` includes all blog URLs
- `/feed.xml` RSS includes all posts
- `/llms.txt` lists primary pages, listings, and articles for AI crawlers
- Article pages include Article, FAQ (when present), and Breadcrumb JSON-LD

## Manual posts (without Soro)

Add articles to `src/lib/blog/posts.ts` and redeploy. Soro posts and static posts merge by slug (Soro wins on duplicate slugs).

## Troubleshooting

| Issue | Fix |
|-------|-----|
| 503 SORO_WEBHOOK_SECRET not configured | Add env var in Vercel and redeploy |
| 503 Blob storage not configured | Link a Vercel Blob store to the project and redeploy |
| 401 Unauthorized | Match secret in Soro and Vercel exactly |
| Post saved but not visible | Wait up to 5 minutes for ISR, or redeploy |
| No Next.js option in Soro UI | Use **Other** or email Soro for custom webhook setup |

## Notes

Listing photos and Maravé media are **not** stored in Blob. They live in `public/` as optimized WebP. Blob is only for Soro blog JSON.
