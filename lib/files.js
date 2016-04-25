"use strict";

const fs = require("fs");

module.exports = {

    walk (dir, subdir) {
        var results = [],
            list = fs.readdirSync(dir);
        list.forEach(function(file) {
            var filepath = dir + "/" + file,
                stat = fs.statSync(filepath);
            if (stat.isDirectory()) {
                results = results.concat(this.walk(filepath, file));
            } else {
                results.push(subdir ? subdir + "/" + file : file);
            }
        }, this);
        return results;
    },

    load (dir, cfg) {
        if (cfg.recursive) {
            return this.walk(dir);
        }
        return fs.readdirSync(dir);
    },

    each (dir, cfg, callback, context) {
        var assets, asset, i, ilen, name;

        assets = this.load(dir, cfg);
        for (i = 0, ilen = assets.length; i < ilen; i += 1) {
            name  = assets[i];
            asset = fs.statSync(dir + "/" + name);
            callback(asset, name);
        }
    }

};