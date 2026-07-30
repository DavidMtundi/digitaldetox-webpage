'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { Clock, Database, Eye, FileText, Globe, Lock, Mail, Shield, Smartphone } from 'lucide-react';
import { LEGAL_CONTACT_EMAIL, privacyPolicyVersions, versionSpecificContent } from '@/data/privacy-policy';
import { useExternalLinks } from '@/hooks/useExternalLinks';
import { renderLegalMarkdown } from '@/lib/legal-markdown';
import PageHero from '@/components/marketing/page-hero';
import SectionShell from '@/components/marketing/section-shell';
import SectionHeader from '@/components/marketing/section-header';
import LegalAccordion from '@/components/marketing/legal-accordion';

const SECTION_ICONS: Record<string, ReactNode> = {
  introduction: <Shield className="h-5 w-5" />,
  'information-collection': <Database className="h-5 w-5" />,
  'how-we-use': <Eye className="h-5 w-5" />,
  'data-sharing': <Shield className="h-5 w-5" />,
  'data-security': <Lock className="h-5 w-5" />,
  permissions: <Smartphone className="h-5 w-5" />,
  'your-rights': <Shield className="h-5 w-5" />,
  'children-privacy': <Shield className="h-5 w-5" />,
  'data-retention': <Database className="h-5 w-5" />,
  'international-users': <Globe className="h-5 w-5" />,
  'changes-updates': <Eye className="h-5 w-5" />,
};

export default function PrivacyPage() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [selectedVersion, setSelectedVersion] = useState('2.0');
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const { links } = useExternalLinks();

  const currentVersion = privacyPolicyVersions.versions.find((v) => v.version === selectedVersion);
  const contactEmail = links.contact.email || LEGAL_CONTACT_EMAIL;

  const sectionOrder = [
    'introduction',
    'information-collection',
    'how-we-use',
    'data-sharing',
    'data-security',
    'permissions',
    'your-rights',
    'children-privacy',
    'data-retention',
    'international-users',
    'changes-updates',
  ] as const;

  const sections = sectionOrder.map((id) => {
    const base = privacyPolicyVersions.sections[id];
    const override = versionSpecificContent[selectedVersion]?.[id];
    return {
      id,
      title: base.title,
      icon: SECTION_ICONS[id],
      content: renderLegalMarkdown(override || base.content),
    };
  });

  return (
    <div className="marketing-page">
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your information when you use Pauseward on web, mobile, and desktop."
        size="compact"
      >
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Clock className="h-4 w-4 text-emerald-400" />
            <select
              value={selectedVersion}
              onChange={(e) => setSelectedVersion(e.target.value)}
              className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
            >
              {privacyPolicyVersions.versions.map((version) => (
                <option key={version.version} value={version.version} className="text-gray-900">
                  v{version.version} {version.isCurrent ? '(Current)' : ''}
                </option>
              ))}
            </select>
          </div>
          <span className="text-sm text-gray-400">Effective {currentVersion?.effectiveDate}</span>
        </div>
        <button
          type="button"
          onClick={() => setShowVersionHistory(!showVersionHistory)}
          className="text-sm font-medium text-emerald-400 hover:text-emerald-300"
        >
          <FileText className="mr-1 inline h-4 w-4" />
          {showVersionHistory ? 'Hide' : 'Show'} version history
        </button>
      </PageHero>

      {showVersionHistory && (
        <SectionShell tone="mesh">
          <div className="mesh-section-header">
            <SectionHeader eyebrow="Archive" title="Version history" />
          </div>
          <div className="mx-auto max-w-3xl space-y-4">
            {privacyPolicyVersions.versions.map((version) => (
              <div
                key={version.version}
                className={`rounded-2xl border p-5 ${
                  version.isCurrent
                    ? 'border-emerald-200 bg-white dark:border-emerald-800 dark:bg-gray-900'
                    : 'border-gray-200 bg-white/80 dark:border-gray-700 dark:bg-gray-900/80'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-50">
                    Version {version.version}
                    {version.isCurrent && (
                      <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                        Current
                      </span>
                    )}
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Effective {version.effectiveDate}</span>
                </div>
                {version.changes && (
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-600 dark:text-gray-400">
                    {version.changes.map((change) => (
                      <li key={change}>{change}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </SectionShell>
      )}

      <SectionShell tone="default">
        <div className="glass-card mb-8 !p-8">
          <h2 className="font-display text-2xl text-gray-900 dark:text-gray-50">Introduction</h2>
          <div className="mt-4 text-gray-700 dark:text-gray-300">
            {renderLegalMarkdown(
              versionSpecificContent[selectedVersion]?.introduction ||
                privacyPolicyVersions.sections.introduction.content,
            )}
          </div>
        </div>

        <LegalAccordion
          sections={sections.slice(1)}
          openSections={openSections}
          onToggle={(id) => setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }))}
        />

        <div className="glass-card mt-8 !p-8">
          <h2 className="font-display text-2xl text-gray-900 dark:text-gray-50">Contact us</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Questions about this policy or your data? Email us — we aim to respond within 48 hours.
          </p>
          <div className="mt-4 flex items-center gap-3 text-gray-600 dark:text-gray-300">
            <Mail className="h-5 w-5 text-emerald-600" />
            <a
              href={`mailto:${contactEmail}`}
              className="font-medium text-emerald-700 hover:underline dark:text-emerald-400"
            >
              {contactEmail}
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            See also our{' '}
            <Link href="/terms" className="text-emerald-700 hover:underline dark:text-emerald-400">
              Terms of Service
            </Link>
            .
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-6 text-sm text-gray-600 dark:border-gray-700 dark:bg-gray-900/50 dark:text-gray-400">
          <p className="font-semibold text-gray-900 dark:text-gray-50">Your consent</p>
          <p className="mt-2">By using Pauseward, you acknowledge this Privacy Policy.</p>
          <p className="mt-4 text-xs text-gray-500 dark:text-gray-500">
            Pauseward · Version {selectedVersion} · © {new Date().getFullYear()} Pauseward. All rights reserved.
          </p>
        </div>
      </SectionShell>
    </div>
  );
}
