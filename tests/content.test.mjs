import assert from "node:assert/strict";
import test from "node:test";
import { clouds } from "../src/data/clouds.js";
import { calculatePlacement } from "../src/lib/placement.js";

test("the atlas contains exactly the ten WMO cloud genera", () => {
  assert.equal(clouds.length, 10);
  assert.deepEqual(
    clouds.map((cloud) => cloud.name).sort(),
    [
      "Altocumulus",
      "Altostratus",
      "Cirrocumulus",
      "Cirrostratus",
      "Cirrus",
      "Cumulonimbus",
      "Cumulus",
      "Nimbostratus",
      "Stratocumulus",
      "Stratus",
    ],
  );
});

test("each cloud record exposes evidence, taxonomy, sources and image provenance", () => {
  for (const cloud of clouds) {
    assert.ok(cloud.observe.length >= 3, `${cloud.name} needs observable evidence`);
    assert.ok(Array.isArray(cloud.species));
    assert.ok(Array.isArray(cloud.varieties));
    assert.ok(Array.isArray(cloud.features));
    assert.ok(cloud.sourceIds.includes("wmoAtlas"));
    assert.match(cloud.image.page, /^https:\/\/commons\.wikimedia\.org\//);
    assert.ok(cloud.image.license);
    assert.doesNotMatch(cloud.image.src, /^\//, `${cloud.name} must respect the Vite base path`);
  }
});

test("placement routes beginners, intermediate learners and experienced users differently", () => {
  assert.equal(calculatePlacement([0, 0, 0, 0, 0]).moduleId, "obserwacja");
  assert.equal(calculatePlacement([1, 1, 1, 1, 1]).moduleId, "procesy");
  assert.equal(calculatePlacement([2, 2, 2, 2, 2]).moduleId, "lotnictwo");
});
