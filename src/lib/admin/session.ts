import { ADMIN_COOKIE } from "@/lib/admin/constants";

export { ADMIN_COOKIE };
export const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

export type SessionPayload = {
  email: string;
  exp: number;
  /** Invalidates sessions when ADMIN_PASSWORD changes. */
  fp: string;
};

function toBase64Url(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let binary = "";
  for (const byte of arr) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(value: string): Uint8Array {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
  const binary = atob(padded + pad);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function hmacSign(value: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return toBase64Url(signature);
}

function timingSafeEqualBytes(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) mismatch |= a[i] ^ b[i];
  return mismatch === 0;
}

export function timingSafeStringEqual(a: string, b: string): boolean {
  const left = new TextEncoder().encode(a);
  const right = new TextEncoder().encode(b);
  if (left.length !== right.length) {
    let burn = 0;
    for (let i = 0; i < left.length; i += 1) burn |= left[i];
    void burn;
    return false;
  }
  return timingSafeEqualBytes(left, right);
}

export async function passwordFingerprint(password: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(`crlre-admin:${password}`)
  );
  return toBase64Url(digest).slice(0, 32);
}

export async function createAdminSessionToken(
  email: string,
  secret: string,
  password: string
): Promise<string> {
  const payload: SessionPayload = {
    email: email.trim().toLowerCase(),
    exp: Date.now() + SESSION_TTL_MS,
    fp: await passwordFingerprint(password),
  };
  const body = toBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
  const signature = await hmacSign(body, secret);
  return `${body}.${signature}`;
}

export async function readAdminSession(
  token: string | null | undefined,
  secret: string | undefined,
  expectedEmail: string | undefined,
  expectedPassword: string | undefined
): Promise<SessionPayload | null> {
  if (!secret || !expectedEmail || !expectedPassword || !token) return null;

  const [body, signature] = token.split(".");
  if (!body || !signature) return null;

  const expectedSig = await hmacSign(body, secret);
  if (!timingSafeStringEqual(expectedSig, signature)) return null;

  try {
    const json = new TextDecoder().decode(fromBase64Url(body));
    const payload = JSON.parse(json) as SessionPayload;
    if (!payload?.email || !payload.exp || !payload.fp) return null;
    if (payload.exp < Date.now()) return null;
    if (!timingSafeStringEqual(payload.email, expectedEmail.trim().toLowerCase())) return null;
    const expectedFp = await passwordFingerprint(expectedPassword);
    if (!timingSafeStringEqual(payload.fp, expectedFp)) return null;
    return payload;
  } catch {
    return null;
  }
}

export function sessionCookieOptions(maxAgeSeconds = SESSION_TTL_MS / 1000) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: maxAgeSeconds,
  };
}
