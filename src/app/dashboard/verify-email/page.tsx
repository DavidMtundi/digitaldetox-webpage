"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyEmail } from "@/lib/auth-api";
import ThemeToggle from "@/components/theme-toggle";

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading…</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setError("Missing verification token.");
      return;
    }

    verifyEmail(token)
      .then((result) => {
        setMessage(result.message);
        setTimeout(() => router.replace("/dashboard/settings"), 2000);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Verification failed");
      });
  }, [token, router]);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#f5f5f7] px-4 dark:bg-gray-950">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Verify email</h1>
        {message ? <p className="mt-4 text-sm text-emerald-700">{message}</p> : null}
        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
        {!message && !error ? (
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">Verifying your email…</p>
        ) : null}
        <Link
          href="/dashboard/settings"
          className="mt-6 inline-block text-sm font-medium text-emerald-700 hover:underline"
        >
          Go to settings
        </Link>
      </div>
    </div>
  );
}
