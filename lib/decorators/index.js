"use strict";

var decorators = {
    capitalize (module) {
        return module[0].toUpperCase() + module.slice(1);
    },
    lowercase (module) {
        return module.toLowerCase();
    },
    eventize (module) {
        return module.replace("/", ":").replace(/([A-Z])/g, ":$1").toLowerCase();
    },
    uppercase (module) {
        return module.toUpperCase();
    }
};

module.exports = {

    // use predefined decorator if it exists
    predefined (modules, name) {
        // go through all change name
        return decorators[name] ? this.handler(modules, decorators[name]) : modules;
    },

    // function based decorator
    custom (modules, decorator) {
        var module, ret;
        for (module in modules) {
            if (modules.hasOwnProperty(module)) {
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
        }

        return modules;
    },


    handler (modules, handler) {
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
    }
};