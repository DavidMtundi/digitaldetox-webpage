"use client";

import Link from "next/link";
import { useState } from "react";
import SectionHeader from "@/components/marketing/section-header";
import LegalAccordion from "@/components/marketing/legal-accordion";

const PRODUCT_FAQ = [
  {
    id: "different",
    title: "Why is Pauseward different from timer or willpower apps?",
    content: (
      <p>
        Timer apps and willpower blockers are easy to override the moment you need your phone for something real.
        Pauseward blocks apps and sites at the source — with schedules, focus modes, and sync so your boundaries
        hold through the day.
      </p>
    ),
  },
  {
    id: "exceptions",
    title: "Can I still use my phone when I need to?",
    content: (
      <p>
        Yes. You set which apps and sites are blocked, when schedules apply, and quick exceptions for genuine
        needs — without undoing your whole day. Focus modes switch rule sets in one tap for work, study, or
        wind-down.
      </p>
    ),
  },
  {
    id: "platforms",
    title: "Which devices are supported?",
    content: (
      <p>
        Android, iOS, Windows, macOS, and Android TV are available. Pick your platform on the{" "}
        <Link href="#download" className="font-semibold text-emerald-700 hover:text-emerald-600 dark:text-emerald-400">
          download section
        </Link>{" "}
        above, or see every option on the{" "}
        <Link href="/download" className="font-semibold text-emerald-700 hover:text-emerald-600 dark:text-emerald-400">
          full download page
        </Link>
        .
      </p>
    ),
  },
  {
    id: "pricing",
    title: "How does pricing work?",
    content: (
      <p>
        Download on Android, iOS, Windows, macOS, or Android TV for core blocking and focus modes. Pro and Family add
        advanced schedules, deeper analytics, and shared dashboards — see{" "}
        <Link href="#pricing" className="font-semibold text-emerald-700 hover:text-emerald-600 dark:text-emerald-400">
          simple pricing
        </Link>{" "}
        below. Pay with M-Pesa or card on web when you choose to upgrade.
      </p>
    ),
  },
  {
    id: "family",
    title: "Does it work for families?",
    content: (
      <p>
        Yes. Parent PIN helps prevent uninstall on shared devices, and Family plans cover up to six devices with
        a shared dashboard and policies. Pauseward limits apps and sites — it does not read messages — so you can
        set boundaries without hovering over every notification.
      </p>
    ),
  },
];

export default function ProductFaqSection({ compact = false }: { compact?: boolean }) {
  const sections = compact
    ? PRODUCT_FAQ.filter((item) => ["different", "family", "platforms", "pricing"].includes(item.id))
    : PRODUCT_FAQ;
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ different: true });

  return (
    <div className="product-faq">
      <SectionHeader
        eyebrow="Common questions"
        title="Straight answers before you install"
        subtitle={compact ? "A few essentials — more on Contact." : "Quick answers before you download."}
      />
      <div className="mx-auto max-w-3xl">
        <LegalAccordion
          sections={sections}
          openSections={openSections}
          onToggle={(id) => setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }))}
        />
        <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          Billing, passwords, or refunds?{" "}
          <Link
            href="/contact#message"
            className="font-semibold text-emerald-700 hover:text-emerald-600 dark:text-emerald-400"
          >
            See support FAQ on Contact
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
