"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Shield,
} from "lucide-react";
import PageHero from "@/components/marketing/page-hero";
import SectionHeader from "@/components/marketing/section-header";
import SectionShell from "@/components/marketing/section-shell";
import TrustBadges from "@/components/marketing/trust-badges";
import RevealOnScroll from "@/components/marketing/reveal-on-scroll";
import LegalAccordion from "@/components/marketing/legal-accordion";
import ContactForm from "@/components/marketing/contact-form";
import ContactChannels, {
  ContactResources,
  ContactTimeline,
} from "@/components/marketing/contact-channels";
import CtaBand, { CtaPrimary, CtaSecondary } from "@/components/marketing/cta-band";
import { useExternalLinks } from "@/hooks/useExternalLinks";
import { DEFAULT_CONTACT_EMAIL } from "@/lib/contact";

const FAQ = [
  {
    id: "mpesa",
    q: "How do I pay with M-Pesa?",
    a: "Sign in to the web dashboard, open Payments, pick a plan, and complete checkout via Paystack. You’ll receive an STK push on your phone. Keep your checkout reference if you need help.",
  },
  {
    id: "password",
    q: "I forgot my dashboard password",
    a: "Password reset is coming soon. Email us from the address on your account and we’ll verify ownership before helping you regain access.",
  },
  {
    id: "platforms",
    q: "Which platforms are supported?",
    a: "Android is live. iOS and macOS are in beta. Windows is coming soon. Billing, devices, and blocklists can be managed from the web dashboard.",
  },
  {
    id: "refund",
    q: "Can I get a refund?",
    a: "Refunds depend on where you purchased (Paystack, Google Play, or App Store). Email us with your payment reference and we’ll review your case.",
  },
  {
    id: "privacy",
    q: "How is my data handled?",
    a: "Accounts and billing are stored in PostgreSQL. We don’t sell your data or read content inside other apps. Read our Privacy Policy for full details.",
  },
  {
    id: "bug",
    q: "How do I report a bug?",
    a: "Use the form below and choose “Bug report”. Include your device model, OS version, Pauseward app version, and steps to reproduce the issue.",
  },
];

export default function ContactPage() {
  const { links } = useExternalLinks();
  const contactEmail = links.contact.email || DEFAULT_CONTACT_EMAIL;
  const contactPhone = links.contact.phone?.trim();
  const contactHours = links.contact.hours || "Mon–Fri, 9am–6pm EAT";
  const [openFaq, setOpenFaq] = useState<Record<string, boolean>>({ "mpesa": true });

  return (
    <div className="marketing-page">
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Real support.
            <br />
            <span className="hero-accent">No runaround.</span>
          </>
        }
        subtitle="Whether it’s M-Pesa billing, a bug on Android, or a partnership idea — tell us what you need and we’ll get back to you."
        size="compact"
      >
        <a href="#message" className="btn-primary inline-flex items-center gap-2">
          <MessageCircle className="h-4 w-4" />
          Send a message
        </a>
        <a href={`mailto:${contactEmail}`} className="btn-secondary inline-flex items-center gap-2">
          <Mail className="h-4 w-4" />
          Email directly
        </a>
        <TrustBadges
          items={[
            { icon: Clock, label: "Reply within 48h" },
            { icon: MapPin, label: "Based in Kenya" },
            { icon: Shield, label: "Privacy-first" },
          ]}
        />
      </PageHero>

      <section className="contact-stat-band" aria-label="Support highlights">
        <div className="container-modern">
          <div className="contact-stat-grid">
            <RevealOnScroll>
              <div className="contact-stat-card">
                <p className="contact-stat-value">48h</p>
                <p className="contact-stat-label">Typical response time</p>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={80}>
              <div className="contact-stat-card">
                <p className="contact-stat-value">EAT</p>
                <p className="contact-stat-label">{contactHours}</p>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={160}>
              <div className="contact-stat-card">
                <p className="contact-stat-value">Email</p>
                <p className="contact-stat-label">Primary support channel</p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <SectionShell tone="white">
        <SectionHeader
          eyebrow="Channels"
          title="Choose how to reach us"
          subtitle="Self-serve options are fastest for billing and downloads. Email us for everything else."
        />
        <RevealOnScroll>
          <ContactChannels email={contactEmail} phone={contactPhone} hours={contactHours} />
        </RevealOnScroll>
      </SectionShell>

      <SectionShell tone="mesh" id="message">
        <div className="contact-layout">
          <aside className="contact-aside">
            <SectionHeader
              align="left"
              eyebrow="Message us"
              title="Tell us what’s going on"
              subtitle="The more context you share, the faster we can help — especially for billing and bugs."
            />
            <RevealOnScroll>
              <div className="contact-aside-panel">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-800">
                  What happens next
                </h3>
                <ContactTimeline />
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <ContactResources />
            </RevealOnScroll>
          </aside>

          <RevealOnScroll delay={120}>
            <div className="contact-form-shell contact-form-shell--elevated">
              <ContactForm contactEmail={contactEmail} />
            </div>
          </RevealOnScroll>
        </div>
      </SectionShell>

      <SectionShell tone="white">
        <SectionHeader
          eyebrow="FAQ"
          title="Common questions"
          subtitle="Still unsure? Expand an answer below or write to us."
        />
        <div className="mx-auto max-w-3xl">
          <LegalAccordion
            sections={FAQ.map((item) => ({
              id: item.id,
              title: item.q,
              content: <p>{item.a}</p>,
            }))}
            openSections={openFaq}
            onToggle={(id) => setOpenFaq((prev) => ({ ...prev, [id]: !prev[id] }))}
          />
          <p className="mt-8 text-center text-sm text-gray-600">
            Didn&apos;t find your answer?{" "}
            <Link href="#message" className="font-semibold text-emerald-700 hover:underline">
              Send us a message
              <ArrowRight className="ml-1 inline h-4 w-4" />
            </Link>
          </p>
        </div>
      </SectionShell>

      <CtaBand
        title="Prefer self-serve?"
        subtitle="Check your plan, payments, and devices in the dashboard — or grab the app for your platform."
      >
        <CtaPrimary href="/dashboard/login">Open dashboard</CtaPrimary>
        <CtaSecondary href="/download">Download apps</CtaSecondary>
      </CtaBand>
    </div>
  );
}
