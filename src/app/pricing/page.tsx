"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Check, Loader2, Shield, Sparkles } from "lucide-react";
import PageHero from "@/components/marketing/page-hero";
import SectionShell from "@/components/marketing/section-shell";
import SectionHeader from "@/components/marketing/section-header";
import { useAuth } from "@/components/auth/auth-provider";
import {
  CatalogProduct,
  displayPrice,
  fetchBillingCatalog,
  initiateCheckout,
} from "@/lib/billing";
import { detectDefaultCurrency, detectRegionCode } from "@/lib/geo";

const BENEFITS = [
  "Advanced blocking & schedules",
  "Daily usage limits",
  "Deeper analytics & trends",
  "Sync across devices",
  "Priority support",
];

export default function PricingPage() {
  const { user, loading: authLoading } = useAuth();
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [currency, setCurrency] = useState<"KES" | "USD">("KES");
  const [loading, setLoading] = useState(true);
  const [checkoutProductId, setCheckoutProductId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const region = detectRegionCode();
    const detected = detectDefaultCurrency();
    setCurrency(detected);

    fetchBillingCatalog(region)
      .then((catalog) => {
        setProducts(catalog.products);
        if (catalog.defaultCurrency === "KES" || catalog.defaultCurrency === "USD") {
          setCurrency(catalog.defaultCurrency);
        }
      })
      .catch(() => setError("Could not load pricing. Try again later."))
      .finally(() => setLoading(false));
  }, []);

  const proProducts = products.filter((p) => p.tier === "pro");
  const familyProducts = products.filter((p) => p.tier === "family");

  const startCheckout = useCallback(
    async (productId: string) => {
      setError(null);
      setCheckoutProductId(productId);

      try {
        const siteUrl = window.location.origin;
        const { authorizationUrl } = await initiateCheckout({
          productId,
          currency,
          callbackUrl: `${siteUrl}/pricing/success`,
          cancelUrl: `${siteUrl}/pricing/cancel`,
        });
        window.location.href = authorizationUrl;
      } catch (e) {
        const message =
          e instanceof Error ? e.message : "Checkout failed. Please sign in and try again.";
        setError(message);
        setCheckoutProductId(null);
      }
    },
    [currency],
  );

  return (
    <div className="marketing-page">
      <PageHero
        eyebrow="Pauseward Pro"
        title={
          <>
            Focus without
            <br />
            <span className="italic text-emerald-800">compromise.</span>
          </>
        }
        subtitle={
          currency === "KES"
            ? "Pay with M-Pesa or card in Kenya. Core features stay free during launch."
            : "Pay with card worldwide. Core features stay free during launch."
        }
        size="compact"
      >
        <div className="currency-toggle inline-flex rounded-full border border-gray-200/80 bg-white/90 p-1 shadow-lg backdrop-blur-sm">
          {(["KES", "USD"] as const).map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setCurrency(code)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                currency === code ? "bg-emerald-600 text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {code === "KES" ? "Kenya (KES)" : "Global (USD)"}
            </button>
          ))}
        </div>
      </PageHero>

      <SectionShell tone="white" className="!pt-8">
        <SectionHeader
          eyebrow="Plans"
          title="Choose your level"
          subtitle="Upgrade when you need advanced blocking, analytics, and sync."
        />

        {error && (
          <div className="mx-auto mt-8 max-w-2xl rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {error}
            {!user && (
              <Link href="/dashboard/login" className="ml-2 font-semibold underline">
                Sign in
              </Link>
            )}
          </div>
        )}

        {loading ? (
          <div className="mt-16 flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
          </div>
        ) : (
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
            <PricingCard
              title="Pro"
              subtitle="For individuals who want deeper focus tools"
              products={proProducts}
              currency={currency}
              benefits={BENEFITS}
              checkoutProductId={checkoutProductId}
              onCheckout={startCheckout}
              user={user}
              authLoading={authLoading}
            />
            <PricingCard
              title="Family"
              subtitle="Up to 6 devices — best for households"
              products={familyProducts}
              currency={currency}
              benefits={[...BENEFITS, "Family dashboard", "Shared policies"]}
              checkoutProductId={checkoutProductId}
              onCheckout={startCheckout}
              user={user}
              authLoading={authLoading}
              highlighted
            />
          </div>
        )}

        <div className="glass-card mx-auto mt-10 flex max-w-2xl items-start gap-4 border-emerald-100 !p-6">
          <Shield className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
          <p className="text-sm leading-relaxed text-gray-700">
            Payments are processed securely by Paystack. M-Pesa renewals require manual approval each cycle — we&apos;ll remind you before expiry.
          </p>
        </div>
      </SectionShell>
    </div>
  );
}

