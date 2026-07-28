"use client";

import { Award, Heart, Shield, Target, TrendingUp, Users } from "lucide-react";
import PageHero from "@/components/marketing/page-hero";
import SectionHeader from "@/components/marketing/section-header";
import SectionShell from "@/components/marketing/section-shell";
import BentoFeatures from "@/components/marketing/bento-features";
import MediaFrame from "@/components/marketing/media-frame";
import MediaSplit from "@/components/marketing/media-split";
import TrustBadges from "@/components/marketing/trust-badges";
import CtaBand, { CtaPrimary, CtaSecondary } from "@/components/marketing/cta-band";
import { marketingMedia } from "@/lib/marketing-media";

const VALUES = [
  {
    icon: Shield,
    title: "Protect your focus",
    description: "Block distractions during the moments that matter most.",
    accent: "emerald" as const,
  },
  {
    icon: Heart,
    title: "Improve wellbeing",
    description: "Sleep better, scroll less, reconnect with life offline.",
    accent: "rose" as const,
  },
  {
    icon: Target,
    title: "Build better habits",
    description: "Track patterns and change your relationship with tech.",
    accent: "teal" as const,
  },
];

const WHY = [
  { title: "Better focus", description: "Eliminate noise and concentrate on what counts." },
  { title: "More time", description: "Reclaim hours lost to endless notifications." },
  { title: "Better sleep", description: "Evening modes that protect your rest." },
];

export default function About() {
  return (
    <div className="marketing-page">
      <PageHero
        eyebrow="Our story"
        title={
          <>
            Wellness tools
            <br />
            <span className="hero-accent">built for real life.</span>
          </>
        }
        subtitle="We're helping people in Kenya and worldwide build healthier relationships with technology — one intentional pause at a time."
      >
        <TrustBadges
          items={[
            { icon: Users, label: "50,000+ users" },
            { icon: TrendingUp, label: "2M+ hours saved" },
            { icon: Award, label: "4.8/5 rating" },
          ]}
        />
      </PageHero>

      <SectionShell tone="white">
        <MediaSplit
          media={<MediaFrame image={marketingMedia.about} aspect="wide" />}
        >
          <SectionHeader
            align="left"
            eyebrow="Mission"
            title="Technology should serve you"
            subtitle="Pauseward puts you back in control — intentional use, not endless autopilot."
          />
          <p className="text-lead max-w-lg">
            We started with a simple idea: what if your phone helped you pause before distraction, instead of pulling you in?
          </p>
        </MediaSplit>
      </SectionShell>

      <SectionShell tone="mesh">
        <SectionHeader eyebrow="Values" title="What we stand for" />
        <BentoFeatures items={VALUES} />
      </SectionShell>

      <SectionShell tone="white">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            eyebrow="The problem"
            title="96 phone checks per day"
            subtitle="The average person reaches for their phone 96 times daily. Pauseward helps you take that number down."
          />
          <div className="quote-card text-center">
            <div className="font-display relative z-10 text-7xl font-bold text-emerald-700 md:text-8xl">96</div>
            <p className="relative z-10 mt-3 text-sm text-gray-500">Source: RescueTime research</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {WHY.map((item) => (
              <div key={item.title} className="glass-card !p-5">
                <h3 className="type-card-title">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell tone="default">
        <SectionHeader
          eyebrow="Approach"
          title="Research-led, community-shaped"
          subtitle="Science informs our features. Beta testers tell us what actually works."
        />
        <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
          <div className="glass-card">
            <h3 className="type-card-title text-lg">Research-based design</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              Grounded in behavioral psychology and habit formation — not dark patterns or guilt trips.
            </p>
          </div>
          <div className="glass-card">
            <h3 className="type-card-title text-lg">User-centered iteration</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              We ship what beta testers need in daily life, from M-Pesa billing to flexible block schedules.
            </p>
          </div>
        </div>
      </SectionShell>

      <CtaBand title="See what Pauseward can do" subtitle="Free on Android. Pro when you're ready.">
        <CtaPrimary href="/download">Get the app</CtaPrimary>
        <CtaSecondary href="/pricing">View pricing</CtaSecondary>
      </CtaBand>
    </div>
  );
}
