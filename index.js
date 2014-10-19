"use strict";

var fs = require("fs");

function simpleload (path, cfg) {

    if (typeof path !== "string" || !path) {
        throw new Error("Path has to be defined properly");
    }

    cfg = cfg || {};
    if (typeof cfg !== "object") {
        throw new Error("Config has to be defined properly");
    }

    if (typeof cfg.suffix === "string") {
        return suffixLoad(path, cfg.suffix);
    }
    
    return standardLoad(path);
}

// load modules in directories,   module/index.js
function standardLoad (path) {
    var assets, asset, i, ilen, ret = {};
    // @TODO simplify error handling
    try {
        assets = fs.readdirSync(path);
    } catch (exception) {
        throw new Error("simpleload couldn't load a module, such path doesn't exist");
    }
    for (i = 0, ilen = assets.length; i < ilen; i += 1) {
        try {
            asset = fs.statSync(path + "/" + assets[i]);
        } catch (exception) {
            throw new Error("simpleload couldn't stat a file, IO error");
        }
        if (asset.isDirectory()) {
            try {
                if (fs.existsSync(path + "/" + assets[i] + "/index.js")) {
                    ret[assets[i]] = require(path + "/" + assets[i] + "/index.js");
                }
            } catch (exception) {
                throw new Error("simpleload couldn't require a module: " + path + "/" + assets[i]);
            }
            
        }
    }
    return ret;
}
// @TODO standard and suffix load are similar, merge them together
function suffixLoad (path, suffix) {
    var assets, asset, i, ilen, ret = {};
    // error will be thrown if such folder doesn't exist
    try {
        assets = fs.readdirSync(path);
    } catch (exception) {
        throw new Error("simpleload couldn't load a module, such path doesn't exist");
    }
    for (i = 0, ilen = assets.length; i < ilen; i += 1) {
        try {
            asset = fs.statSync(path + "/" + assets[i]);
        } catch (exception) {
            throw new Error("simpleload couldn't stat a file, IO error");
        }
        if (assets[i].indexOf(suffix, assets[i].length - suffix.length) !== -1) {
            try {
                if (fs.existsSync(path + "/" + assets[i])) {
                    ret[assets[i].replace("." + suffix, "")] = require(path + "/" + assets[i]);
                }
            } catch (exception) {
                throw new Error("simpleload couldn't require a module: " + path + "/" + assets[i]);
            }
            
        }
    }
    return ret;
}

module.exports = simpleload;