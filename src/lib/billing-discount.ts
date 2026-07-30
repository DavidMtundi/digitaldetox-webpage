import { displayPrice } from "@/lib/billing-format";

const BILLING_CURRENCIES = ["KES", "USD"] as const;

/** Compare annual vs 12× monthly list price (same units as catalog: KES major, USD cents). */
export function getAnnualSavings(
  monthlyPrices: Record<string, number>,
  annualPrices: Record<string, number>,
  currency: string,
): { percent: number; monthsSaved: number } | null {
  const code = currency.toUpperCase();
  const monthly = monthlyPrices[code];
  const annual = annualPrices[code];
  if (monthly == null || annual == null || monthly <= 0) return null;

  const yearlyFromMonthly = monthly * 12;
  if (annual >= yearlyFromMonthly) return null;

  const percent = Math.round(((yearlyFromMonthly - annual) / yearlyFromMonthly) * 100);
  const monthsSaved = Math.max(1, Math.round((yearlyFromMonthly - annual) / monthly));

  return { percent, monthsSaved };
}

export function bestAnnualSavings(
  monthlyPrices: Record<string, number>,
  annualPrices: Record<string, number>,
): { percent: number; monthsSaved: number } | null {
  let best: { percent: number; monthsSaved: number } | null = null;
  for (const code of BILLING_CURRENCIES) {
    const savings = getAnnualSavings(monthlyPrices, annualPrices, code);
    if (savings && (!best || savings.percent > best.percent)) best = savings;
  }
  return best;
}

export function maxAnnualSavingsPercent(
  pairs: Array<{ monthly: Record<string, number>; annual: Record<string, number> }>,
): number {
  let max = 0;
  for (const pair of pairs) {
    const savings = bestAnnualSavings(pair.monthly, pair.annual);
    if (savings && savings.percent > max) max = savings.percent;
  }
  return max;
}

export function equivalentMonthlyFromAnnual(
  annualPrices: Record<string, number>,
  currency: string,
): number | null {
  const code = currency.toUpperCase();
  const annual = annualPrices[code];
  if (annual == null) return null;
  return Math.round(annual / 12);
}
