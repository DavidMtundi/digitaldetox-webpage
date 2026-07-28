'use client';

import { useState } from 'react';
import { AlertTriangle, FileText, Mail, Phone, Scale, Shield, Users } from 'lucide-react';
import { useExternalLinks } from '@/hooks/useExternalLinks';
import PageHero from '@/components/marketing/page-hero';
import LegalAccordion from '@/components/marketing/legal-accordion';

export default function TermsPage() {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});
  const { links } = useExternalLinks();

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: <FileText className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">
            By accessing and using Pauseward, you accept and agree to be bound by the terms and provision of this agreement. 
            If you do not agree to abide by the above, please do not use this service.
          </p>
          <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
            <h4 className="font-semibold text-emerald-900 mb-2">Important Notice</h4>
            <p className="text-emerald-800 text-sm">
              These terms constitute a legally binding agreement between you and Pauseward. Please read them carefully.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'service-description',
      title: 'Service Description',
      icon: <Users className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Pauseward Services</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>App and website blocking functionality</li>
              <li>Screen time tracking and analytics</li>
              <li>Focus session management</li>
              <li>Digital wellness insights and recommendations</li>
              <li>Progress tracking and goal setting</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Service Availability</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Services are provided on an &quot;as is&quot; and &quot;as available&quot; basis</li>
              <li>We reserve the right to modify or discontinue services</li>
              <li>Service availability may vary by region</li>
              <li>Some features may require internet connectivity</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'user-responsibilities',
      title: 'User Responsibilities',
      icon: <Shield className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Account Security</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Use strong, unique passwords</li>
              <li>Keep your contact information up to date</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Acceptable Use</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Use the service only for lawful purposes</li>
              <li>Respect the rights of other users</li>
              <li>Do not attempt to circumvent security measures</li>
              <li>Do not use the service to harm others or violate laws</li>
            </ul>
          </div>
          <div className="rounded-xl border border-rose-100 bg-rose-50 p-4">
            <h4 className="font-semibold text-rose-900 mb-2">Prohibited Activities</h4>
            <ul className="list-disc list-inside space-y-1 text-rose-800 text-sm">
              <li>Reverse engineering or decompiling the software</li>
              <li>Creating multiple accounts to circumvent restrictions</li>
              <li>Sharing account credentials with others</li>
              <li>Using automated tools to access the service</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'privacy-data',
      title: 'Privacy and Data Protection',
      icon: <Shield className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Data Collection and Use</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>We collect data necessary to provide our services</li>
              <li>Usage data helps us improve the service</li>
              <li>Personal information is protected according to our Privacy Policy</li>
              <li>You have control over your data and privacy settings</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Your Rights</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Access your personal data</li>
              <li>Correct inaccurate information</li>
              <li>Delete your account and data</li>
              <li>Export your data in a portable format</li>
            </ul>
          </div>
          <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
            <h4 className="font-semibold text-emerald-900 mb-2">Data Protection Commitment</h4>
            <p className="text-emerald-800 text-sm">
              We are committed to protecting your privacy and will never sell your personal information to third parties.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property',
      icon: <Scale className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Our Rights</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Pauseward owns all rights to the software and service</li>
              <li>Our trademarks, logos, and branding are protected</li>
              <li>Content we create remains our intellectual property</li>
              <li>We grant you a limited license to use our service</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Your Content</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>You retain ownership of content you create</li>
              <li>You grant us license to use your content to provide services</li>
              <li>You are responsible for ensuring you have rights to your content</li>
              <li>We may remove content that violates these terms</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'payment-billing',
      title: 'Payment and Billing',
      icon: <Scale className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Subscription Plans</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Free tier with basic features</li>
              <li>Premium plans with advanced features</li>
              <li>Pricing may change with notice</li>
              <li>All prices are in USD unless otherwise specified</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Billing Terms</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Subscriptions auto-renew unless cancelled</li>
              <li>Payment is due in advance</li>
              <li>Refunds are handled on a case-by-case basis</li>
              <li>Failed payments may result in service suspension</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Cancellation</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>You may cancel your subscription at any time</li>
              <li>Cancellation takes effect at the end of the billing period</li>
              <li>No refunds for partial periods</li>
              <li>Access to premium features ends upon cancellation</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'limitations',
      title: 'Limitations and Disclaimers',
      icon: <AlertTriangle className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Service Limitations</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Service may not be available 100% of the time</li>
              <li>Some features may not work on all devices</li>
              <li>Performance may vary based on device capabilities</li>
              <li>Third-party integrations may have limitations</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Disclaimers</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Service is provided &quot;as is&quot; without warranties</li>
              <li>We do not guarantee specific results</li>
              <li>We are not responsible for third-party content</li>
              <li>Use the service at your own risk</li>
            </ul>
          </div>
          <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
            <h4 className="font-semibold text-amber-900 mb-2">Important Disclaimer</h4>
            <p className="text-amber-800 text-sm">
              Pauseward is a tool to help manage digital habits. Individual results may vary, and we do not guarantee 
              specific outcomes or improvements in productivity or well-being.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'liability',
      title: 'Limitation of Liability',
      icon: <AlertTriangle className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Liability Limitations</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Our liability is limited to the amount you paid for the service</li>
              <li>We are not liable for indirect or consequential damages</li>
              <li>We are not responsible for data loss or corruption</li>
              <li>We are not liable for third-party actions or content</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Exclusions</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Loss of profits or business opportunities</li>
              <li>Emotional distress or mental health issues</li>
              <li>Damage to reputation or relationships</li>
              <li>Any damages exceeding service fees paid</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'termination',
      title: 'Termination',
      icon: <AlertTriangle className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Termination by You</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>You may terminate your account at any time</li>
              <li>Termination takes effect immediately</li>
              <li>You may delete your account through settings</li>
              <li>Data deletion follows our Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Termination by Us</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>We may suspend or terminate accounts for violations</li>
              <li>We may discontinue service with notice</li>
              <li>We may terminate inactive accounts</li>
              <li>We will provide notice when possible</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Effect of Termination</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Access to service ends immediately</li>
              <li>Your data will be deleted according to our policy</li>
              <li>Outstanding payments remain due</li>
              <li>Some terms survive termination</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'governing-law',
      title: 'Governing Law and Disputes',
      icon: <Scale className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Governing Law</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>These terms are governed by United States law</li>
              <li>Disputes will be resolved in US courts</li>
              <li>Local laws may apply to international users</li>
              <li>We comply with applicable international regulations</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Dispute Resolution</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>We encourage resolving disputes through communication</li>
              <li>Mediation may be required before litigation</li>
              <li>Class action waivers may apply</li>
              <li>Arbitration may be required for some disputes</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'changes',
      title: 'Changes to Terms',
      icon: <FileText className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Modifications</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>We may update these terms periodically</li>
              <li>Material changes will be communicated in advance</li>
              <li>Minor updates will be posted with effective date</li>
              <li>Continued use constitutes acceptance of changes</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Notification Methods</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Email notification to registered users</li>
              <li>In-app notification banner</li>
              <li>Website banner for visitors</li>
              <li>Updated terms posted on our website</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Your Options</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Review changes and continue using the service</li>
              <li>Contact us with questions or concerns</li>
              <li>Terminate your account if you disagree</li>
              <li>Modify your usage based on new terms</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="marketing-page">
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        subtitle="Please read these terms carefully before using Pauseward. By using our service, you agree to be bound by them."
        size="compact"
      >
        <p className="text-sm text-gray-500">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </PageHero>

      <div className="container-modern py-12 md:py-16">
        <div className="glass-card mb-8 !p-8">
          <h2 className="font-display text-2xl text-gray-900">Introduction</h2>
          <div className="mt-4 space-y-4 text-gray-600 prose-legal">
            <p>
              Welcome to Pauseward. These Terms of Service govern your use of our digital wellness application
              and related services operated by Pauseward.
            </p>
            <p>
              By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part
              of these terms, you may not access the Service.
            </p>
          </div>
        </div>

        <LegalAccordion
          sections={sections.map((section) => ({
            id: section.id,
            title: section.title,
            icon: section.icon,
            content: section.content,
          }))}
          openSections={openSections}
          onToggle={(id) => toggleSection(id)}
        />

        <div className="glass-card mt-8 !p-8">
          <h2 className="font-display text-2xl text-gray-900">Contact us</h2>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold text-gray-900">Legal questions</h3>
              <div className="mt-2 flex items-center gap-2 text-gray-600">
                <Mail className="h-4 w-4 text-emerald-600" />
                {links.contact.email}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">General support</h3>
              <div className="mt-2 flex items-center gap-2 text-gray-600">
                <Phone className="h-4 w-4 text-emerald-600" />
                {links.contact.phone}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-6 text-sm text-gray-600">
          <p className="font-semibold text-gray-900">Legal notice</p>
          <p className="mt-2">
            These Terms are governed by the laws of the United States. International users may have additional rights
            under local regulations.
          </p>
        </div>
      </div>
    </div>
  );
}
