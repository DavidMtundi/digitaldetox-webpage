export type PlatformId = "android" | "ios" | "macos" | "windows" | "web";
export type PlatformStatus = "available" | "beta" | "coming_soon";
export type DownloadLinkKey = "googlePlay" | "appStore" | "mac" | "windows" | "web";

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
    id: "ios",
    name: "iOS",
    tagline: "Screen Time–powered shields for iPhone and iPad.",
    status: "beta",
    features: ["App shields", "Focus sessions", "Family Controls integration"],
    logoSrc: "/platforms/apple.svg",
    logoClassName: "text-gray-900",
    downloadKey: "appStore",
    ctaLabel: "Download on the App Store",
  },
  {
    id: "macos",
    name: "macOS",
    tagline: "Menu bar focus with native blocking and Dynamic Island timer.",
    status: "beta",
    features: [
      "Focus sessions with notch overlay",
      "Blocklists & schedules",
      "Launch at login",
      "Insights dashboard",
    ],
    logoSrc: "/platforms/apple.svg",
    logoClassName: "text-gray-900",
    downloadKey: "mac",
    ctaLabel: "Download for Mac",
  },
  {
    id: "windows",
    name: "Windows",
    tagline: "Desktop shell with sync; enforcement layer in development.",
    status: "coming_soon",
    features: ["Focus UI", "Blocklist editor", "Cloud sync (preview)"],
    logoSrc: "/platforms/windows.svg",
    downloadKey: "windows",
    ctaLabel: "Download for Windows",
  },
  {
    id: "web",
    name: "Web",
    tagline: "Manage devices, blocklists, and reports from any browser.",
    status: "beta",
    features: ["Account & device overview", "Policy sync", "Cross-device insights"],
    logoSrc: "/pauseward.png",
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
