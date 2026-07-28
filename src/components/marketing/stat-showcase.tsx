import type { LucideIcon } from "lucide-react";
import RevealOnScroll from "./reveal-on-scroll";

export type StatItem = {
  value: string;
  label: string;
  icon?: LucideIcon;
};

export default function StatShowcase({ stats }: { stats: StatItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((stat, i) => (
        <RevealOnScroll key={stat.label} delay={i * 100} variant="scale">
          <div className="stat-glass">
            {stat.icon && <stat.icon className="mb-3 h-5 w-5 text-emerald-400" />}
            <div className="font-display text-4xl font-bold text-white md:text-5xl">{stat.value}</div>
            <p className="mt-2 text-sm text-emerald-100/80">{stat.label}</p>
          </div>
        </RevealOnScroll>
      ))}
    </div>
  );
}
