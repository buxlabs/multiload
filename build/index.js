'use strict';

var fs = require('fs');
var path = require('path');

var decorators = {
    capitalize (string) {
        return string[0].toUpperCase() + string.slice(1);
    },
    lowercase (string) {
        return string.toLowerCase();
    },
    eventize (string) {
        return string.replace("/", ":").replace("\\", ":").replace(/([A-Z])/g, ":$1").toLowerCase();
    },
    uppercase (string) {
        return string.toUpperCase();
    },
    camelize (string) {
        return string
        .replace( /[-_]+/g, " ")
        .replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
            return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
        }).replace(/\s+/g, "");
    }
};

var decorators$1 = {

    predefined (modules, name) {
        var decorator = decorators[name];
        return this.decorate(modules, decorator);
    },

    decorate (modules, decorator) {
        Object.keys(modules).forEach(function (key) {
            var result = decorator(key, modules[key]);
            modules[result] = modules[key];
            delete modules[key];
        });
        return modules;
    }
};

var files = {

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

var simpleload = {
    extensionLoad (path$$1, cfg) {
        var ret = {};
        files.each(path$$1, cfg, function (asset, name) {
            if (!asset.isDirectory()) {            
                var content = fs.readFileSync(path$$1 + "/" + name, "utf8"),
                    moduleName = name.replace("." + cfg.extension, "");
                ret[moduleName] = content;
            }
        });
        return ret;
    },

    exclude (modules, exclude) {

        if (Array.isArray(exclude)) {
            for (var i = 0, ilen = exclude.length; i < ilen; i += 1) {
                delete modules[exclude[i]];
            }
        } else {
            delete modules[exclude];
        }
        return modules;

    },


    decorate (modules, cfg) {

        var method = cfg.decorate;

        if (typeof method === "function") {
            return decorators$1.decorate(modules, method);
        }
        return decorators$1.predefined(modules, method);

    }

};

function load (path$$1, cfg) {

    var modules;

    if (typeof path$$1 !== "string" || !path$$1) {
        throw new Error("simpleload: path has to be defined properly");
    }

    cfg = typeof cfg ==="object" && !Array.isArray(cfg) ? cfg : {};

    if (typeof cfg.extension === "string") {
        modules = simpleload.extensionLoad(path$$1, cfg);
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

}

module.exports = load;
