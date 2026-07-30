import { XCircle } from "lucide-react";
import PageHero from "@/components/marketing/page-hero";
import SectionShell from "@/components/marketing/section-shell";
import {
  PlugHeroCtaPrimary,
  PlugHeroCtaSecondary,
} from "@/components/marketing/plug-style-hero";

export default function PricingCancelPage() {
  return (
    <div className="marketing-page">
      <PageHero
        eyebrow="Checkout"
        title="Payment cancelled"
        subtitle="No charge was made. You can return to pricing whenever you're ready."
        size="compact"
      >
        <PlugHeroCtaPrimary href="/pricing">Back to pricing</PlugHeroCtaPrimary>
        <PlugHeroCtaSecondary href="/">Go home</PlugHeroCtaSecondary>
      </PageHero>

      <SectionShell tone="default">
        <div className="flex flex-col items-center py-8 text-center">
          <XCircle className="h-12 w-12 text-gray-300 dark:text-gray-600" aria-hidden />
          <p className="mt-4 max-w-md text-sm text-gray-600 dark:text-gray-400">
            Need help choosing a plan? Visit pricing or contact support — we&apos;re happy to walk you through options.
          </p>
        </div>
      </SectionShell>
    </div>
  );
}
