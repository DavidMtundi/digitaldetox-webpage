export type PlatformId = "android" | "android_tv" | "ios" | "macos" | "windows" | "web";
export type PlatformStatus = "available" | "beta" | "coming_soon";
export type DownloadLinkKey = "googlePlay" | "androidTv" | "appStore" | "mac" | "windows" | "web";

export interface PlatformInfo {
  id: PlatformId;
  name: string;
  tagline: string;
  status: PlatformStatus;
  features: string[];
  logoSrc: string;
  logoClassName?: string;
  downloadKey?: DownloadLinkKey;
  ctaLabel: string;
}

export const PLATFORMS: PlatformInfo[] = [
  {
    id: "android",
    name: "Android",
    tagline: "Full blocking, focus sessions, and analytics.",
    status: "available",
    features: ["App & site blocking", "Focus timer", "Schedules", "Usage insights"],
    logoSrc: "/platforms/android.svg",
    downloadKey: "googlePlay",
    ctaLabel: "Get on Google Play",
  },
  {
    id: "android_tv",
    name: "Android TV",
    tagline: "Focus lock and scheduled blocks for your smart TV.",
    status: "available",
    features: [
      "Remote-friendly blocking",
      "Scheduled focus shifts",
      "Large-screen TV UI",
      "Sync with your Pauseward account",
    ],
    logoSrc: "/platforms/android-tv.svg",
    downloadKey: "androidTv",
    ctaLabel: "Get on Google Play",
  },
  {
    id: "ios",
    name: "iOS",
    tagline: "Screen Time–powered shields for iPhone and iPad.",
    status: "available",
    features: ["App shields", "Focus sessions", "Family Controls integration"],
    logoSrc: "/platforms/ios.svg",
    downloadKey: "appStore",
    ctaLabel: "Download on the App Store",
  },
  {
    id: "macos",
    name: "macOS",
    tagline: "Menu bar focus with native blocking and Dynamic Island timer.",
    status: "available",
    features: [
      "Focus sessions with notch overlay",
      "Blocklists & schedules",
      "Launch at login",
      "Insights dashboard",
    ],
    logoSrc: "/platforms/macos.svg",
    downloadKey: "mac",
    ctaLabel: "Download for Mac",
  },
  {
    id: "windows",
    name: "Windows",
    tagline: "Desktop blocking, focus UI, and cloud sync for your PC.",
    status: "available",
    features: ["Focus UI", "Blocklist editor", "Schedules", "Cloud sync"],
    logoSrc: "/platforms/windows.svg",
    downloadKey: "windows",
    ctaLabel: "Download for Windows",
  },
  {
    id: "web",
    name: "Web",
    tagline: "Manage devices, blocklists, and reports from any browser.",
    status: "available",
    features: ["Account & device overview", "Policy sync", "Cross-device insights"],
    logoSrc: "/platforms/web.svg",
    downloadKey: "web",
    ctaLabel: "Open web dashboard",
  },
];

export function statusLabel(status: PlatformStatus): string {
  switch (status) {
    case "available":
      return "Available";
    case "beta":
      return "Beta";
    case "coming_soon":
      return "Coming soon";
  }
}

export function resolvePlatformHref(
  platform: PlatformInfo,
  downloadLinks: Record<DownloadLinkKey, string | null> & { googlePlay: string },
): string | null {
  if (!platform.downloadKey) return null;
  const href = downloadLinks[platform.downloadKey];
  if (platform.id === "web") return href || "/dashboard/login";
  if (typeof href === "string" && href.trim()) return href.trim();
  return null;
}

/** Direct store URL when configured; otherwise deep-link to /download#platform-{id}. */
export function resolvePlatformDownloadTarget(
  platform: PlatformInfo,
  downloadLinks: Record<DownloadLinkKey, string | null> & { googlePlay: string },
): { href: string; external: boolean } | null {
  if (platform.status === "coming_soon") return null;

  const direct = resolvePlatformHref(platform, downloadLinks);
  if (direct) {
    const external =
      platform.id !== "web" && (direct.startsWith("http://") || direct.startsWith("https://"));
    return { href: direct, external };
  }

  if (platform.id === "web") {
    return { href: "/dashboard/login", external: false };
  }

  return { href: `/download#platform-${platform.id}`, external: false };
}
