"use strict";

const simpleload = require("../../index.js");
const assert = require("assert");

describe("lazy", function () {

    it("should reserve given namespaces", function () {

        var plugins = simpleload(__dirname + "/../fixtures/dir_22/package.json", { lazy: true });

        assert(plugins.chai, "chai should be defined");
        assert(plugins.eslint, "eslint should be available");
        assert(plugins.istanbul, "istanbul should be defined");
        assert(plugins.mocha, "mocha should be defined");
        assert(plugins.coveralls, "coveralls should be defined");

    });

    it("should load the module on demand", function () {

        this.timeout(5000);

        var plugins = simpleload(__dirname + "/../fixtures/dir_22/package.json", { lazy: true });
        var eslint = plugins.eslint();
        assert(eslint, "eslint should be loaded on demand");

    });
    
});
