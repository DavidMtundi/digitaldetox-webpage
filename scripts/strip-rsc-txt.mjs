#!/usr/bin/env node
/**
 * Next.js static export writes RSC flight payloads as index.txt beside each route.
 * They must not be deployed — browsers can open them directly and expose raw payload.
 */
import { readdir, unlink, stat } from "node:fs/promises";
import path from "node:path";

const OUT_DIR = path.resolve(process.cwd(), "out");

async function walk(dir) {
  let removed = 0;
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      removed += await walk(fullPath);
      continue;
    }
    if (entry.isFile() && entry.name === "index.txt") {
      await unlink(fullPath);
      removed += 1;
      console.log(`removed ${path.relative(OUT_DIR, fullPath)}`);
    }
  }

  return removed;
}

async function main() {
  try {
    await stat(OUT_DIR);
  } catch {
    console.error("strip-rsc-txt: out/ not found — run next build first");
    process.exit(1);
  }

  const removed = await walk(OUT_DIR);
  console.log(`strip-rsc-txt: removed ${removed} index.txt file(s)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
