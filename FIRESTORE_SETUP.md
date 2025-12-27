# Firestore External Links Setup

This document explains how to set up the Firestore database to store external links dynamically.

## Overview

The application now fetches external links (download URLs, contact information) from Firestore instead of hardcoding them. This allows you to update links without redeploying the application.

## Firestore Structure

Create three separate documents in the `config` collection:

**Collection:** `config`  
**Documents:** `downloadLinks`, `contact`, `donation`

### Document 1: `downloadLinks`

```json
{
  "googlePlay": "https://play.google.com/store/apps/details?id=com.davidmtundi.digitaldetox&hl=en-US&ah=3WY6T2CHMySIEXGXLKprhIh8XAg",
  "appStore": null,
  "windows": null,
  "mac": null
}
```

### Document 2: `contact`

```json
{
  "email": "davidmtundi001@gmail.com",
  "phone": "+254721115847"
}
```

### Document 3: `donation`

```json
{
  "url": "https://sandbox.intasend.com/pay/f7af953a-c8ba-4381-a93a-8440401d5202/"
}
```

## Setup Instructions

### Option 1: Using Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `digitaldetox-app-2025`
3. Navigate to **Firestore Database**
4. Click **Start collection** (if Firestore is not initialized)
5. Collection ID: `config`
6. Create three separate documents:

   **Document 1: `downloadLinks`**
   - Document ID: `downloadLinks`
   - Add fields:
     - `googlePlay` (string): Your Google Play Store URL
     - `appStore` (string or null): App Store URL (can be null)
     - `windows` (string or null): Windows download URL (can be null)
     - `mac` (string or null): Mac download URL (can be null)
   - Click **Save**

   **Document 2: `contact`**
   - Document ID: `contact`
   - Add fields:
     - `email` (string): Contact email address
     - `phone` (string): Contact phone number
   - Click **Save**

   **Document 3: `donation`**
   - Document ID: `donation`
   - Add fields:
     - `url` (string or null): Donation/payment URL (can be null to disable donations)
   - Click **Save**

### Option 2: Using Firebase CLI

Create a file `firestore-data.json`:

```json
{
  "config": {
    "downloadLinks": {
      "googlePlay": "https://play.google.com/store/apps/details?id=com.davidmtundi.digitaldetox&hl=en-US&ah=3WY6T2CHMySIEXGXLKprhIh8XAg",
      "appStore": null,
      "windows": null,
      "mac": null
    },
    "contact": {
      "email": "davidmtundi001@gmail.com",
      "phone": "+254721115847"
    },
    "donation": {
      "url": "https://sandbox.intasend.com/pay/f7af953a-c8ba-4381-a93a-8440401d5202/"
    }
  }
}
```

Then import using:
```bash
firebase firestore:import firestore-data.json
```

### Option 3: Using Code (Node.js/Admin SDK)

```javascript
const admin = require('firebase-admin');
const serviceAccount = require('./path-to-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Create three separate documents
const downloadLinks = {
  googlePlay: "https://play.google.com/store/apps/details?id=com.davidmtundi.digitaldetox&hl=en-US&ah=3WY6T2CHMySIEXGXLKprhIh8XAg",
  appStore: null,
  windows: null,
  mac: null
};

const contact = {
  email: "davidmtundi001@gmail.com",
  phone: "+254721115847"
};

const donation = {
  url: "https://sandbox.intasend.com/pay/f7af953a-c8ba-4381-a93a-8440401d5202/"
};

// Save all three documents
await Promise.all([
  db.collection('config').doc('downloadLinks').set(downloadLinks),
  db.collection('config').doc('contact').set(contact),
  db.collection('config').doc('donation').set(donation)
]);
  .then(() => console.log('External links saved successfully'))
  .catch((error) => console.error('Error saving links:', error));
```

## Security Rules

**⚠️ IMPORTANT:** You must update your Firestore security rules to allow read access to the `config/externalLinks` document. Without this, the app will use fallback values.

### Option 1: Update via Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `digitaldetox-app-2025`
3. Navigate to **Firestore Database** → **Rules** tab
4. Replace the rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read access to config/externalLinks
    match /config/externalLinks {
      allow read: if true;
      allow write: if request.auth != null; // Only authenticated users can write
    }
    
    // Allow public write access to email-updates collection (for email subscriptions)
    match /email-updates/{document=**} {
      allow read, write: if true;
    }
    
    // Deny all other access by default
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

5. Click **Publish**

### Option 2: Deploy via Firebase CLI

A `firestore.rules` file has been created in your project root. Deploy it using:

```bash
firebase deploy --only firestore:rules
```

**Note:** After updating the rules, refresh your browser and check the console. You should see:
- `✅ Fetched external links from Firestore:` instead of permission errors

## Fallback Values

If Firestore is unavailable or the document doesn't exist, the application will use fallback values defined in `src/hooks/useExternalLinks.ts`. These ensure the site continues to work even if Firebase is down.

## Updating Links

To update links in the future:

1. Go to Firebase Console → Firestore Database
2. Navigate to `config` → `externalLinks`
3. Edit the fields you want to change
4. Save the document
5. The changes will be reflected on the website immediately (no redeployment needed)

## Testing

After setting up Firestore:

1. Build and deploy your application
2. Check the browser console for any Firestore errors
3. Verify that links are loading from Firestore (check Network tab)
4. Test that all download buttons and contact links work correctly

## Troubleshooting

- **Links not updating**: Clear browser cache or check Firestore security rules
- **Fallback values showing**: Check Firestore console to ensure document exists and has correct structure
- **Firestore errors**: Verify Firebase configuration in `src/lib/firebase.ts`

