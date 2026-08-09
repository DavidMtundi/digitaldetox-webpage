import SectionHeader from "@/components/marketing/section-header";
import RevealOnScroll from "@/components/marketing/reveal-on-scroll";
import { PROBLEM_IMPACTS, PROBLEM_STAT } from "@/lib/about-content";

export default function AboutProblemSection() {
  return (
    <div className="about-problem">
      <div className="mesh-section-header">
        <SectionHeader
          eyebrow="The problem"
          title="96 phone checks per day"
          subtitle="The average person reaches for their phone 96 times daily. Pauseward helps you take that number down."
        />
      </div>

      <RevealOnScroll>
        <div className="about-problem-stat-panel">
          <div className="about-problem-stat-glow" aria-hidden />
          <div className="about-problem-stat-inner">
            <p className="about-problem-stat-eyebrow">The average person</p>
            <div className="about-problem-stat-value-wrap">
              <span className="about-problem-stat-value">{PROBLEM_STAT.value}</span>
              <div className="about-problem-stat-meta">
                <span className="about-problem-stat-unit">{PROBLEM_STAT.unit}</span>
                <span className="about-problem-stat-period">{PROBLEM_STAT.period}</span>
              </div>
            </div>
            <p className="about-problem-stat-context">{PROBLEM_STAT.context}</p>
            <p className="about-problem-stat-source">Source: {PROBLEM_STAT.source}</p>
          </div>
        </div>
      </RevealOnScroll>

      <div className="about-problem-grid">
        {PROBLEM_IMPACTS.map((item, i) => {
          const Icon = item.icon;
          return (
            <RevealOnScroll key={item.title} delay={80 + i * 70} variant="scale">
              <article className="about-problem-card glass-card">
                <span className="about-problem-card-icon" aria-hidden>
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="about-problem-card-title type-card-title">{item.title}</h3>
                <p className="about-problem-card-body">{item.description}</p>
              </article>
            </RevealOnScroll>
          );
        })}
      </div>
    </div>
  );
}
