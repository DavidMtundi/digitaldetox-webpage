/**
 * Central media config for marketing pages.
 * Drop files into /public/marketing/ or set env vars for production URLs.
 */

export type VideoSource =
  | { type: "youtube"; id: string }
  | { type: "vimeo"; id: string }
  | { type: "file"; src: string; poster?: string }
  | { type: "placeholder" };

export type MarketingImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

const env = (key: string, fallback: string) =>
  (typeof process !== "undefined" && process.env[key]) || fallback;

export const marketingMedia = {
  hero: {
    /** Phone / app screenshot — replace with /marketing/hero-app.png when ready */
    image: {
      src: env("NEXT_PUBLIC_HERO_IMAGE", "/marketing/hero-app-preview.svg"),
      alt: "Pauseward app showing focus session and blocked apps",
      width: 390,
      height: 844,
    } satisfies MarketingImage,
    video: parseVideoEnv(
      env("NEXT_PUBLIC_HERO_VIDEO_URL", ""),
      { type: "placeholder" } as VideoSource,
    ),
  },
  demo: {
    video: parseVideoEnv(
      env("NEXT_PUBLIC_DEMO_VIDEO_URL", ""),
      { type: "placeholder" } as VideoSource,
    ),
    poster: env("NEXT_PUBLIC_DEMO_VIDEO_POSTER", "/marketing/video-poster.svg"),
  },
  features: [
    {
      src: env("NEXT_PUBLIC_FEATURE_BLOCKING_IMAGE", "/marketing/feature-blocking.svg"),
      alt: "App blocking schedule interface",
    },
    {
      src: env("NEXT_PUBLIC_FEATURE_ANALYTICS_IMAGE", "/marketing/feature-analytics.svg"),
      alt: "Usage analytics dashboard",
    },
  ] as MarketingImage[],
  about: {
    src: env("NEXT_PUBLIC_ABOUT_IMAGE", "/marketing/about-mission.svg"),
    alt: "Person focusing without phone distractions",
    width: 800,
    height: 600,
  } satisfies MarketingImage,
} as const;

function parseVideoEnv(url: string, fallback: VideoSource): VideoSource {
  if (!url) return fallback;

  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]+)/);
  if (yt) return { type: "youtube", id: yt[1] };

  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return { type: "vimeo", id: vimeo[1] };

  if (url.endsWith(".mp4") || url.endsWith(".webm")) {
    return { type: "file", src: url };
  }

  return { type: "file", src: url };
}
