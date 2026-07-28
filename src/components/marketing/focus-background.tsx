type FocusBackgroundProps = {
  variant?: "hero" | "section" | "cta";
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

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div
        className={`absolute inset-0 ${
          variant === "hero"
            ? "mesh-hero"
            : "bg-gradient-to-b from-emerald-50/50 via-white to-[#f8faf9]"
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
