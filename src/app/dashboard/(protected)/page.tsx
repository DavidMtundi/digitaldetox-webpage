"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DashboardCard, DashboardPage } from "@/components/dashboard/page-shell";
import { useAuth } from "@/components/auth/auth-provider";
import { getOverview, type DashboardOverview } from "@/lib/dashboard-repository";
import { EntitlementResponse, fetchEntitlements } from "@/lib/billing";
import { PLATFORMS } from "@/lib/platforms";

export default function DashboardHomePage() {
  const { user } = useAuth();
  const [overview, setOverview] = useState<DashboardOverview | null>(null);
  const [entitlement, setEntitlement] = useState<EntitlementResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    getOverview()
      .then(setOverview)
      .catch((err: Error) => setError(err.message));
    fetchEntitlements()
      .then(setEntitlement)
      .catch(() => setEntitlement(null));
  }, [user]);

  return (
    <DashboardPage
      title="Overview"
      subtitle="Your Pauseward account across Mac, Windows, iOS, Android, and web."
      action={
        <Link
          href="/download"
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        >
          Get apps
        </Link>
      }
    >
      {error ? (
        <DashboardCard title="Sync status">
          <p className="text-sm text-amber-700">
            Could not load cloud data yet. Sign in on a device to register it, then refresh.
          </p>
        </DashboardCard>
      ) : null}

      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard label="Linked devices" value={overview ? String(overview.deviceCount) : "—"} />
        <MetricCard label="Blocklists" value={overview ? String(overview.policyCount) : "—"} />
        <MetricCard
          label="Active enforcement"
          value={overview ? String(overview.activeDevices) : "—"}
        />
        <MetricCard
          label="Plan"
          value={entitlement ? entitlement.tier.charAt(0).toUpperCase() + entitlement.tier.slice(1) : "Free"}
        />
      </div>

      <div className="mt-8 grid flex-1 gap-6 lg:grid-cols-2 lg:items-stretch">
        <DashboardCard className="h-full" title="Platforms">
          <ul className="space-y-3">
            {PLATFORMS.map((platform) => (
              <li key={platform.id} className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-gray-900">{platform.name}</p>
                  <p className="text-sm text-gray-600">{platform.tagline}</p>
                </div>
                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                  {platform.status === "available"
                    ? "Live"
                    : platform.status === "beta"
                      ? "Beta"
                      : "Soon"}
                </span>
              </li>
            ))}
          </ul>
        </DashboardCard>

        <DashboardCard
          className="h-full"
          title="Quick actions"
          footer="Use desktop or mobile apps for focus sessions and blocking."
        >
          <div className="space-y-3 text-sm text-gray-700">
            <p>• Start a focus session on macOS or Android</p>
            <p>• Edit blocklists on desktop, then sync here</p>
            <p>• Review linked devices and enforcement health</p>
            <p>• Download builds for each platform from the apps page</p>
            {!entitlement || entitlement.tier === "free" ? (
              <p>
                •{" "}
                <Link href="/dashboard/payments" className="font-medium text-emerald-700 hover:underline">
                  View payments or subscribe
                </Link>{" "}
                with M-Pesa or card
              </p>
            ) : (
              <p>
                •{" "}
                <Link href="/dashboard/payments" className="font-medium text-emerald-700 hover:underline">
                  View payment history
                </Link>
              </p>
            )}
          </div>
        </DashboardCard>
      </div>
    </DashboardPage>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <DashboardCard>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
    </DashboardCard>
  );
}
