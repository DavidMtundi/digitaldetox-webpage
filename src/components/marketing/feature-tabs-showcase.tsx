"use client";

import { useCallback, useEffect, useRef, type KeyboardEvent } from "react";
import type { LucideIcon } from "lucide-react";
import { BarChart3, Globe, Smartphone, Zap } from "lucide-react";
import VideoShowcase from "@/components/marketing/video-showcase";
import type { VideoSource } from "@/lib/marketing-media";

export type FeatureTabItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  title: string;
  description: string;
  proof?: string;
  video: VideoSource;
  poster: string;
  videoTitle: string;
};

type FeatureTabsSectionProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  items: FeatureTabItem[];
};

const TAB_NAME = "feature-tab-control";

export default function FeatureTabsSection({
  eyebrow,
  title,
  subtitle,
  items,
}: FeatureTabsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const focusTabInput = useCallback((id: string) => {
    const input = document.getElementById(`feature-input-${id}`) as HTMLInputElement | null;
    if (input) input.checked = true;
  }, []);

  const onTabKeyDown = useCallback(
    (event: KeyboardEvent<HTMLLabelElement>, index: number) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const delta = event.key === "ArrowRight" ? 1 : -1;
      const next = items[(index + delta + items.length) % items.length];
      if (next) focusTabInput(next.id);
    },
    [items, focusTabInput],
  );

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const syncAria = () => {
      items.forEach((item) => {
        const input = document.getElementById(`feature-input-${item.id}`) as HTMLInputElement | null;
        const label = document.getElementById(`feature-tab-${item.id}`);
        if (!label) return;
        const selected = Boolean(input?.checked);
        label.setAttribute("aria-selected", selected ? "true" : "false");
        label.tabIndex = selected ? 0 : -1;
      });
    };

    syncAria();
    root.addEventListener("change", syncAria);
    return () => root.removeEventListener("change", syncAria);
  }, [items]);

  if (!items.length) return null;

  return (
    <div ref={sectionRef} className="feature-tabs-section">
      <div className="feature-tabs-header mx-auto mb-8 max-w-3xl text-center md:mb-12">
        {eyebrow && <p className="page-eyebrow mx-auto">{eyebrow}</p>}
        <h2 className="feature-tabs-title font-display text-[1.625rem] font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
          {title}
        </h2>
        {subtitle && (
          <p className="feature-tabs-subtitle mx-auto mt-4 max-w-2xl text-base leading-relaxed md:mt-5 md:text-lg">
            {subtitle}
          </p>
        )}
      </div>

      <div className="feature-tabs-unified overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-xl shadow-emerald-900/5 ring-1 ring-gray-200/50 sm:rounded-3xl dark:border-gray-700/80 dark:bg-gray-900 dark:shadow-black/30 dark:ring-gray-700/50">
        {items.map((item, index) => (
          <input
            key={`input-${item.id}`}
            type="radio"
            name={TAB_NAME}
            id={`feature-input-${item.id}`}
            className="feature-tab-input"
            defaultChecked={index === 0}
            tabIndex={-1}
            aria-hidden
          />
        ))}

        <div
          className="feature-tabs-rail overflow-x-auto border-b border-gray-200/80 bg-gray-50 dark:border-gray-700/80 dark:bg-gray-950/80 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Product features"
        >
          <div className="feature-tabs-rail-inner flex min-w-min justify-start gap-0 px-1 sm:justify-center sm:px-2 md:px-4">
            {items.map((item, index) => (
              <label
                key={item.id}
                htmlFor={`feature-input-${item.id}`}
                role="tab"
                aria-selected={index === 0}
                id={`feature-tab-${item.id}`}
                tabIndex={index === 0 ? 0 : -1}
                onKeyDown={(event) => onTabKeyDown(event, index)}
                className="feature-tab-slot relative inline-flex shrink-0 cursor-pointer items-center gap-1.5 border-b-2 border-b-transparent px-3 py-3.5 text-xs font-semibold text-gray-600 transition hover:bg-white/70 hover:text-gray-900 sm:gap-2 sm:px-5 sm:py-4 sm:text-sm md:px-6 md:text-base dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-gray-200"
              >
                <item.icon className="h-4 w-4 shrink-0" aria-hidden />
                {item.label}
              </label>
            ))}
          </div>
        </div>

        <div className="feature-tabs-body bg-white dark:bg-gray-800">
          {items.map((item) => (
            <div
              key={item.id}
              id={`feature-panel-${item.id}`}
              role="tabpanel"
              aria-labelledby={`feature-tab-${item.id}`}
              className="feature-tab-panel px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10 lg:px-12 lg:py-12"
            >
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
                <div className="min-w-0">
                  <p className="feature-label">{item.label}</p>
                  <h3 className="feature-tabs-detail-title font-display mt-3 text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
                    {item.title}
                  </h3>
                  <p className="feature-tabs-detail-body mt-4 text-base leading-relaxed">
                    {item.description}
                  </p>
                  {item.proof && (
                    <p className="mt-4 text-sm font-medium text-emerald-700 dark:text-emerald-400">
                      {item.proof}
                    </p>
                  )}
                </div>

                <div className="min-w-0">
                  <div className="product-tour-media relative mx-auto max-w-[320px] lg:mx-0 lg:max-w-none">
                    <div className="product-tour-glow pointer-events-none absolute inset-0 -z-10" aria-hidden />
                    <VideoShowcase
                      source={item.video}
                      poster={item.poster}
                      title={item.videoTitle}
                      variant="phone"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function buildDefaultFeatureTabs(
  media: {
    appBlocking: { video: VideoSource; poster: string };
    insights: { video: VideoSource; poster: string };
    focusModes: { video: VideoSource; poster: string };
    websiteBlocking: { video: VideoSource; poster: string };
  },
): FeatureTabItem[] {
  return [
    {
      id: "app-blocking",
      label: "App blocking",
      icon: Smartphone,
      title: "Break the open → scroll → guilt loop",
      description:
        "Social, games, and messaging stay off when you need them — without undoing your whole day for one exception.",
      proof: "Most people feel a difference in their first week.",
      video: media.appBlocking.video,
      poster: media.appBlocking.poster,
      videoTitle: "app blocking in Pauseward",
    },
    {
      id: "focus-modes",
      label: "Focus modes",
      icon: Zap,
      title: "Deep work that actually finishes",
      description:
        "One tap for study, work, or bedtime — the right blocks kick in instantly, no digging through settings.",
      proof: "Work and study modes are the most-used on-demand tools.",
      video: media.focusModes.video,
      poster: media.focusModes.poster,
      videoTitle: "focus modes in Pauseward",
    },
    {
      id: "website-blocking",
      label: "Website blocking",
      icon: Globe,
      title: "Homework hour without rabbit holes",
      description:
        "Feeds and distracting sites stay closed network-wide — not just in one browser tab that's easy to bypass.",
      proof: "Website rules sync with your app blocks during focus sessions.",
      video: media.websiteBlocking.video,
      poster: media.websiteBlocking.poster,
      videoTitle: "website blocking in Pauseward",
    },
    {
      id: "insights",
      label: "Insights",
      icon: BarChart3,
      title: "See progress — not shame",
      description:
        "Daily patterns, streaks, and focus wins — change habits with data that motivates, not guilt.",
      proof: "50K+ hours of focus reclaimed across Pauseward users.",
      video: media.insights.video,
      poster: media.insights.poster,
      videoTitle: "usage insights in Pauseward",
    },
  ];
}
