import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://lucidfocus-landing.web.app'),
  title: "LucidFocus - Stay Lucid, Stay Focused",
  description: "Take control of your digital habits with LucidFocus. Block distracting apps and websites, track usage, and build healthier relationships with technology. Achieve clarity in every task.",
  keywords: ["lucid focus", "app blocker", "screen time", "digital wellness", "focus app", "productivity", "mobile app", "website blocker", "clarity", "focus"],
  authors: [{ name: "LucidFocus Team" }],
  creator: "LucidFocus",
  publisher: "LucidFocus",
  icons: {
    icon: [
      { url: '/digitaldetox.png', sizes: 'any' },
      { url: '/digitaldetox.png', type: 'image/png' },
    ],
    shortcut: '/digitaldetox.png',
    apple: '/digitaldetox.png',
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
    title: 'LucidFocus - Stay Lucid, Stay Focused',
    description: 'Take control of your digital habits with LucidFocus. Block distracting apps and websites, track usage, and build healthier relationships with technology. Achieve clarity in every task.',
    siteName: 'LucidFocus',
    images: [
      {
        url: '/digitaldetox.png',
        width: 512,
        height: 512,
        alt: 'LucidFocus App Icon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LucidFocus - Stay Lucid, Stay Focused',
    description: 'Take control of your digital habits with LucidFocus. Block distracting apps and websites, track usage, and build healthier relationships with technology. Achieve clarity in every task.',
    images: [process.env.NEXT_PUBLIC_SITE_URL ? `${process.env.NEXT_PUBLIC_SITE_URL}/digitaldetox.png` : '/digitaldetox.png'],
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
      <body className={`${plusJakartaSans.variable} font-sans antialiased`} suppressHydrationWarning={true}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
