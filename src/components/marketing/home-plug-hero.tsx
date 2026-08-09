"use client";

import { useEffect, useState } from "react";
import PlugStyleHero, {
  PlugHeroCtaPrimary,
  PlugHeroCtaSecondary,
} from "@/components/marketing/plug-style-hero";
import {
  DEFAULT_HOME_HERO,
  pickHomeHeroCopy,
  type HomeHeroVariant,
} from "@/lib/home-hero-copy";
import { marketingMedia } from "@/lib/marketing-media";

function HeroHeadline({ variant }: { variant: HomeHeroVariant }) {
  return (
    <>
      {variant.line1}
      <br />
      <span className="text-emerald-400">{variant.accent}</span>
    </>
  );
}

export default function HomePlugHero() {
  const [hero, setHero] = useState<HomeHeroVariant>(DEFAULT_HOME_HERO);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const variant = pickHomeHeroCopy();
    setHero(variant);
    setReady(true);
  }, []);

  return (
    <PlugStyleHero
      title={
        <span
          className={`inline-block transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-90"}`}
          suppressHydrationWarning
        >
          <HeroHeadline variant={hero} />
        </span>
      }
      phones={{
        left: marketingMedia.features[0],
        center: marketingMedia.hero.image,
        right: marketingMedia.features[1],
      }}
      socialProof={{
        text: hero.socialProof,
      }}
    >
      <PlugHeroCtaPrimary href="#download">{hero.ctaPrimary}</PlugHeroCtaPrimary>
      <PlugHeroCtaSecondary href="/pricing">View pricing</PlugHeroCtaSecondary>
    </PlugStyleHero>
  );
}
