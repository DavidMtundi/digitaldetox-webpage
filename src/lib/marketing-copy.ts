import type { StatBarItem } from "@/components/marketing/stat-bar";

/** Transformation-led copy shared across marketing surfaces. */

export const HOME_PROOF_STATS: StatBarItem[] = [
  { value: "Apps & sites", label: "Blocked together" },
  { value: "1 tap", label: "When willpower fades" },
  { value: "Hours back", label: "Each week, on average" },
  { value: "Every device", label: "Phone to TV" },
];

export const PRICING_TIER_TAGLINES = {
  starter: "Try the habit — core protection on every device",
  pro: "For people serious about their time",
  family: "A calmer home — without reading their messages",
} as const;

export const PLAN_TIER_SUBTITLES = {
  pro: "Finish what you start — deeper tools for your day",
  family: "Peaceful evenings across up to six devices",
} as const;
