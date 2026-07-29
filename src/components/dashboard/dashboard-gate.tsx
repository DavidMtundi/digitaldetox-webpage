"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/auth-provider";
import DashboardSidebar from "@/components/dashboard/sidebar";

export default function DashboardGate({ children }: { children: ReactNode }) {
  const { user, loading, configured } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && configured && !user) {
      router.replace("/dashboard/login");
    }
  }, [loading, configured, user, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f5f7] dark:bg-gray-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  if (!configured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f5f7] px-4 dark:bg-gray-950">
        <div className="max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">API not configured</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Set <code className="text-xs">NEXT_PUBLIC_PAUSEWARD_API_URL</code> to your pauseward-api
            instance to use the dashboard.
          </p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="dashboard-shell flex h-dvh min-h-dvh overflow-hidden bg-[#f5f5f7] dark:bg-gray-950">
      <DashboardSidebar />
      <main className="flex min-h-0 flex-1 flex-col overflow-y-auto">{children}</main>
    </div>
  );
}
