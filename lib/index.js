/*globals require, module, global */

"use strict";

var fs = require("fs");

module.exports = {
    loadAssets: function (path) {
        var assets;
        try {
            assets = fs.readdirSync(path);
        } catch (exception) {
            throw new Error("simpleload couldn't load a module, such path doesn't exist");
        }
        return assets;
    },
    statFile: function (path, filename) {
        var asset;
        try {
            asset = fs.statSync(path + "/" + filename);
        } catch (exception) {
            throw new Error("simpleload couldn't stat a file, IO error");
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
    loadModule: function (modulePath) {
        if (fs.existsSync(modulePath)) {
            try {
                return require(modulePath);
            } catch (exception) {
                throw new Error("simpleload couldn't require a module: " + modulePath);
            }
        }
        return false;
    },
    // load modules in directories,   module/index.js
    standardLoad: function (path) {
        var self = this,
            ret = {}, modulePath, moduleName, module;
        this.eachAsset(path, function (asset, name) {
            modulePath = path + "/" + name + "/index.js";
            moduleName = name;
            if (asset.isDirectory()) {
                module = self.loadModule(modulePath);
                if (module) {
                    ret[moduleName] = module;
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
    // load modules by their suffix,   module/email.job.js
    suffixLoad: function (path, suffix) {
        var self = this,
            ret = {}, modulePath, moduleName, module;
        // error will be thrown if such folder doesn't exist
        this.eachAsset(path, function (asset, name) {
            modulePath = path + "/" + name;
            moduleName = name.replace(self.normalizeSuffix(suffix), "");
            if (name.indexOf(suffix, name.length - suffix.length) !== -1) {
                module = self.loadModule(modulePath);
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
                    throw new Error("simpleload won't override global var by default, use override flag if it's intended");
                }
                // set the module as a global var
                if (modules.hasOwnProperty(module)) {
                    global[module] = modules[module];
                }
            }
        } else if (typeof cfg.namespace === "string") {
            if (global.hasOwnProperty(cfg.namespace) && !cfg.override) {
                throw new Error("simpleload won't override global var by default, use override flag if it's intended");
            }
            global[cfg.namespace] = {};
            for (module in modules) {
                if (modules.hasOwnProperty(module)) {
                    global[cfg.namespace][module] = modules[module];
                }
            }
        } 
    },

    decorate: function (modules, cfg) {

        var method = cfg.decorate;

        if (typeof method === "function") {
            return this.fnDecorator(modules, method);
        } else if (typeof method === "string") {
            return this.predefDecorator(modules, method);
        }

        // otherwise return untouched modules
        return modules;

    },

    // function based decorator
    fnDecorator: function (modules, decorator) {
        var module, ret;
        for (module in modules) {
            // getting back result from the decorator,
            // passing in the module name and the fn itself
            ret = decorator(module, modules[module]);

            // decide what to do with the response

            // if it's a string, then only name should change
            if (typeof ret === "string") {
                modules[ret] = modules[module];
                delete modules[module];
            }

        }

        return modules;
    },

    // predefined decorators
    predefDecorator: function (modules, name) {

        if (name === "capitalize") {
            return this.predefHandler(modules, this.predefCapitalize);
        } else if (name === "lowercase") {
            return this.predefHandler(modules, this.predefLowercase);
        }

        return modules;
    },

    predefHandler: function (modules, handler) {
        var module, name;
        for (module in modules) {
            if (modules.hasOwnProperty(module)) {
                name = handler(module);

                // getting back result from the decorator,
               // passing in the module name and the fn itself
                modules[name] = modules[module];
                delete modules[module];
            }
        }
        return modules;
    },
    // predefined capitalize method
    predefCapitalize: function (module) {
        return module[0].toUpperCase() + module.slice(1);
    },
    predefLowercase: function (module) {
        return module.toLowerCase();
    }


};