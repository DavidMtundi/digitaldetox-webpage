"use client";

import Link from "next/link";
import { ArrowRight, Check, Download, ExternalLink } from "lucide-react";
import PageHero from "@/components/marketing/page-hero";
import SectionShell from "@/components/marketing/section-shell";
import SectionHeader from "@/components/marketing/section-header";
import PlatformLogo from "@/components/marketing/platform-logo";
import { PLATFORMS, statusLabel, type PlatformInfo } from "@/lib/platforms";
import { useExternalLinks } from "@/hooks/useExternalLinks";

const STATUS_PILL: Record<string, string> = {
  available: "platform-pill-live",
  beta: "platform-pill-beta",
  coming_soon: "platform-pill-soon",
};

const PLATFORM_ROWS: Array<Array<(typeof PLATFORMS)[number]["id"]>> = [
  ["android", "ios"],
  ["windows", "macos"],
  ["web"],
];

function platformById(id: (typeof PLATFORMS)[number]["id"]) {
  const platform = PLATFORMS.find((entry) => entry.id === id);
  if (!platform) throw new Error(`Unknown platform: ${id}`);
  return platform;
}

function resolveHref(
  platform: PlatformInfo,
  downloadLinks: ReturnType<typeof useExternalLinks>["links"]["downloadLinks"],
): string | null {
  if (!platform.downloadKey) return null;

  const href = downloadLinks[platform.downloadKey];
  if (platform.id === "web") {
    return href || "/dashboard/login";
  }

  return href || null;
}

function isExternalUrl(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

function PlatformCta({ platform, href }: { platform: PlatformInfo; href: string | null }) {
  if (!href) {
    return (
      <p className="text-sm text-gray-500">
        {platform.status === "coming_soon" ? "Notify me when it ships" : "Link coming soon"}
      </p>
    );
  }

  const external = isExternalUrl(href);
  const className = "btn-primary inline-flex items-center gap-2";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        <Download className="h-4 w-4" />
        {platform.ctaLabel}
        <ExternalLink className="h-3.5 w-3.5 opacity-70" />
      </a>
    );
  }

  return (
    <Link href={href} className={platform.id === "web" ? "btn-secondary inline-flex items-center gap-2" : className}>
      {platform.id === "web" ? null : <Download className="h-4 w-4" />}
      {platform.ctaLabel}
    </Link>
  );
}

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
          {PLATFORM_ROWS.map((row) => (
            <div
              key={row.join("-")}
              className={`platform-row ${row.length === 1 ? "platform-row--solo" : ""}`}
            >
              {row.map((platformId) => {
                const platform = platformById(platformId);
                const href = resolveHref(platform, links.downloadLinks);
                const downloadable =
                  platform.id === "web" ? Boolean(href) : Boolean(href) && platform.status !== "coming_soon";
                const featured = platform.status === "available";

                return (
                  <article
                    key={platform.id}
                    className={`platform-tile ${featured ? "platform-tile-featured gradient-border" : ""}`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="platform-logo-wrap">
                            <PlatformLogo platformId={platform.id} size={44} />
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
                    <div className="mt-6">
                      {downloadable ? (
                        <PlatformCta platform={platform} href={href} />
                      ) : (
                        <PlatformCta platform={platform} href={null} />
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          ))}
        </div>
      </SectionShell>
    </div>
  );
}
