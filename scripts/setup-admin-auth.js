/**
 * Script to set up Firebase Admin Authentication
 * 
 * This script helps you set up admin users with custom claims
 * so they can access admin-only Firestore operations.
 * 
 * Prerequisites:
 * 1. Install Firebase Admin SDK: npm install firebase-admin
 * 2. Get your service account key from Firebase Console
 * 3. Set GOOGLE_APPLICATION_CREDENTIALS environment variable
 * 
 * Usage:
 * node scripts/setup-admin-auth.js <user-email>
 */

const admin = require('firebase-admin');

// Initialize Firebase Admin
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.applicationDefault()
    });
  } catch (error) {
    console.error('Error initializing Firebase Admin:', error);
    console.log('\n📝 Setup Instructions:');
    console.log('1. Go to Firebase Console → Project Settings → Service Accounts');
    console.log('2. Click "Generate New Private Key"');
    console.log('3. Save the JSON file');
    console.log('4. Set environment variable:');
    console.log('   export GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account-key.json');
    console.log('5. Run: npm install firebase-admin');
    process.exit(1);
  }
}

async function setAdminClaim(userEmail) {
  try {
    // Get user by email
    const user = await admin.auth().getUserByEmail(userEmail);
    
    // Set custom claim
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    
    console.log(`✅ Successfully set admin claim for: ${userEmail}`);
    console.log(`   User UID: ${user.uid}`);
    console.log('\n📝 Next steps:');
    console.log('1. The user needs to sign out and sign back in for the claim to take effect');
    console.log('2. They can now access admin-only Firestore operations');
    
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      console.error(`❌ User not found: ${userEmail}`);
      console.log('\n💡 The user needs to sign up first using Firebase Authentication');
    } else {
      console.error('❌ Error setting admin claim:', error.message);
    }
    process.exit(1);
  }
}

// Get email from command line argument
const userEmail = process.argv[2];

if (!userEmail) {
  console.log('Usage: node scripts/setup-admin-auth.js <user-email>');
  console.log('\nExample:');
  console.log('  node scripts/setup-admin-auth.js admin@example.com');
  process.exit(1);
}

setAdminClaim(userEmail);

