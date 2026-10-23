const assert = require("node:assert/strict");
const { test, afterEach } = require("node:test");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");
const { gsap } = require("gsap");
const loaded = { exports: {} };
const source = ts.transpileModule(
  fs.readFileSync(path.join(__dirname, "../src/lib/approachOrbit.ts"), "utf8"),
  {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
  },
).outputText;
new Function("module", "exports", "require", source)(
  loaded,
  loaded.exports,
  require,
);
const { createApproachTimeline, getApproachRotation } = loaded.exports;

afterEach(() => {
  gsap.globalTimeline.clear();
  gsap.ticker.sleep();
});

test("one circuit reaches all three labelled stops in six seconds", () => {
  const ball = { rotation: 0 };
  const arrivals = [];
  const timeline = createApproachTimeline(ball, 0, 3, (index) =>
    arrivals.push(index),
  );
  assert.equal(timeline.duration(), 6);
  timeline.time(2, false);
  assert.equal(ball.rotation, 120);
  assert.deepEqual(arrivals, [1]);
  timeline.time(4, false);
  assert.equal(ball.rotation, 240);
  assert.deepEqual(arrivals, [1, 2]);
  timeline.time(6, false);
  assert.equal(ball.rotation % 360, 0);
  assert.deepEqual(arrivals, [1, 2, 0]);
});

test("content changes on arrival, while the ball remains on the ring between stops", () => {
  const ball = { rotation: 0 };
  const arrivals = [];
  const timeline = createApproachTimeline(ball, 0, 3, (index) =>
    arrivals.push(index),
  );
  timeline.time(1.2, false);
  assert.equal(ball.rotation, 0);
  timeline.time(1.7, false);
  assert.ok(ball.rotation > 0 && ball.rotation < 120);
  assert.deepEqual(arrivals, []);
  timeline.time(2, false);
  assert.deepEqual(arrivals, [1]);
});

test("resuming after a manual choice continues to the next physical stop", () => {
  const ball = { rotation: 0 };
  const arrivals = [];
  const timeline = createApproachTimeline(ball, 2, 3, (index) =>
    arrivals.push(index),
  );
  assert.equal(ball.rotation, 240);
  assert.equal(timeline.paused(), true);
  timeline.time(2, false);
  assert.equal(ball.rotation, 360);
  assert.deepEqual(arrivals, [0]);
  timeline.time(4, false);
  assert.equal(ball.rotation, 480);
  assert.deepEqual(arrivals, [0, 1]);
});

test("manual selection follows the shortest arc without an extra full circuit", () => {
  assert.equal(getApproachRotation(240, 0, 3), 360);
  assert.equal(getApproachRotation(240, 1, 3), 120);
  assert.equal(getApproachRotation(360, 0, 3), 360);
  assert.equal(getApproachRotation(720, 2, 3), 600);
});
