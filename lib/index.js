"use strict";

const fs         = require("fs");
const path       = require("path");
const decorators = require("./decorators");
const files      = require("./files");

module.exports = {

    lazyLoad (path, cfg) {

        const pkg = require(path);
        let result = {};

        Object.keys(pkg.devDependencies).forEach(function (key) {
            result[key] = function () {
                return require(key);
            };
        });

        return result;
    },
    // load modules in directories,   module/index.js
    standardLoad (path, cfg) {
        var ret = {}, modulePath;
        files.each(path, cfg, function (asset, name) {
            modulePath = path + "/" + name + "/index.js";
            if (asset.isDirectory()) {
                ret[name] = require(modulePath);
            }
        });
        return ret;
    },
    // the suffix should be using a dot in the beginning
    // add it if it's not there
    normalizeSuffix (suffix) {
        return suffix[0] === "." ? suffix : "." + suffix;
    },

    extensionLoad (path, cfg) {
        var ret = {};
        files.each(path, cfg, function (asset, name) {
            var content = fs.readFileSync(path + "/" + name, "utf8"),
                moduleName = name.replace("." + cfg.extension, "");
            ret[moduleName] = content;
        });
        return ret;
    },
    // load modules by their suffix,   module/email.job.js
    suffixLoad (path, cfg) {
        var ret = {},
            suffix = cfg.suffix;

        files.each(path, cfg, function (asset, name) {
            var modulePath = path + "/" + name,
                moduleName = name.replace(this.normalizeSuffix(suffix), "");
            // only load files that end with given suffix
            if (name.indexOf(suffix, name.length - suffix.length) !== -1) {
                ret[moduleName] = require(modulePath);
            }
        }.bind(this));
        return ret;
    },

    expose (modules, cfg) {

        if (typeof cfg.namespace === "string") {
            if (global.hasOwnProperty(cfg.namespace) && !cfg.override) {
                throw new Error("simpleload: trying to override global var, use override flag if it's intended");
            }
            global[cfg.namespace] = {};
            Object.keys(modules).forEach(function (key) {
                global[cfg.namespace][key] = modules[key];
            });
        } 

        if (!cfg.namespace) {
            Object.keys(modules).forEach(function (key) {
                if (global.hasOwnProperty(key) && !cfg.override) {
                    throw new Error("simpleload: trying to override global var, use override flag if it's intended");
                }
                global[key] = modules[key];
            });
        }
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
            return decorators.decorate(modules, method);
        }
        return decorators.predefined(modules, method);

    },

    register (modules, data) {

        var channel, method;

        // we expect an array with 2 parameters
        if (!Array.isArray(data) || 
            data.length !== 2 || 
            typeof data[0] !== "object" ||
            typeof data[1] !== "string") {
            throw new Error("simpleload: passed register format not supported");
        }

        // register functions
        channel = data[0];
        method  = data[1];
        Object.keys(modules).forEach(function (key) {
            channel[method](key, modules[key]);
        });

        return modules;

    }

};