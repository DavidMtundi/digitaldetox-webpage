"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import SectionHeader from "@/components/marketing/section-header";
import FocusBackground from "@/components/marketing/focus-background";
import TrustBadges from "@/components/marketing/trust-badges";
import RevealOnScroll from "@/components/marketing/reveal-on-scroll";
import BillingIntervalToggle, { type BillingInterval } from "@/components/pricing/billing-interval-toggle";
import PricingAmount from "@/components/pricing/pricing-amount";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import {
  annualListFromMonthlyPrices,
  CatalogProduct,
  FALLBACK_CATALOG_PRODUCTS,
  fetchBillingCatalog,
  type BillingCurrency,
} from "@/lib/billing";
import { bestAnnualSavings, maxAnnualSavingsPercent } from "@/lib/billing-discount";
import { detectDefaultCurrency, detectRegionCode } from "@/lib/geo";
import { PLAN_TIER_SUBTITLES, PRICING_TIER_TAGLINES } from "@/lib/marketing-copy";
import {
  FAMILY_EXTRA_FEATURES,
  PRICING_TRUST_BADGES,
  PRO_FEATURES,
  STARTER_FEATURES,
} from "@/lib/pricing-content";

function findTierProduct(products: CatalogProduct[], tier: string, interval: BillingInterval) {
  return products.find((p) => p.tier === tier && p.interval === interval);
}

export default function PricingPreview({ hideStarter = false }: { hideStarter?: boolean }) {
  const [products, setProducts] = useState<CatalogProduct[]>(FALLBACK_CATALOG_PRODUCTS);
  const [interval, setInterval] = useState<BillingInterval>("annual");
  const [displayCurrency, setDisplayCurrency] = useState<BillingCurrency>("KES");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setDisplayCurrency(detectDefaultCurrency());
    const region = detectRegionCode();

    fetchBillingCatalog(region)
      .then((catalog) => {
        if (catalog.products.length > 0) {
          setProducts(catalog.products);
        }
      })
      .catch(() => {
        // Fall back to FALLBACK_CATALOG_PRODUCTS silently
      })
      .finally(() => setLoading(false));
  }, []);

  const proMonthly = findTierProduct(products, "pro", "monthly");
  const proAnnual = findTierProduct(products, "pro", "annual");
  const familyMonthly = findTierProduct(products, "family", "monthly");
  const familyAnnual = findTierProduct(products, "family", "annual");

  const maxSavingsPercent = useMemo(
    () =>
      maxAnnualSavingsPercent([
        { monthly: proMonthly?.prices ?? {}, annual: proAnnual?.prices ?? {} },
        { monthly: familyMonthly?.prices ?? {}, annual: familyAnnual?.prices ?? {} },
      ]),
    [proMonthly, proAnnual, familyMonthly, familyAnnual],
  );

  function tierPricing(tier: "pro" | "family") {
    const monthly = findTierProduct(products, tier, "monthly");
    const annual = findTierProduct(products, tier, "annual");
    const active = interval === "annual" && annual ? annual : monthly;
    if (!active) return null;

    const savings = monthly && annual ? bestAnnualSavings(monthly.prices, annual.prices) : null;

    const compareAtPrices =
      interval === "annual" && monthly ? annualListFromMonthlyPrices(monthly.prices) : null;

    const priceNote =
      interval === "annual" ? "Cancel anytime · billed once per year" : "Cancel anytime · billed monthly";

    return {
      prices: active.prices,
      compareAtPrices,
      priceNote,
      savingsLabel:
        interval === "annual" && savings
          ? `Save ${savings.percent}% · ${savings.monthsSaved} months free`
          : undefined,
    };
  }

  const proPricing = tierPricing("pro");
  const familyPricing = tierPricing("family");

  return (
    <section id="pricing" className="relative overflow-hidden py-14 sm:py-20 md:py-28">
      <FocusBackground variant="section" />
      <div className="container-modern relative z-10">
        <div className="mesh-section-header">
          <SectionHeader
            eyebrow="Simple pricing"
            title="Invest in the time you keep"
            subtitle="Start free on any device. Upgrade when you want evenings back, deeper focus, or a calmer household."
          />
        </div>

        <div className="mb-6 flex flex-col items-center gap-6">
          <BillingIntervalToggle
            value={interval}
            onChange={setInterval}
            savingsPercent={maxSavingsPercent}
          />
          <TrustBadges items={PRICING_TRUST_BADGES} />
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
          </div>
        ) : (
          <div
            className={`grid gap-5 mx-auto max-w-6xl ${hideStarter ? "md:grid-cols-2 max-w-4xl" : "md:grid-cols-3"}`}
          >
            {!hideStarter && (
              <RevealOnScroll>
                <PricingTierCard
                  name="Starter"
                  tagline={PRICING_TIER_TAGLINES.starter}
                  prices={{ KES: 0, USD: 0 }}
                  primaryCurrency={displayCurrency}
                  interval={interval}
                  priceNote="Download and get started"
                  features={[...STARTER_FEATURES]}
                  cta={{ label: "Download", href: "/download", external: false }}
                  variant="free"
                />
              </RevealOnScroll>
            )}

            {proPricing && (
              <RevealOnScroll delay={hideStarter ? 0 : 80}>
                <PricingTierCard
                  name="Pro"
                  tagline={PRICING_TIER_TAGLINES.pro}
                  prices={proPricing.prices}
                  primaryCurrency={displayCurrency}
                  compareAtPrices={proPricing.compareAtPrices}
                  interval={interval}
                  savingsLabel={proPricing.savingsLabel}
                  priceNote={proPricing.priceNote}
                  features={[...PRO_FEATURES]}
                  cta={{
                    label: interval === "annual" ? "Get Pro yearly" : "Get Pro",
                    href: "/pricing",
                    external: false,
                  }}
                  variant="pro"
                  paymentIcons
                />
              </RevealOnScroll>
            )}

            {familyPricing && (
              <RevealOnScroll delay={hideStarter ? 80 : 160}>
                <PricingTierCard
                  name="Family"
                  tagline={PRICING_TIER_TAGLINES.family}
                  prices={familyPricing.prices}
                  primaryCurrency={displayCurrency}
                  compareAtPrices={familyPricing.compareAtPrices}
                  interval={interval}
                  savingsLabel={familyPricing.savingsLabel}
                  priceNote={familyPricing.priceNote}
                  features={[...PRO_FEATURES, ...FAMILY_EXTRA_FEATURES]}
                  cta={{
                    label: interval === "annual" ? "Get Family yearly" : "Get Family",
                    href: "/pricing",
                    external: false,
                  }}
                  variant="family"
                  highlighted
                  paymentIcons
                />
              </RevealOnScroll>
            )}
          </div>
        )}

        <RevealOnScroll delay={120}>
          <div className="mt-10 text-center">
            <Link
              href="/pricing"
              className="pricing-preview-link inline-flex items-center gap-2 text-emerald-700 font-semibold hover:text-emerald-800 transition"
            >
              See full plan details & checkout
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

