import type { LucideIcon } from "lucide-react";
import { Laptop, Monitor, Smartphone } from "lucide-react";
import RevealOnScroll from "./reveal-on-scroll";

type PlatformStripItem = {
  label: string;
  status: "live" | "soon" | "beta";
  href?: string;
  icon?: LucideIcon;
};

const DEFAULT_ICONS: Record<string, LucideIcon> = {
  Android: Smartphone,
  "Google Play": Smartphone,
  iOS: Smartphone,
  "App Store": Smartphone,
  Windows: Monitor,
  macOS: Laptop,
};

export default function PlatformStrip({ items }: { items: PlatformStripItem[] }) {
  return (
    <div className="platform-strip">
      {items.map((item, i) => {
        const Icon = item.icon ?? DEFAULT_ICONS[item.label] ?? Smartphone;
        const inner = (
          <>
            <div className="flex w-full items-start justify-between gap-3">
              <div className="platform-strip-icon">
                <Icon className="h-5 w-5" />
              </div>
              <span className={`platform-pill platform-pill-${item.status}`}>
                {item.status === "live" ? "Live" : item.status === "beta" ? "Beta" : "Soon"}
              </span>
            </div>
            <div>
              <p className="type-card-title text-base text-gray-900">
                {item.label === "Google Play" ? "Android" : item.label}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                {item.status === "live" ? "Download now" : item.status === "beta" ? "Join beta" : "Coming soon"}
              </p>
            </div>
          </>
        );

        if (item.href) {
          return (
            <RevealOnScroll key={item.label} delay={i * 80}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="platform-strip-card platform-strip-live block h-full"
              >
                {inner}
              </a>
            </RevealOnScroll>
          );
        }

        return (
          <RevealOnScroll key={item.label} delay={i * 80}>
            <div className="platform-strip-card platform-strip-muted h-full">{inner}</div>
          </RevealOnScroll>
        );
      })}
    </div>
  );
}
