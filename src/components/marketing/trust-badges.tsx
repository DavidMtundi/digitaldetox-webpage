import type { LucideIcon } from "lucide-react";
import RevealOnScroll from "./reveal-on-scroll";

export type TrustBadge = {
  icon: LucideIcon;
  label: string;
};

export default function TrustBadges({ items }: { items: TrustBadge[] }) {
  return (
    <div className="trust-marquee">
      {items.map((item, i) => (
        <RevealOnScroll key={item.label} delay={i * 70} variant="fade">
          <span className="trust-badge">
            <item.icon className="h-4 w-4 text-emerald-600" />
            {item.label}
          </span>
        </RevealOnScroll>
      ))}
    </div>
  );
}
