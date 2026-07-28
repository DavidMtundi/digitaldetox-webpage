import Link from "next/link";
import type { ReactNode } from "react";
import RevealOnScroll from "./reveal-on-scroll";
import FocusBackground from "./focus-background";

type CtaBandProps = {
  title: string;
  subtitle?: string;
  children?: ReactNode;
};

export default function CtaBand({ title, subtitle, children }: CtaBandProps) {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <FocusBackground variant="cta" />
      <div className="container-modern relative z-10">
        <RevealOnScroll variant="scale">
        <div className="cta-panel mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl text-white md:text-4xl md:leading-tight">{title}</h2>
          {subtitle && <p className="mx-auto mt-5 max-w-xl text-lg text-emerald-50/90">{subtitle}</p>}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">{children}</div>
        </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

export function CtaPrimary({ href, children, external }: { href: string; children: ReactNode; external?: boolean }) {
  const className =
    "inline-flex min-h-[52px] items-center justify-center rounded-2xl bg-white px-8 py-3.5 text-sm font-semibold text-emerald-900 shadow-xl shadow-black/10 transition hover:-translate-y-0.5 hover:bg-emerald-50 hover:shadow-2xl";
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function CtaSecondary({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-[52px] items-center justify-center rounded-2xl border border-white/25 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/20"
    >
      {children}
    </Link>
  );
}
