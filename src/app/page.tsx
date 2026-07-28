"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Download,
  Globe,
  Lock,
  Moon,
  Shield,
  Smartphone,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import PageHero from "@/components/marketing/page-hero";
import SectionHeader from "@/components/marketing/section-header";
import SectionShell from "@/components/marketing/section-shell";
import TrustBadges from "@/components/marketing/trust-badges";
import BentoFeatures from "@/components/marketing/bento-features";
import HowItWorks from "@/components/marketing/how-it-works";
import StatShowcase from "@/components/marketing/stat-showcase";
import PlatformStrip from "@/components/marketing/platform-strip";
import MediaFrame from "@/components/marketing/media-frame";
import MediaSplit from "@/components/marketing/media-split";
import VideoShowcase from "@/components/marketing/video-showcase";
import CtaBand, { CtaPrimary, CtaSecondary } from "@/components/marketing/cta-band";
import PricingPreview from "@/components/pricing/pricing-preview";
import { marketingMedia } from "@/lib/marketing-media";
import { useExternalLinks } from "@/hooks/useExternalLinks";

const BENTO = [
  {
    icon: Smartphone,
    title: "App blocking",
    description: "Silence distracting apps during focus time with smart schedules and quick exceptions.",
    span: "hero" as const,
    accent: "emerald" as const,
  },
  {
    icon: Globe,
    title: "Website blocking",
    description: "Cut off feeds, rabbit holes, and adult content at the source.",
    accent: "teal" as const,
  },
  {
    icon: BarChart3,
    title: "Usage analytics",
    description: "See where your time goes and track real progress.",
    accent: "emerald" as const,
  },
  {
    icon: Zap,
    title: "Focus modes",
    description: "Work, study, sleep — one tap to switch your rules.",
    span: "wide" as const,
    accent: "amber" as const,
  },
  {
    icon: Lock,
    title: "Content protection",
    description: "Build healthier browsing with adult content blocking built in.",
    accent: "rose" as const,
  },
];

const STEPS = [
  {
    icon: Download,
    title: "Download & connect",
    description: "Install on Android in under two minutes. Sign in to sync across devices.",
  },
  {
    icon: Moon,
    title: "Set your boundaries",
    description: "Pick apps, sites, and schedules that match your day — work, study, or wind-down.",
  },
  {
    icon: Sparkles,
    title: "Reclaim your focus",
    description: "Track habits, stay accountable, and upgrade to Pro when you need more power.",
  },
];

export default function Home() {
  const { links } = useExternalLinks();

  return (
    <div className="marketing-page">
      <PageHero
        eyebrow="Digital wellness · Kenya-first"
        title={
          <>
            Pause before
            <br />
            <span className="hero-accent">distraction.</span>
          </>
        }
        subtitle="Block apps, protect your attention, and build healthier digital habits. Core features stay free — Pro unlocks the full toolkit."
        media={
          <MediaFrame image={marketingMedia.hero.image} aspect="phone" priority floating />
        }
        align="left"
      >
        <Link href="/pricing" className="btn-primary btn-arrow-nudge inline-flex items-center gap-2">
          View pricing
          <ArrowRight className="btn-arrow-icon h-4 w-4" />
        </Link>
        <Link href="/contact" className="btn-secondary">
          Book a demo
        </Link>
      </PageHero>

      <section className="border-y border-emerald-100/50 bg-white/80 py-6 backdrop-blur-sm">
        <div className="container-modern">
          <TrustBadges
            items={[
              { icon: Shield, label: "Core features free" },
              { icon: Users, label: "500+ beta testers" },
              { icon: Smartphone, label: "Android live now" },
            ]}
          />
        </div>
      </section>

      <SectionShell tone="default">
        <SectionHeader
          eyebrow="Get started"
          title="Available on Android today"
          subtitle="More platforms are shipping soon. Join the beta and shape what we build next."
        />
        <PlatformStrip
          items={[
            { label: "Android", status: "live", href: links.downloadLinks.googlePlay || undefined },
            { label: "iOS", status: "soon" },
            { label: "Windows", status: "soon" },
            { label: "macOS", status: "beta" },
          ]}
        />
      </SectionShell>

      <SectionShell tone="white">
        <SectionHeader
          eyebrow="How it works"
          title="Up and running in minutes"
          subtitle="Three simple steps to start protecting your focus."
        />
        <HowItWorks steps={STEPS} />
      </SectionShell>

      <SectionShell tone="mesh">
        <MediaSplit
          media={
            <VideoShowcase
              source={marketingMedia.demo.video}
              poster={marketingMedia.demo.poster}
              title="how Pauseward works"
            />
          }
        >
          <SectionHeader
            align="left"
            eyebrow="Product tour"
            title="See it in action"
            subtitle="Watch blocking, focus sessions, and insights come together — or drop in your own demo reel."
          />
          <Link href="/download" className="btn-primary btn-arrow-nudge mt-4 inline-flex items-center gap-2">
            Try it free
            <ArrowRight className="btn-arrow-icon h-4 w-4" />
          </Link>
        </MediaSplit>
      </SectionShell>

      <SectionShell tone="white">
        <SectionHeader
          eyebrow="Features"
          title="Designed for deep focus"
          subtitle="A bento of tools that work together — not another generic blocker."
        />
        <BentoFeatures items={BENTO} />
      </SectionShell>

      <SectionShell tone="default">
        <MediaSplit
          reverse
          media={<MediaFrame image={marketingMedia.features[1]} aspect="wide" />}
        >
          <SectionHeader
            align="left"
            eyebrow="Insights"
            title="Know your patterns"
            subtitle="Beautiful analytics that show where time goes — so you can change it for good."
          />
        </MediaSplit>
      </SectionShell>

      <PricingPreview />

      <SectionShell tone="dark">
        <SectionHeader
          light
          eyebrow="Community"
          title="Built with 500+ beta testers"
          subtitle="Real feedback from Kenya and beyond shapes every release."
        />
        <StatShowcase
          stats={[
            { value: "500+", label: "Active beta testers", icon: Users },
            { value: "4.9/5", label: "Community rating", icon: Sparkles },
            { value: "50K+", label: "Hours tested", icon: Shield },
          ]}
        />
        <div className="mt-12 text-center">
          <a
            href={links.downloadLinks.googlePlay}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download for Android
          </a>
        </div>
      </SectionShell>

      <CtaBand
        title="Ready to take back your time?"
        subtitle="Start free on Android. Upgrade with M-Pesa or card in Kenya."
      >
        <CtaPrimary href={links.downloadLinks.googlePlay} external>
          Get the app
        </CtaPrimary>
        <CtaSecondary href="/pricing">View pricing</CtaSecondary>
      </CtaBand>
    </div>
  );
}
