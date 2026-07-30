"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  Gift,
  Heart,
  Shield,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import PageHero from "@/components/marketing/page-hero";
import SectionHeader from "@/components/marketing/section-header";
import SectionShell from "@/components/marketing/section-shell";
import BentoFeatures from "@/components/marketing/bento-features";
import StatBar from "@/components/marketing/stat-bar";
import { MARKETING_PROOF_STATS } from "@/lib/marketing-content";
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
            <span className="hero-accent">digital wellness.</span>
          </>
        }
        subtitle="Donations fund tools that help people reclaim their focus on demand."
      />

      <StatBar stats={MARKETING_PROOF_STATS} />

      <SectionShell tone="default">
        <div className="mesh-section-header">
          <SectionHeader
            eyebrow="Impact"
            title="Where your gift goes"
            subtitle="100% funds development and community programs."
          />
        </div>
        <BentoFeatures items={BENEFITS} />
      </SectionShell>

      <SectionShell tone="mesh">
        <div className="mx-auto max-w-2xl">
          <div className="mesh-section-header">
            <SectionHeader eyebrow="Donate" title="Choose an amount" subtitle="One-time gifts. No subscription." />
          </div>
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
                    ? "border-emerald-500 bg-emerald-50 shadow-lg dark:bg-emerald-950/30"
                    : "border-gray-200 bg-white hover:border-emerald-300 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-emerald-700"
                } ${!canDonate ? "cursor-not-allowed opacity-60" : ""}`}
              >
                {option.popular && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600 px-2.5 py-0.5 text-[10px] font-bold uppercase text-white">
                    Popular
                  </span>
                )}
                <div className="font-display text-2xl font-bold text-gray-900 dark:text-gray-50">{option.label}</div>
                <div className="mt-1 text-xs text-gray-500">One-time</div>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={openDonation}
            disabled={!canDonate}
            className={`mt-6 flex w-full min-h-[48px] items-center justify-center gap-2 rounded-full py-4 text-sm font-semibold transition ${
              canDonate
                ? "bg-emerald-500 text-gray-950 shadow-lg shadow-emerald-500/25 hover:-translate-y-0.5 hover:bg-emerald-400"
                : "cursor-not-allowed bg-gray-200 text-gray-500 dark:bg-gray-800 dark:text-gray-500"
            }`}
          >
            <Gift className="h-5 w-5" />
            Custom amount
            <ArrowRight className="h-4 w-4" />
          </button>
          <div className="mt-6 flex flex-wrap justify-center gap-6 rounded-2xl border border-emerald-100 bg-white/80 p-5 text-sm text-gray-600 dark:border-gray-700 dark:bg-gray-900/80 dark:text-gray-400">
            <span className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-600" /> Secure
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-600" /> One-time
            </span>
            <span className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-emerald-600" /> 100% to dev
            </span>
          </div>
          {!canDonate && (
            <p className="mt-4 text-center text-sm text-gray-500">Donation link coming soon.</p>
          )}
        </div>
      </SectionShell>
    </div>
  );
}
