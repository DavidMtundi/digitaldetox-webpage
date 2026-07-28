import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { ApiError } from "./api-client";

describe("ApiError", () => {
  it("stores status code on the error", () => {
    const err = new ApiError("Not found", 404);
    assert.equal(err.status, 404);
    assert.equal(err.message, "Not found");
    assert.equal(err.name, "ApiError");
  });
});
