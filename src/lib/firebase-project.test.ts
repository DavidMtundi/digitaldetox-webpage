import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");

describe("Firebase project lock-in", () => {
  it("defaults Hosting and CLI to digitaldetox-app only", () => {
    const rc = JSON.parse(readFileSync(join(root, ".firebaserc"), "utf8"));
    assert.equal(rc.projects.default, "digitaldetox-app");
    assert.equal(rc.projects.detoxifyblocker, undefined);

    const firebase = JSON.parse(readFileSync(join(root, "firebase.json"), "utf8"));
    assert.equal(firebase.hosting.site, "digitaldetox-app");
    assert.equal(firebase.firestore, undefined);

    const workflow = readFileSync(
      join(root, ".github/workflows/deploy-hosting.yml"),
      "utf8",
    );
    assert.match(workflow, /projectId:\s*digitaldetox-app/);
    assert.doesNotMatch(workflow, /projectId:\s*detoxifyblocker/);
  });
});
