import { ADMIN_COOKIE, ADMIN_PATH } from "@/lib/admin/constants";
import { readAdminSession } from "@/lib/admin/session";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === ADMIN_PATH || pathname === `${ADMIN_PATH}/`) {
    return NextResponse.next();
  }

  if (!pathname.startsWith(`${ADMIN_PATH}/`)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  const session = await readAdminSession(
    token,
    process.env.ADMIN_SESSION_SECRET,
    process.env.ADMIN_USERNAME
  );
  if (session) return NextResponse.next();

  const loginUrl = new URL(ADMIN_PATH, request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/crlre-manage/:path*"],
};
