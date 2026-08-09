"use client";

import PlatformLogo from "@/components/marketing/platform-logo";
import RevealOnScroll from "@/components/marketing/reveal-on-scroll";
import { PLATFORMS } from "@/lib/platforms";

const JUMP_PLATFORMS = ["android", "ios", "windows", "macos", "android_tv", "web"] as const;

const SHORT_LABELS: Partial<Record<(typeof JUMP_PLATFORMS)[number], string>> = {
  android_tv: "Android TV",
};

export default function PlatformJumpNav() {
  return (
    <RevealOnScroll>
      <div className="platform-jump-nav-shell">
        <nav className="platform-jump-nav" aria-label="Jump to platform">
          {JUMP_PLATFORMS.map((platformId) => {
            const platform = PLATFORMS.find((entry) => entry.id === platformId);
            if (!platform) return null;

            const label = SHORT_LABELS[platformId] ?? platform.name;

            return (
              <a key={platform.id} href={`#platform-${platform.id}`} className="platform-jump-chip">
                <PlatformLogo platformId={platform.id} size={22} />
                <span className="platform-jump-chip-label">{label}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </RevealOnScroll>
  );
}
