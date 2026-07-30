'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  CreditCard,
  FileText,
  Mail,
  Scale,
  Shield,
  Users,
} from 'lucide-react';
import { LEGAL_CONTACT_EMAIL } from '@/data/privacy-policy';
import { termsOfService, type TermsSectionId } from '@/data/terms-of-service';
import { useExternalLinks } from '@/hooks/useExternalLinks';
import { renderLegalMarkdown } from '@/lib/legal-markdown';
import PageHero from '@/components/marketing/page-hero';
import SectionShell from '@/components/marketing/section-shell';
import LegalAccordion from '@/components/marketing/legal-accordion';

const SECTION_ICONS: Record<TermsSectionId, ReactNode> = {
  acceptance: <FileText className="h-5 w-5" />,
  'service-description': <Users className="h-5 w-5" />,
  accounts: <Shield className="h-5 w-5" />,
  'acceptable-use': <Shield className="h-5 w-5" />,
  privacy: <Shield className="h-5 w-5" />,
  subscriptions: <CreditCard className="h-5 w-5" />,
  'intellectual-property': <Scale className="h-5 w-5" />,
  disclaimers: <AlertTriangle className="h-5 w-5" />,
  liability: <AlertTriangle className="h-5 w-5" />,
  termination: <AlertTriangle className="h-5 w-5" />,
  'governing-law': <Scale className="h-5 w-5" />,
  changes: <FileText className="h-5 w-5" />,
};

const SECTION_ORDER: TermsSectionId[] = [
  'acceptance',
  'service-description',
  'accounts',
  'acceptable-use',
  'privacy',
  'subscriptions',
  'intellectual-property',
  'disclaimers',
  'liability',
  'termination',
  'governing-law',
  'changes',
];

export default function TermsPage() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const { links } = useExternalLinks();
  const contactEmail = links.contact.email || LEGAL_CONTACT_EMAIL;

  const sections = SECTION_ORDER.map((id) => ({
    id,
    title: termsOfService.sections[id].title,
    icon: SECTION_ICONS[id],
    content: renderLegalMarkdown(termsOfService.sections[id].content),
  }));

  return (
    <div className="marketing-page">
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        subtitle="Please read these terms carefully before using Pauseward. They govern your account, subscriptions, and use of our apps and web dashboard."
        size="compact"
      >
        <p className="text-sm text-gray-400">
          Version {termsOfService.version} · Effective {termsOfService.effectiveDate}
        </p>
      </PageHero>

      <SectionShell tone="default">
        <div className="glass-card mb-8 !p-8">
          <h2 className="font-display text-2xl text-gray-900 dark:text-gray-50">Agreement</h2>
          <div className="mt-4 text-gray-700 dark:text-gray-300">
            {renderLegalMarkdown(termsOfService.sections.acceptance.content)}
          </div>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Related:{' '}
            <Link href="/privacy" className="text-emerald-700 hover:underline dark:text-emerald-400">
              Privacy Policy
            </Link>
          </p>
        </div>

        <LegalAccordion
          sections={sections.slice(1)}
          openSections={openSections}
          onToggle={(id) => setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }))}
        />

        <div className="glass-card mt-8 !p-8">
          <h2 className="font-display text-2xl text-gray-900 dark:text-gray-50">Contact us</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Legal questions or billing disputes</p>
          <div className="mt-4 flex items-center gap-3 text-gray-600 dark:text-gray-300">
            <Mail className="h-5 w-5 text-emerald-600" />
            <a
              href={`mailto:${contactEmail}`}
              className="font-medium text-emerald-700 hover:underline dark:text-emerald-400"
            >
              {contactEmail}
            </a>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-6 text-sm text-gray-600 dark:border-gray-700 dark:bg-gray-900/50 dark:text-gray-400">
          <p className="font-semibold text-gray-900 dark:text-gray-50">Legal notice</p>
          <p className="mt-2">
            These Terms are governed by the laws of the Republic of Kenya. Nothing in these Terms limits
            mandatory consumer rights that apply in your country of residence.
          </p>
        </div>
      </SectionShell>
    </div>
  );
}
