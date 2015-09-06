"use strict";

var assert     = require("assert"),
    simpleload = require("../../index.js");

describe("suffix", function () {

    it("should be possible to filter out the modules", function () {

        (function (path) {

            var loaded;
  
            loaded = simpleload(path, { suffix: "job.js" });
  
            assert(loaded.first.name === "first_job");
            assert(loaded.second.name === "second_job");
            assert(loaded.third.name === "third_job");

        })(__dirname + "/../fixtures/dir_05");

    });

    it("should be possible to get the modules as an array of values", function () {

        (function (path) {

            var values;
      
            values = simpleload(path, { suffix: "job.js", as: "values" });
      
            assert(Array.isArray(values));
            assert(values[0].name === "first_job");
            assert(values[1].name === "second_job");
            assert(values[2].name === "third_job");

        })(__dirname + "/../fixtures/dir_05");

    });

    it("should match . in the beginning is matched correctly for suffix", function () {

        (function (path) {

            var modules;
  
            modules = simpleload(path, { suffix: ".schema.js" });
  
            assert(modules.hasOwnProperty("module_1"));
            assert(modules.hasOwnProperty("module_2"));
            assert(modules.hasOwnProperty("module_3"));
  
            modules = simpleload(path, { suffix: ".schema.js", as: "values" });
  
            assert(modules[0] === "module_1");
            assert(modules[1] === "module_2");
            assert(modules[2] === "module_3");

        })(__dirname + "/../fixtures/dir_06");

    });

});
