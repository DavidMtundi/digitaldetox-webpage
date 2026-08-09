"use client";

import Link from "next/link";
import { FormEvent, Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import { signIn, signUp } from "@/lib/auth";
import { useAuth } from "@/components/auth/auth-provider";
import ServiceUnavailablePanel from "@/components/dashboard/service-unavailable-panel";
import DashboardAuthShell, {
  DashboardAuthBrand,
  DashboardAuthTabs,
} from "@/components/dashboard/dashboard-auth-shell";
import { resolveSafeRedirect } from "@/lib/safe-redirect";

const COPY = {
  signin: {
    title: "Welcome back",
    subtitle: "Manage your devices, blocklists, schedules, and subscription in one place.",
    submit: "Sign in",
    submitting: "Signing in…",
  },
  signup: {
    title: "Create your account",
    subtitle: "Free to start — sync focus settings across Android, iOS, Windows, macOS, and TV.",
    submit: "Create account",
    submitting: "Creating account…",
  },
} as const;

export default function DashboardLoginPage() {
  return (
    <Suspense fallback={<DashboardAuthLoading />}>
      <DashboardLoginContent />
    </Suspense>
  );
}

function DashboardAuthLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fafdfb] dark:bg-[#050807]">
      <Loader2 className="h-8 w-8 animate-spin text-emerald-600" aria-label="Loading" />
    </div>
  );
}

function DashboardLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect");
  const { user, loading, configured } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const copy = COPY[mode];

  useEffect(() => {
    if (!loading && user) {
      router.replace(resolveSafeRedirect(redirectTo, "/dashboard"));
    }
  }, [loading, user, router, redirectTo]);

  function switchMode(next: "signin" | "signup") {
    setMode(next);
    setError(null);
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      if (mode === "signin") {
        await signIn(email.trim(), password);
      } else {
        const session = await signUp(email.trim(), password);
        if (session.devVerificationToken) {
          router.replace(
            `/dashboard/verify-email?token=${encodeURIComponent(session.devVerificationToken)}`,
          );
          return;
        }
      }
      router.replace(resolveSafeRedirect(redirectTo, "/dashboard"));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!configured) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-[#fafdfb] px-4 dark:bg-[#050807]">
        <ServiceUnavailablePanel />
      </div>
    );
  }

  return (
    <DashboardAuthShell
      footer={
        <p className="text-xs text-gray-500 dark:text-gray-400">
          <Link href="/download" className="font-medium text-emerald-700 hover:underline dark:text-emerald-400">
            Download the app
          </Link>
          {" · "}
          <Link href="/contact" className="font-medium text-emerald-700 hover:underline dark:text-emerald-400">
            Need help?
          </Link>
        </p>
      }
    >
      <DashboardAuthBrand />

      <DashboardAuthTabs mode={mode} onChange={switchMode} />

      <div className="dashboard-auth-heading">
        <h1 className="dashboard-auth-title">{copy.title}</h1>
        <p className="dashboard-auth-subtitle">{copy.subtitle}</p>
      </div>

      <form onSubmit={onSubmit} className="dashboard-auth-form">
        <label className="dashboard-auth-field">
          <span>Email</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
          />
        </label>

        <label className="dashboard-auth-field">
          <span>Password</span>
          <input
            type="password"
            name="password"
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            required
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder={mode === "signup" ? "At least 8 characters" : "Your password"}
          />
        </label>

        {mode === "signin" ? (
          <div className="dashboard-auth-forgot">
            <Link href="/dashboard/forgot-password">Forgot password?</Link>
          </div>
        ) : null}

        {error ? (
          <div className="dashboard-auth-error" role="alert">
            {error}
          </div>
        ) : null}

        <button type="submit" disabled={submitting} className="dashboard-auth-submit">
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              {copy.submitting}
            </>
          ) : (
            <>
              {copy.submit}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </>
          )}
        </button>
      </form>

      <p className="dashboard-auth-legal">
        By continuing, you agree to our{" "}
        <Link href="/terms">Terms of Service</Link> and <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </DashboardAuthShell>
  );
}
