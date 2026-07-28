"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

type ThemeToggleProps = {
  className?: string;
  showLabel?: boolean;
};

export default function ThemeToggle({ className = "", showLabel = false }: ThemeToggleProps) {
  const { preference, resolvedTheme, setPreference } = useTheme();

  const next = resolvedTheme === "dark" ? "light" : "dark";
  const Icon = resolvedTheme === "dark" ? Sun : Moon;
  const label = resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={() => setPreference(next)}
      className={`theme-toggle ${className}`}
      aria-label={label}
      title={
        preference === "system"
          ? `${label} (currently following system)`
          : label
      }
    >
      <Icon className="h-[18px] w-[18px]" aria-hidden />
      {showLabel ? (
        <span className="text-sm font-medium">{resolvedTheme === "dark" ? "Light" : "Dark"}</span>
      ) : null}
      {preference === "system" ? (
        <Monitor className="theme-toggle-system-badge h-3 w-3" aria-hidden />
      ) : null}
    </button>
  );
}
