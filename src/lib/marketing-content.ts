import { MapPin, Shield, Smartphone, Zap } from "lucide-react";
import type { TrustBadge } from "@/components/marketing/trust-badges";

import { HOME_PROOF_STATS } from "@/lib/marketing-copy";

/** Shared proof strip — matches home page */
export const MARKETING_PROOF_STATS = HOME_PROOF_STATS;

export const MARKETING_TRUST_BADGES: TrustBadge[] = [
  { icon: Zap, label: "Evenings back on track" },
  { icon: Shield, label: "Rules that hold" },
  { icon: Smartphone, label: "Every device, one calm setup" },
];

export const ABOUT_TRUST_BADGES: TrustBadge[] = [
  { icon: MapPin, label: "Built in Kenya" },
  { icon: Shield, label: "Privacy-first" },
  { icon: Zap, label: "On-demand focus modes" },
];
