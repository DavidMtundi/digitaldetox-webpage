import Link from "next/link";
import { XCircle } from "lucide-react";
import PageHero from "@/components/marketing/page-hero";

export default function PricingCancelPage() {
  return (
    <div className="marketing-page">
      <PageHero
        eyebrow="Checkout"
        title="Payment cancelled"
        subtitle="No charge was made. You can return to pricing whenever you're ready."
        size="compact"
      >
        <Link href="/pricing" className="btn-primary">
          Back to pricing
        </Link>
        <Link href="/" className="btn-secondary">
          Go home
        </Link>
      </PageHero>
      <div className="container-modern flex justify-center pb-20">
        <XCircle className="h-12 w-12 text-gray-300" aria-hidden />
      </div>
    </div>
  );
}
