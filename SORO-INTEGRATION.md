# Soro integration for crlre.com

[Soro](https://trysoro.com/) is an SEO autopilot that researches keywords, writes articles, and publishes them to connected sites. For this Next.js site, **RSS is the recommended publish path** (Soro → RSS feed → crlre.com sync).

Webhook publishing remains available as a backup.

## What is already built

| Item | Location |
|------|----------|
| Blog index | `/blog` |
| Blog articles | `/blog/[slug]` |
| Site RSS feed (outbound) | `/feed.xml` and `/rss.xml` |
| Soro RSS sync (inbound) | `GET/POST /api/soro/rss-sync` |
| Soro webhook (backup) | `POST /api/soro/publish` |
| Live endpoint docs | `GET /api/soro/rss-sync` and `GET /api/soro/publish` |

Starter SEO articles live in `src/lib/blog/posts.ts`. Soro articles are stored in Vercel Blob and merged at runtime.

## Recommended setup: RSS

Soro’s privacy/integrations list includes **RSS**. In practice Soro gives you a feed URL for your project; this site polls that feed and publishes matching posts to `/blog`.

### 1. Vercel Blob (required)

1. Open the Vercel project `crlrewebsite`.
2. **Storage** → **Create** → **Blob**.
3. Link the store to the project.
4. Confirm `BLOB_STORE_ID` (or `BLOB_READ_WRITE_TOKEN`) is present.
5. Redeploy.

### 2. Connect Soro with RSS

1. Sign up / log in at [trysoro.com](https://trysoro.com/).
2. Add website: `https://crlre.com`
3. Choose **RSS** (preferred over Ghost/FTP/embed for this stack).
4. Copy the **Soro RSS feed URL** they provide for this project.
5. In Vercel → Project → Settings → Environment Variables, add:

```bash
SORO_RSS_FEED_URL=https://...your-soro-feed-url...
SORO_WEBHOOK_SECRET=long-random-secret   # also used to authorize manual sync
```

6. Redeploy.

### 3. Sync schedule

Vercel Cron runs daily at 14:00 UTC (Hobby-compatible):

`GET /api/soro/rss-sync`

On Pro you can tighten the schedule in `vercel.json` (e.g. hourly).

Manual sync (after a Soro publish):

```bash
curl -X POST "https://crlre.com/api/soro/rss-sync" \
  -H "Authorization: Bearer YOUR_SECRET"
```

Or:

```bash
curl "https://crlre.com/api/soro/rss-sync?sync=1&secret=YOUR_SECRET"
```

Expected:

```json
{ "ok": true, "imported": 1, "updated": 0, "total": 1, "slugs": ["article-slug"] }
```

### 4. What the sync imports

From each RSS/Atom item:

- title, link/slug, description
- full HTML from `content:encoded` / `content` when present
- categories → tags
- featured image from `media:content`, `enclosure`, or first `<img>`
- pubDate

Posts are saved to Blob as `blog/posts/{slug}.json` and appear on `/blog` after revalidation.

## Site outbound RSS (for SEO / readers)

Live feeds:

- https://crlre.com/feed.xml
- https://crlre.com/rss.xml

Includes:

- `atom:link` self reference
- `content:encoded` full article HTML
- `dc:creator`, categories
- `media:content` + `enclosure` when a cover image exists

These are discovery feeds for the published blog. They are **not** the Soro inbound feed URL.

## Backup: webhook publish

If Soro enables a custom webhook for Next.js:

- **URL:** `https://crlre.com/api/soro/publish`
- **Auth:** `Authorization: Bearer <SORO_WEBHOOK_SECRET>` or `x-soro-secret`
- **Required JSON:** `title`, `slug`
- **Optional:** `description`, `html` / `body` / `content`, `publishedAt`, `tags`, `category`, `author`, `image` / `coverImage`

Docs: `GET https://crlre.com/api/soro/publish`

## Troubleshooting

| Issue | Fix |
|------|-----|
| 503 SORO_RSS_FEED_URL not configured | Paste Soro feed URL into Vercel env and redeploy |
| 503 Blob not configured | Link a Vercel Blob store |
| 401 Unauthorized | Match `SORO_WEBHOOK_SECRET` / cron secret |
| Sync ok but empty blog | Confirm Soro feed has `<item>` entries in a browser/curl |
| Images missing | Prefer Soro items with `media:content` or inline `<img>` (Soro fixed Ghost RSS images; same fields work here) |
| No RSS option in Soro UI | Email **info@trysoro.com** and ask them to enable RSS for `https://crlre.com` |

## Notes

Listing photos and Maravé media are **not** in Blob. Blob is only for Soro/blog JSON.
