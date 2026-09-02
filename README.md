# LucidFocus Landing Page

A modern, responsive landing page for LucidFocus - helping users achieve clarity and focus by blocking distractions and building healthier digital habits.

## 🚀 Features

- **Modern Design**: Clean, professional UI with emerald green theme
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Email Signup**: Pre-launch waitlist with email collection
- **Multiple Pages**: Homepage, About, Contact with comprehensive information
- **Smooth Navigation**: Header with smooth scroll to download section
- **Professional Contact**: Multiple contact methods and FAQ section

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.6 with App Router
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Language**: TypeScript
- **Deployment**: Ready for Vercel/Netlify

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/DavidMtundi/digitaldetox-webpage.git
cd digitaldetox-webpage
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

One Firebase project: **`digitaldetox-app`** (same as the Play Store app). Do not deploy this site to `detoxifyblocker`.

GitHub Actions needs:
- Secret `FIREBASE_SERVICE_ACCOUNT` — JSON for a **digitaldetox-app** service account with Firebase Hosting Admin
- Vars `NEXT_PUBLIC_FIREBASE_*` — Web app config from [Project settings](https://console.firebase.google.com/project/digitaldetox-app/settings/general)
- `NEXT_PUBLIC_SITE_URL=https://pauseward.app`

After adding a Hosting site named `digitaldetox-app` and attaching `pauseward.app`:

```bash
npx -y firebase-tools@latest use digitaldetox-app
npm run build
npx -y firebase-tools@latest deploy --only hosting --project digitaldetox-app
```

Site: https://digitaldetox-app.web.app (and https://pauseward.app once DNS is pointed here).

`pauseward.app` is already added on this Hosting site. In the domain registrar, add:

- A record `@` → `199.36.158.100`
- TXT record `@` → `hosting-site=digitaldetox-app`

Leave `pauseward.com` on `detoxifyblocker` until you are ready to cut that domain over (it is still live there).

GitHub Actions (`DavidMtundi/digitaldetox-webpage`) must use a **digitaldetox-app** Hosting service account in secret `FIREBASE_SERVICE_ACCOUNT`, and these repository variables:

- `NEXT_PUBLIC_FIREBASE_API_KEY` = `AIzaSyC06gi5ui80gtwm-Tk7iDT8WBArZ211MBs`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` = `digitaldetox-app.firebaseapp.com`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID` = `digitaldetox-app`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` = `digitaldetox-app.firebasestorage.app`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` = `356083145385`
- `NEXT_PUBLIC_FIREBASE_APP_ID` = `1:356083145385:web:0cc80dbaf8a70051eae7b8`
- `NEXT_PUBLIC_SITE_URL` = `https://pauseward.app`

Firestore **rules** are not deployed from this repo. Canonical rules live in DigitalDetox (`DigitalDetox/firestore.rules`).

Copy `.env.example` to `.env.local` for local Firebase JS SDK values.

## 📁 Project Structure

```
src/
├── app/
│   ├── about/page.tsx      # About page
│   ├── contact/page.tsx    # Contact page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
└── components/
    ├── header.tsx          # Navigation header
    ├── app-card.tsx        # App download cards
    └── theme-provider.tsx  # Theme management
```

## 🎨 Design System

- **Primary Colors**: 
  - Emerald Green: `#10b981`
  - Background: `#ffffff`
  - Text: `#1f2937`
- **Typography**: Plus Jakarta Sans font family
- **Spacing**: Consistent padding and margins
- **Components**: Rounded corners, subtle shadows

## 📱 Pages

### Homepage (`/`)
- Hero section with app icon and headline
- Trust indicators (100% Free, 50,000+ Users, 2-Min Setup)
- Email signup for early access
- How it Works section (3-step process)
- Download section with platform tabs
- Why LucidFocus features
- FAQ section

### About (`/about`)
- Mission and values
- Key features overview
- Statistics and social proof
- Team information

### Contact (`/contact`)
- Multiple contact methods (Email, Live Chat, Phone)
- Professional contact form
- Comprehensive FAQ
- Response time information

## 🔧 Customization

### Colors
Update colors in `src/app/globals.css`:
```css
:root {
  --cream: #f4f4f0;
  --white: #ffffff;
  --black: #000000;
}
```

### Content
- Update app information in `src/app/page.tsx`
- Modify contact details in `src/app/contact/page.tsx`
- Edit company information in `src/app/about/page.tsx`

## 📈 Analytics & Tracking

To add analytics:
1. Add Google Analytics or similar tracking code to `src/app/layout.tsx`
2. Update email signup form to integrate with your email service
3. Add conversion tracking for key actions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is private and proprietary.

## 📞 Support

For questions or support, please contact:
- Email: hello@pauseward.app
- Site: https://pauseward.app

---

Built with ❤️ for digital wellness
