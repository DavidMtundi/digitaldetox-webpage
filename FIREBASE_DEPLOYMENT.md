# Firebase Deployment Guide for Digital Detox

## 🚀 Quick Setup Instructions

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `digitaldetox-app` (or `digitaldetox-app-2024`)
4. Enable Google Analytics (optional)
5. Create project

### 2. Set Up Hosting

1. In Firebase Console, go to "Hosting"
2. Click "Get started"
3. Follow the setup instructions

### 3. Configure Project

Run these commands in your terminal:

```bash
# Login to Firebase (if not already logged in)
firebase login

# Initialize Firebase in your project
firebase init hosting

# Select your project when prompted
# Choose "out" as public directory
# Configure as single-page app: Yes
# Set up automatic builds: No (for now)
```

### 4. Build and Deploy

```bash
# Build the project for production
npm run build

# Deploy to Firebase
npm run deploy
```

## 📁 Project Structure

```
digitaldetox-webpage/
├── firebase.json          # Firebase configuration
├── .firebaseignore        # Files to ignore during deployment
├── next.config.js         # Next.js configuration for static export
├── out/                   # Built static files (generated)
└── src/                   # Source code
```

## 🔧 Configuration Files

### firebase.json
- Configures Firebase hosting
- Sets up caching headers
- Handles SPA routing

### next.config.js
- Enables static export
- Optimizes for Firebase hosting
- Disables image optimization (not needed for static hosting)

## 🌐 Custom Domain Setup

### Option 1: Firebase Hosting Domain
- Default: `digitaldetox-app.web.app`
- Custom: `digitaldetox-app.firebaseapp.com`

### Option 2: Custom Domain (digitaldetox.app)
1. In Firebase Console → Hosting → Add custom domain
2. Enter `digitaldetox.app`
3. Follow DNS verification steps
4. Update DNS records as instructed

## 📊 Analytics Setup (Optional)

1. In Firebase Console → Analytics
2. Enable Google Analytics
3. Add tracking code to your app

## 🔄 Deployment Commands

```bash
# Build only
npm run build

# Deploy to Firebase
npm run deploy

# Deploy only hosting
npm run deploy:hosting

# Preview deployment
firebase hosting:channel:deploy preview
```

## 🛠️ Troubleshooting

### Common Issues:

1. **Build Errors**: Make sure all dependencies are installed
   ```bash
   npm install
   ```

2. **Deployment Errors**: Check Firebase login
   ```bash
   firebase login
   ```

3. **Routing Issues**: Ensure `firebase.json` has proper rewrites

4. **Image Issues**: Images are unoptimized for static hosting

## 📈 Performance Optimization

- Static files are cached for 1 year
- Images are unoptimized (acceptable for static hosting)
- CSS/JS files are minified by Next.js
- Gzip compression enabled by Firebase

## 🔒 Security

- HTTPS enabled by default
- Security headers configured
- No sensitive data in client-side code

## 📱 Mobile Optimization

- Responsive design
- Fast loading
- PWA-ready (can be added later)

---

## 🎯 Next Steps After Deployment

1. **Test the live site**
2. **Set up custom domain** (digitaldetox.app)
3. **Configure analytics**
4. **Set up monitoring**
5. **Add PWA features** (optional)

Your Digital Detox website will be live at your Firebase hosting URL! 🚀
