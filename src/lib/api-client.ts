import { clearSession, getAccessToken } from "@/lib/auth";

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function getApiBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_PAUSEWARD_API_URL;
  if (!url) {
    throw new Error("NEXT_PUBLIC_PAUSEWARD_API_URL is not configured");
  }
  return url.replace(/\/$/, "");
}

export function isApiConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_PAUSEWARD_API_URL);
}

export function handleUnauthorized(): never {
  clearSession();
  if (typeof window !== "undefined") {
    const redirect = encodeURIComponent(window.location.pathname + window.location.search);
    window.location.assign(`/dashboard/login?redirect=${redirect}`);
  }
  throw new Error("Session expired. Please sign in again.");
}

type ApiMethod = "GET" | "POST" | "PATCH" | "DELETE";

export async function apiRequest<T>(
  method: ApiMethod,
  path: string,
  options?: {
    body?: Record<string, unknown>;
    auth?: boolean;
  },
): Promise<T> {
  const headers: Record<string, string> = {};
  if (options?.body) {
    headers["Content-Type"] = "application/json";
  }
  if (options?.auth) {
    headers.Authorization = `Bearer ${await getAccessToken()}`;
  }

  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    method,
    headers,
    body: options?.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await response.json().catch(() => ({}));

  if (response.status === 401 && options?.auth) {
    handleUnauthorized();
  }

  if (!response.ok) {
    const message =
      typeof data.error === "string" ? data.error : `Request failed (${response.status})`;
    throw new ApiError(message, response.status);
  }

  return data as T;
}

export function apiGet<T>(path: string, auth = false): Promise<T> {
  return apiRequest<T>("GET", path, { auth });
}

export function apiPost<T>(
  path: string,
  body?: Record<string, unknown>,
  auth = false,
): Promise<T> {
  return apiRequest<T>("POST", path, { body, auth });
}
