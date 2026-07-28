'use client';

import { useState } from 'react';
import { Clock, Database, Eye, FileText, Globe, Lock, Mail, Phone, Shield, Smartphone } from 'lucide-react';
import { privacyPolicyVersions, versionSpecificContent } from '@/data/privacy-policy';
import { useExternalLinks } from '@/hooks/useExternalLinks';
import PageHero from '@/components/marketing/page-hero';
import LegalAccordion from '@/components/marketing/legal-accordion';

export default function VersionedPrivacyPage() {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});
  const [selectedVersion, setSelectedVersion] = useState<string>('1.0');
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const { links } = useExternalLinks();

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const currentVersion = privacyPolicyVersions.versions.find(v => v.version === selectedVersion);

  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
      icon: <Shield className="h-5 w-5" />,
      content: versionSpecificContent[selectedVersion as keyof typeof versionSpecificContent]?.introduction || 
               privacyPolicyVersions.sections.introduction.content
    },
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: <Database className="h-5 w-5" />,
      content: versionSpecificContent[selectedVersion as keyof typeof versionSpecificContent]?.['information-collection'] || 
               privacyPolicyVersions.sections['information-collection'].content
    },
    {
      id: 'how-we-use',
      title: 'How We Use Your Information',
      icon: <Eye className="h-5 w-5" />,
      content: privacyPolicyVersions.sections['how-we-use'].content
    },
    {
      id: 'data-sharing',
      title: 'Data Sharing',
      icon: <Shield className="h-5 w-5" />,
      content: privacyPolicyVersions.sections['data-sharing'].content
    },
    {
      id: 'data-security',
      title: 'Data Storage and Security',
      icon: <Lock className="h-5 w-5" />,
      content: privacyPolicyVersions.sections['data-security'].content
    },
    {
      id: 'permissions',
      title: 'Permissions Explained',
      icon: <Smartphone className="h-5 w-5" />,
      content: versionSpecificContent[selectedVersion as keyof typeof versionSpecificContent]?.permissions || 
               privacyPolicyVersions.sections.permissions.content
    },
    {
      id: 'your-rights',
      title: 'Your Privacy Rights',
      icon: <Shield className="h-5 w-5" />,
      content: privacyPolicyVersions.sections['your-rights'].content
    },
    {
      id: 'children-privacy',
      title: 'Children\'s Privacy',
      icon: <Shield className="h-5 w-5" />,
      content: privacyPolicyVersions.sections['children-privacy'].content
    },
    {
      id: 'data-retention',
      title: 'Data Retention',
      icon: <Database className="h-5 w-5" />,
      content: privacyPolicyVersions.sections['data-retention'].content
    },
    {
      id: 'international-users',
      title: 'International Users',
      icon: <Globe className="h-5 w-5" />,
      content: privacyPolicyVersions.sections['international-users'].content
    },
    {
      id: 'changes-updates',
      title: 'Changes to This Policy',
      icon: <Eye className="h-5 w-5" />,
      content: privacyPolicyVersions.sections['changes-updates'].content
    }
  ];

  const renderContent = (content: string) => {
    // Parse markdown-like content
    const lines = content.split('\n');
    const elements: React.ReactElement[] = [];
    let currentList: string[] = [];
    let currentSubtitle = '';

    lines.forEach((line, index) => {
      if (line.startsWith('### ')) {
        // Flush current list if exists
        if (currentList.length > 0) {
          elements.push(
            <ul key={`list-${index}`} className="list-disc list-inside space-y-1 text-gray-600">
              {currentList.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          );
          currentList = [];
        }
        currentSubtitle = line.replace('### ', '');
        elements.push(
          <h4 key={`subtitle-${index}`} className="font-semibold mb-2">{currentSubtitle}</h4>
        );
      } else if (line.startsWith('- ')) {
        currentList.push(line.replace('- ', ''));
      } else if (line.trim() === '') {
        // Empty line - flush current list if exists
        if (currentList.length > 0) {
          elements.push(
            <ul key={`list-${index}`} className="list-disc list-inside space-y-1 text-gray-600">
              {currentList.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          );
          currentList = [];
        }
      } else if (line.trim() !== '') {
        // Regular paragraph
        if (currentList.length > 0) {
          elements.push(
            <ul key={`list-${index}`} className="list-disc list-inside space-y-1 text-gray-600">
              {currentList.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          );
          currentList = [];
        }
        elements.push(
          <p key={`para-${index}`} className="text-gray-600">{line}</p>
        );
      }
    });

    // Flush any remaining list
    if (currentList.length > 0) {
      elements.push(
        <ul key="final-list" className="list-disc list-inside space-y-1 text-gray-600">
          {currentList.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    }

    return <div className="space-y-4">{elements}</div>;
  };

  return (
    <div className="marketing-page">
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your information when you use Pauseward."
        size="compact"
      >
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <select
              value={selectedVersion}
              onChange={(e) => setSelectedVersion(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              {privacyPolicyVersions.versions.map((version) => (
                <option key={version.version} value={version.version}>
                  v{version.version} {version.isCurrent ? "(Current)" : ""}
                </option>
              ))}
            </select>
          </div>
          <span className="text-sm text-gray-500">Effective {currentVersion?.effectiveDate}</span>
        </div>
        <button
          type="button"
          onClick={() => setShowVersionHistory(!showVersionHistory)}
          className="text-sm font-medium text-emerald-700 hover:underline"
        >
          <FileText className="mr-1 inline h-4 w-4" />
          {showVersionHistory ? "Hide" : "Show"} version history
        </button>
      </PageHero>

      {showVersionHistory && (
        <div className="border-b border-emerald-100 bg-emerald-50/50">
          <div className="container-modern py-10">
            <h2 className="font-display text-2xl text-gray-900">Version history</h2>
            <div className="mt-6 space-y-4">
              {privacyPolicyVersions.versions.map((version) => (
                <div
                  key={version.version}
                  className={`rounded-2xl border p-5 ${
                    version.isCurrent ? "border-emerald-200 bg-white" : "border-gray-200 bg-white/80"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-semibold text-gray-900">
                      Version {version.version}
                      {version.isCurrent && (
                        <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-800">Current</span>
                      )}
                    </h3>
                    <span className="text-sm text-gray-500">Effective {version.effectiveDate}</span>
                  </div>
                  {version.changes && (
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-600">
                      {version.changes.map((change, index) => (
                        <li key={index}>{change}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="container-modern py-12 md:py-16">
        <div className="glass-card mb-8 !p-8">
          <h2 className="font-display text-2xl text-gray-900">Introduction</h2>
          <p className="mt-4 leading-relaxed text-gray-600">
            {versionSpecificContent[selectedVersion as keyof typeof versionSpecificContent]?.introduction ||
              privacyPolicyVersions.sections.introduction.content}
          </p>
        </div>

        <LegalAccordion
          sections={sections.slice(1).map((section) => ({
            id: section.id,
            title: section.title,
            icon: section.icon,
            content: renderContent(section.content),
          }))}
          openSections={openSections}
          onToggle={(id) => toggleSection(id)}
        />

        <div className="glass-card mt-8 !p-8">
          <h2 className="font-display text-2xl text-gray-900">Contact us</h2>
          <div className="mt-4 space-y-3 text-gray-600">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-emerald-600" />
              <span>{links.contact.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-emerald-600" />
              <span>We aim to respond within 48 hours</span>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-6 text-sm text-gray-600">
          <p className="font-semibold text-gray-900">Your consent</p>
          <p className="mt-2">By using Pauseward, you consent to this Privacy Policy and agree to its terms.</p>
          <p className="mt-4 text-xs text-gray-500">
            Pauseward · Version {selectedVersion} · © {new Date().getFullYear()} Pauseward. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}