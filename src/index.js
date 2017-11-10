import fs from 'fs'
import path from 'path'
import decorators from './decorators'
import files from './files'

export default {
    extensionLoad (path, cfg) {
        var ret = {};
        files.each(path, cfg, function (asset, name) {
            if (!asset.isDirectory()) {            
                var content = fs.readFileSync(path + "/" + name, "utf8"),
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
            return decorators.decorate(modules, method);
        }
        return decorators.predefined(modules, method);

    }

};
