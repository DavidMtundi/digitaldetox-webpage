"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Loader2, Shield, Sparkles } from "lucide-react";
import PageHero from "@/components/marketing/page-hero";
import SectionShell from "@/components/marketing/section-shell";
import SectionHeader from "@/components/marketing/section-header";
import { useAuth } from "@/components/auth/auth-provider";
import {
  CatalogProduct,
  displayPrice,
  FALLBACK_CATALOG_PRODUCTS,
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
  const [products, setProducts] = useState<CatalogProduct[]>(FALLBACK_CATALOG_PRODUCTS);
  const [currency, setCurrency] = useState<"KES" | "USD">("KES");
  const [loading, setLoading] = useState(true);
  const [catalogLive, setCatalogLive] = useState(false);
  const [checkoutProductId, setCheckoutProductId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const resumeCheckoutRef = useRef(false);

  useEffect(() => {
    const region = detectRegionCode();
    const detected = detectDefaultCurrency();
    setCurrency(detected);

    fetchBillingCatalog(region)
      .then((catalog) => {
        if (catalog.products.length > 0) {
          setProducts(catalog.products);
        }
        if (catalog.defaultCurrency === "KES" || catalog.defaultCurrency === "USD") {
          setCurrency(catalog.defaultCurrency);
        }
        setCatalogLive(true);
      })
      .catch(() => {
        setError("Showing estimated prices — live catalog is temporarily unavailable.");
      })
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

  useEffect(() => {
    if (!user || authLoading || loading || resumeCheckoutRef.current) return;

    const productId = new URLSearchParams(window.location.search).get("product");
    if (!productId || !products.some((product) => product.id === productId)) return;

    resumeCheckoutRef.current = true;
    void startCheckout(productId);
  }, [user, authLoading, loading, products, startCheckout]);

  function signInHref(productId: string) {
    const redirect = `/pricing?product=${encodeURIComponent(productId)}`;
    return `/dashboard/login?redirect=${encodeURIComponent(redirect)}`;
  }

  return (
    <div className="marketing-page">
      <PageHero
        eyebrow="Pauseward Pro"
        title={
          <>
            Focus without
            <br />
            <span className="hero-accent">compromise.</span>
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
          subtitle={
            user
              ? "Upgrade when you need advanced blocking, analytics, and sync."
              : "Browse plans and prices below — sign in when you're ready to subscribe."
          }
        />

        {error && (
          <div
            className={`mx-auto mt-8 max-w-2xl rounded-xl border px-4 py-3 text-sm ${
              catalogLive
                ? "border-red-200 bg-red-50 text-red-800"
                : "border-amber-200 bg-amber-50 text-amber-900"
            }`}
          >
            {error}
            {!user && error.includes("sign in") && (
              <Link href="/dashboard/login?redirect=%2Fpricing" className="ml-2 font-semibold underline">
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
              signInHref={signInHref}
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
              signInHref={signInHref}
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
  signInHref,
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
  signInHref: (productId: string) => string;
  user: ReturnType<typeof useAuth>["user"];
  authLoading: boolean;
  highlighted?: boolean;
}) {
  const monthly = products.find((p) => p.interval === "monthly");
  const annual = products.find((p) => p.interval === "annual");
  const headlinePrice = monthly ? displayPrice(monthly.prices, currency) : null;

  return (
    <div className={`glass-card flex flex-col !p-8 ${highlighted ? "gradient-border ring-2 ring-emerald-100" : ""}`}>
      {highlighted && (
        <span className="mb-4 inline-flex items-center gap-1 self-start rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white">
          <Sparkles className="h-3 w-3" /> Best value
        </span>
      )}
      <h2 className="font-display text-2xl text-gray-900">{title}</h2>
      <p className="mt-1 text-sm text-gray-600">{subtitle}</p>

      {headlinePrice ? (
        <div className="mt-6">
          <p className="font-display text-4xl font-bold text-gray-900">{headlinePrice}</p>
          <p className="mt-1 text-xs text-gray-500">per month · cancel anytime</p>
        </div>
      ) : null}

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
            onClick={() => onCheckout(monthly.id)}
            signInHref={signInHref(monthly.id)}
            signedIn={Boolean(user)}
          />
        )}
        {annual && (
          <PlanButton
            label="Annual"
            price={displayPrice(annual.prices, currency)}
            badge="Save ~2 months"
            loading={checkoutProductId === annual.id}
            disabled={authLoading || checkoutProductId !== null}
            onClick={() => onCheckout(annual.id)}
            signInHref={signInHref(annual.id)}
            signedIn={Boolean(user)}
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
  signInHref,
  signedIn,
  secondary = false,
}: {
  label: string;
  price: string;
  badge?: string;
  loading: boolean;
  disabled: boolean;
  onClick: () => void;
  signInHref: string;
  signedIn: boolean;
  secondary?: boolean;
}) {
  const className = `flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition disabled:opacity-60 ${
    secondary
      ? "border border-gray-200 bg-gray-50 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
      : "bg-emerald-600 text-white hover:bg-emerald-700"
  }`;

  const priceBlock = (
    <div className="text-right">
      <div className="font-semibold">{price}</div>
      {!signedIn ? <div className="text-xs opacity-80">Sign in to subscribe</div> : null}
    </div>
  );

  if (!signedIn) {
    return (
      <Link href={signInHref} className={className}>
        <div>
          <div className="font-medium">{label}</div>
          {badge ? <div className="text-xs opacity-80">{badge}</div> : null}
        </div>
        {priceBlock}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} disabled={disabled} className={className}>
      <div>
        <div className="font-medium">{label}</div>
        {badge ? <div className="text-xs opacity-80">{badge}</div> : null}
      </div>
      <div className="flex items-center gap-2 font-semibold">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {price}
      </div>
    </button>
  );
}
