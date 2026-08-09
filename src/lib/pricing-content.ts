import {
  BarChart3,
  CalendarClock,
  CreditCard,
  RefreshCw,
  Shield,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { TrustBadge } from "@/components/marketing/trust-badges";

export type PlanCell = boolean | string;

export type PlanComparisonRow = {
  name: string;
  starter: PlanCell;
  pro: PlanCell;
  family: PlanCell;
  highlight?: boolean;
};

export type PlanComparisonGroup = {
  category: string;
  rows: PlanComparisonRow[];
};

export type UnlockSpotlight = {
  id: string;
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  proof: string;
  media: "blocking" | "analytics" | "family";
  accent: "emerald" | "teal" | "rose";
};

export const STARTER_FEATURES = [
  "Basic app & website blocking",
  "Focus modes",
  "Usage insights",
  "Cross-device sync",
] as const;

export const PRO_FEATURES = [
  "Advanced blocking & schedules",
  "Daily usage limits",
  "Deeper analytics & trends",
  "Sync across devices",
  "Priority support",
] as const;

export const FAMILY_EXTRA_FEATURES = ["Family dashboard", "Shared policies"] as const;

export const PRICING_TRUST_BADGES: TrustBadge[] = [
  { icon: CreditCard, label: "M-Pesa & card" },
  { icon: RefreshCw, label: "Cancel anytime" },
  { icon: Shield, label: "Paystack secure" },
];

export const PRO_UNLOCK_SPOTLIGHTS: UnlockSpotlight[] = [
  {
    id: "schedules",
    icon: CalendarClock,
    label: "Schedules",
    title: "Evenings that end when you choose",
    description:
      "Block distractions during work, study, and wind-down — not all day. Set recurring windows and limits that match the life you want.",
    proof: "Pro & Family",
    media: "blocking",
    accent: "emerald",
  },
  {
    id: "analytics",
    icon: BarChart3,
    label: "Analytics",
    title: "Habits you can actually see improving",
    description:
      "Spot peak distraction hours, measure whether your boundaries work, and celebrate streaks — not just screen-time totals.",
    proof: "Pro & Family",
    media: "analytics",
    accent: "teal",
  },
  {
    id: "family",
    icon: Users,
    label: "Family",
    title: "A calmer home without hovering",
    description:
      "Manage up to six devices from one place — shared policies and parent PIN protection, without reading anyone's messages.",
    proof: "Family only",
    media: "family",
    accent: "rose",
  },
];

export const PLAN_COMPARISON: PlanComparisonGroup[] = [
  {
    category: "Core — free on Starter",
    rows: [
      { name: "App & website blocking", starter: true, pro: true, family: true },
      { name: "Focus modes", starter: true, pro: true, family: true },
      { name: "Usage insights", starter: true, pro: true, family: true },
      { name: "Cross-device sync", starter: true, pro: true, family: true },
      { name: "All 5 platforms", starter: true, pro: true, family: true },
    ],
  },
  {
    category: "Pro upgrades",
    rows: [
      { name: "Advanced schedules", starter: false, pro: true, family: true, highlight: true },
      { name: "Daily usage limits", starter: false, pro: true, family: true, highlight: true },
      { name: "Deep analytics & trends", starter: false, pro: true, family: true, highlight: true },
      { name: "Priority support", starter: false, pro: true, family: true },
    ],
  },
  {
    category: "Family extras",
    rows: [
      { name: "Family dashboard", starter: false, pro: false, family: true, highlight: true },
      { name: "Shared policies", starter: false, pro: false, family: true, highlight: true },
      { name: "Devices covered", starter: "1", pro: "1", family: "Up to 6" },
    ],
  },
];

export const PRICING_FAQ = [
  {
    id: "starter",
    q: "Is Starter really free?",
    a: "Yes. Download on any platform for core blocking, focus modes, and basic insights. Pro and Family add advanced schedules, deeper analytics, and family tools — upgrade only when you need them.",
  },
  {
    id: "mpesa",
    q: "How do I pay with M-Pesa?",
    a: "Sign in, pick a plan, and complete checkout via Paystack. You'll receive an STK push on your phone. Keep your checkout reference if you need help.",
  },
  {
    id: "renewal",
    q: "How do M-Pesa renewals work?",
    a: "M-Pesa subscriptions require manual approval each billing cycle. We'll remind you before expiry so you can renew — no surprise charges.",
  },
  {
    id: "cancel",
    q: "Can I cancel anytime?",
    a: "Yes. Cancel from the web dashboard. You keep access through the end of your billing period.",
  },
  {
    id: "refund",
    q: "What about refunds?",
    a: "Refunds depend on where you purchased (Paystack, Google Play, or App Store). Email us with your payment reference and we'll review your case.",
  },
  {
    id: "family",
    q: "How does the Family plan work?",
    a: "Family covers up to six devices with a shared dashboard and policies. Great for households — each person gets focus protection without sharing passwords.",
  },
] as const;
