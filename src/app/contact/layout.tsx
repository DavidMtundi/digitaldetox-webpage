import type { Metadata } from "next";
import { getEnvContactInfo } from "@/lib/contact";

const contact = getEnvContactInfo();

export const metadata: Metadata = {
  title: "Contact",
  description: "Get help with Pauseward setup, billing, M-Pesa payments, and your account.",
  openGraph: {
    title: "Contact Pauseward",
    description: "Email support for billing, bugs, and account help. Typical reply within 48 hours.",
  },
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Pauseward",
  description: metadata.description,
  url: "https://pauseward.app/contact",
  mainEntity: {
    "@type": "Organization",
    name: "Pauseward",
    email: contact.email,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: contact.email,
      availableLanguage: ["English"],
      hoursAvailable: contact.hours,
    },
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      {children}
    </>
  );
}
