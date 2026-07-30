import Link from "next/link";
import { Check, Download, ExternalLink, Mail } from "lucide-react";
import SectionHeader from "@/components/marketing/section-header";
import PlatformLogo from "@/components/marketing/platform-logo";
import RevealOnScroll from "@/components/marketing/reveal-on-scroll";
import { PLATFORMS, resolvePlatformDownloadTarget, resolvePlatformHref, statusLabel, type PlatformInfo } from "@/lib/platforms";

const STATUS_PILL: Record<string, string> = {
  available: "platform-pill-live",
  beta: "platform-pill-beta",
  coming_soon: "platform-pill-soon",
};

const PLATFORM_ROWS: Array<Array<(typeof PLATFORMS)[number]["id"]>> = [
  ["android", "ios"],
  ["windows", "macos"],
  ["android_tv"],
  ["web"],
];

const ACCENT_CLASS: Record<string, string> = {
  android: "platform-tile-accent-emerald",
  android_tv: "platform-tile-accent-teal",
  ios: "platform-tile-accent-slate",
  macos: "platform-tile-accent-slate",
  windows: "platform-tile-accent-blue",
  web: "platform-tile-accent-teal",
};

type DownloadLinks = {
  googlePlay?: string;
  androidTv?: string;
  appStore?: string;
  mac?: string;
  windows?: string;
  web?: string;
};

function platformById(id: (typeof PLATFORMS)[number]["id"]) {
  const platform = PLATFORMS.find((entry) => entry.id === id);
  if (!platform) throw new Error(`Unknown platform: ${id}`);
  return platform;
}

function isExternalUrl(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

function PlatformCta({ platform, href }: { platform: PlatformInfo; href: string | null }) {
  if (href) {
    const external = isExternalUrl(href);
    const className =
      platform.id === "web"
        ? "platform-cta platform-cta-secondary"
        : "platform-cta platform-cta-primary";

    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
          {platform.id !== "web" && <Download className="h-4 w-4" />}
          {platform.ctaLabel}
          <ExternalLink className="h-3.5 w-3.5 opacity-70" />
        </a>
      );
    }

    return (
      <Link href={href} className={className}>
        {platform.id !== "web" && <Download className="h-4 w-4" />}
        {platform.ctaLabel}
      </Link>
    );
  }

  if (platform.status === "coming_soon") {
    return (
      <span className="platform-cta platform-cta-muted">
        Coming soon — join the waitlist for early access
      </span>
    );
  }

  return (
    <Link href="/contact" className="platform-cta platform-cta-outline">
      <Mail className="h-4 w-4" />
      Request access
    </Link>
  );
}

export default function PlatformBento({ downloadLinks }: { downloadLinks: DownloadLinks }) {
  return (
    <div className="platform-bento">
      {PLATFORM_ROWS.map((row, rowIndex) => (
        <div
          key={row.join("-")}
          className={`platform-row ${row.length === 1 ? "platform-row--solo" : ""}`}
        >
          {row.map((platformId, i) => {
            const platform = platformById(platformId);
            const directHref = resolvePlatformHref(platform, downloadLinks);
            const target =
              directHref && platform.status !== "coming_soon"
                ? { href: directHref, external: isExternalUrl(directHref) && platform.id !== "web" }
                : resolvePlatformDownloadTarget(platform, downloadLinks);
            const featured = platform.status === "available";

            return (
              <RevealOnScroll key={platform.id} delay={rowIndex * 80 + i * 60} variant="scale">
                <article
                  id={`platform-${platform.id}`}
                  className={`platform-tile ${ACCENT_CLASS[platform.id] ?? ""} ${
                    featured ? "platform-tile-featured gradient-border" : ""
                  } ${platform.status === "coming_soon" ? "platform-tile-soon" : ""}`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="platform-logo-wrap">
                          <PlatformLogo platformId={platform.id} size={44} />
                        </div>
                        <div className="min-w-0">
                          <h2 className="type-card-title text-xl text-gray-900 dark:text-gray-50">
                            {platform.name}
                          </h2>
                          <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                            {platform.tagline}
                          </p>
                        </div>
                      </div>
                      <span className={`platform-pill shrink-0 ${STATUS_PILL[platform.status]}`}>
                        {statusLabel(platform.status)}
                      </span>
                    </div>
                    <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                      {platform.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                        >
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                            aria-hidden
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 border-t border-gray-200/80 pt-5 dark:border-gray-700/80">
                    <PlatformCta platform={platform} href={target?.href ?? null} />
                  </div>
                </article>
              </RevealOnScroll>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export function PlatformBentoSection({ downloadLinks }: { downloadLinks: DownloadLinks }) {
  return (
    <>
      <SectionHeader
        eyebrow="Platforms"
        title="Pick your environment"
        subtitle="Each platform is tailored to how you actually use that device."
      />
      <PlatformBento downloadLinks={downloadLinks} />
    </>
  );
}
