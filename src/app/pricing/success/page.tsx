import { Suspense } from "react";
import PageHero from "@/components/marketing/page-hero";
import SectionShell from "@/components/marketing/section-shell";
import { Loader2 } from "lucide-react";
import PricingSuccessContent from "./success-content";

function SuccessFallback() {
  return (
    <div className="marketing-page">
      <PageHero
        eyebrow="Checkout"
        title="Confirming payment…"
        subtitle="Hang tight — we're verifying your payment with Paystack."
        size="compact"
      />
      <SectionShell tone="default">
        <div className="flex flex-col items-center py-8 text-center">
          <Loader2 className="h-16 w-16 animate-spin text-emerald-500" />
        </div>
      </SectionShell>
    </div>
  );
}

export default function PricingSuccessPage() {
  return (
    <Suspense fallback={<SuccessFallback />}>
      <PricingSuccessContent />
    </Suspense>
  );
}
