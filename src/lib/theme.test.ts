import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { isThemePreference, resolveTheme } from "./theme";

describe("isThemePreference", () => {
  it("accepts light, dark, and system", () => {
    assert.equal(isThemePreference("light"), true);
    assert.equal(isThemePreference("dark"), true);
    assert.equal(isThemePreference("system"), true);
    assert.equal(isThemePreference("auto"), false);
    assert.equal(isThemePreference(null), false);
  });
});

describe("resolveTheme", () => {
  it("returns explicit preferences", () => {
    assert.equal(resolveTheme("light"), "light");
    assert.equal(resolveTheme("dark"), "dark");
  });
});
