const ALLOWED_REDIRECT_PREFIXES = ["/dashboard", "/pricing"] as const;

/** Internal post-login paths only — blocks open redirects and protocol tricks. */
export function resolveSafeRedirect(redirect: string | null | undefined, fallback: string): string {
  if (!redirect) return fallback;

  const trimmed = redirect.trim();
  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) return fallback;

  let path: string;
  let search = "";
  try {
    const url = new URL(trimmed, "http://localhost");
    path = url.pathname;
    search = url.search;
  } catch {
    return fallback;
  }

  const allowed = ALLOWED_REDIRECT_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );
  if (!allowed) return fallback;

  return `${path}${search}`;
}
