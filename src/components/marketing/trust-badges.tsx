import type { LucideIcon } from "lucide-react";
import RevealOnScroll from "./reveal-on-scroll";

export type TrustBadge = {
  icon: LucideIcon;
  label: string;
};

export default function TrustBadges({
  items,
  layout = "inline",
}: {
  items: TrustBadge[];
  layout?: "inline" | "grid";
}) {
  return (
    <div className={layout === "grid" ? "trust-marquee trust-marquee--grid" : "trust-marquee"}>
      {items.map((item, i) => (
        <RevealOnScroll key={item.label} delay={i * 70} variant="fade" className={layout === "grid" ? "h-full" : ""}>
          <span className={`trust-badge ${layout === "grid" ? "trust-badge--grid" : ""}`}>
            <span className="trust-badge-icon" aria-hidden>
              <item.icon className="h-4 w-4" />
            </span>
            <span className="trust-badge-label">{item.label}</span>
          </span>
        </RevealOnScroll>
      ))}
    </div>
  );
}
