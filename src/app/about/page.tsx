"use client";

import PageHero from "@/components/marketing/page-hero";
import SectionShell from "@/components/marketing/section-shell";
import StatBar from "@/components/marketing/stat-bar";
import TrustBadges from "@/components/marketing/trust-badges";
import MediaFrame from "@/components/marketing/media-frame";
import AboutMissionSection from "@/components/marketing/about-mission-section";
import AboutValuesSection from "@/components/marketing/about-values-section";
import AboutProblemSection from "@/components/marketing/about-problem-section";
import AboutApproachSection from "@/components/marketing/about-approach-section";
import {
  PlugHeroCtaPrimary,
  PlugHeroCtaSecondary,
} from "@/components/marketing/plug-style-hero";
import { ABOUT_TRUST_BADGES, MARKETING_PROOF_STATS } from "@/lib/marketing-content";
import { marketingMedia } from "@/lib/marketing-media";

export default function About() {
  return (
    <div className="marketing-page">
      <PageHero
        eyebrow="Our story"
        align="left"
        size="compact"
        childrenLayout="stack"
        media={<MediaFrame image={marketingMedia.hero.image} aspect="phone" floating priority />}
        title={
          <>
            Wellness tools
            <br />
            <span className="hero-accent">built for real life.</span>
          </>
        }
        subtitle="We're helping people in Kenya and worldwide build healthier relationships with technology — one intentional pause at a time."
      >
        <div className="hero-cta-row">
          <PlugHeroCtaPrimary href="/download">Get the app</PlugHeroCtaPrimary>
          <PlugHeroCtaSecondary href="#mission">Our mission</PlugHeroCtaSecondary>
        </div>
        <TrustBadges items={ABOUT_TRUST_BADGES} layout="grid" />
      </PageHero>

      <StatBar stats={MARKETING_PROOF_STATS} />

      <SectionShell tone="default" id="mission" className="scroll-mt-28 !pt-10 md:!pt-14">
        <AboutMissionSection />
      </SectionShell>

      <SectionShell tone="mesh" id="values" className="scroll-mt-28">
        <AboutValuesSection />
      </SectionShell>

      <SectionShell tone="default" id="problem" className="scroll-mt-28">
        <AboutProblemSection />
      </SectionShell>

      <SectionShell tone="mesh">
        <AboutApproachSection />
      </SectionShell>
    </div>
  );
}
