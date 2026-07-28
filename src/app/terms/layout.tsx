import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing your use of Pauseward apps, web dashboard, and subscriptions.",
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
