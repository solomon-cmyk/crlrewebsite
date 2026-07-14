import { normalizeSoroPayload, saveSoroBlogPost } from "@/lib/blog/queries";
import type { SoroPublishPayload } from "@/lib/blog/types";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

function unauthorized() {
  return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
}

function getProvidedSecret(request: Request, payload: SoroPublishPayload): string | null {
  const headerSecret =
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ??
    request.headers.get("x-soro-secret") ??
    request.headers.get("x-webhook-secret");

  return headerSecret ?? payload.secret ?? null;
}

export async function POST(request: Request) {
  const expectedSecret = process.env.SORO_WEBHOOK_SECRET;
  if (!expectedSecret) {
    return NextResponse.json(
      {
        ok: false,
        error: "SORO_WEBHOOK_SECRET is not configured on this deployment.",
      },
      { status: 503 }
    );
  }

  let payload: SoroPublishPayload;
  try {
    payload = (await request.json()) as SoroPublishPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const providedSecret = getProvidedSecret(request, payload);
  if (!providedSecret || providedSecret !== expectedSecret) {
    return unauthorized();
  }

  if (!payload.title || !payload.slug) {
    return NextResponse.json(
      { ok: false, error: "title and slug are required" },
      { status: 400 }
    );
  }

  const post = normalizeSoroPayload(payload);

  try {
    await saveSoroBlogPost(post);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to save blog post";
    return NextResponse.json({ ok: false, error: message }, { status: 503 });
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  revalidatePath("/sitemap.xml");
  revalidatePath("/feed.xml");
  revalidatePath("/rss.xml");

  return NextResponse.json({
    ok: true,
    slug: post.slug,
    url: `/blog/${post.slug}`,
  });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    integration: "soro",
    publishEndpoint: "/api/soro/publish",
    method: "POST",
    auth: "Authorization: Bearer <SORO_WEBHOOK_SECRET> or x-soro-secret header",
    requiredFields: ["title", "slug"],
    optionalFields: [
      "description",
      "metaDescription",
      "body",
      "content",
      "html",
      "sections",
      "publishedAt",
      "tags",
      "category",
      "author",
      "image",
      "coverImage",
      "featuredImage",
    ],
    preferredIntegration: "RSS via /api/soro/rss-sync + SORO_RSS_FEED_URL",
  });
}
