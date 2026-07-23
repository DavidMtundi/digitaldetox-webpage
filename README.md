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

### Firebase Hosting (detoxifyblocker – default)
```bash
firebase use detoxifyblocker
npm run build
firebase deploy --only hosting
```

Site URL: https://detoxifyblocker.web.app

Set Firebase config in `.env.local` (see `.env.example`). Create the project first: `firebase login` then `firebase projects:create detoxifyblocker` (or use [Firebase Console](https://console.firebase.google.com/)).

### Deploy to lucidfocus-landing instead
```bash
firebase use lucidfocus-landing
# Temporarily set firebase.json hosting "site" to lucidfocus-landing if needed
npm run build
firebase deploy --only hosting --project lucidfocus-landing
```

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
- Email: (configured via Firestore)
- Site: https://lucidfocus-landing.web.app

---

Built with ❤️ for digital wellness
