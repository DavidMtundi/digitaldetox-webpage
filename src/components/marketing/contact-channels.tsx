"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Clock,
  CreditCard,
  Download,
  Heart,
  Mail,
  MessageSquare,
  Scale,
} from "lucide-react";
import { CopyEmailButton } from "@/components/marketing/contact-form";
import { SUPPORT_RESPONSE_HOURS, SUPPORT_RESPONSE_SHORT } from "@/lib/contact";

interface ContactChannelsProps {
  email: string;
  phone?: string;
  hours: string;
}

export default function ContactChannels({ email, phone, hours }: ContactChannelsProps) {
  return (
    <div className="contact-channel-grid">
      <article className="contact-channel-card contact-channel-card--primary">
        <div className="contact-email-showcase">
          <div className="contact-email-showcase-main">
            <div className="contact-email-showcase-brand">
              <div className="contact-channel-icon contact-channel-icon--featured" aria-hidden>
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <p className="contact-email-badge">Recommended</p>
                <h2 className="contact-email-title">Email support</h2>
              </div>
            </div>

            <p className="contact-email-desc">
              The fastest way to reach us for billing, account access, bug reports, and anything that needs detail.
            </p>

            <div className="contact-email-meta">
              <span className="contact-email-meta-pill">
                <Clock className="h-3.5 w-3.5" aria-hidden />
                Reply within {SUPPORT_RESPONSE_SHORT}
              </span>
              <span className="contact-email-meta-pill contact-email-meta-pill--muted">{hours}</span>
            </div>
          </div>

          <div className="contact-email-showcase-actions">
            <a href={`mailto:${email}`} className="contact-email-cta group">
              <span className="contact-email-cta-icon" aria-hidden>
                <Mail className="h-4 w-4" />
              </span>
              <span className="contact-email-cta-copy">
                <span className="contact-email-cta-label">Write to us</span>
                <span className="contact-email-cta-address">{email}</span>
              </span>
              <ArrowRight className="contact-email-cta-arrow h-4 w-4 shrink-0" aria-hidden />
            </a>
            <CopyEmailButton email={email} />
          </div>
        </div>
      </article>

      <article className="contact-channel-card">
        <div className="contact-channel-icon contact-channel-icon--muted">
          <CreditCard className="h-5 w-5" />
        </div>
        <h2 className="font-display text-lg text-gray-900">Billing & M-Pesa</h2>
        <p className="mt-2 flex-1 text-sm text-gray-600">
          Payment history, new checkouts, and plan status live in your dashboard.
        </p>
        <Link href="/dashboard/payments" className="contact-channel-link">
          Open payments
          <ArrowRight className="h-4 w-4" />
        </Link>
      </article>

      <article className="contact-channel-card">
        <div className="contact-channel-icon contact-channel-icon--muted">
          <Download className="h-5 w-5" />
        </div>
        <h2 className="font-display text-lg text-gray-900">Apps & setup</h2>
        <p className="mt-2 flex-1 text-sm text-gray-600">
          Download links for Android, iOS, macOS, Windows, Android TV, and the web dashboard.
        </p>
        <Link href="/download" className="contact-channel-link">
          Get apps
          <ArrowRight className="h-4 w-4" />
        </Link>
      </article>

      <article className="contact-channel-card">
        <div className="contact-channel-icon contact-channel-icon--muted">
          <MessageSquare className="h-5 w-5" />
        </div>
        <h2 className="font-display text-lg text-gray-900">Phone</h2>
        <p className="mt-2 flex-1 text-sm text-gray-600">
          {phone
            ? "For urgent account issues during business hours."
            : "Phone support isn’t available yet — email gets you to the right person fastest."}
        </p>
        {phone ? (
          <a href={`tel:${phone}`} className="contact-channel-link">
            {phone}
            <ArrowRight className="h-4 w-4" />
          </a>
        ) : (
          <span className="text-sm font-medium text-gray-500">{hours}</span>
        )}
      </article>
    </div>
  );
}

const RESOURCES = [
  { href: "/support", label: "Support our mission", icon: Heart },
  { href: "/privacy", label: "Privacy Policy", icon: Scale },
  { href: "/terms", label: "Terms of Service", icon: BookOpen },
  { href: "/pricing", label: "Pricing & plans", icon: CreditCard },
] as const;

export function ContactResources() {
  return (
    <div className="contact-resources">
      {RESOURCES.map((item) => {
        const Icon = item.icon;
        return (
          <Link key={item.href} href={item.href} className="group contact-resource-link">
            <Icon className="h-4 w-4 text-emerald-600" />
            {item.label}
            <ArrowRight className="ml-auto h-4 w-4 text-gray-300 transition group-hover:text-emerald-600" />
          </Link>
        );
      })}
    </div>
  );
}

export function ContactTimeline() {
  const steps = [
    { title: "You send a message", body: "Use the form or email us directly with as much context as you can." },
    { title: "We triage your request", body: "Billing and technical issues are routed to the right person on our team." },
    { title: `Reply within ${SUPPORT_RESPONSE_HOURS} hours`, body: `Most messages get a response within ${SUPPORT_RESPONSE_HOURS} hours.` },
  ];

  return (
    <ol className="contact-timeline">
      {steps.map((step, index) => (
        <li key={step.title} className="contact-timeline-step">
          <div className="contact-timeline-marker" aria-hidden>
            {index + 1}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{step.title}</h3>
            <p className="mt-1 text-sm text-gray-600">{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
