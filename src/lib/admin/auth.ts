import { cookies } from "next/headers";
import { ADMIN_COOKIE } from "@/lib/admin/constants";
import {
  createAdminSessionToken as createToken,
  readAdminSession as readToken,
  timingSafeStringEqual,
  type SessionPayload,
} from "@/lib/admin/session";

export { ADMIN_COOKIE, ADMIN_PATH, safeAdminNextPath } from "@/lib/admin/constants";
export { sessionCookieOptions } from "@/lib/admin/session";

function getCredentials() {
  const email = process.env.ADMIN_USERNAME?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;

  return { email, password, secret };
}

export function isAdminConfigured(): boolean {
  const { email, password, secret } = getCredentials();
  return Boolean(email && password && secret);
}

export async function verifyAdminCredentials(email: string, password: string): Promise<boolean> {
  const creds = getCredentials();
  if (!creds.email || !creds.password) return false;
  const emailOk = timingSafeStringEqual(email.trim().toLowerCase(), creds.email);
  const passwordOk = timingSafeStringEqual(password, creds.password);
  return emailOk && passwordOk;
}

export async function createAdminSessionToken(email: string): Promise<string> {
  const { secret, password } = getCredentials();
  if (!secret || !password) throw new Error("ADMIN_SESSION_SECRET is not configured");
  return createToken(email, secret, password);
}

export async function getAdminSessionFromCookies(): Promise<SessionPayload | null> {
  const { secret, email, password } = getCredentials();
  const jar = await cookies();
  return readToken(jar.get(ADMIN_COOKIE)?.value, secret, email, password);
}

export async function requireAdminSession(): Promise<SessionPayload> {
  const session = await getAdminSessionFromCookies();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}
