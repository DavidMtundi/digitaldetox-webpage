"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DashboardCard, DashboardPage, EmptyState } from "@/components/dashboard/page-shell";
import { useAuth } from "@/components/auth/auth-provider";
import { listDevices, type DashboardDevice } from "@/lib/dashboard-repository";

export default function DevicesPage() {
  const { user } = useAuth();
  const [devices, setDevices] = useState<DashboardDevice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    listDevices()
      .then(setDevices)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <DashboardPage
      title="Devices"
      subtitle="Mac, Windows, iOS, and Android clients linked to your Pauseward account."
    >
      {error ? (
        <DashboardCard title="Could not load devices">
          <p className="text-sm text-amber-700">{error}</p>
        </DashboardCard>
      ) : null}

      {loading ? (
        <p className="text-sm text-gray-500">Loading devices…</p>
      ) : devices.length === 0 ? (
        <EmptyState
          title="No devices linked"
          description="Sign in on desktop or mobile with this account. Apps register devices through the Pauseward API when you start a session."
          action={
            <Link href="/download" className="text-sm font-medium text-emerald-700 hover:underline">
              Download an app
            </Link>
          }
        />
      ) : (
        <div className="space-y-3">
          {devices.map((device) => (
            <DashboardCard key={device.id}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-gray-900 capitalize">{device.platform}</p>
                  <p className="text-sm text-gray-600">
                    v{device.clientVersion ?? "unknown"} · {device.timezone ?? "UTC"}
                  </p>
                  <p className="text-xs text-gray-500">
                    Last seen {device.lastSeenAt ? new Date(device.lastSeenAt).toLocaleString() : "unknown"}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    device.enforcementActive
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {device.enforcementActive ? "Blocking active" : "Idle"}
                </span>
              </div>
            </DashboardCard>
          ))}
        </div>
      )}
    </DashboardPage>
  );
}
