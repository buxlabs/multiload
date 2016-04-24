"use strict";

const path       = require("path");
const chai       = require("chai");
const simpleload = require("../../index.js");
const expect     = chai.expect;

describe("suffix", function () {

    it("should be possible to filter out the modules", function () {

        var dir = path.join(__dirname, "/../fixtures/dir_05");
        var modules = simpleload(dir, { suffix: "job.js" });

        expect(modules.first.name).to.equal("first_job");
        expect(modules.second.name).to.equal("second_job");
        expect(modules.third.name).to.equal("third_job");

    });

    it("should be possible to get the modules as an array of values", function () {

        var dir = path.join(__dirname, "/../fixtures/dir_05");
        var values = simpleload(dir, { suffix: "job.js", as: "values" });
  
        expect(values).to.be.an("array");
        expect(values[0].name).to.equal("first_job");
        expect(values[1].name).to.equal("second_job");
        expect(values[2].name).to.equal("third_job");

    });

    it("should match . in the beginning is matched correctly for suffix", function () {

        var dir = path.join(__dirname, "/../fixtures/dir_06");
        var modules = simpleload(dir, { suffix: ".schema.js" });

        expect(modules.module_1).to.exist;
        expect(modules.module_2).to.exist;
        expect(modules.module_3).to.exist;

        modules = simpleload(dir, { suffix: ".schema.js", as: "values" });

        expect(modules[0]).to.equal("module_1");
        expect(modules[1]).to.equal("module_2");
        expect(modules[2]).to.equal("module_3");

    });

    it("shouldn't load files without suffix", function () {

        var dir = path.join(__dirname, "/../fixtures/dir_20");
        var modules = simpleload(dir, { suffix: "event.js" });

        expect(modules.loaded).to.exist;
        expect(modules.uploaded).to.exist;
        expect(Object.keys(modules)).to.have.length.of(2);

    });

});
