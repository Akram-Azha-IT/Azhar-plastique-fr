const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const test = require("node:test");
const ts = require("typescript");
function load(relative) {
  const module = { exports: {} };
  const compiled = ts.transpileModule(
    fs.readFileSync(path.join(__dirname, "..", relative), "utf8"),
    { compilerOptions: { module: ts.ModuleKind.CommonJS } },
  ).outputText;
  new Function("module", "exports", compiled)(module, module.exports);
  return module.exports;
}
const { resolveMaterialSelection } = load("src/lib/materialSelection.ts");
const { materials } = load("src/data/catalog.ts");

test("links from the homepage open the requested family", () => {
  assert.equal(resolveMaterialSelection(materials, "#commodite").code, "PE");
  assert.equal(
    resolveMaterialSelection(materials, "#plastiques-techniques").code,
    "PA6 / PA66",
  );
});
test("a direct technical material link opens the correct family and polymer", () => {
  const selected = resolveMaterialSelection(materials, "#tpv");
  assert.equal(selected.category, "plastiques-techniques");
  assert.equal(selected.code, "TPV");
});
test("PET commodity and technical polyesters retain distinct links", () => {
  assert.equal(
    resolveMaterialSelection(materials, "#pet").category,
    "commodite",
  );
  assert.equal(
    resolveMaterialSelection(materials, "#pbt-pet").category,
    "plastiques-techniques",
  );
});
test("empty and unrecognized fragments do not select an unrelated material", () => {
  assert.equal(resolveMaterialSelection(materials, ""), undefined);
  assert.equal(resolveMaterialSelection(materials, "#inconnu"), undefined);
});
