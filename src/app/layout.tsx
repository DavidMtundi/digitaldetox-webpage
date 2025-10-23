import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Digital Detox - Break Free from Digital Distractions",
  description: "Take control of your digital habits with Digital Detox. Block distracting apps and websites, track usage, and build healthier relationships with technology. Join 50,000+ users who have reclaimed their time.",
  keywords: ["digital detox", "app blocker", "screen time", "digital wellness", "focus app", "productivity", "mobile app", "website blocker"],
  authors: [{ name: "Digital Detox Team" }],
  creator: "Digital Detox",
  publisher: "Digital Detox",
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
    url: 'https://digitaldetox.app',
    title: 'Digital Detox - Break Free from Digital Distractions',
    description: 'Take control of your digital habits with Digital Detox. Block distracting apps and websites, track usage, and build healthier relationships with technology.',
    siteName: 'Digital Detox',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Detox - Break Free from Digital Distractions',
    description: 'Take control of your digital habits with Digital Detox. Block distracting apps and websites, track usage, and build healthier relationships with technology.',
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
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
