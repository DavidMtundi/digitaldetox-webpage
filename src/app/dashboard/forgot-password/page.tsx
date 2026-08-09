"use client";

import Link from "next/link";
import { FormEvent, Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { requestPasswordReset, resetPassword } from "@/lib/auth-api";
import { useAuth } from "@/components/auth/auth-provider";
import ServiceUnavailablePanel from "@/components/dashboard/service-unavailable-panel";
import DashboardAuthShell, { DashboardAuthBrand } from "@/components/dashboard/dashboard-auth-shell";

const IS_DEV = process.env.NODE_ENV === "development";

const COPY = {
  request: {
    title: "Forgot your password?",
    subtitle: "Enter the email for your account and we'll send you a link to choose a new password.",
    submit: "Send reset link",
    submitting: "Sending…",
  },
  reset: {
    title: "Choose a new password",
    subtitle: "Pick a strong password with at least 8 characters.",
    submit: "Update password",
    submitting: "Updating…",
  },
} as const;

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<ForgotPasswordLoading />}>
      <ForgotPasswordContent />
    </Suspense>
  );
}

function ForgotPasswordLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fafdfb] dark:bg-[#050807]">
      <Loader2 className="h-8 w-8 animate-spin text-emerald-600" aria-label="Loading" />
    </div>
  );
}

function ForgotPasswordContent() {
  const searchParams = useSearchParams();
  const presetToken = searchParams.get("token");
  const { configured } = useAuth();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(presetToken ?? "");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<"request" | "reset">(presetToken ? "reset" : "request");
  const [message, setMessage] = useState<string | null>(null);
  const [devNote, setDevNote] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [resetComplete, setResetComplete] = useState(false);

  const hasToken = Boolean(token.trim());
  const copy = COPY[step];
  const showResetForm = step === "reset" && hasToken && !resetComplete;
  const showMissingTokenHelp = step === "reset" && !hasToken && !resetComplete;

  async function onRequest(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setMessage(null);
    setDevNote(null);
    try {
      const result = await requestPasswordReset(email.trim());
      setMessage(result.message);
      if (result.devResetToken) {
        setToken(result.devResetToken);
        setStep("reset");
        if (IS_DEV) {
          setDevNote("Development: reset form loaded with a dev token.");
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function onReset(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setMessage(null);
    setDevNote(null);
    try {
      const result = await resetPassword(token.trim(), password);
      setMessage(result.message);
      setResetComplete(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!configured) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-[#fafdfb] px-4 dark:bg-[#050807]">
        <ServiceUnavailablePanel title="Password reset temporarily unavailable" />
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

      {resetComplete ? (
        <div className="dashboard-auth-heading">
          <div className="dashboard-auth-success-icon" aria-hidden>
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <h1 className="dashboard-auth-title">Password updated</h1>
          <p className="dashboard-auth-subtitle">
            {message ?? "Your password has been changed. You can sign in with your new password."}
          </p>
          <Link href="/dashboard/login" className="dashboard-auth-submit mt-6">
            Continue to sign in
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      ) : (
        <>
          <div className="dashboard-auth-heading">
            <h1 className="dashboard-auth-title">{copy.title}</h1>
            <p className="dashboard-auth-subtitle">{copy.subtitle}</p>
          </div>

          {step === "request" ? (
            <form onSubmit={onRequest} className="dashboard-auth-form">
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

              {message ? (
                <div className="dashboard-auth-success" role="status">
                  {message}
                </div>
              ) : null}

              {error ? (
                <div className="dashboard-auth-error" role="alert">
                  {error}
                </div>
              ) : null}

              {IS_DEV && devNote ? (
                <p className="dashboard-auth-dev-note">{devNote}</p>
              ) : null}

              <button type="submit" disabled={submitting} className="dashboard-auth-submit">
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    {COPY.request.submitting}
                  </>
                ) : (
                  <>
                    {COPY.request.submit}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </>
                )}
              </button>
            </form>
          ) : null}

          {showResetForm ? (
            <form onSubmit={onReset} className="dashboard-auth-form">
              <label className="dashboard-auth-field">
                <span>New password</span>
                <input
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="At least 8 characters"
                />
              </label>

              {error ? (
                <div className="dashboard-auth-error" role="alert">
                  {error}
                </div>
              ) : null}

              {IS_DEV && devNote ? (
                <p className="dashboard-auth-dev-note">{devNote}</p>
              ) : null}

              <button type="submit" disabled={submitting} className="dashboard-auth-submit">
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    {COPY.reset.submitting}
                  </>
                ) : (
                  <>
                    {COPY.reset.submit}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </>
                )}
              </button>
            </form>
          ) : null}

          {showMissingTokenHelp ? (
            <div className="dashboard-auth-form">
              <div className="dashboard-auth-success" role="status">
                Open the reset link from your email to choose a new password. Links expire after a short time for
                security.
              </div>
              <button
                type="button"
                className="dashboard-auth-submit"
                onClick={() => {
                  setStep("request");
                  setError(null);
                  setMessage(null);
                }}
              >
                Request a new link
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </div>
          ) : null}
        </>
      )}

      {!resetComplete ? (
        <Link href="/dashboard/login" className="dashboard-auth-back">
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to sign in
        </Link>
      ) : null}
    </DashboardAuthShell>
  );
}
