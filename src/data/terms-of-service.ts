import { LEGAL_EFFECTIVE_DATE } from "@/data/privacy-policy";

export const termsOfService = {
  effectiveDate: LEGAL_EFFECTIVE_DATE,
  lastUpdated: LEGAL_EFFECTIVE_DATE,
  version: "2.0",
  sections: {
    acceptance: {
      title: "Acceptance of Terms",
      content: `By creating an account, downloading our apps, or using the Pauseward website or API, you agree to these Terms of Service ("Terms") and our Privacy Policy.

If you are using the Service on behalf of an organization, you represent that you have authority to bind that organization.

If you do not agree, do not use the Service.`,
    },
    "service-description": {
      title: "The Service",
      content: `Pauseward provides software to help you manage digital habits, including:
- App and website blocking on supported platforms
- Focus sessions, schedules, and daily limits
- Usage insights and progress tracking
- Cross-device sync of blocklists and linked devices (where enabled)
- Web dashboard for account, billing, and policy management

Features vary by platform and subscription tier. We may add, change, or remove features with reasonable notice where practicable.

The Service is provided on an "as available" basis. We do not guarantee uninterrupted or error-free operation.`,
    },
    accounts: {
      title: "Accounts and Security",
      content: `### Registration
- You must provide accurate information and keep it up to date
- Web accounts use email and password stored in our secure backend
- Mobile clients may use platform sign-in (for example Firebase) where configured

### Your responsibilities
- Keep credentials confidential
- Notify us promptly of unauthorized access
- You are responsible for activity under your account

### Eligibility
- You must meet the minimum age required in your jurisdiction
- You may not create accounts through automated or fraudulent means`,
    },
    "acceptable-use": {
      title: "Acceptable Use",
      content: `You agree not to:
- Violate laws or third-party rights
- Reverse engineer, scrape, or attack the Service
- Circumvent billing, blocking, or security controls
- Resell or sublicense the Service without permission
- Upload malware or interfere with other users

We may suspend or terminate accounts that violate these rules.`,
    },
    privacy: {
      title: "Privacy",
      content: `Our collection and use of personal data is described in the [Privacy Policy](/privacy).

By using the Service, you acknowledge that we process data as described there, including account data, usage metrics, and payment information processed by Paystack and app stores.`,
    },
    subscriptions: {
      title: "Subscriptions and Billing",
      content: `### Plans
- Free and paid tiers may be offered (Pro, Family, etc.)
- Features and device limits depend on your active entitlement

### Payments
- Web checkout is processed by **Paystack** (M-Pesa, card, and other supported channels)
- Mobile purchases may be processed by **Google Play** or the **Apple App Store**
- Prices are shown in KES, USD, or other supported currencies at checkout
- Taxes may apply based on your location

### Renewals and cancellation
- Subscriptions renew according to the plan you purchased unless cancelled
- M-Pesa plans may require manual renewal when indicated in the app or dashboard
- Card subscriptions may auto-renew through Paystack until cancelled
- Cancel through the store where you purchased (Play/App Store) or contact support for web billing

### Refunds
- Refunds are handled per the policy of the payment provider (Paystack, Google, or Apple)
- We may grant refunds at our discretion where required by law or in cases of billing error`,
    },
    "intellectual-property": {
      title: "Intellectual Property",
      content: `Pauseward, its logos, software, and content are owned by us or our licensors. We grant you a limited, non-exclusive, revocable license to use the Service for personal, non-commercial purposes (unless otherwise agreed).

You retain ownership of content you create (such as custom blocklist names). You grant us a license to host and sync that content solely to operate the Service.`,
    },
    disclaimers: {
      title: "Disclaimers",
      content: `THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.

Pauseward is a productivity tool, not medical or mental-health treatment. We do not guarantee specific outcomes. Blocking may not be foolproof on all devices or OS versions.`,
    },
    liability: {
      title: "Limitation of Liability",
      content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, PAUSEWARD AND ITS AFFILIATES WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, OR GOODWILL.

OUR TOTAL LIABILITY FOR ANY CLAIM ARISING FROM THE SERVICE IS LIMITED TO THE GREATER OF (A) AMOUNTS YOU PAID US IN THE TWELVE MONTHS BEFORE THE CLAIM OR (B) USD $50.

Some jurisdictions do not allow certain limitations; in those cases, our liability is limited to the fullest extent permitted by law.`,
    },
    termination: {
      title: "Termination",
      content: `You may stop using the Service and request account deletion at any time.

We may suspend or terminate access if you breach these Terms, create risk for other users, or where required by law.

Upon termination, your license ends and we may delete data according to our Privacy Policy. Provisions that by nature should survive (payment obligations, disclaimers, liability limits) will survive.`,
    },
    "governing-law": {
      title: "Governing Law and Disputes",
      content: `These Terms are governed by the laws of the Republic of Kenya, without regard to conflict-of-law principles.

You agree to attempt good-faith resolution by contacting us before formal proceedings. Courts in Nairobi, Kenya shall have exclusive jurisdiction, unless mandatory consumer protection laws in your country require otherwise.`,
    },
    changes: {
      title: "Changes to Terms",
      content: `We may update these Terms from time to time. Material changes will be posted on this page with an updated effective date. Continued use after changes take effect constitutes acceptance.

If you disagree with updated Terms, you must stop using the Service and may delete your account.`,
    },
  },
} as const;

export type TermsSectionId = keyof typeof termsOfService.sections;
