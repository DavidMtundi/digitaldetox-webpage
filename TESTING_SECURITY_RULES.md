# Testing Security Rules & Email Subscriptions

## Quick Test Guide

### 1. Test Email Subscription (Browser)

1. Open your site: `http://localhost:3002`
2. Find the email subscription form (usually in the hero section)
3. Enter a test email: `test@example.com`
4. Submit the form
5. Check the browser console for any errors
6. Verify in Firebase Console that the email was saved

### 2. Test with Node.js Script

```bash
# Install Firebase Admin SDK (if not already installed)
npm install firebase-admin

# Set up service account credentials
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account-key.json

# Run test script
node scripts/test-email-subscription.js
```

### 3. Test Security Rules in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Navigate to **Firestore Database** → **Rules**
3. Click **Rules Playground**
4. Test scenarios:

#### Scenario 1: Public Read Config (Should Work)
- **Collection**: `config`
- **Document**: `downloadlinks`
- **Operation**: `get`
- **Expected**: ✅ Allowed

#### Scenario 2: Public Read Secret Config (Should Fail)
- **Collection**: `config
- **Document**: `secret`
- **Operation**: `get`
- **Expected**: ❌ Denied

#### Scenario 3: Public Create Email (Should Work)
- **Collection**: `email-updates`
- **Document**: `test@example.com`
- **Operation**: `create`
- **Data**:
  ```json
  {
    "email": "test@example.com",
    "subscribedAt": "2025-12-27T00:00:00Z",
    "source": "test",
    "status": "active"
  }
  ```
- **Expected**: ✅ Allowed

#### Scenario 4: Public Read All Emails (Should Fail)
- **Collection**: `email-updates`
- **Operation**: `list`
- **Expected**: ❌ Denied (no query access)

#### Scenario 5: Public Read Own Email (Should Work)
- **Collection**: `email-updates`
- **Document**: `test@example.com` (where email matches document ID)
- **Operation**: `get`
- **Expected**: ✅ Allowed

## Common Issues & Solutions

### Issue: "Permission denied" when creating email subscription

**Possible Causes:**
1. Email format validation failed
2. Missing required fields
3. Data size exceeds limit

**Solution:**
- Check browser console for specific error
- Verify email format is valid
- Ensure all required fields are present: `email`, `subscribedAt`, `source`, `status`

### Issue: "Permission denied" when reading config

**Possible Causes:**
1. Trying to read a document that's not in the allowed list
2. Document doesn't exist

**Solution:**
- Only read: `downloadlinks`, `contact`, `donation`
- Ensure documents exist in Firestore

### Issue: Email subscription works but can't read it back

**This is expected behavior!** The security rules prevent public users from querying the collection. They can only read a specific document by ID (the email address).

## Admin Access Setup

To access all email subscriptions (for admin purposes):

1. **Set up Firebase Authentication** (if not already done)
2. **Create an admin user** or use existing user
3. **Run the admin setup script**:

```bash
node scripts/setup-admin-auth.js admin@yourdomain.com
```

4. **Update Firestore rules** to allow admin reads (if needed**

Currently, the `getAllEmailSubscriptions()` function requires admin authentication. You'll need to:

1. Implement Firebase Authentication in your app
2. Set custom claims for admin users
3. Update the function to check for admin claims

## Monitoring

Check Firebase Console for:
- **Firestore Usage**: Monitor read/write operations
- **Security Rules**: View rule violations
- **Authentication**: Track user sign-ups

## Next Steps

1. ✅ Test email subscription in browser
2. ✅ Verify security rules in Rules Playground
3. ⏳ Set up admin authentication (if needed)
4. ⏳ Monitor Firebase Console for any issues

