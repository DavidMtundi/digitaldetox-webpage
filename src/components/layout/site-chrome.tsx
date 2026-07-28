"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { AuthProvider } from "@/components/auth/auth-provider";
import { ThemeProvider } from "@/components/theme-provider";

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <ThemeProvider>
      <AuthProvider>
        {!isDashboard && <Header />}
        <main>{children}</main>
        {!isDashboard && <Footer />}
      </AuthProvider>
    </ThemeProvider>
  );
}
