/** Catalog prices: KES in major units (shillings), USD in minor units (cents). */

export type BillingCurrency = "KES" | "USD";

export type PricePair = {
  primary: string;
  secondary: string | null;
};

export function formatPrice(amountMajor: number, currency: string): string {
  const code = currency.toUpperCase();
  if (code === "KES") return `KSh ${amountMajor.toLocaleString()}`;
  if (code === "USD") return `$${(amountMajor / 100).toFixed(2)}`;
  return `${code} ${amountMajor}`;
}

export function displayPrice(prices: Record<string, number>, currency: string): string {
  const code = currency.toUpperCase();
  const amount = prices[code];
  if (amount == null) return "—";
  if (code === "USD") return `$${(amount / 100).toFixed(2)}`;
  return `KSh ${amount.toLocaleString()}`;
}

export function getPricePair(
  prices: Record<string, number>,
  primaryCurrency: BillingCurrency,
): PricePair {
  const primary = displayPrice(prices, primaryCurrency);
  if (primary === "—") return { primary: "—", secondary: null };

  const secondaryCurrency: BillingCurrency = primaryCurrency === "KES" ? "USD" : "KES";
  if (prices[secondaryCurrency] == null) return { primary, secondary: null };

  return {
    primary,
    secondary: `≈ ${displayPrice(prices, secondaryCurrency)} ${secondaryCurrency}`,
  };
}

/** KES and USD together, e.g. "KSh 399 · $4.99" */
export function displayDualPrice(prices: Record<string, number>): string {
  const kes = displayPrice(prices, "KES");
  const usd = displayPrice(prices, "USD");
  if (kes === "—" && usd === "—") return "—";
  if (kes === "—") return usd;
  if (usd === "—") return kes;
  return `${kes} · ${usd}`;
}

export function annualListFromMonthlyPrices(prices: Record<string, number>): Record<string, number> {
  const result: Record<string, number> = {};
  if (prices.KES != null) result.KES = prices.KES * 12;
  if (prices.USD != null) result.USD = prices.USD * 12;
  return result;
}

export function equivalentMonthlyPrices(annualPrices: Record<string, number>): Record<string, number> {
  const result: Record<string, number> = {};
  if (annualPrices.KES != null) result.KES = Math.round(annualPrices.KES / 12);
  if (annualPrices.USD != null) result.USD = Math.round(annualPrices.USD / 12);
  return result;
}
