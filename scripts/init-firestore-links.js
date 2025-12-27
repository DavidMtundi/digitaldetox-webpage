/**
 * Script to initialize Firestore with external links
 * 
 * Usage:
 * 1. Install Firebase Admin SDK: npm install firebase-admin
 * 2. Get your service account key from Firebase Console
 * 3. Set GOOGLE_APPLICATION_CREDENTIALS environment variable
 * 4. Run: node scripts/init-firestore-links.js
 * 
 * Or use Firebase CLI:
 * firebase firestore:import firestore-data.json
 */

const admin = require('firebase-admin');

// Initialize Firebase Admin (you'll need to set up service account)
// Option 1: Use service account file
// const serviceAccount = require('../path-to-service-account-key.json');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// Option 2: Use environment variable (recommended for production)
// Set GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account-key.json
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.applicationDefault()
    });
  } catch (error) {
    console.error('Error initializing Firebase Admin:', error);
    console.log('\nPlease set up Firebase Admin SDK:');
    console.log('1. Install: npm install firebase-admin');
    console.log('2. Get service account key from Firebase Console');
    console.log('3. Set GOOGLE_APPLICATION_CREDENTIALS environment variable');
    process.exit(1);
  }
}

const db = admin.firestore();

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

async function initializeLinks() {
  try {
    // Create three separate documents
    await Promise.all([
      db.collection('config').doc('downloadLinks').set(downloadLinks),
      db.collection('config').doc('contact').set(contact),
      db.collection('config').doc('donation').set(donation)
    ]);
    
    console.log('✅ External links initialized successfully in Firestore!');
    console.log('\nDocuments created:');
    console.log('  - config/downloadLinks');
    console.log('  - config/contact');
    console.log('  - config/donation');
    console.log('\nData structure:');
    console.log('downloadLinks:', JSON.stringify(downloadLinks, null, 2));
    console.log('contact:', JSON.stringify(contact, null, 2));
    console.log('donation:', JSON.stringify(donation, null, 2));
  } catch (error) {
    console.error('❌ Error initializing links:', error);
    process.exit(1);
  }
}

initializeLinks();

