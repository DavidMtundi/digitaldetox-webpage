import { displayPrice, formatPrice } from "@/lib/billing-format";
import { apiGet, apiPost } from "@/lib/api-client";

export {
  displayPrice,
  displayDualPrice,
  formatPrice,
  annualListFromMonthlyPrices,
  equivalentMonthlyPrices,
  getPricePair,
  type BillingCurrency,
  type PricePair,
} from "@/lib/billing-format";

export interface CatalogProduct {
  id: string;
  tier: string;
  interval: string;
  displayName: string;
  description?: string;
  prices: Record<string, number>;
}

/** Shown when the catalog API is unreachable — matches pauseward-api seed prices. */
export const FALLBACK_CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    id: "pauseward_pro_monthly",
    tier: "pro",
    interval: "monthly",
    displayName: "Pauseward Pro",
    prices: { KES: 399, USD: 499 },
  },
  {
    id: "pauseward_pro_annual",
    tier: "pro",
    interval: "annual",
    displayName: "Pauseward Pro (Annual)",
    prices: { KES: 3499, USD: 3999 },
  },
  {
    id: "pauseward_family_monthly",
    tier: "family",
    interval: "monthly",
    displayName: "Pauseward Family",
    prices: { KES: 799, USD: 899 },
  },
  {
    id: "pauseward_family_annual",
    tier: "family",
    interval: "annual",
    displayName: "Pauseward Family (Annual)",
    prices: { KES: 7499, USD: 7999 },
  },
];

export interface BillingCatalogResponse {
  schemaVersion: number;
  monetizationEnabled: boolean;
  defaultCurrency?: string;
  supportedCurrencies?: string[];
  region?: string;
  products: CatalogProduct[];
}

export interface EntitlementResponse {
  schemaVersion: number;
  tier: string;
  capabilities: string[];
  source: string;
  productId?: string;
  expiresAt?: string;
  graceEndsAt?: string;
  isActive: boolean;
  updatedAt: string;
}

export interface CheckoutStatusResponse {
  status: string;
  productId?: string;
  tier?: string;
  displayName?: string;
  message?: string;
  entitlement?: EntitlementResponse;
}

export interface PaymentHistoryItem {
  reference: string;
  status: string;
  productId: string;
  productName: string;
  tier: string;
  interval: string;
  amountMinor: number;
  currency: string;
  formatted: string;
  channel: string | null;
  createdAt: string;
  completedAt: string | null;
  failedAt: string | null;
  failureReason: string | null;
  authorizationUrl: string | null;
}

export interface PaymentHistoryResponse {
  total: number;
  items: PaymentHistoryItem[];
}

export async function fetchBillingCatalog(region?: string): Promise<BillingCatalogResponse> {
  const query = region ? `?region=${encodeURIComponent(region)}` : "";
  return apiGet<BillingCatalogResponse>(`/v1/catalog${query}`);
}

export async function fetchEntitlements(): Promise<EntitlementResponse> {
  return apiGet<EntitlementResponse>("/v1/me/entitlements", true);
}

export async function fetchPaymentHistory(
  params?: { status?: string; limit?: number; offset?: number },
): Promise<PaymentHistoryResponse> {
  const search = new URLSearchParams();
  if (params?.status) search.set("status", params.status);
  if (params?.limit != null) search.set("limit", String(params.limit));
  if (params?.offset != null) search.set("offset", String(params.offset));
  const query = search.toString();
  return apiGet<PaymentHistoryResponse>(`/v1/me/payments${query ? `?${query}` : ""}`, true);
}

export async function fetchCheckoutStatus(
  reference: string,
): Promise<CheckoutStatusResponse> {
  return apiGet<CheckoutStatusResponse>(
    `/v1/checkout/status?reference=${encodeURIComponent(reference)}`,
    true,
  );
}

export async function initiateCheckout(input: {
  productId: string;
  currency?: string;
  callbackUrl: string;
  cancelUrl?: string;
}): Promise<{ authorizationUrl: string; reference: string }> {
  return apiPost("/v1/checkout", {
    productId: input.productId,
    currency: input.currency ?? "KES",
    callbackUrl: input.callbackUrl,
    cancelUrl: input.cancelUrl,
  }, true);
}
