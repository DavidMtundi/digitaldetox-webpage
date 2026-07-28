/** Catalog prices: KES in major units (shillings), USD in minor units (cents). */

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
