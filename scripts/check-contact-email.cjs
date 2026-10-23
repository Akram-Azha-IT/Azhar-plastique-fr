const assert = require("node:assert/strict");
const test = require("node:test");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

const loaded = { exports: {} };
const source = ts.transpileModule(
  fs.readFileSync(path.join(__dirname, "../src/lib/contactEmail.ts"), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS } },
).outputText;
new Function("module", "exports", source)(loaded, loaded.exports);
const { buildContactEmail } = loaded.exports;

test("email preserves French text and query characters without adding recipients or headers", () => {
  const data = new FormData();
  data.set("name", "Élodie Martin");
  data.set("company", "Moulage & précision #1");
  data.set("email", "elodie+pro@example.fr");
  data.set("reference", "PA6 / PA66");
  data.set(
    "message",
    "Besoin de pièces renforcées.\nEssai & validation ?bcc=autre@example.fr",
  );
  const url = new URL(buildContactEmail(data, "matiere"));
  assert.equal(url.protocol, "mailto:");
  assert.equal(url.pathname, "contact@azharplastics.com");
  assert.deepEqual([...url.searchParams.keys()], ["subject", "body"]);
  assert.equal(
    url.searchParams.get("subject"),
    "Projet plasturgie  Moulage & précision #1",
  );
  const body = url.searchParams.get("body");
  for (const [name, value] of data) assert.ok(body.includes(value), name);
  assert.ok(body.includes("Besoin : Matière première"));
  assert.equal(url.hash, "");
});

test("machine enquiry includes its model and handles empty optional fields", () => {
  const data = new FormData();
  data.set("reference", "EC230SXIII");
  const body = new URL(buildContactEmail(data, "machine")).searchParams.get(
    "body",
  );
  assert.ok(body.includes("Besoin : Machine Shibaura"));
  assert.ok(body.includes("Référence : EC230SXIII"));
  assert.ok(body.includes("Téléphone : \n"));
  assert.ok(!body.includes("null") && !body.includes("undefined"));
});
