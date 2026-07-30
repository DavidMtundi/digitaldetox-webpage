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

const THEME_TOGGLE_CLASS =
  "!border-white/15 !bg-white/5 !text-gray-300 hover:!border-white/25 hover:!bg-white/10 hover:!text-white";

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

  const navLinkClass = (active: boolean) =>
    active
      ? "bg-emerald-500/15 text-emerald-300"
      : "text-gray-400 hover:bg-white/5 hover:text-white";

  return (
    <header className={shellClass}>
      <div className="container-modern">
        <div className="site-header-bar flex h-14 items-center justify-between gap-3 px-2.5 sm:px-3 md:h-16 md:px-5">
          <Link href="/" className="group flex min-w-0 items-center gap-2.5 md:gap-3">
            <div className="relative h-9 w-9 shrink-0 transition group-hover:scale-105 md:h-10 md:w-10">
              <Image src="/pauseward.png" alt="Pauseward" fill className="object-contain" priority />
            </div>
            <span className="truncate font-display text-base font-bold text-white sm:text-lg md:text-xl">Pauseward</span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {NAV.map((item) => {
              const active = isNavActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${navLinkClass(active)}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle className={THEME_TOGGLE_CLASS} />
            {user && (
              <Link
                href="/dashboard"
                className="text-sm font-medium text-gray-400 transition hover:text-emerald-300"
              >
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
            <ThemeToggle className={THEME_TOGGLE_CLASS} />
            <button
              type="button"
              className="rounded-lg p-2 text-gray-300 transition hover:bg-white/10"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="site-header-mobile-menu mt-2 rounded-2xl border border-white/10 bg-gray-950/95 px-3 py-4 backdrop-blur-xl lg:hidden">
            <div className="flex flex-col gap-1">
              {NAV.map((item) => {
                const active = isNavActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-lg px-3 py-2.5 text-sm font-medium transition ${navLinkClass(active)}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/support"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 transition hover:bg-white/5 hover:text-white"
              >
                Support Us
              </Link>
              <Link
                href="/privacy"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 transition hover:bg-white/5 hover:text-white"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 transition hover:bg-white/5 hover:text-white"
              >
                Terms of Service
              </Link>
              {user && (
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 transition hover:bg-white/5 hover:text-white"
                >
                  Dashboard
                </Link>
              )}
              <div className="mt-3 border-t border-white/10 pt-3">
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
