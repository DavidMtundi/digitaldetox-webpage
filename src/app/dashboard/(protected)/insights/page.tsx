"use client";

import { useEffect, useState } from "react";
import { DashboardCard, DashboardPage, EmptyState } from "@/components/dashboard/page-shell";
import { useAuth } from "@/components/auth/auth-provider";

export default function InsightsPage() {
  const { user } = useAuth();
  const [goalMinutes] = useState(120);

  useEffect(() => {
    void user;
  }, [user]);

  return (
    <DashboardPage
      title="Insights"
      subtitle="Review how today went across your linked devices."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <DashboardCard title="Today">
          <div className="flex items-center gap-6">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-8 border-emerald-100 text-2xl font-semibold text-gray-900">
              0
            </div>
            <div>
              <p className="text-sm text-gray-600">{goalMinutes} minute daily goal</p>
              <p className="mt-1 text-sm text-gray-500">Sessions sync from desktop and mobile apps.</p>
            </div>
          </div>
        </DashboardCard>
        <DashboardCard title="This week">
          <EmptyState
            title="No focus data yet"
            description="Complete a session on macOS or Android to see your weekly chart here."
          />
        </DashboardCard>
      </div>
    </DashboardPage>
  );
}
