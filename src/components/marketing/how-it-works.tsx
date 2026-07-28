import type { LucideIcon } from "lucide-react";

export type Step = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export default function HowItWorks({ steps }: { steps: Step[] }) {
  return (
    <div className="how-it-works">
      {steps.map((step, i) => {
        const Icon = step.icon;
        return (
          <div key={step.title} className="how-step reveal-up" style={{ animationDelay: `${i * 0.1}s` }}>
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
        );
      })}
    </div>
  );
}