function PricingTierCard({
  name,
  tagline,
  prices,
  primaryCurrency,
  compareAtPrices,
  interval,
  savingsLabel,
  priceNote,
  features,
  cta,
  variant,
  highlighted = false,
  paymentIcons = false,
}: {
  name: string;
  tagline: string;
  prices: Record<string, number>;
  primaryCurrency: BillingCurrency;
  compareAtPrices?: Record<string, number> | null;
  interval: BillingInterval;
  savingsLabel?: string;
  priceNote?: string;
  features: string[];
  cta: { label: string; href: string; external: boolean };
  variant: "free" | "pro" | "family";
  highlighted?: boolean;
  paymentIcons?: boolean;
}) {
  return (
    <div
      className={`pricing-tier-card glass-card flex h-full flex-col !p-8 ${
        highlighted ? "gradient-border ring-2 ring-emerald-100 dark:ring-emerald-900/40" : ""
      } ${variant === "pro" ? "pricing-tier-card-pro" : ""}`}
    >
      {highlighted && (
        <span className="mb-4 self-start rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
          Most popular
        </span>
      )}
      {savingsLabel && (
        <span className="pricing-tier-savings mb-3 self-start rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
          {savingsLabel}
        </span>
      )}
      <h3 className="pricing-tier-title type-card-title text-2xl text-gray-900">{name}</h3>
      <p className="pricing-tier-tagline mt-1 text-sm text-gray-600">{tagline}</p>

      <div className="mt-6 mb-8">
        <PricingAmount
          prices={prices}
          primaryCurrency={primaryCurrency}
          compareAtPrices={compareAtPrices}
          interval={interval}
          priceNote={priceNote}
        />
      </div>

      <ul className="space-y-2.5 flex-1">
        {features.map((feature) => (
          <li key={feature} className="pricing-tier-feature flex items-start gap-2 text-sm text-gray-700">
            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
            {feature}
          </li>
        ))}
      </ul>

      <Link
        href={cta.href}
        className={`mt-6 block w-full rounded-xl px-4 py-3 text-center font-semibold transition ${
          variant === "free"
            ? "border border-gray-200 bg-gray-50 text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
            : "bg-emerald-600 text-white hover:bg-emerald-700"
        }`}
      >
        {cta.label}
      </Link>

      {paymentIcons && (
        <p className="pricing-tier-footnote mt-3 text-center text-[11px] text-gray-400">
          {variant === "family" ? "Paystack · Web checkout" : "Paystack · M-Pesa & card"}
        </p>
      )}
    </div>
  );
}
