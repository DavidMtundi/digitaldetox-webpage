import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import PricingSuccessContent from "./success-content";

export default function PricingSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="container-modern flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
          <Loader2 className="h-16 w-16 animate-spin text-emerald-600" />
          <h1 className="mt-6 text-3xl font-bold text-gray-900">Confirming payment…</h1>
        </div>
      }
    >
      <PricingSuccessContent />
    </Suspense>
  );
}
