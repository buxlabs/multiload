"use strict";

var expect     = require("chai").expect,
    simpleload = require("../../index.js");

describe("suffix", () => {

    it("should be possible to filter out the modules", () => {

        var path = __dirname + "/../fixtures/dir_05",
            loaded;

        loaded = simpleload(path, { suffix: "job.js" });

        expect(loaded.first.name).to.equal("first_job");
        expect(loaded.second.name).to.equal("second_job");
        expect(loaded.third.name).to.equal("third_job");

    });

    it("should be possible to get the modules as an array of values", () => {

        var path = __dirname + "/../fixtures/dir_05",
            values;
  
        values = simpleload(path, { suffix: "job.js", as: "values" });
  
        expect(values).to.be.an("array");
        expect(values[0].name).to.equal("first_job");
        expect(values[1].name).to.equal("second_job");
        expect(values[2].name).to.equal("third_job");

    });

    it("should match . in the beginning is matched correctly for suffix", () => {

        var path = __dirname + "/../fixtures/dir_06",
            modules;

        modules = simpleload(path, { suffix: ".schema.js" });

        expect(modules.module_1).to.exist;
        expect(modules.module_2).to.exist;
        expect(modules.module_3).to.exist;

        modules = simpleload(path, { suffix: ".schema.js", as: "values" });

        expect(modules[0]).to.equal("module_1");
        expect(modules[1]).to.equal("module_2");
        expect(modules[2]).to.equal("module_3");

    });

});
