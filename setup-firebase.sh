#!/bin/bash

echo "🚀 Digital Detox Firebase Setup Script"
echo "======================================"
echo ""

echo "📋 Manual Steps Required:"
echo "1. Go to https://console.firebase.google.com/"
echo "2. Click 'Create a project'"
echo "3. Enter project name: 'digitaldetox-app' (or similar)"
echo "4. Enable Google Analytics (optional)"
echo "5. Create the project"
echo ""

echo "🔧 After creating the project, run these commands:"
echo ""
echo "# Login to Firebase"
echo "firebase login"
echo ""
echo "# Initialize Firebase hosting"
echo "firebase init hosting"
echo ""
echo "# Select your project when prompted"
echo "# Choose 'out' as public directory"
echo "# Configure as single-page app: Yes"
echo "# Set up automatic builds: No"
echo ""

echo "🚀 Deploy commands:"
echo ""
echo "# Build and deploy"
echo "npm run deploy"
echo ""
echo "# Or deploy only hosting"
echo "npm run deploy:hosting"
echo ""

echo "🌐 Your site will be available at:"
echo "https://digitaldetox-app.web.app"
echo ""

echo "📖 For detailed instructions, see FIREBASE_DEPLOYMENT.md"
echo ""

# Check if Firebase CLI is installed
if command -v firebase &> /dev/null; then
    echo "✅ Firebase CLI is installed"
    firebase --version
else
    echo "❌ Firebase CLI not found. Install it with:"
    echo "npm install -g firebase-tools"
fi

echo ""
echo "📁 Project structure ready:"
echo "✅ firebase.json - Firebase configuration"
echo "✅ .firebaseignore - Files to ignore"
echo "✅ next.config.js - Next.js static export config"
echo "✅ out/ - Built static files"
echo "✅ package.json - Updated with deploy scripts"
echo ""
