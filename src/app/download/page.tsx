"use client";

import PageHero from "@/components/marketing/page-hero";
import SectionHeader from "@/components/marketing/section-header";
import SectionShell from "@/components/marketing/section-shell";
import StatBar from "@/components/marketing/stat-bar";
import PlatformBento from "@/components/marketing/platform-bento";
import PlatformJumpNav from "@/components/marketing/platform-jump-nav";
import RevealOnScroll from "@/components/marketing/reveal-on-scroll";
import {
  PlugHeroCtaPrimary,
  PlugHeroCtaSecondary,
} from "@/components/marketing/plug-style-hero";
import { MARKETING_PROOF_STATS } from "@/lib/marketing-content";
import { useExternalLinks } from "@/hooks/useExternalLinks";
import { Cloud, MonitorSmartphone } from "lucide-react";

export default function DownloadPage() {
  const { links } = useExternalLinks();

  return (
    <div className="marketing-page">
      <PageHero
        eyebrow="All platforms"
        title={
          <>
            Same calm boundaries.
            <br />
            <span className="hero-accent">Every screen.</span>
          </>
        }
        subtitle="Phone, laptop, or TV — download once and carry the habits you're building everywhere, not just on one device."
        size="compact"
      >
        <PlugHeroCtaPrimary href="#platforms">Choose your app</PlugHeroCtaPrimary>
        <PlugHeroCtaSecondary href="/pricing">View pricing</PlugHeroCtaSecondary>
      </PageHero>

      <StatBar stats={MARKETING_PROOF_STATS} />

      <SectionShell id="platforms" tone="mesh" className="scroll-mt-28">
        <div className="download-platforms">
          <div className="mesh-section-header">
            <SectionHeader
              eyebrow="Download"
              title="Get Pauseward on your device"
              subtitle="Pick a platform below — each app links to the right store or installer. Your account and policies sync everywhere."
            />
          </div>

          <PlatformJumpNav />

          <RevealOnScroll delay={60}>
            <div className="download-sync-note">
              <MonitorSmartphone className="download-sync-note-icon" aria-hidden />
              <p>
                Install on as many devices as you need. Sign in once — blocklists, schedules, and focus modes follow you.
              </p>
            </div>
          </RevealOnScroll>

          <PlatformBento downloadLinks={links.downloadLinks} />
        </div>
      </SectionShell>

      <SectionShell tone="default">
        <RevealOnScroll>
          <div className="download-web-panel">
            <div className="download-web-panel-glow" aria-hidden />
            <div className="download-web-panel-inner">
              <div className="download-web-panel-icon">
                <Cloud className="h-6 w-6" aria-hidden />
              </div>
              <div>
                <p className="download-web-panel-eyebrow">No install needed</p>
                <h2 className="download-web-panel-title">Manage everything from the web dashboard</h2>
                <p className="download-web-panel-body">
                  Review devices, edit blocklists, and handle billing from any browser — desktop or mobile.
                </p>
              </div>
              <a href="/dashboard/login" className="download-web-panel-cta">
                Open web dashboard
              </a>
            </div>
          </div>
        </RevealOnScroll>
      </SectionShell>
    </div>
  );
}
