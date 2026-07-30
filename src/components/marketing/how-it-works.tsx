import type { LucideIcon } from "lucide-react";
import RevealOnScroll from "./reveal-on-scroll";

export type Step = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export default function HowItWorks({
  steps,
  compact = false,
}: {
  steps: Step[];
  compact?: boolean;
}) {
  return (
    <div className={`how-it-works ${compact ? "how-it-works-compact" : ""}`}>
      {steps.map((step, i) => {
        const Icon = step.icon;
        return (
          <RevealOnScroll key={step.title} delay={i * 100}>
            <div className="how-step">
              <div className="how-step-top">
                <span className="how-step-num">{String(i + 1).padStart(2, "0")}</span>
                <div className="how-step-icon">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="how-step-body">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          </RevealOnScroll>
        );
      })}
    </div>
  );
}
