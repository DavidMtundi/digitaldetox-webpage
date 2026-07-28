import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type MarketingCardProps = {
  icon?: LucideIcon;
  iconClassName?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  highlighted?: boolean;
  glass?: boolean;
};

export default function MarketingCard({
  icon: Icon,
  iconClassName = "icon-bg-emerald text-emerald-700",
  title,
  description,
  children,
  highlighted = false,
  glass = false,
}: MarketingCardProps) {
  return (
    <article
      className={`group ${glass ? "glass-card" : "marketing-card"} ${
        highlighted ? "marketing-card-highlight gradient-border" : ""
      }`}
    >
      {Icon && (
        <div className={`bento-icon ${iconClassName}`}>
          <Icon className="h-6 w-6" />
        </div>
      )}
      <h3 className="type-card-title text-xl text-gray-900">{title}</h3>
      {description && <p className="mt-2.5 text-sm leading-relaxed text-gray-600">{description}</p>}
      {children && <div className="mt-6">{children}</div>}
    </article>
  );
}
