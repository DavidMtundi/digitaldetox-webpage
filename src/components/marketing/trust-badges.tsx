import type { LucideIcon } from "lucide-react";

export type TrustBadge = {
  icon: LucideIcon;
  label: string;
};

export default function TrustBadges({ items }: { items: TrustBadge[] }) {
  return (
    <div className="trust-marquee">
      {items.map((item) => (
        <span key={item.label} className="trust-badge">
          <item.icon className="h-4 w-4 text-emerald-600" />
          {item.label}
        </span>
      ))}
    </div>
  );
}
