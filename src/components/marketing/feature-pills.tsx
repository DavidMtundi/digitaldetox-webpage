/** Full-width feature chip row (27Plug-style). */
export default function FeaturePills({
  items,
  tone = "default",
  layout = "inline",
}: {
  items: string[];
  tone?: "default" | "dark";
  layout?: "inline" | "band";
}) {
  const textClass =
    tone === "dark"
      ? "text-gray-200"
      : "text-gray-700 dark:text-gray-300";
  const sepClass =
    tone === "dark" ? "text-emerald-400" : "text-emerald-600 dark:text-emerald-400";

  const sizeClass =
    layout === "band"
      ? "text-base font-medium md:text-lg"
      : "text-sm font-medium";

  const trackClass =
    layout === "band"
      ? "feature-pills-track-band flex w-full flex-wrap items-center justify-center gap-x-3 gap-y-3 md:justify-between md:gap-y-4"
      : "feature-pills-track flex flex-wrap items-center justify-center gap-x-2 gap-y-2";

  const wrapClass =
    layout === "band" ? "feature-pills-band w-full" : "feature-pills-wrap overflow-hidden";

  return (
    <div className={wrapClass}>
      <div className={trackClass}>
        {items.map((item, i) => (
          <span
            key={item}
            className={`inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap ${sizeClass} ${textClass}`}
          >
            {i > 0 && <span className={`${sepClass} text-sm md:text-base`} aria-hidden>✦</span>}
            <span>{item}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
