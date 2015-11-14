"use strict";

var decorators = {
    capitalize: function (module) {
        return module[0].toUpperCase() + module.slice(1);
    },
    lowercase: function (module) {
        return module.toLowerCase();
    },
    eventize: function (module) {
        return module.replace("/", ":").replace(/([A-Z])/g, ":$1").toLowerCase();
    }
};

module.exports = {

    // use predefined decorator if it exists
    predefined: function (modules, name) {
        // go through all change name
        return decorators[name] ? this.handler(modules, decorators[name]) : modules;
    },

    // function based decorator
    custom: function (modules, decorator) {
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


    handler: function (modules, handler) {
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