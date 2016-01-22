"use strict";

var expect     = require("chai").expect,
    fs         = require("fs"),
    simpleload = require("../../index.js");

describe("simpleload", () => {

    it("should load modules", () => {

        var path = __dirname + "/../fixtures",
            modules, dirs, module;

        modules = simpleload(path);
        dirs = fs.readdirSync(path);

        for (module in modules) {
            if (modules.hasOwnProperty(module)) {
                expect(dirs.indexOf(module)).to.not.equal(-1);
            }
        }

    });

    it("should load modules like require", () => {

        var path = __dirname + "/../fixtures",
            modules;

        modules = simpleload(path);

        expect(modules.dir_02).to.equal(require("../fixtures/dir_02"));
        expect(modules.dir_03).to.equal(require("../fixtures/dir_03"));
        expect(modules.dir_04).to.equal(require("../fixtures/dir_04"));

    });

    it("should load modules from different locations", () => {
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
