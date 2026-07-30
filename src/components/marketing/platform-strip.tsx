import Link from "next/link";
import { Download, ExternalLink } from "lucide-react";
import PlatformLogo from "@/components/marketing/platform-logo";
import RevealOnScroll from "./reveal-on-scroll";
import type { DownloadLinksConfig } from "@/lib/download-links";
import {
  PLATFORMS,
  resolvePlatformDownloadTarget,
  type PlatformId,
  type PlatformInfo,
} from "@/lib/platforms";

/** Native + desktop platforms shown on the home page strip. */
const HOME_PLATFORM_IDS: PlatformId[] = ["android", "ios", "macos", "windows", "android_tv"];

const ACCENT_CLASS: Record<PlatformId, string> = {
  android: "platform-strip-accent-emerald",
  android_tv: "platform-strip-accent-teal",
  ios: "platform-strip-accent-emerald",
  macos: "platform-strip-accent-emerald",
  windows: "platform-strip-accent-emerald",
  web: "platform-strip-accent-emerald",
};

function platformById(id: PlatformId) {
  const platform = PLATFORMS.find((entry) => entry.id === id);
  if (!platform) throw new Error(`Unknown platform: ${id}`);
  return platform;
}

type PlatformStripProps = {
  downloadLinks: DownloadLinksConfig;
};

function PlatformDownloadButton({
  platform,
  href,
  external,
}: {
  platform: PlatformInfo;
  href: string;
  external: boolean;
}) {
  const label = platform.ctaLabel;
  const className = "platform-strip-download";

  const content = (
    <>
      {platform.id !== "web" ? <Download className="h-4 w-4 shrink-0" aria-hidden /> : null}
      <span className="truncate">{label}</span>
      {external ? (
        <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
      ) : null}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

export default function PlatformStrip({ downloadLinks }: PlatformStripProps) {
  const platforms = HOME_PLATFORM_IDS.map(platformById);

  return (
    <div className="platform-strip">
      {platforms.map((platform, i) => {
        const target = resolvePlatformDownloadTarget(platform, downloadLinks);

        return (
          <RevealOnScroll key={platform.id} delay={i * 70} variant="scale">
            <article
              className={`platform-strip-card platform-strip-card-active ${ACCENT_CLASS[platform.id]}`}
            >
              <div className="platform-strip-card-head">
                <div className="platform-strip-logo">
                  <PlatformLogo platformId={platform.id} size={40} />
                </div>
              </div>

              <div className="platform-strip-card-body">
                <p className="platform-strip-name">{platform.name}</p>
                <p className="platform-strip-tagline">{platform.tagline}</p>
              </div>

              {target ? (
                <PlatformDownloadButton
                  platform={platform}
                  href={target.href}
                  external={target.external}
                />
              ) : (
                <Link href="/contact" className="platform-strip-download platform-strip-download-outline">
                  Request access
                </Link>
              )}
            </article>
          </RevealOnScroll>
        );
      })}
    </div>
  );
}
