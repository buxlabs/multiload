"use strict";

const multiload = require("./src/index");

module.exports = function load(path, cfg) {
  let modules;

  if (typeof path !== "string" || !path) {
    throw new Error("multiload: path has to be defined properly");
  }

  cfg = typeof cfg === "object" && !Array.isArray(cfg) ? cfg : {};

  if (typeof cfg.extension === "string") {
    modules = multiload.extensionLoad(path, cfg);
  } else {
    modules = multiload.defaultLoad(path, cfg);
  }

  if (cfg.decorate) {
    multiload.decorate(modules, cfg);
  }

  if (cfg.exclude) {
    modules = multiload.exclude(modules, cfg.exclude);
  }

  // check if there's at least one module that has been loaded
  // otherwise throw an error
  if (Object.keys(modules).length === 0) {
    throw new Error("multiload: no modules found, check folder and options");
  }
  // we want to return the modules as an array
  if (cfg.format === "array") {
    return Object.keys(modules).map(function (key) {
      return modules[key];
    });
  }

  return modules;
};
