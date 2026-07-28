"use client";

import Link from "next/link";
import { ArrowRight, Check, Download, Globe, Laptop, Monitor, Smartphone } from "lucide-react";
import PageHero from "@/components/marketing/page-hero";
import SectionShell from "@/components/marketing/section-shell";
import SectionHeader from "@/components/marketing/section-header";
import { PLATFORMS, statusLabel } from "@/lib/platforms";
import { useExternalLinks } from "@/hooks/useExternalLinks";

const ICONS = {
  android: Smartphone,
  ios: Smartphone,
  macos: Laptop,
  windows: Monitor,
  web: Globe,
} as const;

const STATUS_PILL: Record<string, string> = {
  available: "platform-pill-live",
  beta: "platform-pill-beta",
  coming_soon: "platform-pill-soon",
};

export default function DownloadPage() {
  const { links } = useExternalLinks();

  function resolveHref(platform: (typeof PLATFORMS)[number]): string | null {
    if (!platform.downloadKey) return null;
    return links.downloadLinks[platform.downloadKey] || null;
  }

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
        subtitle="Android is live. iOS and macOS are in beta. Windows is on the way. Manage policies from any browser."
        size="compact"
      >
        <a href="#platforms" className="btn-primary inline-flex items-center gap-2">
          Compare platforms
          <ArrowRight className="h-4 w-4" />
        </a>
        <Link href="/pricing" className="btn-secondary">
          View pricing
        </Link>
      </PageHero>

      <SectionShell id="platforms" tone="white">
        <SectionHeader
          eyebrow="Platforms"
          title="Pick your environment"
          subtitle="Each platform is tailored to how you actually use that device."
        />
        <div className="platform-bento">
          {PLATFORMS.map((platform) => {
            const Icon = ICONS[platform.id];
            const href = resolveHref(platform);
            const downloadable = Boolean(href) && platform.status !== "coming_soon";
            const featured = platform.status === "available";

            return (
              <article
                key={platform.id}
                className={`platform-tile ${featured ? "platform-tile-featured gradient-border" : ""}`}
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bento-icon icon-bg-emerald text-emerald-700">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h2 className="type-card-title text-xl">{platform.name}</h2>
                        <p className="mt-1 text-sm text-gray-600">{platform.tagline}</p>
                      </div>
                    </div>
                    <span className={`platform-pill ${STATUS_PILL[platform.status]}`}>
                      {statusLabel(platform.status)}
                    </span>
                  </div>
                  <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                    {platform.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                        <Check className="h-4 w-4 shrink-0 text-emerald-600" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 lg:mt-0">
                  {platform.id === "web" ? (
                    <Link href="/dashboard/login" className="btn-secondary inline-flex">
                      Open dashboard
                    </Link>
                  ) : downloadable && href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Download
                    </a>
                  ) : (
                    <p className="text-sm text-gray-500">
                      {platform.status === "coming_soon" ? "Notify me when it ships" : "Link coming soon"}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </SectionShell>
    </div>
  );
}
