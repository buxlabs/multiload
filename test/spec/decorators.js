import test from 'ava';
import path from 'path';
import simpleload from '../../index';

test("should be possible to capitalize the names of the modules", t => {
    var modules = simpleload(path.join(__dirname, "/../fixture/dir_07"), { 
        suffix: "model.js", 
        decorate: function (name) {
            return name[0].toUpperCase() + name.slice(1);
        }
    });

    t.truthy(typeof modules.User === "string");
    t.truthy(typeof modules.Token === "string");
});

test("should be possible to capitalize with a predefined function", t => {
    var modules = simpleload(path.join(__dirname, "/../fixture/dir_07"), { 
        suffix: ".model.js", 
        decorate: "capitalize"
    });

    t.truthy(typeof modules.User === "string");
    t.truthy(typeof modules.Token === "string");
});

test("should be possible to lowercase with a predefined function", t => {
    var modules = simpleload(path.join(__dirname, "/../fixture/dir_08"), {
        suffix: ".handler.js",
        decorate: "lowercase"
    });

    t.truthy(typeof modules.base === "string");
    t.truthy(typeof modules.common === "string");
});

test("should be possible to use the eventize decorator", t => {
    var modules = simpleload(path.join(__dirname, "/../fixture/dir_12"), {
        suffix: ".event.js",
        decorate: "eventize"
    });

    t.truthy(modules["user:account:locked"]() === "userAccountLocked");
    t.truthy(modules["user:forgot:password"]() === "userForgotPassword");
    t.truthy(modules["user:registered"]() === "userRegistered");
});

test("should be possible to use the uppercase decorator", t => {
    var modules = simpleload(path.join(__dirname, "/../fixture/dir_08"), {
        suffix: ".handler.js",
        decorate: "uppercase"
    });

    t.truthy(typeof modules.BASE === "string");
    t.truthy(typeof modules.COMMON === "string");
});

test("should be possible to use the camelize decorator", t => {
    var modules = simpleload(path.join(__dirname, "/../fixture/dir_21"), { 
            suffix: "js",
            decorate: "camelize"
        });
    t.truthy(modules.errorHandler);
    t.truthy(modules.myPlugin);
});
