"use strict";

const fs = require("fs");

module.exports = {

    walk (dir, subdir) {
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

    loadAssets (dir, cfg) {
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
    statFile (dir, filename) {
        var asset;
        try {
            asset = fs.statSync(dir + "/" + filename);
        } catch (exception) {
            throw new Error("simpleload: couldn't stat a file, IO error");
        }
        return asset;
    },
    eachAsset (dir, cfg, callback) {
        var assets, asset, i, ilen, name;

        assets = this.loadAssets(dir, cfg);
        for (i = 0, ilen = assets.length; i < ilen; i += 1) {
            name  = assets[i];
            asset = this.statFile(dir, name);
            callback(asset, name);
        }
    },
    requireModule (modulePath) {
        // TODO
        // Stability: 0 - Deprecated: Use fs.statSync() or fs.accessSync() instead.
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