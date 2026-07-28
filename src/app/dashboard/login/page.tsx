"use client";

import Link from "next/link";
import Image from "next/image";
import { FormEvent, Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, signUp } from "@/lib/auth";
import { useAuth } from "@/components/auth/auth-provider";
import ThemeToggle from "@/components/theme-toggle";
import { resolveSafeRedirect } from "@/lib/safe-redirect";

export default function DashboardLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#f5f5f7] dark:bg-gray-950">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
        </div>
      }
    >
      <DashboardLoginContent />
    </Suspense>
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

  useEffect(() => {
    if (!loading && user) {
      router.replace(resolveSafeRedirect(redirectTo, "/dashboard"));
    }
  }, [loading, user, router, redirectTo]);

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
      setError(err instanceof Error ? err.message : "Authentication failed.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!configured) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-[#f5f5f7] px-4 dark:bg-gray-950">
        <div className="absolute right-4 top-4">
          <ThemeToggle />
        </div>
        <div className="max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">API not configured</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Set <code className="text-xs">NEXT_PUBLIC_PAUSEWARD_API_URL</code> to your pauseward-api
            instance to enable sign-in and checkout.
          </p>
          <Link href="/" className="mt-6 inline-block text-sm font-medium text-emerald-700 hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#f5f5f7] px-4 dark:bg-gray-950">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-6">
          <div className="mb-4 flex items-center gap-3">
            <Image src="/pauseward.png" alt="Pauseward" width={40} height={40} className="rounded-lg" />
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Pauseward</h1>
          </div>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Sign in with your Pauseward account. Billing and subscriptions are stored in PostgreSQL.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block text-sm">
            <span className="font-medium text-gray-700 dark:text-gray-300">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none ring-emerald-500 focus:ring-2 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
            />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-gray-700 dark:text-gray-300">Password</span>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none ring-emerald-500 focus:ring-2 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
            />
          </label>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
          >
            {submitting ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-4 w-full text-sm text-gray-600 hover:text-emerald-700 dark:text-gray-400 dark:hover:text-emerald-400"
        >
          {mode === "signin" ? "Need an account? Create one" : "Already have an account? Sign in"}
        </button>

        {mode === "signin" ? (
          <Link
            href="/dashboard/forgot-password"
            className="mt-3 block text-center text-sm text-gray-600 hover:text-emerald-700 dark:text-gray-400"
          >
            Forgot password?
          </Link>
        ) : null}

        <p className="mt-6 text-center text-xs leading-relaxed text-gray-500 dark:text-gray-400">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="text-emerald-700 hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-emerald-700 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
