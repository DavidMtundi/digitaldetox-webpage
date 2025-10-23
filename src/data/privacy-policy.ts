// Privacy Policy Versions Data
export interface PrivacyVersion {
  version: string;
  effectiveDate: string;
  lastUpdated: string;
  isCurrent: boolean;
  changes?: string[];
}

export interface PrivacyPolicyData {
  versions: PrivacyVersion[];
  sections: {
    [key: string]: {
      title: string;
      content: string;
      icon: string;
    };
  };
}

export const privacyPolicyVersions: PrivacyPolicyData = {
  versions: [
    {
      version: "1.0",
      effectiveDate: "October 22, 2024",
      lastUpdated: "October 22, 2024",
      isCurrent: true,
      changes: [
        "Initial privacy policy release",
        "Established data collection practices",
        "Defined user rights and permissions",
        "Implemented Firebase integration policies"
      ]
    },
    {
      version: "0.9",
      effectiveDate: "September 15, 2024",
      lastUpdated: "September 15, 2024",
      isCurrent: false,
      changes: [
        "Beta version privacy policy",
        "Limited data collection during testing",
        "Basic user rights framework"
      ]
    }
  ],
  sections: {
    "introduction": {
      title: "Introduction",
      icon: "Shield",
      content: `DigitalDetox ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application DigitalDetox (the "App"). Please read this privacy policy carefully.`
    },
    "information-collection": {
      title: "Information We Collect",
      icon: "Database",
      content: `We collect information to provide and improve our service. This includes personal information you provide directly, usage data from your device, and technical information necessary for app functionality.`
    },
    "how-we-use": {
      title: "How We Use Your Information",
      icon: "Eye",
      content: `We use your information to provide core app functionality, improve our service, and ensure security. We never sell your data and only use it as described in this policy.`
    },
    "data-sharing": {
      title: "Data Sharing",
      icon: "Users",
      content: `We DO NOT sell your data. We may share information only in limited circumstances: with your explicit consent, with service providers that help us operate the app, when required by law, or to protect our rights.`
    },
    "data-security": {
      title: "Data Storage and Security",
      icon: "Lock",
      content: `We implement industry-standard security measures including local storage, secure cloud storage via Firebase, SSL/TLS encryption, and secure authentication.`
    },
    "permissions": {
      title: "Permissions Explained",
      icon: "Smartphone",
      content: `We request specific permissions to provide app functionality: Accessibility Service for app blocking, Usage Stats for tracking, and Display Over Other Apps for notifications.`
    },
    "your-rights": {
      title: "Your Privacy Rights",
      icon: "Shield",
      content: `You have the right to access, update, delete, and export your data. You can also opt-out of analytics tracking and manage your privacy preferences through app settings.`
    },
    "children-privacy": {
      title: "Children's Privacy",
      icon: "Shield",
      content: `DigitalDetox is not intended for children under 13. We do not knowingly collect personal information from children under 13 and will delete such information if discovered.`
    },
    "data-retention": {
      title: "Data Retention",
      icon: "Database",
      content: `We retain data while your account is active, up to 90 days after account deletion for inactive users, and anonymized analytics for up to 2 years.`
    },
    "international-users": {
      title: "International Users",
      icon: "Globe",
      content: `Your information may be transferred to and processed in countries other than your own. We ensure adequate safeguards are in place to protect your data and comply with GDPR, CCPA, and other privacy regulations.`
    },
    "changes-updates": {
      title: "Changes to This Policy",
      icon: "Eye",
      content: `We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy in the app, updating the date, and sending in-app notifications for significant changes.`
    }
  }
};

// Version-specific content variations
export const versionSpecificContent = {
  "1.0": {
    "introduction": `DigitalDetox ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application DigitalDetox (the "App"). Please read this privacy policy carefully.`,
    "information-collection": `### Personal Information
- **Account Information**: Email address, display name, and profile photo (when using Google Sign-In)
- **Authentication Data**: User ID and authentication tokens for secure login
- **Device Information**: Device model, operating system version, and unique device identifiers

### App Usage Data
- **App Usage Statistics**: Which apps you use, frequency, and duration
- **Screen Time Data**: Total daily screen time and app-specific screen time
- **Blocked Apps List**: Apps you choose to block or limit
- **Focus Sessions**: Duration and frequency of focus mode usage
- **Daily Limits**: App usage limits you set

### What We Do NOT Collect
- Content within other apps
- Browsing history or website content
- Contacts, SMS, or call logs
- Precise location data
- Audio, video, or camera access`,
    "permissions": `### Accessibility Service
- **Why**: To detect when you open a blocked app and display blocking dialog
- **What**: Access to package names of running apps
- **What NOT**: We cannot read app content, messages, or personal data within apps

### Usage Stats Permission
- **Why**: To track how long you use each app
- **What**: App usage duration and frequency
- **What NOT**: We cannot see what you do within apps

### Display Over Other Apps
- **Why**: To show focus mode notifications and blocking dialogs
- **What**: Permission to display overlay windows
- **What NOT**: We don't capture screenshots or record your screen`
  },
  "0.9": {
    "introduction": `DigitalDetox ("we," "our," or "us") is committed to protecting your privacy during our beta testing phase. This Privacy Policy explains our limited data collection practices during the testing period.`,
    "information-collection": `### Beta Testing Data
- **Basic Usage Data**: App launch frequency and basic functionality usage
- **Crash Reports**: Technical data to improve app stability
- **Feedback Data**: Any feedback you provide during testing

### Limited Collection
During beta testing, we collect minimal data necessary for app functionality and improvement.`,
    "permissions": `### Beta Permissions
- **Basic App Access**: Required for core functionality
- **Usage Tracking**: Limited to essential metrics only

*Note: Full permission explanations will be available in the final release.*`
  }
};
