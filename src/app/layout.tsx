import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/layout/site-chrome";
import ThemeScript from "@/components/theme-script";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: true,
});

/** Display / headlines — soft geometry reads well on dark heroes and parent-facing copy */
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700"],
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://lucidfocus-landing.web.app'),
  title: "Pauseward: App Blocker & Focus",
  description: "Pause before distraction. Guard your focus with Pauseward — block apps, run focus sessions, and manage screen time across Mac, Windows, iOS, and Android.",
  keywords: ["pauseward", "app blocker", "screen time", "focus app", "focus timer", "digital detox", "app block", "distraction blocker", "deep work", "stay focused"],
  authors: [{ name: "Pauseward Team" }],
  creator: "Pauseward",
  publisher: "Pauseward",
  icons: {
    icon: [
      { url: '/pauseward.png', sizes: 'any' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://lucidfocus-landing.web.app',
    title: 'Pauseward: App Blocker & Focus',
    description: 'Pause before distraction. Guard your focus with Pauseward — block apps, run focus sessions, and manage screen time across Mac, Windows, iOS, and Android.',
    siteName: 'Pauseward',
    images: [
      {
        url: '/pauseward.png',
        width: 512,
        height: 512,
        alt: 'Pauseward App Icon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pauseward: App Blocker & Focus',
    description: 'Pause before distraction. Guard your focus with Pauseward — block apps, run focus sessions, and manage screen time across Mac, Windows, iOS, and Android.',
    images: [process.env.NEXT_PUBLIC_SITE_URL ? `${process.env.NEXT_PUBLIC_SITE_URL}/pauseward.png` : '/pauseward.png'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${plusJakartaSans.variable} ${sora.variable} font-sans antialiased`} suppressHydrationWarning={true}>
        <ThemeScript />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
