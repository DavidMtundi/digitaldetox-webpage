"use client";

import { Fragment, useState } from "react";
import { Check, Minus } from "lucide-react";
import MediaFrame from "@/components/marketing/media-frame";
import RevealOnScroll from "@/components/marketing/reveal-on-scroll";
import { marketingMedia } from "@/lib/marketing-media";
import {
  PLAN_COMPARISON,
  PRO_UNLOCK_SPOTLIGHTS,
  type PlanCell,
  type UnlockSpotlight,
} from "@/lib/pricing-content";

const SPOTLIGHT_MEDIA = {
  blocking: marketingMedia.features[0],
  analytics: marketingMedia.features[1],
  family: marketingMedia.parents,
} as const;

const ACCENT_RING: Record<UnlockSpotlight["accent"], string> = {
  emerald: "pricing-spotlight-tab--emerald",
  teal: "pricing-spotlight-tab--teal",
  rose: "pricing-spotlight-tab--rose",
};

export default function PricingUnlockSection() {
  const [activeId, setActiveId] = useState(PRO_UNLOCK_SPOTLIGHTS[0].id);
  const active = PRO_UNLOCK_SPOTLIGHTS.find((item) => item.id === activeId) ?? PRO_UNLOCK_SPOTLIGHTS[0];

  return (
    <div className="pricing-unlock">
      <RevealOnScroll>
        <div className="pricing-spotlight-panel">
          <div className="pricing-spotlight-glow" aria-hidden />
          <div className="pricing-spotlight-inner">
            <div className="pricing-spotlight-copy">
              <p className="pricing-spotlight-eyebrow">See the difference</p>
              <div className="pricing-spotlight-tabs" role="tablist" aria-label="Pro features">
                {PRO_UNLOCK_SPOTLIGHTS.map((item) => {
                  const Icon = item.icon;
                  const selected = item.id === activeId;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      className={`pricing-spotlight-tab ${ACCENT_RING[item.accent]} ${
                        selected ? "pricing-spotlight-tab--active" : ""
                      }`}
                      onClick={() => setActiveId(item.id)}
                    >
                      <span className="pricing-spotlight-tab-icon">
                        <Icon className="h-4 w-4" aria-hidden />
                      </span>
                      <span className="pricing-spotlight-tab-label">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="pricing-spotlight-detail" role="tabpanel">
                <h3 className="pricing-spotlight-title">{active.title}</h3>
                <p className="pricing-spotlight-description">{active.description}</p>
                <span className="pricing-spotlight-proof">{active.proof}</span>
              </div>
            </div>

            <div className="pricing-spotlight-media">
              <MediaFrame
                key={active.id}
                image={SPOTLIGHT_MEDIA[active.media]}
                aspect="phone"
                floating
                className="pricing-spotlight-phone"
              />
            </div>
          </div>
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <div className="pricing-comparison">
          <div className="pricing-comparison-header">
            <h3 className="pricing-comparison-title">Compare plans at a glance</h3>
            <p className="pricing-comparison-subtitle">
              Starter is free forever. Upgrade only when you need the tools below.
            </p>
          </div>

          <div className="pricing-comparison-scroll">
            <table className="pricing-comparison-table">
              <thead>
                <tr>
                  <th scope="col" className="pricing-comparison-feature-col">
                    Feature
                  </th>
                  <th scope="col" className="pricing-comparison-plan-col">
                    Starter
                  </th>
                  <th scope="col" className="pricing-comparison-plan-col pricing-comparison-plan-col--pro">
                    Pro
                  </th>
                  <th scope="col" className="pricing-comparison-plan-col pricing-comparison-plan-col--family">
                    Family
                  </th>
                </tr>
              </thead>
              <tbody>
                {PLAN_COMPARISON.map((group) => (
                  <Fragment key={group.category}>
                    <tr className="pricing-comparison-category">
                      <th colSpan={4} scope="colgroup">
                        {group.category}
                      </th>
                    </tr>
                    {group.rows.map((row) => (
                      <tr
                        key={row.name}
                        className={row.highlight ? "pricing-comparison-row--highlight" : undefined}
                      >
                        <th scope="row" className="pricing-comparison-feature-name">
                          {row.name}
                        </th>
                        <td>
                          <PlanCellValue value={row.starter} />
                        </td>
                        <td>
                          <PlanCellValue value={row.pro} />
                        </td>
                        <td>
                          <PlanCellValue value={row.family} />
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  );
}

function PlanCellValue({ value }: { value: PlanCell }) {
  if (value === true) {
    return (
      <span className="pricing-comparison-check" aria-label="Included">
        <Check className="h-4 w-4" aria-hidden />
      </span>
    );
  }

  if (value === false) {
    return (
      <span className="pricing-comparison-dash" aria-label="Not included">
        <Minus className="h-4 w-4" aria-hidden />
      </span>
    );
  }

  return <span className="pricing-comparison-text">{value}</span>;
}
