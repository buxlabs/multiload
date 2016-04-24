"use strict";

const fs = require("fs");
const path = require("path");

module.exports = {

    walk (dir, subdir) {
        var results = [],
            list = fs.readdirSync(dir);
        list.forEach(function (asset) {
            var route = path.join(dir, asset),
                filepath = subdir ? path.join(subdir, asset) : asset,
                stat = fs.statSync(route);
            if (stat.isDirectory()) {
                results = results.concat(this.walk(route, filepath));
            } else {
                results.push(filepath);
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