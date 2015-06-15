"use strict";

var fs = require("fs");

module.exports = {
    loadAssets: function (path) {
        var assets;
        try {
            assets = fs.readdirSync(path);
        } catch (exception) {
            throw new Error("simpleload: couldn't load a module, such path doesn't exist");
        }
        return assets;
    },
    statFile: function (path, filename) {
        var asset;
        try {
            asset = fs.statSync(path + "/" + filename);
        } catch (exception) {
            throw new Error("simpleload: couldn't stat a file, IO error");
        }
        return asset;
    },
    eachAsset: function (path, callback) {
        var assets, asset, i, ilen, name;

        assets = this.loadAssets(path);
        for (i = 0, ilen = assets.length; i < ilen; i += 1) {
            name  = assets[i];
            asset = this.statFile(path, name);
            callback(asset, name);
        }
    },
    requireModule: function (modulePath) {
        if (fs.existsSync(modulePath)) {
            try {
                return require(modulePath);
            } catch (exception) {
                throw new Error("simpleload: couldn't require module: " + modulePath);
            }
        }
        return false;
    }
};