import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("version 1 boundaries remain explicit", async () => {
  const product = await read("PRODUCT.md");

  assert.match(product, /No automatic cloud recognition/);
  assert.match(product, /No Windy integration/);
  assert.match(product, /No recorded or synthesized voice/);
});

test("the project records its visual source of truth", async () => {
  const design = await read("DESIGN.md");

  assert.match(design, /Atlas Swiatla/);
  assert.match(design, /design\/reference\/atlas-swiatla-mobile\.png/);
});

test("the public base path matches the repository", async () => {
  const config = await read("vite.config.mjs");

  assert.match(config, /base: "\/cloud-recognition\/"/);
});
