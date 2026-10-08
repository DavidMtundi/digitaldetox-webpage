/**
 * Seed website config docs on digitaldetox-app.
 *
 * Usage:
 *   GOOGLE_APPLICATION_CREDENTIALS=/path/to/digitaldetox-app-sa.json \
 *     node scripts/init-firestore-links.js
 *
 * Document IDs must match the web client: config/downloadlinks (lowercase).
 */

const admin = require("firebase-admin");

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: "digitaldetox-app",
    });
  } catch (error) {
    console.error("Error initializing Firebase Admin:", error);
    console.log("Set GOOGLE_APPLICATION_CREDENTIALS to a digitaldetox-app service account JSON.");
    process.exit(1);
  }
}

const db = admin.firestore();

const downloadLinks = {
  googlePlay:
    "https://play.google.com/store/apps/details?id=com.davidmtundi.digitaldetox&pcampaignid=web_share",
  androidTv: null,
  appStore: "https://apps.apple.com/us/app/pause-ward/id6806811524",
  windows: null,
  mac: null,
  web: null,
};

const contact = {
  email: "hello@pauseward.app",
  phone: "",
};

const donation = {
  url: "",
};

async function initializeLinks() {
  try {
    await Promise.all([
      db.collection("config").doc("downloadlinks").set(downloadLinks, { merge: true }),
      db.collection("config").doc("contact").set(contact, { merge: true }),
      db.collection("config").doc("donation").set(donation, { merge: true }),
    ]);

    console.log("Seeded digitaldetox-app config docs:");
    console.log("  - config/downloadlinks");
    console.log("  - config/contact");
    console.log("  - config/donation");
  } catch (error) {
    console.error("Error initializing links:", error);
    process.exit(1);
  }
}

initializeLinks();
