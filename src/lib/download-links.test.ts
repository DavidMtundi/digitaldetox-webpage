import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  DEFAULT_GOOGLE_PLAY,
  getEnvDownloadLinks,
  mergeDownloadLinks,
} from "./download-links";

describe("getEnvDownloadLinks", () => {
  it("defaults Android to the official Play Store listing", () => {
    const previous = process.env.NEXT_PUBLIC_DOWNLOAD_GOOGLE_PLAY;
    delete process.env.NEXT_PUBLIC_DOWNLOAD_GOOGLE_PLAY;

    try {
      const links = getEnvDownloadLinks();
      assert.equal(links.googlePlay, DEFAULT_GOOGLE_PLAY);
      assert.equal(links.androidTv, null);
    } finally {
      if (previous === undefined) {
        delete process.env.NEXT_PUBLIC_DOWNLOAD_GOOGLE_PLAY;
      } else {
        process.env.NEXT_PUBLIC_DOWNLOAD_GOOGLE_PLAY = previous;
      }
    }
  });
});

describe("mergeDownloadLinks", () => {
  it("keeps Android Play Store separate from Android TV", () => {
    const merged = mergeDownloadLinks(undefined, {
      googlePlay: DEFAULT_GOOGLE_PLAY,
      androidTv: null,
      appStore: null,
      windows: null,
      mac: null,
      web: null,
    });

    assert.equal(merged.googlePlay, DEFAULT_GOOGLE_PLAY);
    assert.equal(merged.androidTv, null);
  });
});
