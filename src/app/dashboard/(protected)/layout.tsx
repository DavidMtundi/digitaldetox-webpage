import type { ReactNode } from "react";
import DashboardGate from "@/components/dashboard/dashboard-gate";

export default function ProtectedDashboardLayout({ children }: { children: ReactNode }) {
  return <DashboardGate>{children}</DashboardGate>;
}
