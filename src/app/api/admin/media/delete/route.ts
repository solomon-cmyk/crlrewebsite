import { getAdminSessionFromCookies } from "@/lib/admin/auth";
import { deleteListingImage } from "@/lib/listings/store";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await getAdminSessionFromCookies())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let body: { url?: string };
  try {
    body = (await request.json()) as { url?: string };
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const url = body.url?.trim();
  if (!url) {
    return NextResponse.json({ ok: false, error: "url is required" }, { status: 400 });
  }

  try {
    await deleteListingImage(url);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Delete failed";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
