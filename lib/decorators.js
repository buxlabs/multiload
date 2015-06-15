"use strict";

module.exports = {

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