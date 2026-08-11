"use client";

import {
  Download,
  Moon,
  Sparkles,
} from "lucide-react";
import HomePlugHero from "@/components/marketing/home-plug-hero";
import SectionHeader from "@/components/marketing/section-header";
import SectionShell from "@/components/marketing/section-shell";
import HowItWorks from "@/components/marketing/how-it-works";
import PlatformStrip from "@/components/marketing/platform-strip";
import PricingPreview from "@/components/pricing/pricing-preview";
import StatBar from "@/components/marketing/stat-bar";
import ProductFaqSection from "@/components/marketing/product-faq-section";
import FeatureTabsSection, { buildDefaultFeatureTabs } from "@/components/marketing/feature-tabs-showcase";
import ParentsSection from "@/components/marketing/parents-section";
import ReviewCarousel, { type ReviewItem } from "@/components/marketing/review-carousel";
import { HOME_PROOF_STATS } from "@/lib/marketing-copy";
import { marketingMedia } from "@/lib/marketing-media";
import { useExternalLinks } from "@/hooks/useExternalLinks";

const STEPS = [
  {
    icon: Download,
    title: "Two minutes to a calmer default",
    description: "Install and sign in — you're almost protected before the next distraction hits.",
  },
  {
    icon: Moon,
    title: "Rules that run without you",
    description: "Set study hours, work blocks, or bedtime — Pauseward keeps them even when willpower doesn't.",
  },
  {
    icon: Sparkles,
    title: "Feel the difference",
    description: "More done. Less 'where did the evening go?' — see habits improve week by week.",
  },
];

const FEATURE_TABS = buildDefaultFeatureTabs(marketingMedia.featureTabs);

const REVIEWS: ReviewItem[] = [
  {
    name: "Grace M.",
    role: "Parent · Nairobi",
    initials: "GM",
    gradient: "from-rose-400 to-pink-500",
    quote:
      "My teens can't sneak past website blocks anymore. Evening schedules finally stick — and I didn't have to read their messages.",
  },
  {
    name: "Amina K.",
    role: "Student · Nairobi",
    initials: "AK",
    gradient: "from-emerald-400 to-teal-500",
    quote: "Pauseward made Twitter boring enough that I actually finish assignments.",
  },
  {
    name: "James O.",
    role: "Software developer",
    initials: "JO",
    gradient: "from-teal-400 to-cyan-500",
    quote:
      "I finally leave work at work — no more 'five more minutes' that turn into an hour on my phone.",
  },
];

export default function Home() {
  const { links } = useExternalLinks();

  return (
    <div className="marketing-page">
      <HomePlugHero />

      <StatBar stats={HOME_PROOF_STATS} />

      <SectionShell tone="default" id="features">
        <FeatureTabsSection
          eyebrow="What changes"
          title="Life with fewer scroll spirals"
          subtitle="Not a list of tools — real shifts in how your day feels when Pauseward is on."
          items={FEATURE_TABS}
        />
      </SectionShell>

      <SectionShell tone="mesh" id="families" className="scroll-mt-28">
        <ParentsSection />
      </SectionShell>

      <section id="how-it-works" className="how-it-works-band scroll-mt-28">
        <div className="container-modern">
          <div className="how-it-works-heading mx-auto max-w-2xl text-center">
            <p className="page-eyebrow">How it works</p>
            <h2 className="font-display text-2xl tracking-tight text-gray-900 dark:text-gray-50 md:text-3xl">
              Protected in minutes — different by tonight
            </h2>
          </div>
          <HowItWorks steps={STEPS} compact />
        </div>
      </section>

      <SectionShell tone="mesh" id="download" className="scroll-mt-28">
        <div className="mesh-section-header">
          <SectionHeader
            eyebrow="Platforms"
            title="One calm setup on every screen"
            subtitle="Phone, laptop, or TV — the same boundaries follow you so you don't rebuild habits on each device."
          />
        </div>
        <PlatformStrip downloadLinks={links.downloadLinks} />
      </SectionShell>

      <ReviewCarousel items={REVIEWS} label="What changes after a week" />

      <SectionShell tone="default" id="faq" className="scroll-mt-28">
        <ProductFaqSection compact />
      </SectionShell>

      <PricingPreview hideStarter />

      <section className="home-pricing-note border-t border-emerald-100/60 bg-white/90 py-6 text-center dark:border-emerald-900/30 dark:bg-gray-900/90">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Core blocking is available on every platform.{" "}
          <a
            href="/pricing"
            className="font-semibold text-emerald-700 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            Compare all plans including Starter
          </a>
        </p>
      </section>
    </div>
  );
}
