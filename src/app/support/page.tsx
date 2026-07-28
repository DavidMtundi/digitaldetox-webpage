"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  Gift,
  Heart,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import PageHero from "@/components/marketing/page-hero";
import SectionHeader from "@/components/marketing/section-header";
import SectionShell from "@/components/marketing/section-shell";
import BentoFeatures from "@/components/marketing/bento-features";
import StatShowcase from "@/components/marketing/stat-showcase";
import CtaBand, { CtaPrimary } from "@/components/marketing/cta-band";
import { useExternalLinks } from "@/hooks/useExternalLinks";

const DONATION_AMOUNTS = [
  { amount: 10, label: "$10", popular: false },
  { amount: 25, label: "$25", popular: true },
  { amount: 50, label: "$50", popular: false },
  { amount: 100, label: "$100", popular: false },
];

const BENEFITS = [
  { icon: Sparkles, title: "Premium features", description: "Fund AI insights and cross-platform sync.", accent: "emerald" as const },
  { icon: Shield, title: "Privacy-first", description: "Support transparent, local-first data practices.", accent: "teal" as const },
  { icon: Users, title: "Community growth", description: "Reach more people struggling with digital overload.", accent: "amber" as const },
  { icon: TrendingUp, title: "Innovation", description: "Fuel R&D for next-gen wellness tools.", accent: "rose" as const },
];

export default function Support() {
  const [selected, setSelected] = useState("$25");
  const { links } = useExternalLinks();
  const donationUrl = links.donation.url || "#";
  const canDonate = Boolean(donationUrl && donationUrl !== "#");

  const openDonation = () => {
    if (canDonate) window.open(donationUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="marketing-page">
      <PageHero
        eyebrow="Support our mission"
        title={
          <>
            Fuel the future of
            <br />
            <span className="italic text-emerald-800">
              digital wellness.
            </span>
          </>
        }
        subtitle="Donations keep core features free and fund tools that help people reclaim their focus."
      />

      <SectionShell tone="dark" className="!py-16">
        <StatShowcase
          stats={[
            { value: "500+", label: "Beta testers", icon: Users },
            { value: "50K+", label: "Hours tested", icon: Zap },
            { value: "4.9/5", label: "Rating", icon: Star },
          ]}
        />
      </SectionShell>

      <SectionShell tone="white">
        <SectionHeader eyebrow="Impact" title="Where your gift goes" subtitle="100% funds development and community programs." />
        <BentoFeatures items={BENEFITS} />
      </SectionShell>

      <SectionShell tone="mesh">
        <div className="mx-auto max-w-2xl">
          <SectionHeader eyebrow="Donate" title="Choose an amount" subtitle="One-time gifts. No subscription." />
          <div className="donation-grid">
            {DONATION_AMOUNTS.map((option) => (
              <button
                key={option.amount}
                type="button"
                onClick={() => {
                  setSelected(option.label);
                  openDonation();
                }}
                disabled={!canDonate}
                className={`donation-tile ${
                  option.popular || selected === option.label
                    ? "border-emerald-500 bg-emerald-50 shadow-lg"
                    : "border-gray-200 bg-white hover:border-emerald-300"
                } ${!canDonate ? "cursor-not-allowed opacity-60" : ""}`}
              >
                {option.popular && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600 px-2.5 py-0.5 text-[10px] font-bold uppercase text-white">
                    Popular
                  </span>
                )}
                <div className="font-display text-2xl text-gray-900">{option.label}</div>
                <div className="mt-1 text-xs text-gray-500">One-time</div>
              </button>
            ))}
          </div>
          <button type="button" onClick={openDonation} disabled={!canDonate} className={`mt-6 flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-semibold ${canDonate ? "btn-primary" : "cursor-not-allowed bg-gray-200 text-gray-500"}`}>
            <Gift className="h-5 w-5" />
            Custom amount
            <ArrowRight className="h-4 w-4" />
          </button>
          <div className="mt-6 flex flex-wrap justify-center gap-6 rounded-2xl border border-emerald-100 bg-white/80 p-5 text-sm text-gray-600">
            <span className="flex items-center gap-2"><Shield className="h-4 w-4 text-emerald-600" /> Secure</span>
            <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-emerald-600" /> One-time</span>
            <span className="flex items-center gap-2"><Heart className="h-4 w-4 text-emerald-600" /> 100% to dev</span>
          </div>
        </div>
      </SectionShell>

      <CtaBand title="Every gift moves us forward" subtitle="Core features stay free for everyone, forever.">
        {canDonate ? <CtaPrimary href={donationUrl} external>Donate now</CtaPrimary> : <span className="text-emerald-50">Donation link coming soon</span>}
      </CtaBand>
    </div>
  );
}
