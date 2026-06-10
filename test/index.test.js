const test = require("node:test");
const assert = require("node:assert");
const { join } = require("path");
const multiload = require("..");

test("multiload loads files from subdirectories", (t) => {
  const routers = multiload(join(__dirname, "fixtures/routers"));
  assert.strictEqual(typeof routers.forgotPassword, "function");
  assert.strictEqual(typeof routers.home, "function");
});
