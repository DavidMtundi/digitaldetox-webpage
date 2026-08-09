import Link from "next/link";
import { ArrowRight, Ban } from "lucide-react";
import RevealOnScroll from "@/components/marketing/reveal-on-scroll";
import {
  ABOUT_VALUE_CARDS,
  VALUES_COMMITMENTS,
  VALUES_STORY,
  type ValueAccent,
} from "@/lib/about-content";

const ACCENT_CLASS: Record<ValueAccent, string> = {
  emerald: "about-values-card--emerald",
  rose: "about-values-card--rose",
  teal: "about-values-card--teal",
};

export default function AboutValuesSection() {
  return (
    <div className="about-values">
      <RevealOnScroll>
        <div className="about-values-panel">
          <div className="about-values-glow" aria-hidden />

          <div className="about-values-inner">
            <div className="about-values-header">
              <p className="about-values-eyebrow">{VALUES_STORY.eyebrow}</p>
              <h2 className="about-values-title">{VALUES_STORY.title}</h2>
              <p className="about-values-subtitle">{VALUES_STORY.subtitle}</p>
              <p className="about-values-promise">{VALUES_STORY.promise}</p>
            </div>

            <div className="about-values-grid">
              {ABOUT_VALUE_CARDS.map((value, i) => {
                const Icon = value.icon;
                return (
                  <article
                    key={value.title}
                    className={`about-values-card ${ACCENT_CLASS[value.accent]}`}
                  >
                    <span className="about-values-card-step" aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="about-values-card-icon" aria-hidden>
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="about-values-card-title">{value.title}</h3>
                    <p className="about-values-card-body">{value.description}</p>
                    <ul className="about-values-card-tags" aria-label={`${value.title} examples`}>
                      {value.examples.map((example) => (
                        <li key={example}>{example}</li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>

            <div className="about-values-commitments">
              <div className="about-values-commitments-label">
                <Ban className="h-4 w-4 shrink-0" aria-hidden />
                <span>What we&apos;ll never build</span>
              </div>
              <ul className="about-values-commitments-list">
                {VALUES_COMMITMENTS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="about-values-footer">
              <p>See how these values shape the product.</p>
              <Link href="#problem" className="about-values-link">
                Why we built Pauseward
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  );
}