function PricingCard({
  title,
  subtitle,
  products,
  currency,
  benefits,
  checkoutProductId,
  onCheckout,
  user,
  authLoading,
  highlighted = false,
}: {
  title: string;
  subtitle: string;
  products: CatalogProduct[];
  currency: "KES" | "USD";
  benefits: string[];
  checkoutProductId: string | null;
  onCheckout: (productId: string) => void;
  user: ReturnType<typeof useAuth>["user"];
  authLoading: boolean;
  highlighted?: boolean;
}) {
  const monthly = products.find((p) => p.interval === "monthly");
  const annual = products.find((p) => p.interval === "annual");

  return (
    <div className={`glass-card flex flex-col !p-8 ${highlighted ? "gradient-border ring-2 ring-emerald-100" : ""}`}>
      {highlighted && (
        <span className="mb-4 inline-flex items-center gap-1 self-start rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white">
          <Sparkles className="h-3 w-3" /> Best value
        </span>
      )}
      <h2 className="font-display text-2xl text-gray-900">{title}</h2>
      <p className="mt-1 text-sm text-gray-600">{subtitle}</p>

      <ul className="mt-6 space-y-2">
        {benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-2 text-sm text-gray-700">
            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
            {benefit}
          </li>
        ))}
      </ul>

      <div className="mt-8 space-y-3">
        {monthly && (
          <PlanButton
            label="Monthly"
            price={displayPrice(monthly.prices, currency)}
            loading={checkoutProductId === monthly.id}
            disabled={authLoading || checkoutProductId !== null}
            onClick={() => {
              if (!user) return;
              onCheckout(monthly.id);
            }}
            signInRequired={!user}
          />
        )}
        {annual && (
          <PlanButton
            label="Annual"
            price={displayPrice(annual.prices, currency)}
            badge="Save ~2 months"
            loading={checkoutProductId === annual.id}
            disabled={authLoading || checkoutProductId !== null}
            onClick={() => {
              if (!user) return;
              onCheckout(annual.id);
            }}
            signInRequired={!user}
            secondary
          />
        )}
      </div>
    </div>
  );
}

function PlanButton({
  label,
  price,
  badge,
  loading,
  disabled,
  onClick,
  signInRequired,
  secondary = false,
}: {
  label: string;
  price: string;
  badge?: string;
  loading: boolean;
  disabled: boolean;
  onClick: () => void;
  signInRequired: boolean;
  secondary?: boolean;
}) {
  if (signInRequired) {
    return (
      <Link
        href="/dashboard/login"
        className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition ${
          secondary
            ? "border border-gray-200 bg-gray-50 hover:bg-gray-100"
            : "bg-emerald-600 text-white hover:bg-emerald-700"
        }`}
      >
        <span className="font-medium">{label}</span>
        <span className="text-sm opacity-90">Sign in to subscribe</span>
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition disabled:opacity-60 ${
        secondary
          ? "border border-gray-200 bg-gray-50 hover:bg-gray-100"
          : "bg-emerald-600 text-white hover:bg-emerald-700"
      }`}
    >
      <div>
        <div className="font-medium">{label}</div>
        {badge && <div className="text-xs opacity-80">{badge}</div>}
      </div>
      <div className="flex items-center gap-2 font-semibold">
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {price}
      </div>
    </button>
  );
}
