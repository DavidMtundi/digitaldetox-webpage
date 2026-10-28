import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Globe, Mail } from "lucide-react";
import FocusBackground from "./focus-background";
import SocialProofAvatars from "./social-proof-avatars";
import PhoneFan from "./phone-fan";
import FeaturePills from "./feature-pills";
import type { MarketingImage } from "@/lib/marketing-media";

type PlugStyleHeroProps = {
  /** Optional eyebrow pill above the title — omit when not needed */
  badge?: string;
  title: ReactNode;
  /** Short supporting line under the headline */
  subtitle?: string;
  phones: { left: MarketingImage; center: MarketingImage; right: MarketingImage };
  socialProof: { count?: string; label?: string; text?: string };
  featurePills?: string[];
  children?: ReactNode;
};

export default function PlugStyleHero({
  badge,
  title,
  subtitle,
  phones,
  socialProof,
  featurePills,
  children,
}: PlugStyleHeroProps) {
  return (
    <section className="plug-hero relative overflow-hidden bg-[#fafdfb] pb-6 dark:bg-[#050807] md:pb-10">
      <FocusBackground variant="plug-dark" />
      <div className="plug-hero-watermark font-display" aria-hidden>
        Pauseward
      </div>

      <div className="container-modern relative z-10 pt-24 sm:pt-28 md:pt-32 lg:pt-36">
        <div className="mx-auto max-w-3xl text-center">
          {badge ? (
            <div className="hero-eyebrow hero-enter mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50/90 px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-emerald-800 backdrop-blur-sm dark:border-white/15 dark:bg-white/5 dark:text-gray-300">
              <Globe className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden />
              {badge}
            </div>
          ) : null}

          <p className="hero-enter mb-3 font-display text-sm font-semibold tracking-[0.18em] text-emerald-700 uppercase dark:text-emerald-400">
            Pauseward
          </p>

          <h1
            className={`hero-title hero-enter hero-enter-delay-1 font-display font-bold leading-[1.08] tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-[3.5rem] lg:leading-[1.06] ${
              badge ? "mt-6 text-[2.35rem]" : "text-[2.35rem] sm:text-[2.6rem]"
            }`}
          >
            {title}
          </h1>

          {subtitle ? (
            <p className="hero-enter hero-enter-delay-1 mx-auto mt-5 max-w-lg text-base leading-relaxed text-gray-600 dark:text-gray-300 md:text-lg">
              {subtitle}
            </p>
          ) : null}

          <div className="hero-enter hero-enter-delay-2 mt-7 flex justify-center">
            <SocialProofAvatars
              count={socialProof.count}
              label={socialProof.label}
              text={socialProof.text}
            />
          </div>

          {children ? (
            <div className="hero-enter hero-enter-delay-3 mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {children}
            </div>
          ) : null}
        </div>

        <PhoneFan left={phones.left} center={phones.center} right={phones.right} />
      </div>

      {featurePills && featurePills.length > 0 ? (
        <div className="plug-hero-feature-band hero-enter hero-enter-delay-4 relative z-10 mt-10 border-t border-emerald-100/80 bg-emerald-50/60 py-6 backdrop-blur-sm dark:border-white/10 dark:bg-black/25 md:py-7">
          <div className="container-modern">
            <FeaturePills items={featurePills} layout="band" />
          </div>
        </div>
      ) : null}
    </section>
  );
}

export function PlugHeroCtaPrimary({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-emerald-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:-translate-y-0.5 hover:bg-emerald-500"
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

export function PlugHeroCtaSecondary({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="hero-cta-secondary inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-full border border-emerald-200/90 bg-white/90 px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50 dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:border-white/35 dark:hover:bg-white/10 [&_svg]:shrink-0"
    >
      {children}
    </Link>
  );
}

export function PlugHeroCtaEmail({
  href,
  email,
  label = "Email support",
}: {
  href: string;
  email: string;
  label?: string;
}) {
  return (
    <Link href={href} className="hero-cta-email group">
      <span className="hero-cta-email-icon" aria-hidden>
        <Mail className="h-4 w-4" />
      </span>
      <span className="hero-cta-email-copy">
        <span className="hero-cta-email-label">{label}</span>
        <span className="hero-cta-email-address">{email}</span>
      </span>
      <ArrowRight className="hero-cta-email-arrow h-4 w-4 shrink-0" aria-hidden />
    </Link>
  );
}
