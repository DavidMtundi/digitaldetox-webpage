import { apiGet, isApiConfigured } from "@/lib/api-client";

export interface AccountDevice {
  id: string;
  platform: string;
  clientVersion?: string;
  timezone?: string;
  capabilities: string[];
  enforcementActive: boolean;
  lastSeenAt: string;
}

export interface BlocklistPolicy {
  id: string;
  name: string;
  revision: number;
  strictness?: string;
  blockedAppIds?: string[];
  blockedDomains?: string[];
  blockedAppCount: number;
  blockedDomainCount: number;
  updatedAt: string;
}

export interface DashboardOverview {
  deviceCount: number;
  policyCount: number;
  activeDevices: number;
  platforms: string[];
}

export function isAccountSyncConfigured(): boolean {
  return isApiConfigured();
}

export async function fetchDevices(): Promise<AccountDevice[]> {
  const data = await apiGet<{ items: AccountDevice[] }>("/v1/me/devices", true);
  return data.items;
}

export async function fetchPolicies(): Promise<BlocklistPolicy[]> {
  const data = await apiGet<{ items: BlocklistPolicy[] }>("/v1/me/policies", true);
  return data.items;
}

export async function getOverview(): Promise<DashboardOverview> {
  const [devices, policies] = await Promise.all([fetchDevices(), fetchPolicies()]);
  const platforms = [...new Set(devices.map((device) => device.platform))];

  return {
    deviceCount: devices.length,
    policyCount: policies.length,
    activeDevices: devices.filter((device) => device.enforcementActive).length,
    platforms,
  };
}
