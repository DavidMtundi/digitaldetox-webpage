"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  AUTH_CHANGED_EVENT,
  isAuthConfigured,
  readStoredUser,
  validateSession,
  type AuthUser,
} from "@/lib/auth";

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  configured: boolean;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  configured: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const configured = isAuthConfigured();

  useEffect(() => {
    let cancelled = false;

    async function syncUser() {
      if (!configured) {
        setUser(null);
        setLoading(false);
        return;
      }

      const stored = readStoredUser();
      if (!stored) {
        if (!cancelled) {
          setUser(null);
          setLoading(false);
        }
        return;
      }

      const validated = await validateSession();
      if (!cancelled) {
        setUser(validated);
        setLoading(false);
      }
    }

    void syncUser();
    const onAuthChanged = () => {
      setUser(readStoredUser());
    };
    window.addEventListener(AUTH_CHANGED_EVENT, onAuthChanged);
    return () => {
      cancelled = true;
      window.removeEventListener(AUTH_CHANGED_EVENT, onAuthChanged);
    };
  }, [configured]);

  const value = useMemo(
    () => ({ user, loading, configured }),
    [user, loading, configured],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  return useContext(AuthContext);
}
