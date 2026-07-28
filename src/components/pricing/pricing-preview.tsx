"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SectionHeader from "@/components/marketing/section-header";
import FocusBackground from "@/components/marketing/focus-background";
import { ArrowRight, Check, CreditCard, Loader2, Smartphone } from "lucide-react";
import {
  CatalogProduct,
  displayPrice,
  fetchBillingCatalog,
} from "@/lib/billing";
import { detectDefaultCurrency, detectRegionCode } from "@/lib/geo";

const FREE_FEATURES = [
  "Basic app & website blocking",
  "Focus modes",
  "Usage insights",
  "Beta community access",
];

const PRO_FEATURES = [
  "Advanced blocking & schedules",
  "Daily limits & deep analytics",
  "Cross-device sync",
  "Priority support",
];

const FALLBACK_PRODUCTS: CatalogProduct[] = [
  {
    id: "pauseward_pro_monthly",
    tier: "pro",
    interval: "monthly",
    displayName: "Pauseward Pro",
    prices: { KES: 399, USD: 499 },
  },
  {
    id: "pauseward_family_monthly",
    tier: "family",
    interval: "monthly",
    displayName: "Pauseward Family",
    prices: { KES: 899, USD: 999 },
  },
];

export default function PricingPreview() {
  const [products, setProducts] = useState<CatalogProduct[]>(FALLBACK_PRODUCTS);
  const [currency, setCurrency] = useState<"KES" | "USD">("KES");
  const [loading, setLoading] = useState(true);
  const [apiConnected, setApiConnected] = useState(false);

  useEffect(() => {
    const region = detectRegionCode();
    setCurrency(detectDefaultCurrency());

    fetchBillingCatalog(region)
      .then((catalog) => {
        if (catalog.products.length > 0) {
          setProducts(catalog.products);
        }
        if (catalog.defaultCurrency === "KES" || catalog.defaultCurrency === "USD") {
          setCurrency(catalog.defaultCurrency);
        }
        setApiConnected(true);
      })
      .catch(() => {
        setApiConnected(false);
      })
      .finally(() => setLoading(false));
  }, []);

  const proMonthly = products.find((p) => p.tier === "pro" && p.interval === "monthly");
  const familyMonthly = products.find((p) => p.tier === "family" && p.interval === "monthly");

  return (
    <section id="pricing" className="relative overflow-hidden py-20 md:py-28">
      <FocusBackground variant="section" />
      <div className="container-modern relative z-10">
        <SectionHeader
          eyebrow="Simple pricing"
          title="Start free. Upgrade when you're ready."
          subtitle={`Core blocking stays free during beta. Pro unlocks advanced tools — pay with ${
            currency === "KES" ? "M-Pesa or card in Kenya" : "card worldwide"
          }.`}
        />

        <div className="mb-10 flex justify-center">
          <div className="currency-toggle inline-flex rounded-full border border-gray-200/80 bg-white/90 p-1 shadow-lg backdrop-blur-sm">
            {(["KES", "USD"] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setCurrency(code)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  currency === code
                    ? "bg-emerald-600 text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {code === "KES" ? "Kenya (KES)" : "Global (USD)"}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-5 max-w-6xl mx-auto">
            <PricingTierCard
              name="Free"
              tagline="Everything you need to get started"
              price="KSh 0"
              priceNote="Always free during beta"
              features={FREE_FEATURES}
              cta={{ label: "Download free", href: "/download", external: false }}
              variant="free"
            />

            {proMonthly && (
              <PricingTierCard
                name="Pro"
                tagline="For individuals who want deeper focus"
                price={displayPrice(proMonthly.prices, currency)}
                priceNote="per month · cancel anytime"
                features={PRO_FEATURES}
                cta={{ label: "Get Pro", href: "/pricing", external: false }}
                variant="pro"
                paymentIcons
              />
            )}

            {familyMonthly && (
              <PricingTierCard
                name="Family"
                tagline="Up to 6 devices — best for households"
                price={displayPrice(familyMonthly.prices, currency)}
                priceNote="per month · shared dashboard"
                features={[...PRO_FEATURES, "Family dashboard", "Shared policies"]}
                cta={{ label: "Get Family", href: "/pricing", external: false }}
                variant="family"
                highlighted
                paymentIcons
              />
            )}
          </div>
        )}

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Smartphone className="h-4 w-4 text-emerald-600" />
            <span>Android: subscribe in-app via Google Play</span>
          </div>
          <span className="hidden sm:inline text-gray-300">|</span>
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-emerald-600" />
            <span>Web: M-Pesa & card via Paystack</span>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-emerald-700 font-semibold hover:text-emerald-800 transition"
          >
            Compare monthly & annual plans
            <ArrowRight className="h-4 w-4" />
          </Link>
          {!apiConnected && (
            <p className="mt-2 text-xs text-gray-400">Showing estimated prices — live catalog unavailable</p>
          )}
        </div>
      </div>
    </section>
  );
}

function PricingTierCard({
  name,
  tagline,
  price,
  priceNote,
  features,
  cta,
  variant,
  highlighted = false,
  paymentIcons = false,
}: {
  name: string;
  tagline: string;
  price: string;
  priceNote: string;
  features: string[];
  cta: { label: string; href: string; external: boolean };
  variant: "free" | "pro" | "family";
  highlighted?: boolean;
  paymentIcons?: boolean;
}) {
  return (
    <div className={`glass-card flex flex-col !p-8 ${highlighted ? "gradient-border ring-2 ring-emerald-100" : ""} ${variant === "pro" ? "!bg-emerald-50/30" : ""}`}>
      {highlighted && (
        <span className="mb-4 self-start rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
          Most popular
        </span>
      )}
      <h3 className="type-card-title text-2xl text-gray-900">{name}</h3>
      <p className="mt-1 text-sm text-gray-600">{tagline}</p>

      <div className="mt-6 mb-8">
        <div className="font-display text-4xl font-bold text-gray-900">{price}</div>
        <div className="text-xs text-gray-500 mt-1">{priceNote}</div>
      </div>

      <ul className="space-y-2.5 flex-1">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-gray-700">
            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
            {feature}
          </li>
        ))}
      </ul>

      <Link
        href={cta.href}
        className={`mt-6 block w-full rounded-xl px-4 py-3 text-center font-semibold transition ${
          variant === "free"
            ? "border border-gray-200 bg-gray-50 text-gray-900 hover:bg-gray-100"
            : "bg-emerald-600 text-white hover:bg-emerald-700"
        }`}
      >
        {cta.label}
      </Link>

      {paymentIcons && (
        <p className="mt-3 text-center text-[11px] text-gray-400">
          {variant === "family" ? "Paystack · Web checkout" : "Paystack · M-Pesa & card"}
        </p>
      )}
    </div>
  );
}
