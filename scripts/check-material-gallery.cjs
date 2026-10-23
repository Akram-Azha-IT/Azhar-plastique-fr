const fs = require("node:fs");
const assert = require("node:assert/strict");
const test = require("node:test");
const ts = require("typescript");
const moduleSource = ts.transpileModule(
  fs.readFileSync(
    require("node:path").join(__dirname, "../src/lib/materialGallery.ts"),
    "utf8",
  ),
  { compilerOptions: { module: ts.ModuleKind.CommonJS } },
).outputText;
const loaded = { exports: {} };
new Function("module", "exports", moduleSource)(loaded, loaded.exports);
const { getMaterialGalleryState: state, getMaterialGalleryStep: step } =
  loaded.exports;

test("overscroll at the leading edge keeps the previous control disabled", () => {
  assert.deepEqual(state([0, 300, 600], -20, 550), {
    index: 0,
    atStart: true,
    atEnd: false,
  });
});
test("the last panel is active when its start cannot align with the viewport", () => {
  assert.deepEqual(state([0, 300, 600], 550, 550), {
    index: 2,
    atStart: false,
    atEnd: true,
  });
});
test("native swipe updates the nearest panel", () => {
  assert.equal(state([0, 300, 600], 320, 550).index, 1);
});
test("a wide viewport with no overflow disables both controls", () => {
  assert.deepEqual(state([0, 300], 0, 0), {
    index: 0,
    atStart: true,
    atEnd: true,
  });
});
test("an empty rail remains safe", () => {
  assert.deepEqual(state([], 0, 0), { index: 0, atStart: true, atEnd: true });
});

test("previous moves back from the end even when two panels are visible", () => {
  assert.equal(step([0, 300, 600, 900], 550, -1, 550), 250);
});
test("step controls stay within both ends of the rail", () => {
  assert.equal(step([0, 300, 600], 500, 1, 550), 550);
  assert.equal(step([0, 300, 600], 0, -1, 550), 0);
  assert.equal(step([0], 0, 1, 0), 0);
});
