const assert = require("node:assert/strict");
const test = require("node:test");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");
function loadLibrary(file) {
  const loaded = { exports: {} };
  const source = ts.transpileModule(
    fs.readFileSync(path.join(__dirname, "../src/lib/", file), "utf8"),
    { compilerOptions: { module: ts.ModuleKind.CommonJS } },
  ).outputText;
  new Function("module", "exports", source)(loaded, loaded.exports);
  return loaded.exports;
}
const {
  getHeroSlideProgress: progress,
  getHeroActiveSlide: active,
  getHeroScrollTarget: target,
  getHeroJourneyProgress: journey,
} = loadLibrary("heroCarousel.ts");

test("each snapped panel centers its own text animation", () => {
  for (const width of [320, 390, 1440])
    for (let index = 0; index < 3; index++) {
      const left = target(index, width, 3);
      assert.equal(active(left, width, 3), index);
      assert.ok(Math.abs(progress(left, width, index).text - 0.5) < 0.000001);
    }
});
test("previous and next wrap across all three scenes", () => {
  assert.equal(target(-1, 400, 3), 560);
  assert.equal(target(3, 400, 3), 0);
});
test("native swipe selects the nearest scene", () => {
  assert.equal(active(250, 400, 3), 1);
  assert.equal(active(520, 400, 3), 2);
});
test("overscroll cannot select a non-existent scene", () => {
  assert.equal(active(-40, 400, 3), 0);
  assert.equal(active(900, 400, 3), 2);
});
test("off-screen animation progress remains bounded", () => {
  assert.deepEqual(progress(-2000, 400, 2), { image: 0, text: 0 });
  assert.deepEqual(progress(2000, 400, 0), { image: 1, text: 1 });
});
test("unmeasured and empty carousels stay safe", () => {
  assert.equal(active(100, 0, 3), 0);
  assert.equal(target(1, 400, 0), 0);
  assert.equal(progress(0, 0, 0).text, 0.5);
});

test("vertical scroll advances and reverses through the same three scenes", () => {
  for (const width of [320, 390, 1440]) {
    const maximum = target(2, width, 3);
    for (const index of [0, 1, 2, 1, 0]) {
      const left = journey(100 + index * 600, 100, 1200) * maximum;
      assert.equal(active(left, width, 3), index);
      assert.ok(Math.abs(progress(left, width, index).text - 0.5) < 0.000001);
    }
  }
});

test("leaving the sticky section holds the first or final scene", () => {
  assert.equal(journey(0, 100, 1200), 0);
  assert.equal(journey(2000, 100, 1200), 1);
  assert.equal(journey(100, 100, 0), 0);
});

test("resizing preserves the current journey progress across screen widths", () => {
  const value = journey(700, 100, 1200);
  for (const width of [320, 844, 1440])
    assert.equal(active(value * target(2, width, 3), width, 3), 1);
});

test("page navigation uses the active scroll engine and survives stale cleanup", () => {
  const { registerPageScroller, scrollPageTo } = loadLibrary("pageScroll.ts");
  const calls = [];
  const oldWindow = global.window;
  global.window = { scrollTo: (options) => calls.push(["native", options]) };
  try {
    scrollPageTo(100, true);
    const first = registerPageScroller((...args) =>
      calls.push(["first", ...args]),
    );
    scrollPageTo(600);
    const second = registerPageScroller((...args) =>
      calls.push(["second", ...args]),
    );
    first();
    scrollPageTo(1200, true);
    second();
    scrollPageTo(0);
    assert.deepEqual(calls, [
      ["native", { top: 100, behavior: "instant" }],
      ["first", 600, false],
      ["second", 1200, true],
      ["native", { top: 0, behavior: "smooth" }],
    ]);
  } finally {
    global.window = oldWindow;
  }
});
