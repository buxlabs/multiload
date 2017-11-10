"use strict";

import simpleload from './src/index'

export default function load (path, cfg) {

    var modules;

    if (typeof path !== "string" || !path) {
        throw new Error("simpleload: path has to be defined properly");
    }

    cfg = typeof cfg ==="object" && !Array.isArray(cfg) ? cfg : {};

    if (typeof cfg.extension === "string") {
        modules = simpleload.extensionLoad(path, cfg);
    }

    if (cfg.decorate) {
        simpleload.decorate(modules, cfg);
    }

    if (cfg.exclude) {
        modules = simpleload.exclude(modules, cfg.exclude);
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
