type FocusBackgroundProps = {
  variant?: "hero" | "section" | "cta" | "plug-dark";
  className?: string;
};

export default function FocusBackground({ variant = "section", className = "" }: FocusBackgroundProps) {
  if (variant === "cta") {
    return (
      <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-800" />
        <div className="glow-orb glow-orb-white left-1/4 top-0 opacity-30" />
        <div className="marketing-grain absolute inset-0 opacity-15" />
      </div>
    );
  }

  if (variant === "plug-dark") {
    return (
      <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
        <div className="focus-bg-plug-light absolute inset-0 mesh-hero dark:hidden" />
        <div className="focus-bg-plug-dark absolute inset-0 hidden bg-[#050807] dark:block" />
        <div
          className="focus-bg-plug-glow absolute inset-0 hidden dark:block"
          style={{
            background:
              "radial-gradient(ellipse 90% 55% at 50% 100%, rgba(16, 185, 129, 0.35), transparent 55%), radial-gradient(ellipse 60% 40% at 20% 20%, rgba(20, 184, 166, 0.08), transparent 50%)",
          }}
        />
        <div className="glow-orb glow-orb-emerald left-1/2 top-[60%] h-[32rem] w-[48rem] -translate-x-1/2 opacity-25 dark:opacity-40" />
        <div className="marketing-grain absolute inset-0 opacity-[0.2] dark:opacity-[0.18]" />
      </div>
    );
  }

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div
        className={`absolute inset-0 ${
          variant === "hero"
            ? "mesh-hero"
            : "bg-gradient-to-b from-emerald-50/50 via-white to-[#f8faf9] dark:from-emerald-950/50 dark:via-gray-950 dark:to-gray-950"
        }`}
      />
      <div className="glow-orb glow-orb-emerald -left-32 top-10" />
      <div className="glow-orb glow-orb-teal -right-20 bottom-0" />
      <div className="marketing-grain absolute inset-0 opacity-[0.25]" />
      {variant === "hero" && (
        <>
          <div className="hero-ring absolute left-[15%] top-1/4 h-64 w-64 rounded-full border border-emerald-200/30" />
          <div className="hero-ring absolute right-[10%] bottom-1/4 h-48 w-48 rounded-full border border-teal-200/25" />
        </>
      )}
    </div>
  );
}
