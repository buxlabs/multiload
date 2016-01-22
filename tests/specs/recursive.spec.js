"use strict";

var expect     = require("chai").expect,
    simpleload = require("../../index.js");

describe("recursive", () => {

    it("should be possible to load modules recursively", () => {

        var path = __dirname + "/../fixtures/dir_14",
            modules;

        modules = simpleload(path, { 
            suffix: "event.js",
            recursive: true
        });

        expect(modules["ad/created"]).to.be.defined;
        expect(modules["user/created"]).to.be.defined;

    });

});