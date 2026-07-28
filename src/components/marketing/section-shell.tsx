import type { ReactNode } from "react";
import FocusBackground from "./focus-background";

type SectionShellProps = {
  children: ReactNode;
  tone?: "default" | "white" | "mesh" | "dark";
  className?: string;
  id?: string;
};

const TONES = {
  default: "bg-[#f8faf9]",
  white: "bg-white",
  mesh: "relative overflow-hidden bg-[#f0fdf4]",
  dark: "relative overflow-hidden bg-gray-950 text-white",
};

export default function SectionShell({
  children,
  tone = "default",
  className = "",
  id,
}: SectionShellProps) {
  return (
    <section id={id} className={`py-16 md:py-20 lg:py-24 ${TONES[tone]} ${className}`}>
      {tone === "mesh" && <FocusBackground variant="section" />}
      {tone === "dark" && (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-gray-950 to-gray-950" />
          <div className="glow-orb glow-orb-emerald -left-20 top-10" />
          <div className="glow-orb glow-orb-teal -right-20 bottom-0" />
        </div>
      )}
      <div className={`container-modern relative z-10 ${tone === "mesh" || tone === "dark" ? "" : ""}`}>
        {children}
      </div>
    </section>
  );
}
