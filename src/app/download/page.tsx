"use client";

import PageHero from "@/components/marketing/page-hero";
import SectionHeader from "@/components/marketing/section-header";
import SectionShell from "@/components/marketing/section-shell";
import StatBar from "@/components/marketing/stat-bar";
import { PlatformBentoSection } from "@/components/marketing/platform-bento";
import {
  PlugHeroCtaPrimary,
  PlugHeroCtaSecondary,
} from "@/components/marketing/plug-style-hero";
import { MARKETING_PROOF_STATS } from "@/lib/marketing-content";
import { useExternalLinks } from "@/hooks/useExternalLinks";

export default function DownloadPage() {
  const { links } = useExternalLinks();

  return (
    <div className="marketing-page">
      <PageHero
        eyebrow="All platforms"
        title={
          <>
            One focus system.
            <br />
            <span className="hero-accent">Every device.</span>
          </>
        }
        subtitle="Android, iOS, Windows, macOS, and Android TV — download the native app for your device. Manage policies from any browser."
        size="compact"
      >
        <PlugHeroCtaPrimary href="#platforms">Compare platforms</PlugHeroCtaPrimary>
        <PlugHeroCtaSecondary href="/pricing">View pricing</PlugHeroCtaSecondary>
      </PageHero>

      <StatBar stats={MARKETING_PROOF_STATS} />

      <SectionShell id="platforms" tone="mesh" className="scroll-mt-28">
        <div className="mesh-section-header">
          <SectionHeader
            eyebrow="Download"
            title="Pick your platform"
            subtitle="Every app links to the right store or installer. Web dashboard works in any browser."
          />
        </div>
        <PlatformBentoSection downloadLinks={links.downloadLinks} />
      </SectionShell>
    </div>
  );
}
