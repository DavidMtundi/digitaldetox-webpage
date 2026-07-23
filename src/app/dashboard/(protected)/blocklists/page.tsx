"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DashboardCard, DashboardPage, EmptyState } from "@/components/dashboard/page-shell";
import { useAuth } from "@/components/auth/auth-provider";
import { listPolicies, type DashboardPolicy } from "@/lib/dashboard-repository";

export default function BlocklistsPage() {
  const { user } = useAuth();
  const [policies, setPolicies] = useState<DashboardPolicy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    listPolicies(user.uid)
      .then(setPolicies)
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <DashboardPage
      title="Blocklists"
      subtitle="Groups of apps and sites to block during focus."
    >
      {loading ? (
        <p className="text-sm text-gray-500">Loading blocklists…</p>
      ) : policies.length === 0 ? (
        <EmptyState
          title="No blocklists synced yet"
          description="Create blocklists in the macOS or Windows desktop app, or on Android. They will appear here after cloud sync."
          action={
            <Link href="/download" className="text-sm font-medium text-emerald-700 hover:underline">
              Download Pauseward
            </Link>
          }
        />
      ) : (
        <div className="space-y-3">
          {policies.map((policy) => (
            <DashboardCard key={policy.id}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-gray-900">{policy.name}</p>
                  <p className="text-sm text-gray-600">
                    {policy.blockedAppCount} apps · {policy.blockedDomainCount} sites · rev{" "}
                    {policy.revision}
                  </p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                  {policy.strictness ?? "committed"}
                </span>
              </div>
            </DashboardCard>
          ))}
        </div>
      )}
    </DashboardPage>
  );
}
