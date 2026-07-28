import type { LucideIcon } from "lucide-react";
import RevealOnScroll from "./reveal-on-scroll";

export type BentoItem = {
  icon: LucideIcon;
  title: string;
  description: string;
  span?: "default" | "wide" | "tall" | "hero";
  accent?: "emerald" | "teal" | "amber" | "rose";
};

const SPAN = {
  default: "md:col-span-1 md:row-span-1",
  wide: "md:col-span-2 md:row-span-1",
  tall: "md:col-span-1 md:row-span-2",
  hero: "md:col-span-2 md:row-span-2",
};

const ACCENT_BG: Record<string, string> = {
  emerald: "from-emerald-500/10 to-emerald-600/5",
  teal: "from-teal-500/10 to-teal-600/5",
  amber: "from-amber-500/10 to-amber-600/5",
  rose: "from-rose-500/10 to-rose-600/5",
};

const ACCENT_ICON: Record<string, string> = {
  emerald: "icon-bg-emerald text-emerald-700",
  teal: "icon-bg-teal text-teal-700",
  amber: "icon-bg-amber text-amber-700",
  rose: "icon-bg-rose text-rose-700",
};

export default function BentoFeatures({ items }: { items: BentoItem[] }) {
  return (
    <div className="bento-grid">
      {items.map((item, i) => {
        const Icon = item.icon;
        const key = item.accent ?? "emerald";
        return (
          <RevealOnScroll
            key={item.title}
            delay={i * 80}
            variant="scale"
            className={`h-full ${SPAN[item.span ?? "default"]}`}
          >
            <article className={`bento-cell group h-full bg-gradient-to-br ${ACCENT_BG[key]}`}>
              <div className={`bento-icon ${ACCENT_ICON[key]}`}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="type-card-title mt-5 text-lg text-gray-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.description}</p>
              {item.span === "hero" && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Focus", "Block", "Track"].map((tag) => (
                    <span key={tag} className="pill-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </article>
          </RevealOnScroll>
        );
      })}
    </div>
  );
}
