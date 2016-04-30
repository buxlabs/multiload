"use strict";

const path       = require("path");
const expect     = require("chai").expect;
const simpleload = require("../../index.js");

describe("decorators", function () {

    it("should be possible to capitalize the names of the modules", function () {

        var modules = simpleload(path.join(__dirname, "/../fixtures/dir_07"), { 
            suffix: "model.js", 
            decorate: function (name) {
                return name[0].toUpperCase() + name.slice(1);
            }
        });

        expect(modules.User).to.be.a("string");
        expect(modules.Token).to.be.a("string");

    });

    it("should be possible to capitalize with a predefined function", function () {

        var modules = simpleload(path.join(__dirname, "/../fixtures/dir_07"), { 
            suffix: ".model.js", 
            decorate: "capitalize"
        });

        expect(modules.User).to.be.a("string");
        expect(modules.Token).to.be.a("string");

    });

    it("should be possible to lowercase with a predefined function", function () {

        var modules = simpleload(path.join(__dirname, "/../fixtures/dir_08"), {
            suffix: ".handler.js",
            decorate: "lowercase"
        });

        expect(modules.base).to.be.a("string");
        expect(modules.common).to.be.a("string");

    });

    it("should be possible to use the eventize decorator", function () {

        var modules = simpleload(path.join(__dirname, "/../fixtures/dir_12"), {
            suffix: ".event.js",
            decorate: "eventize"
        });

        expect(modules["user:account:locked"]()).to.equal("userAccountLocked");
        expect(modules["user:forgot:password"]()).to.equal("userForgotPassword");
        expect(modules["user:registered"]()).to.equal("userRegistered");

    });

    it("should be possible to use the uppercase decorator", function () {

        var modules = simpleload(path.join(__dirname, "/../fixtures/dir_08"), {
            suffix: ".handler.js",
            decorate: "uppercase"
        });

        expect(modules.BASE).to.be.a("string");
        expect(modules.COMMON).to.be.a("string");

    });

    it("should be possible to use the camelize decorator", function () {

        var modules = simpleload(path.join(__dirname, "/../fixtures/dir_21"), { 
                suffix: "js",
                decorate: "camelize"
            });
        expect(modules.errorHandler).to.exist;
        expect(modules.myPlugin).to.exist;

    });

});
