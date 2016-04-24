"use strict";

const path       = require("path");
const expect     = require("chai").expect;
const simpleload = require("../../index.js");

describe("exclude", function () {

    it("should be possible to exclude given modules", function () {

        var modules = simpleload(path.join(__dirname, "/../fixtures/dir_11"), {
            suffix: "service.js"
        });
        expect(modules.base).to.equal(require("../fixtures/dir_11/base.service"));
        expect(modules.other).to.equal(require("../fixtures/dir_11/other.service"));
        expect(Object.keys(modules)).to.have.length(2);

        modules = simpleload(path.join(__dirname, "/../fixtures/dir_11"), {
            suffix: "service.js",
            exclude: "base"
        });
        expect(modules.other === require("../fixtures/dir_11/other.service"));
        expect(Object.keys(modules)).to.have.length(1);

    });

    it("should be possible to exclude given modules when array is passed", function () {

        var modules = simpleload(path.join(__dirname, "/../fixtures/dir_11"), {
            suffix: "service.js"
        });
        expect(modules.base === require("../fixtures/dir_11/base.service"));
        expect(modules.other === require("../fixtures/dir_11/other.service"));
        expect(Object.keys(modules)).to.have.length(2);

        modules = simpleload(path.join(__dirname, "/../fixtures/dir_11"), {
            suffix: "service.js",
            exclude: ["base"]
        });
        expect(modules.other === require("../fixtures/dir_11/other.service"));
        expect(Object.keys(modules)).to.have.length(1);

    });

    it("shouldn't exclude if falsy option was falled", function () {

        var modules = simpleload(path.join(__dirname, "/../fixtures/dir_11"), {
            suffix: "service.js",
            exclude: false
        });
        expect(modules.base === require("../fixtures/dir_11/base.service"));
        expect(modules.other === require("../fixtures/dir_11/other.service"));
        expect(Object.keys(modules)).to.have.length(2);

    });

});
