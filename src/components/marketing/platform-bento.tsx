import Link from "next/link";
import { Check, Download, ExternalLink, Mail } from "lucide-react";
import PlatformLogo from "@/components/marketing/platform-logo";
import RevealOnScroll from "@/components/marketing/reveal-on-scroll";
import { PLATFORMS, resolvePlatformDownloadTarget, resolvePlatformHref, statusLabel, type PlatformInfo } from "@/lib/platforms";

const STATUS_PILL: Record<string, string> = {
  available: "platform-pill-live",
  beta: "platform-pill-beta",
  coming_soon: "platform-pill-soon",
};

const PLATFORM_GROUPS: Array<{
  label: string;
  description: string;
  platforms: Array<(typeof PLATFORMS)[number]["id"]>;
}> = [
  {
    label: "Mobile",
    description: "Phones and tablets with blocking, focus modes, and insights.",
    platforms: ["android", "ios"],
  },
  {
    label: "Desktop",
    description: "Native apps with menu bar or system tray focus tools.",
    platforms: ["windows", "macos"],
  },
  {
    label: "TV & web",
    description: "Living-room controls and browser-based management.",
    platforms: ["android_tv", "web"],
  },
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
  const variantClass =
    platform.id === "web"
      ? "platform-cta-secondary"
      : href
        ? "platform-cta-primary"
        : platform.status === "coming_soon"
          ? "platform-cta-muted"
          : "platform-cta-outline";

  if (href) {
    const external = isExternalUrl(href);
    const className = `platform-cta ${variantClass}`;

    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
          {platform.id !== "web" && <Download className="h-4 w-4 shrink-0" aria-hidden />}
          <span className="platform-cta-label">{platform.ctaLabel}</span>
          <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden />
        </a>
      );
    }

    return (
      <Link href={href} className={className}>
        {platform.id !== "web" && <Download className="h-4 w-4 shrink-0" aria-hidden />}
        <span className="platform-cta-label">{platform.ctaLabel}</span>
      </Link>
    );
  }

  if (platform.status === "coming_soon") {
    return (
      <span className="platform-cta platform-cta-muted">
        <span className="platform-cta-label">Coming soon — join the waitlist for early access</span>
      </span>
    );
  }

  return (
    <Link href="/contact" className="platform-cta platform-cta-outline">
      <Mail className="h-4 w-4 shrink-0" aria-hidden />
      <span className="platform-cta-label">Request access</span>
    </Link>
  );
}

export default function PlatformBento({ downloadLinks }: { downloadLinks: DownloadLinks }) {
  return (
    <div className="platform-bento">
      {PLATFORM_GROUPS.map((group, groupIndex) => (
        <div key={group.label} className="platform-group">
          <RevealOnScroll delay={groupIndex * 40}>
            <div className="platform-group-header">
              <p className="platform-group-label">{group.label}</p>
              <p className="platform-group-description">{group.description}</p>
            </div>
          </RevealOnScroll>

          <div
            className={`platform-row ${group.platforms.length === 1 ? "platform-row--solo" : ""}`}
          >
            {group.platforms.map((platformId, i) => {
              const platform = platformById(platformId);
              const directHref = resolvePlatformHref(platform, downloadLinks);
              const target =
                directHref && platform.status !== "coming_soon"
                  ? { href: directHref, external: isExternalUrl(directHref) && platform.id !== "web" }
                  : resolvePlatformDownloadTarget(platform, downloadLinks);
              const featured = platform.status === "available";

              return (
                <RevealOnScroll
                  key={platform.id}
                  delay={groupIndex * 80 + i * 60}
                  variant="scale"
                  className="h-full"
                >
                  <article
                    id={`platform-${platform.id}`}
                    className={`platform-tile ${ACCENT_CLASS[platform.id] ?? ""} ${
                      featured ? "platform-tile-featured gradient-border" : ""
                    } ${platform.status === "coming_soon" ? "platform-tile-soon" : ""}`}
                  >
                    <div className="platform-tile-body">
                      <header className="platform-tile-header">
                        <div className="platform-tile-brand">
                          <div className="platform-logo-wrap">
                            <PlatformLogo platformId={platform.id} size={44} />
                          </div>
                          <div className="platform-tile-meta">
                            <h2 className="platform-tile-title type-card-title text-gray-900 dark:text-gray-50">
                              {platform.name}
                            </h2>
                            <p className="platform-tile-tagline">{platform.tagline}</p>
                          </div>
                        </div>
                        <span className={`platform-pill ${STATUS_PILL[platform.status]}`}>
                          {statusLabel(platform.status)}
                        </span>
                      </header>

                      <ul className="platform-tile-features">
                        {platform.features.map((feature) => (
                          <li key={feature} className="platform-tile-feature">
                            <Check className="platform-tile-feature-icon" aria-hidden />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <footer className="platform-tile-footer">
                      <PlatformCta platform={platform} href={target?.href ?? null} />
                    </footer>
                  </article>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
