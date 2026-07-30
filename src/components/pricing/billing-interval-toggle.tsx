export type BillingInterval = "monthly" | "annual";

export default function BillingIntervalToggle({
  value,
  onChange,
  savingsPercent = 0,
}: {
  value: BillingInterval;
  onChange: (interval: BillingInterval) => void;
  /** Shown on the Yearly option when &gt; 0 */
  savingsPercent?: number;
}) {
  return (
    <div
      className="billing-interval-toggle inline-flex rounded-full border border-gray-200/80 bg-white/90 p-1 shadow-lg backdrop-blur-sm dark:border-gray-700/80 dark:bg-gray-900/90"
      role="group"
      aria-label="Billing interval"
    >
      <button
        type="button"
        onClick={() => onChange("annual")}
        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
          value === "annual"
            ? "billing-interval-active bg-emerald-600 text-white"
            : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        }`}
        aria-pressed={value === "annual"}
      >
        Yearly
        {savingsPercent > 0 && (
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
              value === "annual" ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300"
            }`}
          >
            −{savingsPercent}%
          </span>
        )}
      </button>
      <button
        type="button"
        onClick={() => onChange("monthly")}
        className={`rounded-full px-4 py-2 text-sm font-medium transition ${
          value === "monthly"
            ? "billing-interval-active bg-emerald-600 text-white"
            : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        }`}
        aria-pressed={value === "monthly"}
      >
        Monthly
      </button>
    </div>
  );
}
