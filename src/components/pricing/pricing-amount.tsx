import type { BillingInterval } from "@/components/pricing/billing-interval-toggle";
import { getPricePair, type BillingCurrency } from "@/lib/billing-format";

export default function PricingAmount({
  prices,
  primaryCurrency,
  compareAtPrices,
  interval,
  priceNote,
}: {
  prices: Record<string, number>;
  primaryCurrency: BillingCurrency;
  compareAtPrices?: Record<string, number> | null;
  interval: BillingInterval;
  priceNote?: string;
}) {
  const pair = getPricePair(prices, primaryCurrency);
  const compare = compareAtPrices ? getPricePair(compareAtPrices, primaryCurrency) : null;
  const period = interval === "annual" ? "year" : "month";

  return (
    <div>
      {compare && interval === "annual" && compare.primary !== "—" && (
        <p className="pricing-tier-compare text-sm text-gray-400 line-through dark:text-gray-500">
          {compare.primary}/yr
        </p>
      )}
      <p className="pricing-tier-price font-display text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
        {pair.primary}
        <span className="text-lg font-semibold text-gray-500 dark:text-gray-400"> / {period}</span>
      </p>
      {pair.secondary && (
        <p className="pricing-tier-price-alt mt-1 text-sm text-gray-500 dark:text-gray-400">{pair.secondary}</p>
      )}
      {priceNote && (
        <p className="pricing-tier-note mt-1 text-xs text-gray-500 dark:text-gray-400">{priceNote}</p>
      )}
    </div>
  );
}

/** Compact primary + secondary for subscribe buttons */
export function PricingAmountInline({
  prices,
  primaryCurrency,
}: {
  prices: Record<string, number>;
  primaryCurrency: BillingCurrency;
}) {
  const pair = getPricePair(prices, primaryCurrency);
  return (
    <div className="text-right text-sm leading-snug">
      <div className="font-semibold">{pair.primary}</div>
      {pair.secondary && <div className="text-xs opacity-80">{pair.secondary}</div>}
    </div>
  );
}
