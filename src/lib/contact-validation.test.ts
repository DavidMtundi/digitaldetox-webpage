import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  buildMailtoLink,
  validateContactForm,
  SUBJECT_LABELS,
} from "./contact-validation";

const VALID = {
  name: "Jane Doe",
  email: "jane@example.com",
  subject: "billing",
  message: "I need help with my M-Pesa payment.",
};

describe("validateContactForm", () => {
  it("accepts valid input", () => {
    assert.deepEqual(validateContactForm(VALID), {});
  });

  it("requires name, email, subject, and message", () => {
    const errors = validateContactForm({
      name: "J",
      email: "bad",
      subject: "unknown",
      message: "short",
    });
    assert.ok(errors.name);
    assert.ok(errors.email);
    assert.ok(errors.subject);
    assert.ok(errors.message);
  });

  it("only allows known subjects", () => {
    assert.ok(SUBJECT_LABELS.billing);
    const errors = validateContactForm({ ...VALID, subject: "spam" });
    assert.ok(errors.subject);
  });
});

describe("buildMailtoLink", () => {
  it("encodes subject and body", () => {
    const link = buildMailtoLink("hello@pauseward.app", VALID);
    assert.match(link, /^mailto:hello@pauseward\.app\?/);
    assert.match(link, /subject=/);
    assert.match(link, /body=/);
    assert.match(link, /Billing/);
  });

  it("includes platform when provided", () => {
    const link = buildMailtoLink("hello@pauseward.app", {
      ...VALID,
      platform: "android",
    });
    assert.match(decodeURIComponent(link), /Platform: android/);
  });
});
