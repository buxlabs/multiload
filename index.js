const { readdirSync } = require("node:fs");
const { join } = require("path");
const { camelize } = require("pure-utilities/string");

module.exports = function multiload(path) {
  const dirs = readdirSync(path, { withFileTypes: true })
    .filter((dir) => dir.isDirectory())
    .map((dir) => dir.name);

  const modules = dirs.reduce((object, dir) => {
    console.log(join(path, dir));
    const router = require(`${join(path, dir)}`);
    const name = camelize(dir);
    object[name] = router;
    return object;
  }, {});

  return modules;
};
