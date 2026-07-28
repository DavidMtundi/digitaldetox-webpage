import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  type ContactFormData,
  validateContactForm,
  buildMailtoLink,
} from "@/lib/contact-validation";

export {
  DEFAULT_CONTACT_EMAIL,
  SUBJECT_LABELS,
  getEnvContactInfo,
  validateContactForm,
  buildMailtoLink,
  type ContactFormData,
} from "@/lib/contact-validation";

export async function submitContactMessage(
  data: ContactFormData,
  fallbackEmail: string,
): Promise<{ success: boolean; method: "firestore" | "mailto" | "honeypot"; message: string }> {
  if (data.honeypot?.trim()) {
    return {
      success: true,
      method: "honeypot",
      message: "Thanks — we received your message and will reply within 48 hours.",
    };
  }

  const errors = validateContactForm(data);
  if (Object.keys(errors).length > 0) {
    return { success: false, method: "firestore", message: "Please fix the highlighted fields." };
  }

  if (!db) {
    if (typeof window !== "undefined") {
      window.location.href = buildMailtoLink(fallbackEmail, data);
    }
    return {
      success: true,
      method: "mailto",
      message: "Opening your email app so you can send the message.",
    };
  }

  try {
    await addDoc(collection(db, "contact-messages"), {
      name: data.name.trim(),
      email: data.email.toLowerCase().trim(),
      subject: data.subject,
      platform: data.platform || null,
      message: data.message.trim(),
      status: "new",
      createdAt: serverTimestamp(),
      source: "website-contact",
    });

    return {
      success: true,
      method: "firestore",
      message: "Thanks — we received your message and will reply within 48 hours.",
    };
  } catch {
    if (typeof window !== "undefined") {
      window.location.href = buildMailtoLink(fallbackEmail, data);
    }
    return {
      success: true,
      method: "mailto",
      message: "We opened your email app as a backup. Please send the message from there.",
    };
  }
}
