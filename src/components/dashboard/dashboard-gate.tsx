"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/auth-provider";
import DashboardSidebar from "@/components/dashboard/sidebar";
import ServiceUnavailablePanel from "@/components/dashboard/service-unavailable-panel";

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
        <ServiceUnavailablePanel
          title="Dashboard temporarily unavailable"
          message="We're having trouble connecting right now. Please try again shortly or contact support if this continues."
        />
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
