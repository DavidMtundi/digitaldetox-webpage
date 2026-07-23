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

  useEffect(() => {
    if (!user) return;
    listDevices(user.uid)
      .then(setDevices)
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <DashboardPage
      title="Devices"
      subtitle="Mac, Windows, iOS, and Android clients linked to your account."
    >
      {loading ? (
        <p className="text-sm text-gray-500">Loading devices…</p>
      ) : devices.length === 0 ? (
        <EmptyState
          title="No devices linked"
          description="Sign in on desktop or mobile with this account to register a device for sync."
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
