"use strict";

var fs = require("fs");

module.exports = {

    walk: function (dir, subdir) {
        var self = this;
        var results = [];
        var list = fs.readdirSync(dir);
        list.forEach(function(file) {
            var filepath = dir + "/" + file;
            var stat = fs.statSync(filepath);
            if (stat && stat.isDirectory()) {
                results = results.concat(self.walk(filepath, file));
            } else {
                results.push(subdir ? subdir + "/" + file : file);
            }
        });
        return results;
    },

    loadAssets: function (dir, cfg) {
        var assets;
        try {
            if (cfg.recursive) {
                assets = this.walk(dir);
            } else {
                assets = fs.readdirSync(dir);
            }
        } catch (exception) {
            throw new Error("simpleload: couldn't load a module, such dir doesn't exist");
        }
        return assets;
    },
    statFile: function (dir, filename) {
        var asset;
        try {
            asset = fs.statSync(dir + "/" + filename);
        } catch (exception) {
            throw new Error("simpleload: couldn't stat a file, IO error");
        }
        return asset;
    },
    eachAsset: function (dir, cfg, callback) {
        var assets, asset, i, ilen, name;

        assets = this.loadAssets(dir, cfg);
        for (i = 0, ilen = assets.length; i < ilen; i += 1) {
            name  = assets[i];
            asset = this.statFile(dir, name);
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