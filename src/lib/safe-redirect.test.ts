import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { resolveSafeRedirect } from "./safe-redirect";

describe("resolveSafeRedirect", () => {
  it("returns fallback when redirect is missing", () => {
    assert.equal(resolveSafeRedirect(null, "/dashboard"), "/dashboard");
    assert.equal(resolveSafeRedirect(undefined, "/dashboard"), "/dashboard");
    assert.equal(resolveSafeRedirect("", "/dashboard"), "/dashboard");
  });

  it("allows dashboard paths", () => {
    assert.equal(resolveSafeRedirect("/dashboard", "/"), "/dashboard");
    assert.equal(resolveSafeRedirect("/dashboard/payments", "/"), "/dashboard/payments");
  });

  it("allows pricing paths with query", () => {
    assert.equal(
      resolveSafeRedirect("/pricing?product=pauseward_pro_monthly", "/dashboard"),
      "/pricing?product=pauseward_pro_monthly",
    );
    assert.equal(
      resolveSafeRedirect("/pricing/success?reference=pw_abc", "/dashboard"),
      "/pricing/success?reference=pw_abc",
    );
  });

  it("blocks open redirects", () => {
    assert.equal(resolveSafeRedirect("//evil.com", "/dashboard"), "/dashboard");
    assert.equal(resolveSafeRedirect("https://evil.com", "/dashboard"), "/dashboard");
    assert.equal(resolveSafeRedirect("/evil", "/dashboard"), "/dashboard");
    assert.equal(resolveSafeRedirect("/admin", "/dashboard"), "/dashboard");
  });
});
