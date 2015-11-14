/*globals require, module, global */

"use strict";

var fs         = require("fs"),
    decorators = require("./decorators"),
    files      = require("./files");

module.exports = {
    // load modules in directories,   module/index.js
    standardLoad: function (path, cfg) {
        var ret = {}, modulePath, module;
        files.eachAsset(path, cfg, function (asset, name) {
            modulePath = path + "/" + name + "/index.js";
            if (asset.isDirectory()) {
                module = files.requireModule(modulePath);
                if (module) {
                    ret[name] = module;
                }
            }
        });
        return ret;
    },
    // the suffix should be using a dot in the beginning
    // add it if it's not there
    normalizeSuffix: function (suffix) {
        return suffix[0] === "." ? suffix : "." + suffix;
    },

    extensionLoad: function (path, cfg) {

        var supportedExtensions = ["html"],
            extension = cfg.extension;

        if (supportedExtensions.indexOf(extension) === -1) {
            throw new Error("simpleload: '" + extension + "' extension is not supported"); 
        }

        var ret = {}, content, moduleName;
        files.eachAsset(path, cfg, function (asset, name) {
            content = fs.readFileSync(path + "/" + name, "utf8");
            moduleName = name.replace("." + extension, "");
            ret[moduleName] = content;
        });
        return ret;
    },
    // load modules by their suffix,   module/email.job.js
    suffixLoad: function (path, cfg) {
        var self = this,
            ret = {}, modulePath, moduleName, module,
            suffix = cfg.suffix;
        // error will be thrown if such folder doesn't exist
        files.eachAsset(path, cfg, function (asset, name) {
            modulePath = path + "/" + name;
            moduleName = name.replace(self.normalizeSuffix(suffix), "");
            if (name.indexOf(suffix, name.length - suffix.length) !== -1) {
                module = files.requireModule(modulePath);
                if (module) {
                    ret[moduleName] = module;
                }
                
            }
        });
        return ret;
    },

    expose: function (modules, cfg) {
        var module;

        if (!cfg.namespace) {
            for (module in modules) {
                // check if such global var is defined already
                // override only if flag is passed, otherwise 
                // throw an error
                if (global.hasOwnProperty(module) && !cfg.override) {
                    throw new Error("simpleload: trying to override global var, use override flag if it's intended");
                }
                // set the module as a global var
                if (modules.hasOwnProperty(module)) {
                    global[module] = modules[module];
                }
            }
        } else if (typeof cfg.namespace === "string") {
            if (global.hasOwnProperty(cfg.namespace) && !cfg.override) {
                throw new Error("simpleload: trying to override global var, use override flag if it's intended");
            }
            global[cfg.namespace] = {};
            for (module in modules) {
                if (modules.hasOwnProperty(module)) {
                    global[cfg.namespace][module] = modules[module];
                }
            }
        } 
    },

    exclude: function (modules, exclude) {

        var i, ilen;
        if (typeof exclude === "string") {
            delete modules[exclude];
        } else if (Array.isArray(exclude)) {
            for (i = 0, ilen = exclude.length; i < ilen; i += 1) {
                delete modules[exclude[i]];
            }
        }
        return modules;

    },


    decorate: function (modules, cfg) {

        var method = cfg.decorate;

        if (typeof method === "string") {
            return decorators.predefined(modules, method);
        } else if (typeof method === "function") {
            return decorators.custom(modules, method);
        }

        // otherwise return untouched modules
        return modules;

    },

    register: function (modules, data) {

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
        for (var module in modules) {
            if (modules.hasOwnProperty(module)) {
                channel[method](module, modules[module]);
            }
        }

        return modules;

    }

};