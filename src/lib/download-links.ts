export type DownloadLinkKey = "googlePlay" | "androidTv" | "appStore" | "mac" | "windows" | "web";

export interface DownloadLinksConfig {
  googlePlay: string;
  androidTv: string | null;
  appStore: string | null;
  windows: string | null;
  mac: string | null;
  web: string | null;
}

export const EMPTY_DOWNLOAD_LINKS: DownloadLinksConfig = {
  googlePlay: "",
  androidTv: null,
  appStore: null,
  windows: null,
  mac: null,
  web: null,
};

/** Official Android listing; used when env/Firestore do not override. */
export const DEFAULT_GOOGLE_PLAY =
  "https://play.google.com/store/apps/details?id=com.davidmtundi.digitaldetox&pcampaignid=web_share";

function readEnvLink(key: string): string | null {
  const value = process.env[key]?.trim();
  return value || null;
}

/** Static download URLs from NEXT_PUBLIC_* env (set in .env.local). */
export function getEnvDownloadLinks(): DownloadLinksConfig {
  const googlePlay = readEnvLink("NEXT_PUBLIC_DOWNLOAD_GOOGLE_PLAY") ?? DEFAULT_GOOGLE_PLAY;
  const androidTvDedicated = readEnvLink("NEXT_PUBLIC_DOWNLOAD_ANDROID_TV");

  return {
    googlePlay,
    androidTv: androidTvDedicated,
    appStore: readEnvLink("NEXT_PUBLIC_DOWNLOAD_APP_STORE"),
    windows: readEnvLink("NEXT_PUBLIC_DOWNLOAD_WINDOWS"),
    mac: readEnvLink("NEXT_PUBLIC_DOWNLOAD_MAC"),
    web: readEnvLink("NEXT_PUBLIC_DOWNLOAD_WEB"),
  };
}

function pickLink(firestoreValue: string | null | undefined, envValue: string | null): string | null {
  if (typeof firestoreValue === "string" && firestoreValue.trim()) {
    return firestoreValue.trim();
  }
  if (envValue?.trim()) {
    return envValue.trim();
  }
  return null;
}

/** Firestore values win when set; otherwise fall back to env. */
export function mergeDownloadLinks(
  firestore: Partial<DownloadLinksConfig> | undefined,
  env: DownloadLinksConfig = getEnvDownloadLinks(),
): DownloadLinksConfig {
  return {
    googlePlay: pickLink(firestore?.googlePlay, env.googlePlay) ?? "",
    androidTv: pickLink(firestore?.androidTv, env.androidTv),
    appStore: pickLink(firestore?.appStore, env.appStore),
    windows: pickLink(firestore?.windows, env.windows),
    mac: pickLink(firestore?.mac, env.mac),
    web: pickLink(firestore?.web, env.web),
  };
}
