"use strict";

const path       = require("path");
const expect     = require("chai").expect;
const simpleload = require("../../index.js");

describe("error handling", function () {

    it("should throw an error if path is not provided", function () {
        expect(function () {
            simpleload();
        }).to.throw();
    });

    it("should throw an error if such directory doesn't exist", function () {
        expect(function () {
            simpleload(path.join(__dirname, "/../fixtures/dir_XX"));
        }).to.throw();
    });

    it("should throw an error if you want to override an existing global var", function () {

        var modules = simpleload(path.join(__dirname, "/../fixtures/dir_07"), {
            suffix: "model.js",
            global: true
        });

        expect(modules.token).to.exist;
        expect(modules.user).to.exist;

        expect(global.token).to.equal(modules.token);
        expect(global.user).to.equal(modules.user);

        expect(function () {
            simpleload(path.join(__dirname, "/../fixtures/dir_07"), { 
                suffix: "model.js", global: true 
            });
        }).to.throw();

        delete global.token;
        delete global.user;

        expect(global.token).to.not.exist;
        expect(global.user).to.not.exist;

    });

    it("should throw an error if no modules were found", function () {
        expect(function () {
            simpleload(path.join(__dirname, "/../fixtures/dir_10"));
        }).to.throw();
    });

    it("should throw an error if a predefined decorator doesn't exist", function () {
        expect(function () {
            simpleload(path.join(__dirname, "/../fixtures/dir_08"), {
                decorate: ";owercase"
            });
        }).to.throw();
    });

});

