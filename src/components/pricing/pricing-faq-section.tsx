"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/marketing/section-header";
import LegalAccordion from "@/components/marketing/legal-accordion";
import { PRICING_FAQ } from "@/lib/pricing-content";

export default function PricingFaqSection() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ starter: true });

  return (
    <div>
      <div className="mesh-section-header">
        <SectionHeader
          eyebrow="Billing FAQ"
          title="Questions before you subscribe"
          subtitle="Straight answers on plans, M-Pesa, and cancellations."
        />
      </div>
      <div className="mx-auto max-w-3xl">
        <LegalAccordion
          sections={PRICING_FAQ.map((item) => ({
            id: item.id,
            title: item.q,
            content: <p>{item.a}</p>,
          }))}
          openSections={openSections}
          onToggle={(id) => setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }))}
        />
        <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          Account or bug issues?{" "}
          <Link
            href="/contact"
            className="inline-flex items-center gap-1 font-semibold text-emerald-700 hover:text-emerald-600 dark:text-emerald-400"
          >
            Contact support
            <ArrowRight className="h-4 w-4" />
          </Link>
        </p>
      </div>
    </div>
  );
}
