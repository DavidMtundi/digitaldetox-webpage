import Link from "next/link";
import { ArrowRight, MapPin, Shield, Smartphone } from "lucide-react";
import MediaFrame from "@/components/marketing/media-frame";
import RevealOnScroll from "@/components/marketing/reveal-on-scroll";
import { MISSION_PILLARS, MISSION_SIGNALS, MISSION_STORY } from "@/lib/about-content";
import { marketingMedia } from "@/lib/marketing-media";

const SIGNAL_ICONS = [MapPin, Shield, Smartphone] as const;

export default function AboutMissionSection() {
  return (
    <div className="about-mission">
      <RevealOnScroll>
        <div className="about-mission-panel">
          <div className="about-mission-glow" aria-hidden />

          <div className="about-mission-inner">
            <div className="about-mission-hero">
              <div className="about-mission-copy">
                <p className="about-mission-eyebrow">{MISSION_STORY.eyebrow}</p>
                <h2 className="about-mission-title">{MISSION_STORY.title}</h2>
                <p className="about-mission-lead">{MISSION_STORY.lead}</p>

                <div className="about-mission-story">
                  {MISSION_STORY.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                  ))}
                </div>

                <ul className="about-mission-signals" aria-label="Mission highlights">
                  {MISSION_SIGNALS.map((signal, i) => {
                    const Icon = SIGNAL_ICONS[i] ?? Shield;
                    return (
                      <li key={signal.label} className="about-mission-signal">
                        <Icon className="h-4 w-4 shrink-0" aria-hidden />
                        <span>
                          <strong>{signal.label}</strong>
                          <span className="about-mission-signal-detail"> · {signal.detail}</span>
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <div className="about-mission-cta-row">
                  <Link href="/download" className="about-mission-cta-primary">
                    Get the app
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <Link href="#values" className="about-mission-cta-secondary">
                    Our values
                  </Link>
                </div>
              </div>

              <div className="about-mission-visual">
                <MediaFrame
                  image={marketingMedia.about}
                  aspect="wide"
                  className="about-mission-visual-wide"
                />
                <div className="about-mission-visual-phone">
                  <MediaFrame image={marketingMedia.hero.image} aspect="phone" floating />
                </div>
                <p className="about-mission-visual-caption">
                  Focus tools for real routines — not idealized digital-detox fantasies.
                </p>
              </div>
            </div>

            <div className="about-mission-pillars-grid">
              {MISSION_PILLARS.map((pillar, i) => {
                const Icon = pillar.icon;
                return (
                  <article key={pillar.title} className="about-mission-pillar-card">
                    <span className="about-mission-pillar-step" aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="about-mission-pillar-icon" aria-hidden>
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="about-mission-pillar-title">{pillar.title}</h3>
                    <p className="about-mission-pillar-body">{pillar.description}</p>
                  </article>
                );
              })}
            </div>

            <blockquote className="about-mission-quote-band">
              <p>&ldquo;{MISSION_STORY.quote}&rdquo;</p>
              <footer>— {MISSION_STORY.quoteAttribution}</footer>
            </blockquote>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  );
}
