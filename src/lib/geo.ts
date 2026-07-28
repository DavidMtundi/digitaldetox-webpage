export type BillingCurrency = "KES" | "USD";

const KENYA_TIMEZONES = new Set([
  "Africa/Nairobi",
  "Africa/Mogadishu", // EAT adjacent — keep Nairobi as primary
]);

/** Detect default billing currency from browser signals (Kenya → KES). */
export function detectDefaultCurrency(): BillingCurrency {
  if (typeof window === "undefined") return "KES";

  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (KENYA_TIMEZONES.has(tz)) return "KES";
  } catch {
    // ignore
  }

  const lang = navigator.language?.toLowerCase() ?? "";
  if (lang === "sw-ke" || lang === "en-ke" || lang.endsWith("-ke")) {
    return "KES";
  }

  try {
    const locale = Intl.DateTimeFormat().resolvedOptions().locale?.toUpperCase() ?? "";
    if (locale.includes("-KE")) return "KES";
  } catch {
    // ignore
  }

  return "USD";
}

export function detectRegionCode(): string | undefined {
  const currency = detectDefaultCurrency();
  return currency === "KES" ? "KE" : undefined;
}
