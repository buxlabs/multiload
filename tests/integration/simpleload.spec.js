"use strict";

const expect     = require("chai").expect;
const fs         = require("fs");
const simpleload = require("../../index.js");

describe("simpleload", function () {

    it("should load modules", function () {

        var path = __dirname + "/../fixtures/dir_17",
            modules, dirs, module;

        modules = simpleload(path);
        dirs = fs.readdirSync(path);

        for (module in modules) {
            if (modules.hasOwnProperty(module)) {
                expect(dirs.indexOf(module)).to.not.equal(-1);
            }
        }

    });

    it("should load modules like require", function () {

        var path = __dirname + "/../fixtures/dir_17",
            modules;

        modules = simpleload(path);

        expect(modules.subdir_01).to.equal(require("../fixtures/dir_17/subdir_01"));
        expect(modules.subdir_02).to.equal(require("../fixtures/dir_17/subdir_02"));

    });

    it("should load modules from different locations", function () {
        var path = __dirname + "/../fixtures/dir_01",
            modules, dirs, module;

        modules = simpleload(path);
        dirs = fs.readdirSync(path);

        for (module in modules) {
            if (modules.hasOwnProperty(module)) {
                expect(dirs.indexOf(module)).to.not.equal(-1);
            }
        }
    });

});
