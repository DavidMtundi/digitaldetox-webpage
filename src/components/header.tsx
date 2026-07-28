"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/components/auth/auth-provider";
import ThemeToggle from "@/components/theme-toggle";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/download", label: "Apps" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100/60 bg-white/85 backdrop-blur-xl dark:border-gray-800/80 dark:bg-gray-950/85">
      <div className="container-modern">
        <div className="flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
          <Link href="/" className="group flex min-w-0 items-center gap-3">
            <div className="relative h-10 w-10 shrink-0 transition group-hover:scale-105">
              <Image src="/pauseward.png" alt="Pauseward" fill className="object-contain" priority />
            </div>
            <span className="truncate font-display text-xl font-bold text-gray-900 dark:text-gray-100">Pauseward</span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />
            {user && (
              <Link href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-emerald-700 dark:text-gray-400 dark:hover:text-emerald-400">
                Dashboard
              </Link>
            )}
            <Link href="/pricing" className="btn-primary !min-h-[42px] !px-5 !py-2.5 text-sm">
              Get Pro
            </Link>
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="border-t border-gray-100 py-4 dark:border-gray-800 lg:hidden">
            <div className="flex flex-col gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-emerald-300"
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/support" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-emerald-50 dark:text-gray-300 dark:hover:bg-gray-800">
                Support Us
              </Link>
              <Link href="/privacy" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-emerald-50 dark:text-gray-300 dark:hover:bg-gray-800">
                Privacy Policy
              </Link>
              <Link href="/terms" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-emerald-50 dark:text-gray-300 dark:hover:bg-gray-800">
                Terms of Service
              </Link>
              {user && (
                <Link href="/dashboard" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-emerald-50 dark:text-gray-300 dark:hover:bg-gray-800">
                  Dashboard
                </Link>
              )}
              <div className="mt-3 border-t border-gray-100 pt-3 dark:border-gray-800">
                <Link href="/pricing" onClick={() => setOpen(false)} className="btn-primary justify-center">
                  Get Pro
                </Link>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
