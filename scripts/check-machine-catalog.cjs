const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const test = require("node:test");
const ts = require("typescript");
function load(relative) {
  const module = { exports: {} };
  const source = fs.readFileSync(path.join(__dirname, "..", relative), "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  new Function("module", "exports", compiled)(module, module.exports);
  return module.exports;
}
const { filterInjectionGroups, normalizeModelQuery } = load(
  "src/lib/catalogFilters.ts",
);
const { injectionModelGroups } = load("src/data/machineFamilies.ts");
const models = (groups) => groups.flatMap((group) => group.models);
test("all documented models remain available with empty filters", () =>
  assert.equal(
    models(filterInjectionGroups(injectionModelGroups, "", "all")).length,
    21,
  ));
test("model search ignores case, spaces and separators", () =>
  assert.deepEqual(
    models(filterInjectionGroups(injectionModelGroups, "ec-230 sx iii", "all")),
    ["EC230SXIII"],
  ));
test("partial search finds the model without requiring its series", () =>
  assert.deepEqual(
    models(filterInjectionGroups(injectionModelGroups, "230", "all")),
    ["EC230SXIII"],
  ));
test("format and model search are combined", () =>
  assert.equal(
    models(
      filterInjectionGroups(injectionModelGroups, "EC230", "Formats compacts"),
    ).length,
    0,
  ));
test("format filters return only their group", () => {
  const filtered = filterInjectionGroups(
    injectionModelGroups,
    "",
    "Formats compacts",
  );
  assert.equal(filtered.length, 1);
  assert.equal(filtered[0].models.length, 4);
  assert.ok(filtered[0].models.includes("EC30SXII"));
});
test("unknown models return an empty result", () =>
  assert.equal(
    filterInjectionGroups(injectionModelGroups, "EC999999", "all").length,
    0,
  ));
test("searching does not mutate the catalog", () => {
  const before = JSON.stringify(injectionModelGroups);
  filterInjectionGroups(injectionModelGroups, "EC230", "all");
  assert.equal(JSON.stringify(injectionModelGroups), before);
});
test("normalization tolerates accents and empty input", () => {
  assert.equal(normalizeModelQuery("é c 230"), "EC230");
  assert.equal(normalizeModelQuery(""), "");
});
