import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Pauseward collects, uses, and protects your data across web, mobile, and desktop.",
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
