/* globals require, module */

"use strict";

var simpleload = require("./lib");

module.exports = function (path, cfg) {

    if (typeof path !== "string" || !path) {
        throw new Error("Path has to be defined properly");
    }

    cfg = typeof cfg ==="object" && !Array.isArray(cfg) ? cfg : {};

    if (typeof cfg.suffix === "string") {
        return simpleload.suffixLoad(path, cfg.suffix);
    }

    return simpleload.standardLoad(path);

};