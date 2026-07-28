"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle, Copy, Send } from "lucide-react";
import {
  SUBJECT_LABELS,
  submitContactMessage,
  validateContactForm,
  type ContactFormData,
} from "@/lib/contact";

const TOPICS = Object.entries(SUBJECT_LABELS).map(([value, label]) => ({ value, label }));

const TOPIC_PLACEHOLDERS: Record<string, string> = {
  general: "What would you like to know about Pauseward?",
  technical: "Describe what you tried, what happened, and your device or OS version.",
  billing: "Include your checkout reference, phone number used for M-Pesa, or the email on your account.",
  feature: "What problem would this solve for you? The more detail, the better we can prioritize.",
  bug: "Steps to reproduce, expected vs actual behavior, app version, and device model.",
  partnership: "Tell us about your organization and how you’d like to work together.",
};

const TOPIC_HINTS: Record<string, { text: string; href: string; label: string } | null> = {
  general: null,
  technical: { text: "Check downloads first:", href: "/download", label: "Get the right app" },
  billing: { text: "Payment history and receipts:", href: "/dashboard/payments", label: "Open payments" },
  feature: null,
  bug: { text: "Include app version from Settings → About.", href: "/download", label: "Download page" },
  partnership: null,
};

interface ContactFormProps {
  contactEmail: string;
}

export default function ContactForm({ contactEmail }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "general",
    message: "",
    platform: "",
    honeypot: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const errors = validateContactForm(formData);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);
    setFeedback(null);

    const result = await submitContactMessage(formData, contactEmail);

    setIsSubmitting(false);
    if (result.success) {
      setIsSubmitted(true);
      setFeedback({ type: "success", text: result.message });
      setFormData({
        name: "",
        email: "",
        subject: "general",
        message: "",
        platform: "",
        honeypot: "",
      });
    } else {
      setFeedback({ type: "error", text: result.message });
    }
  }

  if (isSubmitted && feedback?.type === "success") {
    return (
      <div className="contact-success-state" role="status">
        <div className="contact-success-icon">
          <CheckCircle className="h-8 w-8 text-emerald-600" />
        </div>
        <h3 className="font-display text-2xl text-gray-900">Message sent</h3>
        <p className="mt-2 max-w-sm text-gray-600">{feedback.text}</p>
        <p className="mt-4 text-sm text-gray-500">
          A confirmation will be sent to your inbox when email delivery is enabled.
        </p>
        <button
          type="button"
          onClick={() => {
            setIsSubmitted(false);
            setFeedback(null);
          }}
          className="btn-secondary mt-8"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form" noValidate>
      <div className="contact-form-header">
        <div className="contact-form-header-icon">
          <Send className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-display text-xl text-gray-900">Write to our team</h3>
          <p className="mt-1 text-sm text-gray-600">All fields marked with * are required.</p>
        </div>
      </div>

      {/* Honeypot — hidden from users */}
      <input
        type="text"
        name="website"
        value={formData.honeypot}
        onChange={(e) => setFormData((prev) => ({ ...prev, honeypot: e.target.value }))}
        className="contact-honeypot"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="contact-label">
            Name *
          </label>
          <input
            id="contact-name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            className={`input-modern ${fieldErrors.name ? "input-modern--error" : ""}`}
            placeholder="Jane Doe"
            autoComplete="name"
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
          />
          {fieldErrors.name ? (
            <p id="contact-name-error" className="contact-field-error">
              {fieldErrors.name}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="contact-email" className="contact-label">
            Email *
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            className={`input-modern ${fieldErrors.email ? "input-modern--error" : ""}`}
            placeholder="you@example.com"
            autoComplete="email"
            aria-invalid={Boolean(fieldErrors.email)}
          />
          {fieldErrors.email ? <p className="contact-field-error">{fieldErrors.email}</p> : null}
        </div>
      </div>

      <fieldset>
        <legend className="contact-label">Topic *</legend>
        <div className="contact-topic-grid" role="radiogroup" aria-label="Message topic">
          {TOPICS.map((topic) => {
            const active = formData.subject === topic.value;
            return (
              <button
                key={topic.value}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setFormData((prev) => ({ ...prev, subject: topic.value }))}
                className={`contact-topic-pill ${active ? "contact-topic-pill--active" : ""}`}
              >
                {topic.label}
              </button>
            );
          })}
        </div>
        {fieldErrors.subject ? <p className="contact-field-error">{fieldErrors.subject}</p> : null}
        {TOPIC_HINTS[formData.subject] ? (
          <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-600">
            <span>{TOPIC_HINTS[formData.subject]!.text}</span>
            <Link
              href={TOPIC_HINTS[formData.subject]!.href}
              className="font-semibold text-emerald-700 hover:underline"
            >
              {TOPIC_HINTS[formData.subject]!.label}
            </Link>
          </p>
        ) : null}
      </fieldset>

      <div>
        <label htmlFor="contact-platform" className="contact-label">
          Platform <span className="font-normal text-gray-400">(optional)</span>
        </label>
        <select
          id="contact-platform"
          name="platform"
          value={formData.platform}
          onChange={(e) => setFormData((prev) => ({ ...prev, platform: e.target.value }))}
          className="input-modern"
        >
          <option value="">Not sure / other</option>
          <option value="android">Android</option>
          <option value="ios">iOS</option>
          <option value="macos">macOS</option>
          <option value="windows">Windows</option>
          <option value="web">Web dashboard</option>
        </select>
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label htmlFor="contact-message" className="contact-label !mb-0">
            Message *
          </label>
          <span className={`text-xs ${formData.message.length > 1900 ? "text-amber-600" : "text-gray-400"}`}>
            {formData.message.length}/2000
          </span>
        </div>
        <textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              message: e.target.value.slice(0, 2000),
            }))
          }
          rows={6}
          className={`input-modern resize-none ${fieldErrors.message ? "input-modern--error" : ""}`}
          placeholder={TOPIC_PLACEHOLDERS[formData.subject] ?? TOPIC_PLACEHOLDERS.general}
          aria-invalid={Boolean(fieldErrors.message)}
        />
        {fieldErrors.message ? <p className="contact-field-error">{fieldErrors.message}</p> : null}
      </div>

      {feedback?.type === "error" ? (
        <p className="contact-form-alert contact-form-alert--error" role="alert">
          {feedback.text}
        </p>
      ) : null}

      <div className="contact-form-footer">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary flex min-w-[200px] items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          {isSubmitting ? "Sending…" : "Send message"}
        </button>
        <p className="text-xs text-gray-500">
          By sending, you agree to our{" "}
          <Link href="/privacy" className="text-emerald-700 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}

interface CopyEmailButtonProps {
  email: string;
}

export function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button type="button" onClick={() => void copy()} className="contact-copy-btn">
      {copied ? (
        <>
          <CheckCircle className="h-4 w-4" />
          Copied
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          Copy email
        </>
      )}
    </button>
  );
}
