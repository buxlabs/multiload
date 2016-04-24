"use strict";

const fs         = require("fs");
const path       = require("path");
const expect     = require("chai").expect;
const simpleload = require("../../index.js");

describe("simpleload", function () {

    it("should load modules", function () {

        var dir = path.join(__dirname, "/../fixtures/dir_17"),
            modules, dirs, module;

        modules = simpleload(dir);
        dirs = fs.readdirSync(dir);

        for (module in modules) {
            if (modules.hasOwnProperty(module)) {
                expect(dirs.indexOf(module)).to.not.equal(-1);
            }
        }

    });

    it("should load modules like require", function () {

        var modules = simpleload(path.join(__dirname, "/../fixtures/dir_17"));

        expect(modules.subdir_01).to.equal(require("../fixtures/dir_17/subdir_01"));
        expect(modules.subdir_02).to.equal(require("../fixtures/dir_17/subdir_02"));

    });

    it("should load modules from different locations", function () {
        var dir = path.join(__dirname, "/../fixtures/dir_01"),
            modules, dirs, module;

        modules = simpleload(dir);
        dirs = fs.readdirSync(dir);

        for (module in modules) {
            if (modules.hasOwnProperty(module)) {
                expect(dirs.indexOf(module)).to.not.equal(-1);
            }
        }
    });

});
