# LucidFocus Setup Guide

## ✅ Completed Changes

All references to "Digital Detox" have been updated to **"LucidFocus"** throughout the codebase:

### Updated Files:
- ✅ `src/app/layout.tsx` - Metadata, titles, descriptions
- ✅ `src/app/page.tsx` - Homepage content
- ✅ `src/components/header.tsx` - Logo and branding
- ✅ `src/components/footer.tsx` - Footer branding
- ✅ `src/app/terms/page.tsx` - Terms of Service
- ✅ `src/app/support/page.tsx` - Support page
- ✅ `src/app/contact/page.tsx` - Contact page
- ✅ `src/app/about/page.tsx` - About page

### Key Updates:
- **Title**: "LucidFocus - Stay Lucid, Stay Focused"
- **Tagline**: "Achieve clarity in every task"
- **Description**: Updated to reflect LucidFocus branding
- **Keywords**: Added "lucid focus", "clarity", "focus" to SEO keywords
- **All page content**: Updated to use LucidFocus name

## 🚀 Next Steps: Firebase Project Setup

### 1. Create New Firebase Project

```bash
# Create new Firebase project
firebase projects:create lucidfocus-landing
```

Or create it via Firebase Console:
1. Go to https://console.firebase.google.com/
2. Click "Add project"
3. Project name: `lucidfocus-landing`
4. Follow the setup wizard

### 2. Initialize Firebase in Project

```bash
# Login to Firebase (if not already)
firebase login

# Initialize Firebase in this directory
firebase use lucidfocus-landing

# Or if project already exists elsewhere:
firebase use --add lucidfocus-landing
```

### 3. Create Firebase Hosting Site

```bash
# Create a new hosting site
firebase hosting:sites:create lucidfocus-landing
```

Or via Firebase Console:
1. Go to Hosting section
2. Click "Add another site"
3. Site ID: `lucidfocus-landing`
4. This will give you: `lucidfocus-landing.web.app`

### 4. Update Environment Variables

Create/update `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=lucidfocus-landing.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=lucidfocus-landing
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=lucidfocus-landing.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_SITE_URL=https://lucidfocus-landing.web.app
```

### 5. Set Up Firestore

1. Enable Firestore in Firebase Console
2. Create the following documents in `config` collection:
   - `config/downloadlinks` - Download links
   - `config/contact` - Contact information
   - `config/donation` - Donation URL

3. Deploy Firestore rules:
```bash
firebase deploy --only firestore:rules
```

### 6. Build and Deploy

```bash
# Build the project
npm run build

# Deploy to Firebase
firebase deploy --only hosting
```

## 📝 Important Notes

1. **No Hardcoded Links**: All external links are now managed through Firestore
2. **Logo Image**: Still using `/digitaldetox.png` - you may want to update this later
3. **Domain**: The new site will be at `https://lucidfocus-landing.web.app`
4. **Firestore Data**: You'll need to set up the Firestore documents with your links

## 🎯 Branding Summary

- **Name**: LucidFocus
- **Tagline**: "Stay Lucid, Stay Focused"
- **Description**: "Achieve clarity in every task"
- **Firebase Project**: `lucidfocus-landing`
- **Domain**: `lucidfocus-landing.web.app`

## ✅ Ready to Deploy!

Once you've completed the Firebase setup steps above, you can deploy your LucidFocus landing page!

