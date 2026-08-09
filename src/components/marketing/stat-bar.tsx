import RevealOnScroll from "./reveal-on-scroll";

export type StatBarItem = {
  value: string;
  label: string;
};

function statGridClass(count: number): string {
  switch (count) {
    case 1:
      return "mx-auto grid max-w-xs grid-cols-1 gap-6";
    case 2:
      return "mx-auto grid max-w-2xl grid-cols-2 gap-6 sm:gap-8";
    case 3:
      return "mx-auto grid max-w-3xl grid-cols-1 gap-6 min-[420px]:grid-cols-3 sm:gap-8";
    default:
      return "grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8";
  }
}

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
        <div className={statGridClass(stats.length)}>
          {stats.map((stat, i) => (
            <RevealOnScroll key={stat.label} delay={i * 80} variant="scale">
              <div className="stat-bar-cell text-center">
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
