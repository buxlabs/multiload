const { readdirSync, existsSync } = require("node:fs");
const { join } = require("path");

module.exports = function multiload(path, options = {}) {
  const { transform } = options;

  const dirs = readdirSync(path, { withFileTypes: true })
    .filter((record) => record.isDirectory())
    .map((record) => record.name);

  const modules = dirs.reduce((object, dir) => {
    const modulePath = join(path, dir);
    const indexPath = join(modulePath, "index.js");

    if (existsSync(indexPath) || existsSync(modulePath + ".js")) {
      const router = require(modulePath);
      const name = typeof transform === "function" ? transform(dir) : dir;
      object[name] = router;
    }
    return object;
  }, {});

  return modules;
};
