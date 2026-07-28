"use client";

import { useState } from "react";
import { CheckCircle, Clock, Mail, MessageCircle, Phone, Send, Star, Users } from "lucide-react";
import PageHero from "@/components/marketing/page-hero";
import SectionHeader from "@/components/marketing/section-header";
import SectionShell from "@/components/marketing/section-shell";
import MarketingCard from "@/components/marketing/marketing-card";
import FaqBento from "@/components/marketing/faq-bento";
import TrustBadges from "@/components/marketing/trust-badges";
import { useExternalLinks } from "@/hooks/useExternalLinks";

const FAQ = [
  {
    q: "How do I install Pauseward?",
    a: "Download from Google Play and follow the setup wizard — under two minutes start to finish.",
  },
  {
    q: "Is Pauseward free?",
    a: "Core blocking and focus features are free. Pro adds advanced schedules, analytics, and sync.",
  },
  {
    q: "Can I customize what gets blocked?",
    a: "Yes — apps, sites, schedules, and exceptions are fully configurable.",
  },
  {
    q: "Which devices are supported?",
    a: "Android is live. iOS, Windows, and Mac are in development.",
  },
];

export default function Contact() {
  const { links } = useExternalLinks();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  return (
    <div className="marketing-page">
      <PageHero
        eyebrow="We're here to help"
        title="Let's talk"
        subtitle="Questions about setup, billing, or partnerships? Drop us a line."
        size="compact"
      >
        <TrustBadges
          items={[
            { icon: Clock, label: "Reply within 48h" },
            { icon: Users, label: "50,000+ users" },
            { icon: Star, label: "4.8/5 rating" },
          ]}
        />
      </PageHero>

      <SectionShell tone="white">
        <div className="grid gap-5 md:grid-cols-3">
          <MarketingCard glass icon={Mail} title="Email" description="Best for billing and detailed support.">
            <a href={`mailto:${links.contact.email}`} className="text-sm font-semibold text-emerald-700 hover:underline">
              {links.contact.email || "hello@pauseward.app"}
            </a>
          </MarketingCard>
          <MarketingCard glass icon={MessageCircle} title="Live chat" description="Quick answers during business hours.">
            <span className="pill-tag">Coming in app</span>
          </MarketingCard>
          <MarketingCard glass icon={Phone} title="Phone" description="Speak with our team directly.">
            <a href={`tel:${links.contact.phone}`} className="text-sm font-semibold text-emerald-700 hover:underline">
              {links.contact.phone || "Contact us"}
            </a>
          </MarketingCard>
        </div>
      </SectionShell>

      <SectionShell tone="mesh">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <SectionHeader
            align="left"
            eyebrow="Message"
            title="Send a note"
            subtitle="We typically respond within 24–48 hours on business days."
          />
          <div className="contact-form-shell">
            {isSubmitted ? (
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
                  <CheckCircle className="h-7 w-7 text-emerald-600" />
                </div>
                <h3 className="type-card-title text-xl">Message sent</h3>
                <p className="mt-2 text-gray-600">We&apos;ll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-700">Name</label>
                    <input id="name" name="name" value={formData.name} onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))} required className="input-modern" placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))} required className="input-modern" placeholder="you@example.com" />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-gray-700">Topic</label>
                  <select id="subject" name="subject" value={formData.subject} onChange={(e) => setFormData((p) => ({ ...p, subject: e.target.value }))} required className="input-modern">
                    <option value="">Select a topic</option>
                    <option value="general">General</option>
                    <option value="technical">Technical</option>
                    <option value="billing">Billing</option>
                    <option value="feature">Feature request</option>
                    <option value="bug">Bug report</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-gray-700">Message</label>
                  <textarea id="message" name="message" value={formData.message} onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))} required rows={5} className="input-modern resize-none" placeholder="How can we help?" />
                </div>
                <button type="submit" disabled={isSubmitting} className="btn-primary flex w-full items-center justify-center gap-2">
                  {isSubmitting ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> : <Send className="h-4 w-4" />}
                  {isSubmitting ? "Sending…" : "Send message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </SectionShell>

      <SectionShell tone="white" className="!pt-0">
        <SectionHeader eyebrow="FAQ" title="Common questions" />
        <div className="mx-auto max-w-4xl">
          <FaqBento items={FAQ} />
        </div>
      </SectionShell>
    </div>
  );
}
