export const LEGAL_CONTACT_EMAIL = "privacy@pauseward.com";
export const LEGAL_EFFECTIVE_DATE = "July 29, 2026";

export interface PrivacyVersion {
  version: string;
  effectiveDate: string;
  lastUpdated: string;
  isCurrent: boolean;
  changes?: string[];
}

export interface PrivacyPolicyData {
  versions: PrivacyVersion[];
  sections: Record<string, { title: string; content: string }>;
}

export const privacyPolicyVersions: PrivacyPolicyData = {
  versions: [
    {
      version: "2.0",
      effectiveDate: LEGAL_EFFECTIVE_DATE,
      lastUpdated: LEGAL_EFFECTIVE_DATE,
      isCurrent: true,
      changes: [
        "Rebranded to Pauseward across web, desktop, and mobile",
        "Documented PostgreSQL account storage and web email/password sign-in",
        "Added Paystack billing (M-Pesa and card) and subscription entitlements",
        "Described device and blocklist sync via pauseward-api",
        "Updated third-party processors (Paystack, Google Play, Firebase where applicable)",
      ],
    },
    {
      version: "1.0",
      effectiveDate: "October 22, 2024",
      lastUpdated: "October 22, 2024",
      isCurrent: false,
      changes: [
        "Initial privacy policy under the DigitalDetox product name",
        "Firebase-based authentication and analytics",
      ],
    },
  ],
  sections: {
    introduction: {
      title: "Introduction",
      content: `Pauseward ("we," "our," or "us") provides digital wellness software — including mobile apps, desktop clients, and a web dashboard — to help you block distractions and build healthier screen habits.

This Privacy Policy explains what information we collect, how we use it, who we share it with, and the choices you have. It applies when you use Pauseward websites, applications, APIs, and related services (collectively, the "Service").

If you do not agree with this policy, please do not use the Service.`,
    },
    "information-collection": {
      title: "Information We Collect",
      content: `### Account information
- Email address and password (for web accounts stored in our PostgreSQL database)
- Account identifiers, subscription tier, and entitlement status
- Firebase authentication identifiers on some mobile or legacy clients

### Billing and payments
- Checkout references, payment status, product purchased, and currency
- Payment channel (for example M-Pesa or card) processed by Paystack
- We do not store full card numbers or M-Pesa PINs on our servers

### Device and sync data
- Device platform, app version, timezone, and last-seen timestamps
- Blocklist metadata (app identifiers and domains you choose to block — not in-app message content)
- Focus session summaries and usage analytics you choose to sync

### Technical and usage data
- IP address, browser type, and diagnostic logs for security and reliability
- Crash reports and performance metrics
- Cookies or local storage tokens to keep you signed in on the web

### Information we do not collect
- Content inside other apps (messages, emails, browsing history within pages)
- Contacts, photos, microphone, or camera (unless a future feature explicitly requests it and you consent)
- Precise GPS location`,
    },
    "how-we-use": {
      title: "How We Use Your Information",
      content: `We use information to:
- Create and secure your account and authenticate sessions
- Provide blocking, focus sessions, schedules, and cross-device sync
- Process subscriptions, renewals, refunds where applicable, and payment reconciliation
- Operate the web dashboard (devices, blocklists, payments, and account settings)
- Improve reliability, detect abuse, and prevent fraud
- Send service messages (receipts, renewal reminders, security alerts)
- Comply with law and enforce our Terms of Service

We do not sell your personal information.`,
    },
    "data-sharing": {
      title: "Data Sharing",
      content: `We share information only when necessary:

### Service providers
- **Paystack** — payment processing (M-Pesa, cards)
- **Google Play / Apple App Store** — in-app purchases where you buy through those stores
- **Cloud hosting** — databases and API infrastructure for pauseward-api
- **Firebase / Google Cloud** — optional legacy sync, marketing site configuration, or mobile auth where enabled

### Legal and safety
- When required by law, court order, or government request
- To protect rights, safety, and security of users and Pauseward

### Business transfers
- If we merge, acquire, or sell assets, data may transfer subject to this policy

We require processors to handle data only for our instructions and apply appropriate safeguards.`,
    },
    "data-security": {
      title: "Data Storage and Security",
      content: `We use administrative, technical, and organizational measures including:
- Encrypted connections (HTTPS/TLS) for web and API traffic
- Hashed passwords for web accounts (passwords are not stored in plain text)
- Access controls on production databases and admin tools
- Webhook signature verification for payment providers

No method of transmission or storage is 100% secure. Please use a strong, unique password and keep it confidential.`,
    },
    permissions: {
      title: "Device Permissions",
      content: `Mobile and desktop apps may request OS permissions to function:

### Android
- **Accessibility / usage access** — detect when a blocked app opens and show blocking UI
- **Display over other apps** — focus overlays and reminders
- **Usage stats** — screen-time and app-duration analytics

### iOS / macOS
- **Screen Time / Family Controls** (where supported) — app shields and limits
- **Notifications** — focus session reminders

### What permissions do not allow
- Reading private content inside other applications
- Recording your screen without your knowledge
- Accessing unrelated personal files

You can revoke permissions in system settings; some features may stop working.`,
    },
    "your-rights": {
      title: "Your Privacy Rights",
      content: `Depending on your location, you may have the right to:
- Access a copy of personal data we hold about you
- Correct inaccurate account information
- Delete your account and associated cloud data
- Export portable copies of your data
- Object to or restrict certain processing
- Withdraw consent where processing is consent-based

To exercise these rights, contact us at the email below. We may verify your identity before fulfilling requests.

Kenya Data Protection Act and other applicable laws may provide additional rights for residents of Kenya and other regions.`,
    },
    "children-privacy": {
      title: "Children's Privacy",
      content: `Pauseward is not directed at children under 13 (or the minimum age required in your country). We do not knowingly collect personal information from children. If you believe a child has provided us data, contact us and we will delete it promptly.

Family plans may be managed by a parent or guardian who is responsible for minors' use of the Service.`,
    },
    "data-retention": {
      title: "Data Retention",
      content: `We retain data while your account is active or as needed to provide the Service.

After account deletion:
- Account and profile data are removed from active systems within a reasonable period
- Billing records may be kept longer where required for tax, accounting, or legal obligations
- Anonymized analytics may be retained to improve the product

You may request deletion by contacting support or through in-app settings where available.`,
    },
    "international-users": {
      title: "International Users",
      content: `Pauseward is operated from Kenya and may process data in Kenya, the United States, the European Union, or other regions where our providers host infrastructure.

When we transfer data internationally, we use appropriate safeguards such as standard contractual clauses or equivalent mechanisms where required by law.

If you use the Service from the EU, UK, or other jurisdictions with specific privacy laws, you may have additional rights as described in the "Your Privacy Rights" section.`,
    },
    "changes-updates": {
      title: "Changes to This Policy",
      content: `We may update this Privacy Policy from time to time. When we make material changes, we will:
- Post the updated policy on this page with a new effective date
- Update the version history below
- Notify registered users by email or in-app notice when appropriate

Continued use of the Service after changes become effective constitutes acceptance of the updated policy.`,
    },
  },
};

export const versionSpecificContent: Record<string, Partial<Record<string, string>>> = {
  "2.0": {},
  "1.0": {
    introduction: `This archived version applied to the DigitalDetox mobile application prior to the Pauseward rebrand. Current users are governed by version 2.0 unless otherwise agreed in writing.`,
  },
};
