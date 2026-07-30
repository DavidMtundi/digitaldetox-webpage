import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Globe } from "lucide-react";
import FocusBackground from "./focus-background";
import SocialProofAvatars from "./social-proof-avatars";
import PhoneFan from "./phone-fan";
import FeaturePills from "./feature-pills";
import type { MarketingImage } from "@/lib/marketing-media";

type PlugStyleHeroProps = {
  /** Optional eyebrow pill above the title — omit when not needed */
  badge?: string;
  title: ReactNode;
  phones: { left: MarketingImage; center: MarketingImage; right: MarketingImage };
  socialProof: { count?: string; label?: string; text?: string };
  featurePills?: string[];
  children?: ReactNode;
};

export default function PlugStyleHero({
  badge,
  title,
  phones,
  socialProof,
  featurePills,
  children,
}: PlugStyleHeroProps) {
  return (
    <section className="plug-hero relative overflow-hidden pb-8 md:pb-12">
      <FocusBackground variant="plug-dark" />
      <div className="plug-hero-watermark font-display" aria-hidden>Pauseward</div>

      <div className="container-modern relative z-10 pt-24 sm:pt-28 md:pt-32 lg:pt-36">
        <div className="mx-auto max-w-4xl text-center">
          {badge ? (
            <div className="hero-enter inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-gray-300 backdrop-blur-sm">
              <Globe className="h-3.5 w-3.5 text-emerald-400" aria-hidden />
              {badge}
            </div>
          ) : null}

          <h1
            className={`hero-enter hero-enter-delay-1 font-display font-bold leading-[1.08] tracking-tight text-white md:text-5xl lg:text-[3.75rem] lg:leading-[1.06] ${
              badge ? "mt-8 text-[2.5rem]" : "mt-4 text-[2.5rem]"
            }`}
          >
            {title}
          </h1>

          <div className="hero-enter hero-enter-delay-2 mt-8 flex justify-center">
            <SocialProofAvatars
              count={socialProof.count}
              label={socialProof.label}
              text={socialProof.text}
            />
          </div>

          {children && (
            <div className="hero-enter hero-enter-delay-3 mt-8 flex flex-wrap items-center justify-center gap-4">
              {children}
            </div>
          )}
        </div>

        <PhoneFan left={phones.left} center={phones.center} right={phones.right} />
      </div>

      {featurePills && featurePills.length > 0 && (
        <div className="hero-enter hero-enter-delay-4 relative z-10 mt-10 border-t border-white/10 bg-black/25 py-6 backdrop-blur-sm md:py-7">
          <div className="container-modern">
            <FeaturePills items={featurePills} tone="dark" layout="band" />
          </div>
        </div>
      )}
    </section>
  );
}

export function PlugHeroCtaPrimary({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-emerald-500 px-7 py-3 text-sm font-semibold text-gray-950 shadow-lg shadow-emerald-500/25 transition hover:-translate-y-0.5 hover:bg-emerald-400"
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
      className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/10"
    >
      {children}
    </Link>
  );
}
