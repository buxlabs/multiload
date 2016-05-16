"use strict";

const simpleload = require("./lib");

module.exports = function (path, cfg) {

    var modules;

    if (typeof path !== "string" || !path) {
        throw new Error("simpleload: path has to be defined properly");
    }

    cfg = typeof cfg ==="object" && !Array.isArray(cfg) ? cfg : {};

    // in case an extension was provided
    // we use different loading method
    if (cfg.lazy) {
        modules = simpleload.lazyLoad(path, cfg);
    } else if (typeof cfg.extension === "string") {
        modules = simpleload.extensionLoad(path, cfg);
    } else if (typeof cfg.suffix === "string") {
        modules = simpleload.suffixLoad(path, cfg);
    } else {
        modules = simpleload.standardLoad(path, cfg);
    }

    if (cfg.decorate) {
        simpleload.decorate(modules, cfg);
    }

    // expose the modules globally
    if (cfg.global) {
        simpleload.expose(modules, cfg);
    }

    if (cfg.exclude) {
        modules = simpleload.exclude(modules, cfg.exclude);
    }

    if (cfg.register) {
        simpleload.register(modules, cfg.register);
    }

    // check if there's at least one module that has been loaded
    // otherwise throw an error
    if (Object.keys(modules).length === 0) {
        throw new Error("simpleload: no modules found, check folder and options");
    }
    // we want to return the modules as an array
    if (cfg.as === "values") {
        return Object.keys(modules).map(function (key) { return modules[key]; });
    }

    return modules;

};