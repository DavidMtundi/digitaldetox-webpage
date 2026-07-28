export const DEFAULT_CONTACT_EMAIL = "hello@pauseward.app";

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  platform?: string;
  honeypot?: string;
}

export const SUBJECT_LABELS: Record<string, string> = {
  general: "General question",
  technical: "Technical support",
  billing: "Billing & subscriptions",
  feature: "Feature request",
  bug: "Bug report",
  partnership: "Partnership",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function getEnvContactInfo(): { email: string; phone: string; hours: string } {
  return {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || DEFAULT_CONTACT_EMAIL,
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() || "",
    hours: process.env.NEXT_PUBLIC_CONTACT_HOURS?.trim() || "Mon–Fri, 9am–6pm EAT",
  };
}

export function validateContactForm(
  data: ContactFormData,
): Partial<Record<keyof ContactFormData, string>> {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};

  if (!data.name.trim() || data.name.trim().length < 2) {
    errors.name = "Please enter your name (at least 2 characters).";
  }
  if (!data.email.trim() || !EMAIL_PATTERN.test(data.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!data.subject || !SUBJECT_LABELS[data.subject]) {
    errors.subject = "Please choose a topic.";
  }
  if (!data.message.trim() || data.message.trim().length < 10) {
    errors.message = "Please write at least 10 characters so we can help.";
  }

  return errors;
}

export function buildMailtoLink(to: string, data: ContactFormData): string {
  const topic = SUBJECT_LABELS[data.subject] ?? data.subject;
  const platform = data.platform ? `\nPlatform: ${data.platform}` : "";
  const subject = encodeURIComponent(`Pauseward — ${topic} (${data.name})`);
  const body = encodeURIComponent(
    `Name: ${data.name}\nEmail: ${data.email}\nTopic: ${topic}${platform}\n\n${data.message}`,
  );
  return `mailto:${to}?subject=${subject}&body=${body}`;
}
