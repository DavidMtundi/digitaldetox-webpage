import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import DashboardPaymentsContent from "./payments-content";

export default function DashboardPaymentsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center px-6 py-8">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
        </div>
      }
    >
      <DashboardPaymentsContent />
    </Suspense>
  );
}
