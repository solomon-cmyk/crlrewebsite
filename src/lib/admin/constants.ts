export const ADMIN_COOKIE = "crlre_admin_session";
export const ADMIN_PATH = "/crlre-manage";

export function safeAdminNextPath(next: string | null | undefined, fallback: string): string {
  if (!next) return fallback;
  if (!next.startsWith(ADMIN_PATH)) return fallback;
  if (next.startsWith("//") || next.includes("://") || next.includes("\\")) return fallback;
  try {
    const decoded = decodeURIComponent(next);
    if (decoded !== next && (decoded.startsWith("//") || decoded.includes("://"))) return fallback;
  } catch {
    return fallback;
  }
  return next;
}
