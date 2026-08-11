"use client";

import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowUpRight, Globe, Mail, MapPin, Phone } from "lucide-react";
import PlatformLogo from "@/components/marketing/platform-logo";
import { useAuth } from "@/components/auth/auth-provider";
import { useExternalLinks } from "@/hooks/useExternalLinks";
import {
  PLATFORMS,
  resolvePlatformDownloadTarget,
  type PlatformId,
} from "@/lib/platforms";

const FOOTER_PLATFORM_IDS: PlatformId[] = ["android", "ios", "macos", "windows", "android_tv"];

const PRODUCT_LINKS = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/download", label: "Download" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];

const COMPANY_LINKS = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Help & contact" },
  { href: "/support", label: "Donate" },
];

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy policy" },
  { href: "/terms", label: "Terms of service" },
];

function FooterNavLink({
  href,
  children,
  external,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const className = "site-footer-link inline-flex items-center gap-1";
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
        <ArrowUpRight className="h-3 w-3 opacity-60" aria-hidden />
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function platformById(id: PlatformId) {
  const platform = PLATFORMS.find((entry) => entry.id === id);
  if (!platform) throw new Error(`Unknown platform: ${id}`);
  return platform;
}

export default function Footer() {
  const { links } = useExternalLinks();
  const { user } = useAuth();
  const dashboardHref = user ? "/dashboard" : "/dashboard/login";
  const dashboardLabel = user ? "Dashboard" : "Log in";

  return (
    <footer className="site-footer">
      <div className="marketing-grain site-footer-grain" aria-hidden />
      <div className="site-footer-glow" aria-hidden />

      <div className="container-modern relative z-10">
        <div className="site-footer-cta-panel">
          <div className="site-footer-cta-inner">
            <div className="site-footer-cta-copy">
              <p className="site-footer-eyebrow">Start tonight</p>
              <h2 className="site-footer-cta-title font-display">Take back the evening you keep losing</h2>
              <p className="site-footer-cta-subtitle">
                Download on Android, iOS, Windows, macOS, or Android TV — or upgrade on web with M-Pesa or card when you&apos;re ready for more.
              </p>
            </div>
            <div className="site-footer-cta-actions">
              <Link href="/download" className="site-footer-cta-primary">
                Start tonight&apos;s focus
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link href="/pricing" className="site-footer-cta-secondary">
                View pricing
              </Link>
            </div>
          </div>
        </div>

        <div className="site-footer-grid">
          <div className="site-footer-brand">
            <Link href="/" className="site-footer-logo group">
              <div className="relative h-11 w-11 shrink-0 transition group-hover:scale-105">
                <Image src="/pauseward.png" alt="Pauseward" fill className="object-contain" />
              </div>
              <span className="font-display text-xl font-bold">Pauseward</span>
            </Link>
            <p className="site-footer-tagline">
              Pause before distraction. Block apps and sites, turn focus modes on when you need them, and sync
              boundaries across your devices.
            </p>
            <div className="site-footer-origin-row">
              <span className="site-footer-origin-pill site-footer-origin-pill-accent">
                <MapPin className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden />
                Kenya-born
              </span>
              <span className="site-footer-origin-pill">
                <Globe className="h-3.5 w-3.5 text-emerald-600/90 dark:text-emerald-400/90" aria-hidden />
                Focus everywhere
              </span>
            </div>
          </div>

          <nav className="site-footer-nav-col" aria-label="Product">
            <h3 className="site-footer-col-title">Product</h3>
            <ul className="site-footer-links">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.href}>
                  <FooterNavLink href={link.href}>{link.label}</FooterNavLink>
                </li>
              ))}
              <li>
                <FooterNavLink href={dashboardHref}>{dashboardLabel}</FooterNavLink>
              </li>
            </ul>
          </nav>

          <nav className="site-footer-nav-col" aria-label="Company">
            <h3 className="site-footer-col-title">Company</h3>
            <ul className="site-footer-links">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <FooterNavLink href={link.href}>{link.label}</FooterNavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer-nav-col site-footer-contact-col">
            <h3 className="site-footer-col-title">Contact</h3>
            <ul className="site-footer-contact">
              <li>
                <a href={`mailto:${links.contact.email}`} className="site-footer-contact-link">
                  <Mail className="h-4 w-4 shrink-0 text-emerald-600/90 dark:text-emerald-400/80" aria-hidden />
                  <span className="site-footer-email">{links.contact.email}</span>
                </a>
              </li>
              {links.contact.phone ? (
                <li>
                  <a href={`tel:${links.contact.phone}`} className="site-footer-contact-link">
                    <Phone className="h-4 w-4 shrink-0 text-emerald-600/90 dark:text-emerald-400/80" aria-hidden />
                    <span>{links.contact.phone}</span>
                  </a>
                </li>
              ) : null}
            </ul>
          </div>

          <nav className="site-footer-nav-col" aria-label="Legal">
            <h3 className="site-footer-col-title">Legal</h3>
            <ul className="site-footer-links">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <FooterNavLink href={link.href}>{link.label}</FooterNavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="site-footer-platforms">
          <p className="site-footer-col-title mb-3">Download</p>
          <div className="site-footer-platform-grid">
            {FOOTER_PLATFORM_IDS.map((id) => {
              const platform = platformById(id);
              const target = resolvePlatformDownloadTarget(platform, links.downloadLinks);
              if (!target) return null;

              const chip = (
                <>
                  <span className="site-footer-platform-logo">
                    <PlatformLogo platformId={id} size={22} />
                  </span>
                  <span className="truncate">{platform.name}</span>
                </>
              );

              return target.external ? (
                <a
                  key={id}
                  href={target.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-footer-platform-chip"
                >
                  {chip}
                  <ArrowUpRight className="ml-auto h-3.5 w-3.5 shrink-0 opacity-50" aria-hidden />
                </a>
              ) : (
                <Link key={id} href={target.href} className="site-footer-platform-chip">
                  {chip}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="site-footer-bottom">
          <p>© {new Date().getFullYear()} Pauseward. All rights reserved.</p>
          <p className="site-footer-bottom-meta">M-Pesa & card via Paystack · Cancel anytime on Pro & Family</p>
        </div>
      </div>
    </footer>
  );
}
