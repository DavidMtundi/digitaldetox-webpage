"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useAuth } from "@/components/auth/auth-provider";
import ThemeToggle from "@/components/theme-toggle";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/download", label: "Apps" },
  { href: "/contact", label: "Contact" },
];

function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();
  const isHome = pathname === "/";

  const shellClass = isHome
    ? "site-header-shell site-header-shell--fixed"
    : "site-header-shell site-header-shell--sticky";

  return (
    <header className={shellClass}>
      <div className="container-modern">
        <div className="site-header-bar flex h-14 items-center justify-between gap-3 rounded-2xl border border-emerald-100/80 bg-white/92 px-2.5 shadow-lg shadow-emerald-900/5 backdrop-blur-xl sm:px-3 md:h-16 md:rounded-full md:px-5 dark:border-white/10 dark:bg-gray-950/85 dark:shadow-2xl dark:shadow-black/40">
          <Link href="/" className="group flex min-w-0 items-center gap-2.5 md:gap-3">
            <div className="relative h-9 w-9 shrink-0 transition group-hover:scale-105 md:h-10 md:w-10">
              <Image src="/pauseward.png" alt="Pauseward" fill className="object-contain" priority />
            </div>
            <span className="site-header-logo truncate font-display text-base font-bold text-gray-900 dark:text-white sm:text-lg md:text-xl">
              Pauseward
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {NAV.map((item) => {
              const active = isNavActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`site-header-nav-link rounded-full px-3.5 py-2 text-sm font-medium text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-800 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white ${
                    active ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300" : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle />
            {user && (
              <Link href="/dashboard" className="site-header-dashboard-link text-sm font-medium text-gray-600 transition hover:text-emerald-700 dark:text-gray-400 dark:hover:text-emerald-300">
                Dashboard
              </Link>
            )}
            <Link
              href="/download"
              className="inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-gray-950 transition hover:-translate-y-0.5 hover:bg-emerald-400"
            >
              Get the app
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="site-header-menu-btn rounded-lg p-2 text-gray-700 transition hover:bg-emerald-50 dark:text-gray-300 dark:hover:bg-white/10"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="site-header-mobile-menu mt-2 rounded-2xl border border-emerald-100/80 bg-white/95 px-3 py-4 backdrop-blur-xl dark:border-white/10 dark:bg-gray-950/95 lg:hidden">
            <div className="flex flex-col gap-1">
              {NAV.map((item) => {
                const active = isNavActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`site-header-mobile-link rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-800 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white ${
                      active ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/support"
                onClick={() => setOpen(false)}
                className="site-header-mobile-link rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-800 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
              >
                Support Us
              </Link>
              <Link
                href="/privacy"
                onClick={() => setOpen(false)}
                className="site-header-mobile-link rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-800 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                onClick={() => setOpen(false)}
                className="site-header-mobile-link rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-800 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
              >
                Terms of Service
              </Link>
              {user && (
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="site-header-mobile-link rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-800 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
                >
                  Dashboard
                </Link>
              )}
              <div className="site-header-mobile-divider mt-3 border-t border-emerald-100/80 pt-3 dark:border-white/10">
                <Link
                  href="/download"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full min-h-[44px] items-center justify-center rounded-full bg-emerald-500 font-semibold text-gray-950 transition hover:bg-emerald-400"
                >
                  Get the app
                </Link>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
