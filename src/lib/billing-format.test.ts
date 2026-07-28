import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { displayPrice, formatPrice } from "./billing-format";

describe("displayPrice", () => {
  it("formats KES in shillings", () => {
    assert.equal(displayPrice({ KES: 399, USD: 499 }, "KES"), "KSh 399");
  });

  it("formats USD from cents", () => {
    assert.equal(displayPrice({ KES: 399, USD: 499 }, "USD"), "$4.99");
  });

  it("returns em dash when currency missing", () => {
    assert.equal(displayPrice({ KES: 399 }, "USD"), "—");
  });
});

describe("formatPrice", () => {
  it("formats KES major units", () => {
    assert.equal(formatPrice(399, "KES"), "KSh 399");
  });

  it("formats USD from minor units in formatPrice", () => {
    assert.equal(formatPrice(499, "USD"), "$4.99");
  });
});
