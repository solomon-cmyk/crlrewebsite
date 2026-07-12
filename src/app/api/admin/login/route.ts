import {
  ADMIN_COOKIE,
  createAdminSessionToken,
  isAdminConfigured,
  sessionCookieOptions,
  verifyAdminCredentials,
} from "@/lib/admin/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Admin credentials are not configured on this deployment." },
      { status: 503 }
    );
  }

  let body: { email?: string; password?: string };
  try {
    body = (await request.json()) as { email?: string; password?: string };
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const email = body.email?.trim() ?? "";
  const password = body.password ?? "";

  if (!(await verifyAdminCredentials(email, password))) {
    return NextResponse.json({ ok: false, error: "Invalid email or password" }, { status: 401 });
  }

  const token = await createAdminSessionToken(email);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, token, sessionCookieOptions());
  return response;
}
