import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/marketing/section-header";
import RevealOnScroll from "@/components/marketing/reveal-on-scroll";
import { APPROACH_ITEMS } from "@/lib/about-content";

const ACCENT_ICON: Record<string, string> = {
  emerald: "about-approach-icon--emerald",
  teal: "about-approach-icon--teal",
};

export default function AboutApproachSection() {
  return (
    <div className="about-approach">
      <div className="mesh-section-header">
        <SectionHeader
          eyebrow="Approach"
          title="Research-led, community-shaped"
          subtitle="Science informs our features. Real daily use shapes what we ship."
        />
      </div>

      <div className="about-approach-grid">
        {APPROACH_ITEMS.map((item, i) => {
          const Icon = item.icon;
          return (
            <RevealOnScroll key={item.title} delay={i * 90} variant="scale">
              <article className="about-approach-card">
                <span className={`about-approach-icon ${ACCENT_ICON[item.accent]}`} aria-hidden>
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="about-approach-card-title type-card-title">{item.title}</h3>
                <p className="about-approach-card-body">{item.description}</p>
              </article>
            </RevealOnScroll>
          );
        })}
      </div>

      <RevealOnScroll delay={180}>
        <div className="about-approach-footer">
          <p>Have feedback or a feature idea?</p>
          <Link href="/contact" className="about-approach-link">
            Tell us what you need
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </RevealOnScroll>
    </div>
  );
}
