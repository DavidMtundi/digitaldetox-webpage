"use client";

import Link from "next/link";
import { Download, Monitor, Smartphone, Laptop, Globe } from "lucide-react";
import { PLATFORMS, statusLabel } from "@/lib/platforms";
import { useExternalLinks } from "@/hooks/useExternalLinks";

const ICONS = {
  android: Smartphone,
  ios: Smartphone,
  macos: Laptop,
  windows: Monitor,
  web: Globe,
} as const;

export default function DownloadPage() {
  const { links } = useExternalLinks();

  function resolveHref(platform: (typeof PLATFORMS)[number]): string | null {
    if (!platform.downloadKey) return null;
    return links.downloadLinks[platform.downloadKey] || null;
  }

  return (
    <div className="bg-white">
      <section className="border-b border-gray-200 bg-gradient-to-br from-emerald-50/60 via-white to-blue-50/40">
        <div className="container-modern py-16 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">All platforms</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Pauseward on every device you use
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Android is live today. macOS and iOS are in beta. Windows is coming soon. Use the web
            dashboard to manage blocklists and linked devices across environments.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/dashboard/login" className="btn-primary">
              Open web dashboard
            </Link>
            <a href="#platforms" className="btn-secondary">
              Compare platforms
            </a>
          </div>
        </div>
      </section>

      <section id="platforms" className="container-modern py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          {PLATFORMS.map((platform) => {
            const Icon = ICONS[platform.id];
            const href = resolveHref(platform);
            const downloadable = Boolean(href) && platform.status !== "coming_soon";

            return (
              <article
                key={platform.id}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{platform.name}</h2>
                      <p className="text-sm text-gray-600">{platform.tagline}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                    {statusLabel(platform.status)}
                  </span>
                </div>

                <ul className="mt-5 space-y-2 text-sm text-gray-700">
                  {platform.features.map((feature) => (
                    <li key={feature}>• {feature}</li>
                  ))}
                </ul>

                <div className="mt-6">
                  {platform.id === "web" ? (
                    <Link href="/dashboard/login" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline">
                      Sign in to dashboard
                    </Link>
                  ) : downloadable && href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </a>
                  ) : (
                    <p className="text-sm text-gray-500">
                      {platform.status === "coming_soon"
                        ? "Join the waitlist on the home page — we will email you when it ships."
                        : "Download link coming soon — check back or contact support."}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
