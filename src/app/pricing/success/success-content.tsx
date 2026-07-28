"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { useAuth } from "@/components/auth/auth-provider";
import { CheckoutStatusResponse, fetchCheckoutStatus } from "@/lib/billing";

type PageState = "loading" | "pending" | "completed" | "failed" | "unauthenticated";

export default function PricingSuccessContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference") ?? searchParams.get("trxref");
  const { user, loading: authLoading } = useAuth();

  const [state, setState] = useState<PageState>("loading");
  const [status, setStatus] = useState<CheckoutStatusResponse | null>(null);
  const [pollCount, setPollCount] = useState(0);

  const checkStatus = useCallback(async () => {
    if (!reference) {
      setState("failed");
      return;
    }
    if (!user) {
      setState("unauthenticated");
      return;
    }

    try {
      const result = await fetchCheckoutStatus(reference);
      setStatus(result);

      if (result.status === "completed") {
        setState("completed");
        return;
      }

      if (result.status === "pending") {
        setState("pending");
        return;
      }

      setState("failed");
    } catch {
      setState("failed");
    }
  }, [reference, user]);

  useEffect(() => {
    if (authLoading) return;
    void checkStatus();
  }, [authLoading, checkStatus]);

  useEffect(() => {
    if (state !== "pending" || !reference || !user) return;

    const timer = setInterval(() => {
      setPollCount((count) => count + 1);
    }, 3000);

    return () => clearInterval(timer);
  }, [state, reference, user]);

  useEffect(() => {
    if (pollCount === 0 || state !== "pending") return;
    void checkStatus();
  }, [pollCount, state, checkStatus]);

  if (authLoading || state === "loading") {
    return (
      <StatusShell icon={<Loader2 className="h-16 w-16 animate-spin text-emerald-600" />}>
        <h1 className="mt-6 font-display text-3xl text-gray-900">Confirming payment…</h1>
        <p className="mt-3 max-w-md text-gray-600">
          Hang tight — we&apos;re verifying your payment with Paystack.
        </p>
      </StatusShell>
    );
  }

  if (state === "unauthenticated") {
    return (
      <StatusShell icon={<Loader2 className="h-16 w-16 text-amber-500" />}>
        <h1 className="mt-6 font-display text-3xl text-gray-900">Sign in to confirm</h1>
        <p className="mt-3 max-w-md text-gray-600">
          Sign in with the same account you used at checkout so we can activate your plan.
        </p>
        <ActionLinks signInHref={`/dashboard/login?redirect=/pricing/success?reference=${reference}`} />
      </StatusShell>
    );
  }

  if (state === "completed") {
    const planName = status?.displayName ?? "Pauseward Pro";
    const tier = status?.tier ?? "pro";
    const expiresAt = status?.entitlement?.expiresAt;

    return (
      <StatusShell icon={<CheckCircle className="h-16 w-16 text-emerald-600" />}>
        <h1 className="mt-6 font-display text-3xl text-gray-900">You&apos;re on {planName}!</h1>
        <p className="mt-3 max-w-md text-gray-600">
          {status?.message ??
            `Payment confirmed. Your ${tier} features are active on this account.`}
        </p>
        {expiresAt && (
          <p className="mt-2 text-sm text-gray-500">
            Renews on {new Date(expiresAt).toLocaleDateString()}
          </p>
        )}
        <ActionLinks />
      </StatusShell>
    );
  }

  if (state === "pending") {
    return (
      <StatusShell icon={<Loader2 className="h-16 w-16 animate-spin text-emerald-600" />}>
        <h1 className="mt-6 font-display text-3xl text-gray-900">Almost there</h1>
        <p className="mt-3 max-w-md text-gray-600">
          {status?.message ??
            "Your payment is being processed. This usually takes under a minute."}
        </p>
        <p className="mt-2 text-xs text-gray-400">Reference: {reference}</p>
        <ActionLinks />
      </StatusShell>
    );
  }

  return (
    <StatusShell icon={<XCircle className="h-16 w-16 text-red-500" />}>
      <h1 className="mt-6 font-display text-3xl text-gray-900">Could not confirm payment</h1>
      <p className="mt-3 max-w-md text-gray-600">
        If you completed payment, your plan may still activate shortly. Check your dashboard or
        contact support with reference{" "}
        <span className="font-mono text-sm">{reference ?? "—"}</span>.
      </p>
      <ActionLinks includePricing />
    </StatusShell>
  );
}

function StatusShell({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="marketing-page min-h-[60vh]">
      <div className="container-modern flex flex-col items-center justify-center py-20 text-center">
        {icon}
        {children}
      </div>
    </div>
  );
}

function ActionLinks({
  signInHref,
  includePricing = false,
}: {
  signInHref?: string;
  includePricing?: boolean;
}) {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-3">
      {signInHref ? (
        <Link
          href={signInHref}
          className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Sign in
        </Link>
      ) : (
        <Link
          href="/dashboard"
          className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Open dashboard
        </Link>
      )}
      <Link
        href="/download"
        className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
      >
        Download apps
      </Link>
      {includePricing && (
        <Link
          href="/pricing"
          className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          Back to pricing
        </Link>
      )}
    </div>
  );
}
