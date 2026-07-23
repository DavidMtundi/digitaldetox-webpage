"use client";

import Link from "next/link";
import { DashboardCard, DashboardPage } from "@/components/dashboard/page-shell";
import { useAuth } from "@/components/auth/auth-provider";
import { PLATFORMS } from "@/lib/platforms";

export default function DashboardSettingsPage() {
  const { user } = useAuth();

  return (
    <DashboardPage title="Settings" subtitle="Account, platforms, and sync for this web session.">
      <div className="grid gap-4 lg:grid-cols-2">
        <DashboardCard title="Account">
          <p className="text-sm text-gray-600">Signed in as</p>
          <p className="mt-1 font-medium text-gray-900">{user?.email}</p>
        </DashboardCard>

        <DashboardCard title="Platforms">
          <ul className="space-y-2 text-sm text-gray-700">
            {PLATFORMS.map((platform) => (
              <li key={platform.id} className="flex justify-between gap-3">
                <span>{platform.name}</span>
                <span className="text-gray-500 capitalize">{platform.status.replace("_", " ")}</span>
              </li>
            ))}
          </ul>
          <Link href="/download" className="mt-4 inline-block text-sm font-medium text-emerald-700 hover:underline">
            Download apps
          </Link>
        </DashboardCard>

        <DashboardCard title="Cloud sync" footer="Policy sync uses the same Firebase account as desktop and mobile.">
          <p className="text-sm text-gray-700">
            Blocklists and device registration sync through Pauseward cloud functions. Use the desktop
            app Settings panel to sync blocklists manually until mobile sync ships.
          </p>
        </DashboardCard>

        <DashboardCard title="Privacy">
          <p className="text-sm text-gray-700">
            Pauseward stores aggregate focus metrics and policy metadata — not screen content or
            messages.
          </p>
          <Link href="/privacy" className="mt-3 inline-block text-sm font-medium text-emerald-700 hover:underline">
            Read privacy policy
          </Link>
        </DashboardCard>
      </div>
    </DashboardPage>
  );
}
