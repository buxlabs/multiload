const test = require("node:test");
const assert = require("node:assert");
const { join } = require("path");
const { capitalize, camelize } = require("pure-utilities/string");
const multiload = require("..");

test("multiload loads files from subdirectories", (t) => {
  const routers = multiload(join(__dirname, "fixtures/routers"), {
    transform: camelize,
  });
  assert.strictEqual(typeof routers.forgotPassword, "function");
  assert.strictEqual(typeof routers.home, "function");
});

test("multiload ignores empty directories", (t) => {
  const routers = multiload(join(__dirname, "fixtures/components"));
  assert.strictEqual(typeof routers.container, "function");
  assert.strictEqual(typeof routers.form, "undefined");
});
