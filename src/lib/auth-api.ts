"use client";

import { apiGet, apiPost } from "@/lib/api-client";

export type AuthSessionResponse = {
  token: string;
  expiresIn: number;
  user: {
    id: string;
    email: string;
  };
  devVerificationToken?: string;
};

export type AuthMeResponse = {
  id: string;
  email: string;
  emailVerified: boolean;
  firebaseLinked: boolean;
};

export async function requestPasswordReset(email: string): Promise<{
  message: string;
  devResetToken?: string;
}> {
  return apiPost("/v1/auth/forgot-password", { email });
}

export async function resetPassword(token: string, password: string): Promise<{ message: string }> {
  return apiPost("/v1/auth/reset-password", { token, password });
}

export async function verifyEmail(token: string): Promise<{ message: string }> {
  return apiPost("/v1/auth/verify-email", { token });
}

export async function resendVerificationEmail(): Promise<{
  message: string;
  devVerificationToken?: string;
}> {
  return apiPost("/v1/auth/resend-verification", undefined, true);
}

export async function fetchAuthProfile(): Promise<AuthMeResponse> {
  return apiGet<AuthMeResponse>("/v1/auth/me", true);
}

export function buildVerificationUrl(token: string): string {
  const site = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "";
  return `${site}/dashboard/verify-email?token=${encodeURIComponent(token)}`;
}
