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

export default {

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
