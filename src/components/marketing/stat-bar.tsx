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
      className="stat-bar-section border-y border-emerald-100/60 bg-emerald-50/70 py-8 backdrop-blur-sm dark:border-emerald-900/40 dark:bg-gray-900/95 sm:py-10"
    >
      <div className="container-modern">
        {eyebrow && (
          <RevealOnScroll>
            <p className="mb-6 text-center text-sm font-medium text-gray-600 dark:text-gray-400 sm:mb-8">
              {eyebrow}
            </p>
          </RevealOnScroll>
        )}
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
          {stats.map((stat, i) => (
            <RevealOnScroll key={stat.label} delay={i * 80} variant="scale">
              <div className="stat-bar-cell text-center lg:text-left">
                <div className="font-display text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl md:text-4xl">
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
