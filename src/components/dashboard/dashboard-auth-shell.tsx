import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import FocusBackground from "@/components/marketing/focus-background";
import ThemeToggle from "@/components/theme-toggle";

type DashboardAuthShellProps = {
  children: ReactNode;
  footer?: ReactNode;
};

export default function DashboardAuthShell({ children, footer }: DashboardAuthShellProps) {
  return (
    <div className="dashboard-auth-page relative flex min-h-screen flex-col">
      <FocusBackground variant="plug-dark" />

      <header className="relative z-10 flex items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="dashboard-auth-home inline-flex items-center gap-2.5">
          <Image src="/pauseward.png" alt="" width={32} height={32} className="rounded-lg" aria-hidden />
          <span className="font-display text-lg font-semibold text-gray-900 dark:text-white">Pauseward</span>
        </Link>
        <ThemeToggle />
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center px-4 pb-10 pt-2 sm:pb-14">
        <div className="dashboard-auth-card w-full max-w-[420px]">{children}</div>
      </main>

      {footer ? <footer className="relative z-10 px-4 pb-6 text-center">{footer}</footer> : null}
    </div>
  );
}

export function DashboardAuthBrand() {
  return (
    <div className="dashboard-auth-brand">
      <Image src="/pauseward.png" alt="Pauseward" width={48} height={48} className="rounded-xl shadow-sm" />
      <div>
        <p className="dashboard-auth-brand-label">Pauseward</p>
        <p className="dashboard-auth-brand-tagline">Your focus dashboard</p>
      </div>
    </div>
  );
}

export function DashboardAuthTabs({
  mode,
  onChange,
}: {
  mode: "signin" | "signup";
  onChange: (mode: "signin" | "signup") => void;
}) {
  return (
    <div className="dashboard-auth-tabs" role="tablist" aria-label="Account access">
      <button
        type="button"
        role="tab"
        aria-selected={mode === "signin"}
        className={mode === "signin" ? "dashboard-auth-tab dashboard-auth-tab--active" : "dashboard-auth-tab"}
        onClick={() => onChange("signin")}
      >
        Sign in
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={mode === "signup"}
        className={mode === "signup" ? "dashboard-auth-tab dashboard-auth-tab--active" : "dashboard-auth-tab"}
        onClick={() => onChange("signup")}
      >
        Create account
      </button>
    </div>
  );
}
