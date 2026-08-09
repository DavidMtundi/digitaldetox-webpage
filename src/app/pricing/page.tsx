"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Download, Loader2, Sparkles } from "lucide-react";
import PageHero from "@/components/marketing/page-hero";
import SectionHeader from "@/components/marketing/section-header";
import SectionShell from "@/components/marketing/section-shell";
import { PLAN_TIER_SUBTITLES } from "@/lib/marketing-copy";
import StatBar from "@/components/marketing/stat-bar";
import TrustBadges from "@/components/marketing/trust-badges";
import CtaBand, { CtaPrimary, CtaSecondary } from "@/components/marketing/cta-band";
import RevealOnScroll from "@/components/marketing/reveal-on-scroll";
import { useAuth } from "@/components/auth/auth-provider";
import {
  annualListFromMonthlyPrices,
  CatalogProduct,
  FALLBACK_CATALOG_PRODUCTS,
  fetchBillingCatalog,
  initiateCheckout,
} from "@/lib/billing";
import { bestAnnualSavings, maxAnnualSavingsPercent } from "@/lib/billing-discount";
import BillingIntervalToggle, { type BillingInterval } from "@/components/pricing/billing-interval-toggle";
import PricingAmount, { PricingAmountInline } from "@/components/pricing/pricing-amount";
import PricingFaqSection from "@/components/pricing/pricing-faq-section";
import PricingUnlockSection from "@/components/pricing/pricing-unlock-section";
import { detectDefaultCurrency, detectRegionCode } from "@/lib/geo";
import { MARKETING_PROOF_STATS } from "@/lib/marketing-content";
import {
  FAMILY_EXTRA_FEATURES,
  PRICING_TRUST_BADGES,
  PRO_FEATURES,
  STARTER_FEATURES,
} from "@/lib/pricing-content";

