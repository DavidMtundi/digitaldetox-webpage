import { getAuth } from "firebase/auth";

export interface CatalogProduct {
  id: string;
  tier: string;
  interval: string;
  displayName: string;
  description?: string;
  prices: Record<string, number>;
}

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

function getApiBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_PAUSEWARD_API_URL;
  if (!url) {
    throw new Error("NEXT_PUBLIC_PAUSEWARD_API_URL is not configured");
  }
  return url.replace(/\/$/, "");
}

async function getAuthToken(): Promise<string> {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Sign in required");
  }
  return user.getIdToken();
}

async function apiGet<T>(path: string, auth = false): Promise<T> {
  const headers: Record<string, string> = {};
  if (auth) {
    headers.Authorization = `Bearer ${await getAuthToken()}`;
  }

  const response = await fetch(`${getApiBaseUrl()}${path}`, { headers });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      typeof data.error === "string" ? data.error : `Request failed (${response.status})`;
    throw new Error(message);
  }

  return data as T;
}

async function apiPost<T>(path: string, body: Record<string, unknown>): Promise<T> {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${await getAuthToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      typeof data.error === "string" ? data.error : `Request failed (${response.status})`;
    throw new Error(message);
  }

  return data as T;
}

export async function fetchBillingCatalog(region?: string): Promise<BillingCatalogResponse> {
  const query = region ? `?region=${encodeURIComponent(region)}` : "";
  return apiGet<BillingCatalogResponse>(`/v1/catalog${query}`);
}

export async function fetchEntitlements(): Promise<EntitlementResponse> {
  return apiGet<EntitlementResponse>("/v1/me/entitlements", true);
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
  });
}

export function formatPrice(amountMajor: number, currency: string): string {
  const code = currency.toUpperCase();
  if (code === "KES") return `KSh ${amountMajor.toLocaleString()}`;
  if (code === "USD") return `$${(amountMajor / 100).toFixed(2)}`;
  return `${code} ${amountMajor}`;
}

/** Catalog prices are stored in major units for KES, minor for USD (cents). */
export function displayPrice(prices: Record<string, number>, currency: string): string {
  const code = currency.toUpperCase();
  const amount = prices[code];
  if (amount == null) return "—";
  if (code === "USD") return `$${(amount / 100).toFixed(2)}`;
  return `KSh ${amount.toLocaleString()}`;
}
