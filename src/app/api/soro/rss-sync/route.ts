import { syncSoroRssFeed } from "@/lib/blog/queries";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

function authorized(request: Request): boolean {
  const expected =
    process.env.SORO_WEBHOOK_SECRET ||
    process.env.CRON_SECRET ||
    process.env.SORO_RSS_SYNC_SECRET;
  if (!expected) return false;

  const auth = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const header =
    request.headers.get("x-soro-secret") ||
    request.headers.get("x-cron-secret") ||
    new URL(request.url).searchParams.get("secret");

  return auth === expected || header === expected;
}

async function runSync() {
  const feedUrl = process.env.SORO_RSS_FEED_URL?.trim();
  if (!feedUrl) {
    return NextResponse.json(
      {
        ok: false,
        error: "SORO_RSS_FEED_URL is not configured. Paste your Soro RSS feed URL in Vercel env.",
      },
      { status: 503 }
    );
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.BLOB_STORE_ID) {
    return NextResponse.json(
      { ok: false, error: "Blob storage is not configured for storing Soro posts." },
      { status: 503 }
    );
  }

  const result = await syncSoroRssFeed(feedUrl);

  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");
  revalidatePath("/feed.xml");
  revalidatePath("/rss.xml");
  for (const slug of result.slugs) {
    revalidatePath(`/blog/${slug}`);
  }

  return NextResponse.json({
    ok: true,
    feedUrl,
    imported: result.imported,
    updated: result.updated,
    total: result.slugs.length,
    slugs: result.slugs,
  });
}

export async function GET(request: Request) {
  const isCron = request.headers.get("x-vercel-cron") === "1";
  const wantsSync = isCron || new URL(request.url).searchParams.has("sync");

  if (!wantsSync) {
    return NextResponse.json({
      ok: true,
      integration: "soro-rss",
      docs: "https://trysoro.com/ (Settings → Integrations → RSS)",
      siteFeed: "https://crlre.com/feed.xml",
      siteFeedAlias: "https://crlre.com/rss.xml",
      syncEndpoint: "/api/soro/rss-sync",
      method: "GET ?sync=1 or POST",
      auth: "Authorization: Bearer <SORO_WEBHOOK_SECRET|CRON_SECRET> or ?secret=",
      requiredEnv: ["SORO_RSS_FEED_URL", "BLOB_STORE_ID or BLOB_READ_WRITE_TOKEN"],
      notes: [
        "Soro RSS is the recommended publish path for this Next.js site.",
        "In Soro, connect the site with RSS and copy the feed URL they give you into SORO_RSS_FEED_URL.",
        "Vercel Cron hits this endpoint hourly; you can also trigger manually after publishing.",
      ],
    });
  }

  if (!isCron && !authorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    return await runSync();
  } catch (error) {
    const message = error instanceof Error ? error.message : "RSS sync failed";
    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}

export async function POST(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    return await runSync();
  } catch (error) {
    const message = error instanceof Error ? error.message : "RSS sync failed";
    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}
