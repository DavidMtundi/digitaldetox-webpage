import type { ReactNode } from "react";
import MediaFrame from "./media-frame";
import type { MarketingImage } from "@/lib/marketing-media";
import RevealOnScroll from "./reveal-on-scroll";

export type FeatureShowcaseItem = {
  label: string;
  title: string;
  description: string;
  proof?: string;
  image?: MarketingImage;
  media?: ReactNode;
};

export default function FeatureShowcase({ items }: { items: FeatureShowcaseItem[] }) {
  return (
    <div className="feature-showcase-stack space-y-16 md:space-y-24">
      {items.map((item, i) => {
        const reverse = i % 2 === 1;
        const media =
          item.media ??
          (item.image ? <MediaFrame image={item.image} aspect="phone" floating /> : null);

        return (
          <div
            key={item.label}
            className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
          >
            <RevealOnScroll className="min-w-0" delay={reverse ? 120 : 0}>
              <p className="feature-label">{item.label}</p>
              <h3 className="font-display mt-3 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
                {item.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-gray-600">{item.description}</p>
              {item.proof && (
                <p className="mt-4 text-sm font-medium text-emerald-700">{item.proof}</p>
              )}
            </RevealOnScroll>
            {media && (
              <RevealOnScroll className="min-w-0" delay={reverse ? 0 : 120} variant="scale">
                <div className="mx-auto max-w-[280px] lg:max-w-none">{media}</div>
              </RevealOnScroll>
            )}
          </div>
        );
      })}
    </div>
  );
}