export default function PricingPage() {
  const { user, loading: authLoading } = useAuth();
  const [products, setProducts] = useState<CatalogProduct[]>(FALLBACK_CATALOG_PRODUCTS);
  const [checkoutCurrency, setCheckoutCurrency] = useState<"KES" | "USD">("KES");
  const [interval, setInterval] = useState<BillingInterval>("annual");
  const [loading, setLoading] = useState(true);
  const [checkoutProductId, setCheckoutProductId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const resumeCheckoutRef = useRef(false);

  useEffect(() => {
    const region = detectRegionCode();
    const detected = detectDefaultCurrency();
    setCheckoutCurrency(detected);

    fetchBillingCatalog(region)
      .then((catalog) => {
        if (catalog.products.length > 0) {
          setProducts(catalog.products);
        }
        const preferred =
          catalog.defaultCurrency === "KES" || catalog.defaultCurrency === "USD"
            ? catalog.defaultCurrency
            : detected;
        const supported = (catalog.supportedCurrencies ?? ["KES", "USD"]).filter(
          (code): code is "KES" | "USD" => code === "KES" || code === "USD",
        );
        setCheckoutCurrency(supported.includes(preferred) ? preferred : supported[0] ?? detected);
      })
      .catch(() => {
        // Fall back to FALLBACK_CATALOG_PRODUCTS silently
      })
      .finally(() => setLoading(false));
  }, []);

  const proProducts = products.filter((p) => p.tier === "pro");
  const familyProducts = products.filter((p) => p.tier === "family");

  const maxSavingsPercent = maxAnnualSavingsPercent(
    [
      {
        monthly: proProducts.find((p) => p.interval === "monthly")?.prices ?? {},
        annual: proProducts.find((p) => p.interval === "annual")?.prices ?? {},
      },
      {
        monthly: familyProducts.find((p) => p.interval === "monthly")?.prices ?? {},
        annual: familyProducts.find((p) => p.interval === "annual")?.prices ?? {},
      },
    ],
  );

  const startCheckout = useCallback(
    async (productId: string) => {
      setError(null);
      setCheckoutProductId(productId);

      try {
        const siteUrl = window.location.origin;
        const { authorizationUrl } = await initiateCheckout({
          productId,
          currency: checkoutCurrency,
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
    [checkoutCurrency],
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
            Keep the hours
            <br />
            <span className="hero-accent">you mean to have.</span>
          </>
        }
        subtitle="Start free on any device. Upgrade when you want deeper focus, better habits, or a calmer home — pay with M-Pesa or card in Kenya, card worldwide."
        size="compact"
      >
        <BillingIntervalToggle
          value={interval}
          onChange={setInterval}
          savingsPercent={maxSavingsPercent}
        />
        <TrustBadges items={PRICING_TRUST_BADGES} />
      </PageHero>

      <StatBar stats={MARKETING_PROOF_STATS} />

      <SectionShell tone="mesh" id="plans" className="scroll-mt-28">
        <div className="mesh-section-header">
          <SectionHeader
            eyebrow="Plans"
            title="Choose who you're becoming"
            subtitle={
              user
                ? "Upgrade when you're ready for evenings back, deeper focus, or a calmer household."
                : "Browse plans below — sign in when you're ready to subscribe."
            }
          />
        </div>

        {error && (
          <div className="mx-auto mt-8 max-w-2xl rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
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
          <RevealOnScroll>
            <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-3">
              <StarterTierCard />
              <PricingCard
                title="Pro"
                subtitle={PLAN_TIER_SUBTITLES.pro}
                products={proProducts}
                interval={interval}
                checkoutCurrency={checkoutCurrency}
                benefits={[...PRO_FEATURES]}
                checkoutProductId={checkoutProductId}
                onCheckout={startCheckout}
                signInHref={signInHref}
                user={user}
                authLoading={authLoading}
              />
              <PricingCard
                title="Family"
                subtitle={PLAN_TIER_SUBTITLES.family}
                products={familyProducts}
                interval={interval}
                checkoutCurrency={checkoutCurrency}
                benefits={[...PRO_FEATURES, ...FAMILY_EXTRA_FEATURES]}
                checkoutProductId={checkoutProductId}
                onCheckout={startCheckout}
                signInHref={signInHref}
                user={user}
                authLoading={authLoading}
                highlighted
              />
            </div>
          </RevealOnScroll>
        )}

        <RevealOnScroll delay={80}>
          <div className="glass-card mx-auto mt-10 flex max-w-2xl items-start gap-4 border-emerald-100 !p-6">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
            <p className="text-sm leading-relaxed text-gray-700">
              Payments are processed securely by Paystack. M-Pesa renewals require manual approval each cycle — we&apos;ll remind you before expiry.
            </p>
          </div>
        </RevealOnScroll>
      </SectionShell>

      <SectionShell tone="default">
        <div className="mesh-section-header">
          <SectionHeader
            eyebrow="What you unlock"
            title="What Pro and Family unlock in your life"
            subtitle="Starter covers the essentials. Upgrade for schedules that stick, habits you can see, and peace at home."
          />
        </div>
        <PricingUnlockSection />
      </SectionShell>

      <SectionShell tone="mesh">
        <PricingFaqSection />
      </SectionShell>

      <CtaBand
        eyebrow="Get started"
        title="Take back tonight"
        subtitle="Core blocking and focus modes are free. Upgrade when you're ready for more."
      >
        <CtaPrimary href="/download">Download free</CtaPrimary>
        <CtaSecondary href="/contact">Contact us</CtaSecondary>
      </CtaBand>
    </div>
  );
}

function StarterTierCard() {
  return (
    <div className="glass-card flex flex-col !p-8">
      <h2 className="font-display text-2xl text-gray-900">Starter</h2>
      <p className="mt-1 text-sm text-gray-600">Core blocking on every platform</p>

      <div className="mt-6">
        <PricingAmount
          prices={{ KES: 0, USD: 0 }}
          primaryCurrency="KES"
          interval="monthly"
          priceNote="Free forever · no card required"
        />
      </div>

      <ul className="mt-6 space-y-2">
        {STARTER_FEATURES.map((benefit) => (
          <li key={benefit} className="flex items-start gap-2 text-sm text-gray-700">
            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
            {benefit}
          </li>
        ))}
      </ul>

      <Link
        href="/download"
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-center font-semibold text-gray-900 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800"
      >
        <Download className="h-4 w-4" />
        Download free
      </Link>
    </div>
  );
}

function PricingCard({
  title,
  subtitle,
  products,
  interval,
  checkoutCurrency,
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
  interval: BillingInterval;
  checkoutCurrency: "KES" | "USD";
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
  const active = interval === "annual" && annual ? annual : monthly;
  const savings = monthly && annual ? bestAnnualSavings(monthly.prices, annual.prices) : null;

  const compareAtPrices =
    interval === "annual" && monthly ? annualListFromMonthlyPrices(monthly.prices) : null;

  const priceNote =
    interval === "annual"
      ? savings
        ? `Save ${savings.percent}% vs paying monthly · cancel anytime`
        : "Cancel anytime · billed once per year"
      : "Cancel anytime · billed monthly";

  const checkoutNote = `Checkout in ${checkoutCurrency === "KES" ? "KES (M-Pesa or card)" : "USD (card)"} based on your location`;

  return (
    <div className={`glass-card flex flex-col !p-8 ${highlighted ? "gradient-border ring-2 ring-emerald-100" : ""}`}>
      {highlighted && (
        <span className="mb-4 inline-flex items-center gap-1 self-start rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white">
          <Sparkles className="h-3 w-3" /> Best value
        </span>
      )}
      {interval === "annual" && savings && (
        <span className="mb-3 self-start rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
          Save {savings.percent}% · {savings.monthsSaved} months free
        </span>
      )}
      <h2 className="font-display text-2xl text-gray-900">{title}</h2>
      <p className="mt-1 text-sm text-gray-600">{subtitle}</p>

      {active ? (
        <div className="mt-6">
          <PricingAmount
            prices={active.prices}
            primaryCurrency={checkoutCurrency}
            compareAtPrices={compareAtPrices}
            interval={interval}
            priceNote={priceNote}
          />
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
        {monthly && interval === "monthly" && (
          <PlanButton
            label="Subscribe monthly"
            prices={monthly.prices}
            primaryCurrency={checkoutCurrency}
            loading={checkoutProductId === monthly.id}
            disabled={authLoading || checkoutProductId !== null}
            onClick={() => onCheckout(monthly.id)}
            signInHref={signInHref(monthly.id)}
            signedIn={Boolean(user)}
          />
        )}
        {annual && interval === "annual" && (
          <PlanButton
            label="Subscribe yearly"
            prices={annual.prices}
            primaryCurrency={checkoutCurrency}
            badge={
              savings
                ? `Save ${savings.percent}% · ${savings.monthsSaved} months free`
                : undefined
            }
            loading={checkoutProductId === annual.id}
            disabled={authLoading || checkoutProductId !== null}
            onClick={() => onCheckout(annual.id)}
            signInHref={signInHref(annual.id)}
            signedIn={Boolean(user)}
          />
        )}
        <p className="text-center text-[11px] text-gray-500">{checkoutNote}</p>
      </div>
    </div>
  );
}

function PlanButton({
  label,
  prices,
  primaryCurrency,
  badge,
  loading,
  disabled,
  onClick,
  signInHref,
  signedIn,
  secondary = false,
}: {
  label: string;
  prices: Record<string, number>;
  primaryCurrency: "KES" | "USD";
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
    <div className="shrink-0">
      <PricingAmountInline prices={prices} primaryCurrency={primaryCurrency} />
      {!signedIn ? <div className="mt-0.5 text-right text-xs opacity-80">Sign in to subscribe</div> : null}
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
        {!loading && priceBlock}
      </div>
    </button>
  );
}
