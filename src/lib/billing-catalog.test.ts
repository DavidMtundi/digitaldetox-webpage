import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { FALLBACK_CATALOG_PRODUCTS } from "./billing";

describe("FALLBACK_CATALOG_PRODUCTS", () => {
  it("includes pro and family monthly and annual plans", () => {
    const ids = FALLBACK_CATALOG_PRODUCTS.map((p) => p.id);
    assert.ok(ids.includes("pauseward_pro_monthly"));
    assert.ok(ids.includes("pauseward_pro_annual"));
    assert.ok(ids.includes("pauseward_family_monthly"));
    assert.ok(ids.includes("pauseward_family_annual"));
  });

  it("has KES and USD prices for every product", () => {
    for (const product of FALLBACK_CATALOG_PRODUCTS) {
      assert.ok(product.prices.KES > 0, `${product.id} missing KES`);
      assert.ok(product.prices.USD > 0, `${product.id} missing USD`);
    }
  });
});
