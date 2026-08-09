import {
  BookOpen,
  Brain,
  Clock,
  Heart,
  Moon,
  Shield,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ValueAccent = "emerald" | "rose" | "teal";

export const MISSION_PILLARS = [
  {
    icon: Shield,
    title: "Boundaries that hold",
    description: "Blocking and schedules that work in real life — not wishful thinking.",
  },
  {
    icon: Sparkles,
    title: "Pause, don't punish",
    description: "Gentle nudges and focus modes — no guilt trips or shame loops.",
  },
  {
    icon: Users,
    title: "Built for everyone",
    description: "Individuals, students, parents, and teams across Kenya and worldwide.",
  },
] as const;

export const MISSION_STORY = {
  eyebrow: "Mission",
  title: "Technology should serve you",
  lead: "Pauseward puts you back in control — intentional use, not endless autopilot.",
  paragraphs: [
    "We started with a frustration we kept seeing everywhere: phones designed to pull attention, and willpower apps that collapse the moment life gets busy.",
    "Our answer isn't another streak counter or shame screen. It's blocking that holds, focus modes you can turn on in one tap, and tools that fit how people in Kenya and worldwide actually use their devices.",
  ],
  quote: "A healthier relationship with technology starts with one intentional pause.",
  quoteAttribution: "The Pauseward team",
} as const;

export const MISSION_SIGNALS = [
  { label: "Kenya-born", detail: "Built for local needs" },
  { label: "Privacy-first", detail: "We don't read your messages" },
  { label: "5 platforms", detail: "One synced account" },
] as const;

export const VALUES_STORY = {
  eyebrow: "Values",
  title: "What we stand for",
  subtitle: "Every feature we ship is weighed against these principles — not engagement metrics.",
  promise: "If a feature doesn't pass these tests, it doesn't ship.",
} as const;

export const ABOUT_VALUE_CARDS: Array<{
  icon: LucideIcon;
  title: string;
  description: string;
  accent: ValueAccent;
  examples: string[];
}> = [
  {
    icon: Shield,
    title: "Protect your focus",
    description: "Block distractions during the moments that matter most — work, study, family time, and rest.",
    accent: "emerald",
    examples: ["Work & study", "Family time", "Evening wind-down"],
  },
  {
    icon: Heart,
    title: "Improve wellbeing",
    description: "Sleep better, scroll less, and reconnect with life offline — without shame or streak anxiety.",
    accent: "rose",
    examples: ["Better sleep", "Less doomscrolling", "Offline time"],
  },
  {
    icon: Target,
    title: "Build better habits",
    description: "Track patterns over time and change your relationship with tech through small, sustainable shifts.",
    accent: "teal",
    examples: ["Usage trends", "Daily limits", "Focus modes"],
  },
];

export const VALUES_COMMITMENTS = [
  "No guilt-trip streaks",
  "No reading your messages",
  "No dark-pattern upsells",
] as const;

export const PROBLEM_IMPACTS = [
  {
    icon: Brain,
    title: "Better focus",
    description: "Eliminate noise and concentrate on what counts.",
  },
  {
    icon: Clock,
    title: "More time",
    description: "Reclaim hours lost to endless notifications and feeds.",
  },
  {
    icon: Moon,
    title: "Better sleep",
    description: "Evening modes that protect your rest from late-night scrolling.",
  },
] as const;

export const APPROACH_ITEMS: Array<{
  icon: LucideIcon;
  title: string;
  description: string;
  accent: "emerald" | "teal";
}> = [
  {
    icon: BookOpen,
    title: "Research-based design",
    description:
      "Grounded in behavioral psychology and habit formation — not dark patterns, streak anxiety, or guilt trips.",
    accent: "emerald",
  },
  {
    icon: Users,
    title: "Community-shaped shipping",
    description:
      "We build what people need in daily life — M-Pesa billing, on-demand focus modes, and flexible block schedules.",
    accent: "teal",
  },
];

export const PROBLEM_STAT = {
  value: "96",
  unit: "phone checks",
  period: "per day",
  context: "Roughly once every 10 minutes while awake — often without a clear reason.",
  source: "RescueTime research",
};
