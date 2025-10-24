# Firebase Email Collection Setup

## Overview
The email subscription functionality is now integrated with Firebase Firestore to save user email addresses when they click "Get Updates".

## What's Been Set Up

### 1. Firebase Configuration
- **File**: `src/lib/firebase.ts`
- **Project ID**: `digitaldetox-app-2025`
- Uses environment variables for configuration

### 2. Email Service
- **File**: `src/lib/emailService.ts`
- Functions to save email subscriptions to Firestore
- Checks for duplicate emails
- Saves to `email-updates` collection

### 3. Email Subscription Hook
- **File**: `src/hooks/useEmailSubscription.ts`
- React hook for managing email subscription state
- Handles form submission and validation

### 4. Updated Main Page
- **File**: `src/app/page.tsx`
- Integrated with Firebase email collection
- Uses the email subscription hook

## Firestore Collection Structure

### Collection: `email-updates`
```javascript
{
  email: "user@example.com",           // User's email address
  subscribedAt: Timestamp,             // When they subscribed
  source: "hero-section",              // Where they subscribed from
  status: "active"                     // Subscription status
}
```

## Environment Variables Needed

Create a `.env.local` file with your Firebase config:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=digitaldetox-app-2025.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=digitaldetox-app-2025
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=digitaldetox-app-2025.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

## How to Get Firebase Config Values

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `digitaldetox-app-2025`
3. Go to Project Settings (gear icon)
4. Scroll down to "Your apps" section
5. Click on the web app or create one if needed
6. Copy the config values to your `.env.local` file

## Features

✅ **Email Validation**: Checks for valid email format
✅ **Duplicate Prevention**: Prevents duplicate email subscriptions
✅ **Source Tracking**: Tracks where users subscribed from
✅ **Error Handling**: Proper error messages for users
✅ **Success Feedback**: Confirmation when subscription is successful
✅ **Firestore Integration**: Saves emails to your Firebase database

## Testing

1. Start your development server: `npm run dev`
2. Go to your website
3. Enter an email in the "Email for testing updates" field
4. Click "Get Updates"
5. Check your Firebase Firestore console to see the email saved

## Next Steps

1. Set up your Firebase environment variables
2. Enable Firestore in your Firebase project
3. Test the email collection functionality
4. Deploy and test in production
