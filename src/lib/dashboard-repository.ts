import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  type DocumentData,
} from "firebase/firestore";
import { db } from "./firebase";

export interface DashboardDevice {
  id: string;
  platform: string;
  clientVersion?: string;
  timezone?: string;
  capabilities?: string[];
  lastSeenAt?: string;
  enforcementActive?: boolean;
}

export interface DashboardPolicy {
  id: string;
  name: string;
  revision: number;
  strictness?: string;
  blockedAppCount: number;
  blockedDomainCount: number;
}

export interface DashboardOverview {
  deviceCount: number;
  policyCount: number;
  activeDevices: number;
  platforms: string[];
}

function toIso(value: unknown): string | undefined {
  if (!value || typeof value !== "object") return undefined;
  if ("toDate" in value && typeof (value as { toDate: () => Date }).toDate === "function") {
    return (value as { toDate: () => Date }).toDate().toISOString();
  }
  return undefined;
}

export async function listDevices(accountId: string): Promise<DashboardDevice[]> {
  const snapshot = await getDocs(
    query(collection(db, "devices"), where("accountId", "==", accountId)),
  );

  return snapshot.docs.map((entry) => {
    const data = entry.data() as DocumentData;
    return {
      id: entry.id,
      platform: String(data.platform ?? "unknown"),
      clientVersion: data.clientVersion ? String(data.clientVersion) : undefined,
      timezone: data.timezone ? String(data.timezone) : undefined,
      capabilities: Array.isArray(data.capabilities)
        ? data.capabilities.map(String)
        : undefined,
      lastSeenAt: toIso(data.lastSeenAt),
      enforcementActive: data.enforcementActive === true,
    };
  });
}

export async function listPolicies(accountId: string): Promise<DashboardPolicy[]> {
  const snapshot = await getDocs(collection(db, "accounts", accountId, "policies"));

  return snapshot.docs.map((entry) => {
    const data = entry.data() as DocumentData;
    const blockedAppIds = Array.isArray(data.blockedAppIds) ? data.blockedAppIds : [];
    const blockedDomains = Array.isArray(data.blockedDomains) ? data.blockedDomains : [];
    return {
      id: entry.id,
      name: String(data.name ?? "Untitled blocklist"),
      revision: Number(data.revision ?? 1),
      strictness: data.strictness ? String(data.strictness) : undefined,
      blockedAppCount: blockedAppIds.length,
      blockedDomainCount: blockedDomains.length,
    };
  });
}

export async function getOverview(accountId: string): Promise<DashboardOverview> {
  const devices = await listDevices(accountId);
  const policies = await listPolicies(accountId);
  const platforms = [...new Set(devices.map((device) => device.platform))];

  return {
    deviceCount: devices.length,
    policyCount: policies.length,
    activeDevices: devices.filter((device) => device.enforcementActive).length,
    platforms,
  };
}

export async function getAccountProfile(accountId: string): Promise<{ email?: string }> {
  const snapshot = await getDoc(doc(db, "accounts", accountId));
  if (!snapshot.exists()) return {};
  const data = snapshot.data();
  return { email: data.email ? String(data.email) : undefined };
}
