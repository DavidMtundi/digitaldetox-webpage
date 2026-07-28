"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CreditCard, Loader2, RefreshCw } from "lucide-react";
import { DashboardCard, DashboardPage, EmptyState } from "@/components/dashboard/page-shell";
import {
  CatalogProduct,
  displayPrice,
  fetchBillingCatalog,
  fetchCheckoutStatus,
  fetchPaymentHistory,
  initiateCheckout,
  type PaymentHistoryItem,
} from "@/lib/billing";
import { detectDefaultCurrency } from "@/lib/geo";

type StatusFilter = "all" | "completed" | "pending" | "failed";

const STATUS_FILTERS: { id: StatusFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "completed", label: "Completed" },
  { id: "pending", label: "Pending" },
  { id: "failed", label: "Failed" },
];

export default function DashboardPaymentsContent() {
  const searchParams = useSearchParams();
  const [payments, setPayments] = useState<PaymentHistoryItem[]>([]);
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [currency, setCurrency] = useState<"KES" | "USD">("KES");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [loading, setLoading] = useState(true);
  const [checkoutProductId, setCheckoutProductId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const loadPayments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchPaymentHistory({
        status: statusFilter === "all" ? undefined : statusFilter,
        limit: 50,
      });
      setPayments(result.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load payments.");
      setPayments([]);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    setCurrency(detectDefaultCurrency());
    fetchBillingCatalog()
      .then((catalog) => {
        setProducts(catalog.products);
        if (catalog.defaultCurrency === "KES" || catalog.defaultCurrency === "USD") {
          setCurrency(catalog.defaultCurrency);
        }
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    loadPayments();
  }, [loadPayments]);

  useEffect(() => {
    const reference = searchParams.get("reference") ?? searchParams.get("trxref");
    if (!reference) return;

    fetchCheckoutStatus(reference)
      .then((status) => {
        if (status.status === "completed") {
          setSuccessMessage(
            status.message ??
              `Payment successful${status.displayName ? ` — ${status.displayName}` : ""}.`,
          );
        } else if (status.status === "pending") {
          setSuccessMessage("Payment is still processing. Refresh in a moment.");
        } else if (status.status === "failed") {
          setError(status.message ?? "Payment was not completed.");
        }
        loadPayments();
      })
      .catch(() => undefined);
  }, [searchParams, loadPayments]);

  const startCheckout = async (productId: string) => {
    setError(null);
    setSuccessMessage(null);
    setCheckoutProductId(productId);

    try {
      const siteUrl = window.location.origin;
      const { authorizationUrl } = await initiateCheckout({
        productId,
        currency,
        callbackUrl: `${siteUrl}/dashboard/payments`,
        cancelUrl: `${siteUrl}/dashboard/payments?cancelled=1`,
      });
      window.location.href = authorizationUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start checkout.");
      setCheckoutProductId(null);
    }
  };

  const proProducts = products.filter((p) => p.tier === "pro");
  const familyProducts = products.filter((p) => p.tier === "family");

  return (
    <DashboardPage
      title="Payments"
      subtitle="View your payment history and start a new subscription checkout."
      action={
        <button
          type="button"
          onClick={() => loadPayments()}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      }
    >
      {successMessage ? (
        <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {successMessage}
        </div>
      ) : null}

      {searchParams.get("cancelled") ? (
        <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Checkout was cancelled. You can try again below.
        </div>
      ) : null}

      {error ? (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <DashboardCard title="Payment history">
            <div className="mb-4 flex flex-wrap gap-2">
              {STATUS_FILTERS.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setStatusFilter(filter.id)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    statusFilter === filter.id
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12 text-gray-500">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            ) : payments.length === 0 ? (
              <EmptyState
                title="No payments yet"
                description="When you subscribe or renew through Paystack, your payments will appear here."
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-500">
                      <th className="pb-3 pr-4 font-semibold">Date</th>
                      <th className="pb-3 pr-4 font-semibold">Plan</th>
                      <th className="pb-3 pr-4 font-semibold">Amount</th>
                      <th className="pb-3 pr-4 font-semibold">Status</th>
                      <th className="pb-3 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {payments.map((payment) => (
                      <tr key={payment.reference}>
                        <td className="py-3 pr-4 text-gray-700">
                          {formatDate(payment.completedAt ?? payment.createdAt)}
                        </td>
                        <td className="py-3 pr-4">
                          <p className="font-medium text-gray-900">{payment.productName}</p>
                          <p className="text-xs text-gray-500 capitalize">
                            {payment.tier} · {payment.interval}
                          </p>
                        </td>
                        <td className="py-3 pr-4 font-medium text-gray-900">{payment.formatted}</td>
                        <td className="py-3 pr-4">
                          <StatusBadge status={payment.status} />
                        </td>
                        <td className="py-3">
                          {payment.authorizationUrl ? (
                            <a
                              href={payment.authorizationUrl}
                              className="text-sm font-medium text-emerald-700 hover:underline"
                            >
                              Resume
                            </a>
                          ) : (
                            <span className="text-xs text-gray-400">{payment.reference.slice(0, 16)}…</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </DashboardCard>
        </div>

        <div className="lg:col-span-2">
          <DashboardCard title="New payment">
            <p className="mb-4 text-sm text-gray-600">
              Pay with M-Pesa or card via Paystack. Currency:{" "}
              <span className="font-medium text-gray-900">{currency}</span>
            </p>

            <div className="mb-4 flex gap-2">
              {(["KES", "USD"] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setCurrency(code)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
                    currency === code
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Pro</p>
              {proProducts.map((product) => (
                <ProductPayRow
                  key={product.id}
                  product={product}
                  currency={currency}
                  loading={checkoutProductId === product.id}
                  onPay={() => startCheckout(product.id)}
                />
              ))}

              {familyProducts.length > 0 ? (
                <>
                  <p className="pt-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Family
                  </p>
                  {familyProducts.map((product) => (
                    <ProductPayRow
                      key={product.id}
                      product={product}
                      currency={currency}
                      loading={checkoutProductId === product.id}
                      onPay={() => startCheckout(product.id)}
                    />
                  ))}
                </>
              ) : null}
            </div>
          </DashboardCard>
        </div>
      </div>
    </DashboardPage>
  );
}

function ProductPayRow({
  product,
  currency,
  loading,
  onPay,
}: {
  product: CatalogProduct;
  currency: "KES" | "USD";
  loading: boolean;
  onPay: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 px-3 py-3">
      <div>
        <p className="text-sm font-medium text-gray-900 capitalize">{product.interval}</p>
        <p className="text-xs text-gray-500">{displayPrice(product.prices, currency)}</p>
      </div>
      <button
        type="button"
        disabled={loading}
        onClick={onPay}
        className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
      >
        {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <CreditCard className="h-3.5 w-3.5" />}
        Pay
      </button>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    completed: "bg-emerald-100 text-emerald-800",
    pending: "bg-amber-100 text-amber-800",
    failed: "bg-red-100 text-red-800",
  };
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
        styles[status] ?? "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}

function formatDate(value: string): string {
  return new Date(value).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
