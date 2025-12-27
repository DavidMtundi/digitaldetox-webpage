'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Shield, Lock, Eye, Database, Users, Globe, Mail, Phone, Smartphone, AlertCircle, Clock, FileText } from 'lucide-react';
import { privacyPolicyVersions, versionSpecificContent } from '@/data/privacy-policy';
import { themeStyles } from '../../styles/theme';
import { useExternalLinks } from '@/hooks/useExternalLinks';

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
      icon: <Users className="h-5 w-5" />,
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
              <Shield className="h-8 w-8 text-gray-600" />
            </div>
            <h1 className="text-4xl font-bold mb-4" style={themeStyles.text.primary}>
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your privacy is important to us. Learn how we collect, use, and protect your information when you use DigitalDetox.
            </p>
            
            {/* Version Selector */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-500">Version:</span>
                <select
                  value={selectedVersion}
                  onChange={(e) => setSelectedVersion(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                >
                  {privacyPolicyVersions.versions.map((version) => (
                    <option key={version.version} value={version.version}>
                      {version.version} {version.isCurrent ? '(Current)' : ''}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>Effective:</span>
                <span className="font-medium">{currentVersion?.effectiveDate}</span>
              </div>
            </div>

            {/* Version History Toggle */}
            <button
              onClick={() => setShowVersionHistory(!showVersionHistory)}
              className="mt-4 text-sm text-blue-600 hover:text-blue-800 flex items-center space-x-1 mx-auto"
            >
              <FileText className="h-4 w-4" />
              <span>{showVersionHistory ? 'Hide' : 'Show'} Version History</span>
            </button>
          </div>
        </div>
      </div>

      {/* Version History */}
      {showVersionHistory && (
        <div className="bg-blue-50 border-b border-blue-200">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6" style={themeStyles.text.primary}>
              Version History
            </h2>
            <div className="space-y-4">
              {privacyPolicyVersions.versions.map((version) => (
                <div
                  key={version.version}
                  className={`p-4 rounded-lg border ${
                    version.isCurrent 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">
                      Version {version.version}
                      {version.isCurrent && (
                        <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                          Current
                        </span>
                      )}
                    </h3>
                    <div className="text-sm text-gray-500">
                      Effective: {version.effectiveDate}
                    </div>
                  </div>
                  {version.changes && (
                    <div>
                      <h4 className="font-medium mb-2">Changes in this version:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        {version.changes.map((change, index) => (
                          <li key={index}>{change}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4" style={themeStyles.text.primary}>
            Introduction
          </h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-4">
              {versionSpecificContent[selectedVersion as keyof typeof versionSpecificContent]?.introduction || 
               privacyPolicyVersions.sections.introduction.content}
            </p>
          </div>
        </div>

        {/* Privacy Sections */}
        <div className="space-y-6">
          {sections.slice(1).map((section) => (
            <div key={section.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-8 py-6 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-gray-600">
                    {section.icon}
                  </div>
                  <h3 className="text-xl font-semibold" style={themeStyles.text.primary}>
                    {section.title}
                  </h3>
                </div>
                <div className="text-gray-400">
                  {openSections[section.id] ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </div>
              </button>
              
              {openSections[section.id] && (
                <div className="px-8 pb-6 border-t border-gray-100">
                  <div className="pt-6">
                    {renderContent(section.content)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mt-8">
          <h2 className="text-2xl font-bold mb-6" style={themeStyles.text.primary}>
            Contact Us
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-3" style={themeStyles.text.primary}>
                Contact Information
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Mail className="h-5 w-5" />
                  <span><strong>Email:</strong> {links.contact.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Mail className="h-5 w-5" />
                  <span><strong>Support:</strong> {links.contact.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Phone className="h-5 w-5" />
                  <span><strong>Response Time:</strong> We aim to respond within 48 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Notice */}
        <div className="bg-gray-100 rounded-2xl p-6 mt-8">
          <h3 className="font-semibold mb-3" style={themeStyles.text.primary}>
            Your Consent
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            By using DigitalDetox, you consent to this Privacy Policy and agree to its terms.
          </p>
          <div className="border-t border-gray-300 pt-4">
            <p className="text-xs text-gray-500">
              <strong>DigitalDetox</strong> - Digital Wellness Companion<br />
              Version {selectedVersion} | © 2024 DigitalDetox. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}