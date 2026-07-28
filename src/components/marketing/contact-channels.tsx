"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CreditCard,
  Download,
  Heart,
  Mail,
  MessageSquare,
  Scale,
} from "lucide-react";
import { CopyEmailButton } from "@/components/marketing/contact-form";

interface ContactChannelsProps {
  email: string;
  phone?: string;
  hours: string;
}

export default function ContactChannels({ email, phone, hours }: ContactChannelsProps) {
  return (
    <div className="contact-channel-grid">
      <article className="contact-channel-card contact-channel-card--primary">
        <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-start md:gap-6">
          <div className="contact-channel-icon">
            <Mail className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Recommended</p>
            <h2 className="mt-1 font-display text-2xl text-gray-900">Email support</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-600">
              The fastest way to reach us for billing, account access, bug reports, and anything that needs detail.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-900/10 transition hover:bg-emerald-700"
              >
                {email}
                <ArrowRight className="h-4 w-4" />
              </a>
              <CopyEmailButton email={email} />
            </div>
          </div>
        </div>
        <p className="mt-4 text-xs text-gray-500 md:mt-0 md:pl-[4.5rem]">{hours}</p>
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
          Download links for Android, iOS, macOS, Windows, and the web dashboard.
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
    { title: "Reply within 48 hours", body: "Most messages get a response within one to two business days." },
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
