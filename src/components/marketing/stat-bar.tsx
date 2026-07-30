import RevealOnScroll from "./reveal-on-scroll";

export type StatBarItem = {
  value: string;
  label: string;
};

export default function StatBar({
  eyebrow,
  stats,
}: {
  eyebrow?: string;
  stats: StatBarItem[];
}) {
  return (
    <section
      className="stat-bar-section border-y border-emerald-100/60 bg-emerald-50/70 py-10 backdrop-blur-sm dark:border-emerald-900/40 dark:bg-gray-900/95"
    >
      <div className="container-modern">
        {eyebrow && (
          <RevealOnScroll>
            <p className="mb-8 text-center text-sm font-medium text-gray-600 dark:text-gray-400">
              {eyebrow}
            </p>
          </RevealOnScroll>
        )}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <RevealOnScroll key={stat.label} delay={i * 80} variant="scale">
              <div className="stat-bar-cell text-center lg:text-left">
                <div className="font-display text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
                  {stat.value}
                </div>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
