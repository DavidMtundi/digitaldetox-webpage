import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import RevealOnScroll from "./reveal-on-scroll";
import FocusBackground from "./focus-background";
import SocialProofAvatars from "./social-proof-avatars";

type CtaBandProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  socialProof?: { count?: string; label?: string; text?: string };
  children?: ReactNode;
};

export default function CtaBand({ title, subtitle, eyebrow, socialProof, children }: CtaBandProps) {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <FocusBackground variant="cta" />
      <div className="container-modern relative z-10">
        <RevealOnScroll variant="scale">
          <div className="cta-panel mx-auto max-w-3xl text-center">
            {eyebrow && (
              <p className="cta-panel-eyebrow text-xs font-semibold uppercase tracking-[0.14em] text-emerald-300/90">
                {eyebrow}
              </p>
            )}
            <h2 className="font-display text-3xl text-white md:text-4xl md:leading-tight">{title}</h2>
            {socialProof && (
              <div className="mt-6 flex justify-center">
                <SocialProofAvatars
                  count={socialProof.count}
                  label={socialProof.label}
                  text={socialProof.text}
                />
              </div>
            )}
            {subtitle && (
              <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-emerald-50/85 md:text-lg">
                {subtitle}
              </p>
            )}
            {children && (
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                {children}
              </div>
            )}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

export function CtaPrimary({ href, children, external }: { href: string; children: ReactNode; external?: boolean }) {
  const className =
    "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-emerald-500 px-7 py-3 text-sm font-semibold text-gray-950 shadow-lg shadow-emerald-500/25 transition hover:-translate-y-0.5 hover:bg-emerald-400";
  const content = (
    <>
      {children}
      <ArrowRight className="h-4 w-4" aria-hidden />
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

export function CtaSecondary({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/10"
    >
      {children}
    </Link>
  );
}
