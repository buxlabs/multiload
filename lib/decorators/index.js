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

    predefined (modules, name) {
        var decorator = decorators[name];
        if (!decorator) { 
            new Error("Decorator: " + name + " doesn't exist");
        }
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
