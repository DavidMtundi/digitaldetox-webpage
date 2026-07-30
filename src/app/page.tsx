"use client";

import {
  Download,
  Moon,
  Sparkles,
} from "lucide-react";
import PlugStyleHero, {
  PlugHeroCtaPrimary,
  PlugHeroCtaSecondary,
} from "@/components/marketing/plug-style-hero";
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
import { marketingMedia } from "@/lib/marketing-media";
import { useExternalLinks } from "@/hooks/useExternalLinks";

const STEPS = [
  {
    icon: Download,
    title: "Download & connect",
    description: "Install on your device in under two minutes. Sign in to sync across platforms.",
  },
  {
    icon: Moon,
    title: "Set your boundaries",
    description: "Pick apps, sites, and schedules that match your day — work, study, or wind-down.",
  },
  {
    icon: Sparkles,
    title: "Reclaim your focus",
    description: "Boundaries hold through the day — see what improved and build better habits over time.",
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
    quote: "Network-level blocking finally stuck — I can't bypass it in seconds anymore.",
  },
];

export default function Home() {
  const { links } = useExternalLinks();

  return (
    <div className="marketing-page">
      <PlugStyleHero
        title={
          <>
            Your <span className="text-emerald-400">Focus</span> Deserves
            <br />
            <span className="text-emerald-400">Boundaries That Hold</span>
          </>
        }
        phones={{
          left: marketingMedia.features[0],
          center: marketingMedia.hero.image,
          right: marketingMedia.features[1],
        }}
        socialProof={{
          text: "For individuals and families — focus protection on demand",
        }}
      >
        <PlugHeroCtaPrimary href="#download">Get the app</PlugHeroCtaPrimary>
        <PlugHeroCtaSecondary href="/pricing">View pricing</PlugHeroCtaSecondary>
      </PlugStyleHero>

      <StatBar
        stats={[
          { value: "On demand", label: "Focus protection" },
          { value: "1 tap", label: "Focus modes" },
          { value: "4", label: "Platforms" },
          { value: "Family", label: "Up to 6 devices" },
        ]}
      />

      <SectionShell tone="default" id="features">
        <FeatureTabsSection
          eyebrow="Features"
          title="Everything you need to protect your focus"
          subtitle="Watch how each tool works — app blocking, focus modes, website blocking, and insights."
          items={FEATURE_TABS}
        />
      </SectionShell>

      <SectionShell tone="mesh" id="families" className="scroll-mt-28">
        <ParentsSection />
      </SectionShell>

      <section className="how-it-works-band">
        <div className="container-modern">
          <div className="how-it-works-heading mx-auto max-w-2xl text-center">
            <p className="page-eyebrow">How it works</p>
            <h2 className="font-display text-2xl tracking-tight text-gray-900 dark:text-gray-50 md:text-3xl">
              Up and running in minutes
            </h2>
          </div>
          <HowItWorks steps={STEPS} compact />
        </div>
      </section>

      <SectionShell tone="mesh" id="download" className="scroll-mt-28">
        <div className="mesh-section-header">
          <SectionHeader
            eyebrow="Platforms"
            title="On every device you use"
            subtitle="Android, iOS, Windows, and macOS — block distractions and sync your boundaries across your whole setup."
          />
        </div>
        <PlatformStrip downloadLinks={links.downloadLinks} />
      </SectionShell>

      <ReviewCarousel items={REVIEWS} label="Stories from people who use Pauseward" />

      <SectionShell tone="default">
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
