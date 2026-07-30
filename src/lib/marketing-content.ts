import { Zap, Shield, Smartphone } from "lucide-react";
import type { StatBarItem } from "@/components/marketing/stat-bar";

/** Shared proof strip — matches home page */
export const MARKETING_PROOF_STATS: StatBarItem[] = [
  { value: "On demand", label: "Focus protection" },
  { value: "1 tap", label: "Focus modes" },
  { value: "5", label: "Platforms" },
  { value: "M-Pesa", label: "& card on web" },
];

export const MARKETING_TRUST_BADGES = [
  { icon: Zap, label: "On-demand focus modes" },
  { icon: Shield, label: "Blocking that holds" },
  { icon: Smartphone, label: "5 platforms available" },
] as const;
