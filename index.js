"use strict";

var fs = require("fs");

function simpleload (path, cfg) {

    cfg = cfg || {};

    var assets, asset, ret, i, ilen;

    assets = fs.readdirSync(path);
    ret = {};
    for (i = 0, ilen = assets.length; i < ilen; i += 1) {
        asset = fs.statSync(path + "/" + assets[i]);
        if (asset.isDirectory()) {
            ret[assets[i]] = require(path + "/" + assets[i]);
        }
    }
    return ret;
}

module.exports = simpleload;