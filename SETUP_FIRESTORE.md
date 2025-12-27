# Firestore Setup for LucidFocus

## Step 1: Enable Firestore Database

1. Go to [Firebase Console](https://console.firebase.google.com/project/lucidfocus-landing/firestore)
2. Click "Create database"
3. Select "Start in test mode" (we'll update rules after)
4. Choose location: **nam5 (us-central)** or your preferred location
5. Click "Enable"

## Step 2: Create Firestore Documents

After Firestore is enabled, create the following documents:

### Collection: `config`

#### Document 1: `downloadlinks`
```json
{
  "googlePlay": "",
  "appStore": null,
  "windows": null,
  "mac": null
}
```

#### Document 2: `contact`
```json
{
  "email": "",
  "phone": ""
}
```

#### Document 3: `donation`
```json
{
  "url": ""
}
```

## Step 3: Deploy Firestore Rules

The rules are already configured. Deploy them with:

```bash
firebase deploy --only firestore:rules --project lucidfocus-landing
```

## Step 4: Update Documents with Your Data

Once documents are created, update them with your actual values:
- **downloadlinks.googlePlay**: Your Google Play Store URL
- **contact.email**: Your contact email
- **contact.phone**: Your contact phone (optional)
- **donation.url**: Your donation URL (optional)

## Alternative: Use Firebase Console

1. Go to Firestore Database in Firebase Console
2. Click "Start collection"
3. Collection ID: `config`
4. Document ID: `downloadlinks` (or `contact`, `donation`)
5. Add fields as shown above
6. Click "Save"

