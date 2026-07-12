import { getAdminSessionFromCookies } from "@/lib/admin/auth";
import { uploadListingImage } from "@/lib/listings/store";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_BYTES = 8 * 1024 * 1024;

export async function POST(request: Request) {
  if (!(await getAdminSessionFromCookies())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const slug = String(form.get("slug") ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-");
  const file = form.get("file");

  if (!slug) {
    return NextResponse.json({ ok: false, error: "Slug is required" }, { status: 400 });
  }

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ ok: false, error: "Image file is required" }, { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ ok: false, error: "Image must be under 8MB" }, { status: 400 });
  }

  try {
    const uploaded = await uploadListingImage(slug, file);
    return NextResponse.json({ ok: true, url: uploaded.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
