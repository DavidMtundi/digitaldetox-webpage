"use client";

import { getApiBaseUrl, isApiConfigured } from "@/lib/api-client";

const TOKEN_STORAGE_KEY = "pauseward_access_token";
const USER_STORAGE_KEY = "pauseward_user";

export type AuthUser = {
  uid: string;
  email: string | null;
  getIdToken: () => Promise<string>;
};

export interface AuthSessionResponse {
  token: string;
  expiresIn: number;
  user: {
    id: string;
    email: string;
  };
  devVerificationToken?: string;
}

export const AUTH_CHANGED_EVENT = "pauseward-auth-changed";

function toAuthUser(sessionUser: { id: string; email: string }, token: string): AuthUser {
  return {
    uid: sessionUser.id,
    email: sessionUser.email,
    getIdToken: async () => token,
  };
}

function persistSession(session: AuthSessionResponse): AuthUser {
  window.localStorage.setItem(TOKEN_STORAGE_KEY, session.token);
  window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(session.user));
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
  return toAuthUser(session.user, session.token);
}

export function isAuthConfigured(): boolean {
  return isApiConfigured();
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_STORAGE_KEY);
  window.localStorage.removeItem(USER_STORAGE_KEY);
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
}

/** Validates stored JWT with the API; clears session on 401. */
export async function validateSession(): Promise<AuthUser | null> {
  if (typeof window === "undefined") return null;
  const token = window.localStorage.getItem(TOKEN_STORAGE_KEY);
  const rawUser = window.localStorage.getItem(USER_STORAGE_KEY);
  if (!token || !rawUser) return null;

  try {
    const response = await fetch(`${getApiBaseUrl()}/v1/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      clearSession();
      return null;
    }
    const data = (await response.json()) as { id: string; email: string };
    if (!data.id || !data.email) {
      clearSession();
      return null;
    }
    const user = toAuthUser(data, token);
    window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify({ id: data.id, email: data.email }));
    return user;
  } catch {
    return null;
  }
}

export function readStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const token = window.localStorage.getItem(TOKEN_STORAGE_KEY);
  const rawUser = window.localStorage.getItem(USER_STORAGE_KEY);
  if (!token || !rawUser) return null;

  try {
    const user = JSON.parse(rawUser) as { id: string; email: string };
    if (!user.id || !user.email) return null;
    return toAuthUser(user, token);
  } catch {
    return null;
  }
}

async function authRequest(
  path: string,
  body: Record<string, string>,
): Promise<AuthSessionResponse> {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = (await response.json().catch(() => ({}))) as AuthSessionResponse & {
    error?: string;
  };

  if (!response.ok) {
    throw new Error(typeof data.error === "string" ? data.error : "Authentication failed");
  }
  if (!data.token || !data.user?.id || !data.user?.email) {
    throw new Error("Invalid auth response from server");
  }

  return data;
}

export async function signIn(email: string, password: string): Promise<AuthUser> {
  const session = await authRequest("/v1/auth/login", { email, password });
  return persistSession(session);
}

export async function signUp(email: string, password: string): Promise<AuthSessionResponse> {
  const session = await authRequest("/v1/auth/register", { email, password });
  persistSession(session);
  return session;
}

export async function signOut(): Promise<void> {
  clearSession();
}

export async function getAccessToken(): Promise<string> {
  const user = readStoredUser();
  if (!user) {
    throw new Error("Sign in required");
  }
  return user.getIdToken();
}
