"use strict";

const expect     = require("chai").expect;
const simpleload = require("../../index.js");

describe("decorators", function () {

    it("should be possible to capitalize the names of the modules", function () {

        var path = __dirname + "/../fixtures/dir_07",
            modules;

        modules = simpleload(path, { 
            suffix: "model.js", 
            decorate: function (name) {
                return name[0].toUpperCase() + name.slice(1);
            }
        });

        expect(modules.User).to.be.a("string");
        expect(modules.Token).to.be.a("string");

    });

    it("should be possible to capitalize with a predefined function", function () {

        var path = __dirname + "/../fixtures/dir_07",
            modules;

        modules = simpleload(path, { 
            suffix: ".model.js", 
            decorate: "capitalize"
        });

        expect(modules.User).to.be.a("string");
        expect(modules.Token).to.be.a("string");

    });

    it("should be possible to lowercase with a predefined function", function () {

        var path = __dirname + "/../fixtures/dir_08",
            modules;

        modules = simpleload(path, {
            suffix: ".handler.js",
            decorate: "lowercase"
        });

        expect(modules.base).to.be.a("string");
        expect(modules.common).to.be.a("string");

    });

    it("should be possible to use the eventize decorator", function () {

        var path = __dirname + "/../fixtures/dir_12",
            modules;

        modules = simpleload(path, {
            suffix: ".event.js",
            decorate: "eventize"
        });

        expect(modules["user:account:locked"]()).to.equal("userAccountLocked");
        expect(modules["user:forgot:password"]()).to.equal("userForgotPassword");
        expect(modules["user:registered"]()).to.equal("userRegistered");

    });

    it("should be possible to use the uppercase decorator", function () {

        var path = __dirname + "/../fixtures/dir_08",
            modules;

        modules = simpleload(path, {
            suffix: ".handler.js",
            decorate: "uppercase"
        });

        expect(modules.BASE).to.be.a("string");
        expect(modules.COMMON).to.be.a("string");

    });

});
