/* globals require, module */

"use strict";

var simpleload = require("./lib");

module.exports = function (path, cfg) {

    var modules;

    if (typeof path !== "string" || !path) {
        throw new Error("Path has to be defined properly");
    }

    cfg = typeof cfg ==="object" && !Array.isArray(cfg) ? cfg : {};

    if (typeof cfg.suffix === "string") {
        modules = simpleload.suffixLoad(path, cfg.suffix);
    } else {
        modules = simpleload.standardLoad(path);
    }

    // expose the modules globally
    if (cfg.global) {
        simpleload.expose(modules, cfg);
    }

    // we want to return the modules as an array
    if (cfg.as === "values") {
        return Object.keys(modules).map(function (key) { return modules[key]; });
    }

    return modules;

};