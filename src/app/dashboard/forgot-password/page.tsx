"use client";

import Link from "next/link";
import { FormEvent, Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { requestPasswordReset, resetPassword } from "@/lib/auth-api";
import ThemeToggle from "@/components/theme-toggle";

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading…</div>}>
      <ForgotPasswordContent />
    </Suspense>
  );
}

function ForgotPasswordContent() {
  const searchParams = useSearchParams();
  const presetToken = searchParams.get("token");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(presetToken ?? "");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<"request" | "reset">(presetToken ? "reset" : "request");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onRequest(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setMessage(null);
    try {
      const result = await requestPasswordReset(email.trim());
      setMessage(result.message);
      if (result.devResetToken) {
        setToken(result.devResetToken);
        setStep("reset");
        setMessage(`${result.message} (dev token loaded — set a new password below.)`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
    } finally {
      setSubmitting(false);
    }
  }

  async function onReset(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setMessage(null);
    try {
      const result = await resetPassword(token.trim(), password);
      setMessage(result.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Reset failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#f5f5f7] px-4 dark:bg-gray-950">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Reset password</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {step === "request"
            ? "Enter your email and we will send reset instructions."
            : "Choose a new password for your account."}
        </p>

        {step === "request" ? (
          <form onSubmit={onRequest} className="mt-6 space-y-4">
            <label className="block text-sm">
              <span className="font-medium text-gray-700 dark:text-gray-300">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
              />
            </label>
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Send reset link"}
            </button>
          </form>
        ) : (
          <form onSubmit={onReset} className="mt-6 space-y-4">
            <label className="block text-sm">
              <span className="font-medium text-gray-700 dark:text-gray-300">Reset token</span>
              <input
                type="text"
                required
                value={token}
                onChange={(event) => setToken(event.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-gray-700 dark:text-gray-300">New password</span>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
              />
            </label>
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
            >
              {submitting ? "Updating…" : "Update password"}
            </button>
          </form>
        )}

        {message ? <p className="mt-4 text-sm text-emerald-700 dark:text-emerald-400">{message}</p> : null}
        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

        <Link
          href="/dashboard/login"
          className="mt-6 inline-block text-sm font-medium text-emerald-700 hover:underline"
        >
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
