"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight, CheckCircle, Loader2, XCircle } from "lucide-react";
import { useAuth } from "@/components/auth/auth-provider";
import { CheckoutStatusResponse, fetchCheckoutStatus } from "@/lib/billing";
import PageHero from "@/components/marketing/page-hero";
import SectionShell from "@/components/marketing/section-shell";
import {
  PlugHeroCtaPrimary,
} from "@/components/marketing/plug-style-hero";

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
      <CheckoutStatusPage
        eyebrow="Checkout"
        title="Confirming payment…"
        subtitle="Hang tight — we're verifying your payment with Paystack."
        icon={<Loader2 className="h-16 w-16 animate-spin text-emerald-500" />}
      />
    );
  }

  if (state === "unauthenticated") {
    return (
      <CheckoutStatusPage
        eyebrow="Checkout"
        title="Sign in to confirm"
        subtitle="Sign in with the same account you used at checkout so we can activate your plan."
        icon={<Loader2 className="h-16 w-16 text-amber-400" />}
        actions={
          <ActionLinks
            signInHref={`/dashboard/login?redirect=/pricing/success?reference=${reference}`}
          />
        }
      />
    );
  }

  if (state === "completed") {
    const planName = status?.displayName ?? "Pauseward Pro";
    const tier = status?.tier ?? "pro";
    const expiresAt = status?.entitlement?.expiresAt;

    return (
      <CheckoutStatusPage
        eyebrow="Checkout"
        title={`You're on ${planName}!`}
        subtitle={
          status?.message ?? `Payment confirmed. Your ${tier} features are active on this account.`
        }
        icon={<CheckCircle className="h-16 w-16 text-emerald-500" />}
        extra={
          expiresAt ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Renews on {new Date(expiresAt).toLocaleDateString()}
            </p>
          ) : null
        }
        actions={<ActionLinks />}
      />
    );
  }

  if (state === "pending") {
    return (
      <CheckoutStatusPage
        eyebrow="Checkout"
        title="Almost there"
        subtitle={
          status?.message ?? "Your payment is being processed. This usually takes under a minute."
        }
        icon={<Loader2 className="h-16 w-16 animate-spin text-emerald-500" />}
        extra={
          <p className="text-xs text-gray-400">Reference: {reference}</p>
        }
        actions={<ActionLinks />}
      />
    );
  }

  return (
    <CheckoutStatusPage
      eyebrow="Checkout"
      title="Could not confirm payment"
      subtitle="If you completed payment, your plan may still activate shortly. Check your dashboard or contact support."
      icon={<XCircle className="h-16 w-16 text-red-400" />}
      extra={
        <p className="font-mono text-sm text-gray-500 dark:text-gray-400">
          Reference: {reference ?? "—"}
        </p>
      }
      actions={<ActionLinks includePricing />}
    />
  );
}

function CheckoutStatusPage({
  eyebrow,
  title,
  subtitle,
  icon,
  extra,
  actions,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  extra?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="marketing-page">
      <PageHero eyebrow={eyebrow} title={title} subtitle={subtitle} size="compact" />
      <SectionShell tone="default">
        <div className="flex flex-col items-center py-4 text-center">
          {icon}
          {extra}
          {actions}
        </div>
      </SectionShell>
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
  const secondaryClass =
    "inline-flex min-h-[48px] items-center justify-center rounded-full border border-gray-200 bg-white px-7 py-3 text-sm font-semibold text-gray-700 transition hover:border-emerald-300 hover:bg-emerald-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-emerald-700 dark:hover:bg-emerald-950/30";

  return (
    <div className="mt-8 flex flex-wrap justify-center gap-4">
      {signInHref ? (
        <PlugHeroCtaPrimary href={signInHref}>Sign in</PlugHeroCtaPrimary>
      ) : (
        <PlugHeroCtaPrimary href="/dashboard">Open dashboard</PlugHeroCtaPrimary>
      )}
      <Link href="/download" className={secondaryClass}>
        Download apps
      </Link>
      {includePricing && (
        <Link href="/pricing" className={secondaryClass}>
          Back to pricing
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
