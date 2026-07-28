import type { LucideIcon } from "lucide-react";

export type StatItem = {
  value: string;
  label: string;
  icon?: LucideIcon;
};

export default function StatShowcase({ stats }: { stats: StatItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((stat, i) => (
        <div key={stat.label} className="stat-glass reveal-up" style={{ animationDelay: `${i * 0.1}s` }}>
          {stat.icon && <stat.icon className="mb-3 h-5 w-5 text-emerald-400" />}
          <div className="font-display text-4xl text-white md:text-5xl">{stat.value}</div>
          <p className="mt-2 text-sm text-emerald-100/80">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
