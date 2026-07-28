"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { useAuth } from "@/components/auth/auth-provider";
import { useExternalLinks } from "@/hooks/useExternalLinks";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/download", label: "Apps" },
  { href: "/contact", label: "Contact" },
  { href: "/support", label: "Support" },
];

const LEGAL = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export default function Footer() {
  const { links } = useExternalLinks();
  const { user } = useAuth();

  return (
    <footer className="relative overflow-hidden bg-gray-950 text-white">
      <div className="marketing-grain absolute inset-0 opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-gray-950 to-gray-950" />
      <div className="container-modern relative z-10 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="mb-5 flex items-center gap-3">
              <div className="relative h-11 w-11">
                <Image src="/pauseward.png" alt="Pauseward" fill className="object-contain" />
              </div>
              <span className="font-display text-xl font-bold text-white">Pauseward</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-gray-400">
              Pause before distraction. Block apps, protect focus, and build healthier digital habits — starting in Kenya and worldwide.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">Explore</h3>
            <ul className="space-y-2.5">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a href={`mailto:${links.contact.email}`} className="flex items-start gap-2 hover:text-white">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                  <span className="break-all">{links.contact.email}</span>
                </a>
              </li>
              <li>
                <a href={`tel:${links.contact.phone}`} className="flex items-center gap-2 hover:text-white">
                  <Phone className="h-4 w-4 shrink-0" />
                  {links.contact.phone}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">Legal</h3>
            <ul className="space-y-2.5">
              {LEGAL.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={user ? "/dashboard" : "/dashboard/login"}
                  className="text-sm text-gray-400 transition hover:text-white"
                >
                  {user ? "Web dashboard" : "Log in"}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-gray-500 md:flex-row">
          <p>© {new Date().getFullYear()} Pauseward. All rights reserved.</p>
          <p>Built for focus. Pay with M-Pesa or card in Kenya.</p>
        </div>
      </div>
    </footer>
  );
}
