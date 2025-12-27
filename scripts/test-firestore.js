/**
 * Test script to verify Firestore connection and data fetching
 * 
 * Usage:
 * 1. Install Firebase Admin SDK: npm install firebase-admin
 * 2. Get your service account key from Firebase Console
 * 3. Set GOOGLE_APPLICATION_CREDENTIALS environment variable
 * 4. Run: node scripts/test-firestore.js
 */

const admin = require('firebase-admin');

// Initialize Firebase Admin
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.applicationDefault()
  });
  } catch (error) {
    console.error('❌ Error initializing Firebase Admin:', error.message);
    console.log('\n📝 To set up:');
    console.log('1. Install: npm install firebase-admin');
    console.log('2. Get service account key from Firebase Console');
    console.log('3. Set GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account-key.json');
    process.exit(1);
  }
}

const db = admin.firestore();

async function testFirestore() {
  try {
    console.log('🔍 Testing Firestore connection...\n');
    
    // Check if document exists
    const docRef = db.collection('config').doc('externalLinks');
    const docSnap = await docRef.get();
    
    if (docSnap.exists()) {
      console.log('✅ Document exists in Firestore!');
      console.log('\n📄 Current data:');
      console.log(JSON.stringify(docSnap.data(), null, 2));
      
      // Validate structure
      const data = docSnap.data();
      const requiredFields = ['downloadLinks', 'contact', 'donation'];
      const missingFields = requiredFields.filter(field => !data[field]);
      
      if (missingFields.length > 0) {
        console.log(`\n⚠️  Missing fields: ${missingFields.join(', ')}`);
      } else {
        console.log('\n✅ All required fields present!');
      }
    } else {
      console.log('❌ Document does not exist in Firestore!');
      console.log('\n📝 To create it, run: node scripts/init-firestore-links.js');
      console.log('   Or follow the instructions in FIRESTORE_SETUP.md');
    }
    
    // Test read access
    console.log('\n🔐 Testing read access...');
    const testRead = await docRef.get();
    if (testRead.exists()) {
      console.log('✅ Read access works!');
    }
    
  } catch (error) {
    console.error('❌ Error testing Firestore:', error.message);
    if (error.code === 'permission-denied') {
      console.log('\n⚠️  Permission denied. Check Firestore security rules.');
    }
    process.exit(1);
  }
}

testFirestore();

