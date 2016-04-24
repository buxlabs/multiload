"use strict";

const path       = require("path");
const expect     = require("chai").expect;
const simpleload = require("../../index.js");

describe("recursive", function () {

    it("should be possible to load modules recursively", function () {

        var modules = simpleload(path.join(__dirname, "/../fixtures/dir_14"), { 
            suffix: "event.js",
            recursive: true
        });

        expect(modules["ad/created"]).to.be.defined;
        expect(modules["user/created"]).to.be.defined;

    });

    it("should be possible to load modules from different folders recursively (example 1)", function () {

        var modules = simpleload(path.join(__dirname, "/../fixtures/dir_15"), {
            extension: "html",
            recursive: true
        });

        expect(modules["en/terms-of-use"]).to.be.defined;
        expect(modules["pl/terms-of-use"]).to.be.defined;

    });

    it("should be possible to load modules from different folders recursively (example 2)", function () {

        var modules = simpleload(path.join(__dirname, "/../fixtures/dir_16"), {
            extension: "html",
            recursive: true
        });

        expect(modules["en/four-years-old-seedling-40-45cm"]).to.be.defined;
        expect(modules["en/three-years-old-seedling-30-35cm"]).to.be.defined;
        expect(modules["en/two-years-old-seedling-20-25cm"]).to.be.defined;
        expect(modules["en/two-years-old-seedling-10-15cm"]).to.be.defined;
        expect(modules["pl/sadzonka-czteroletnia-40-45cm"]).to.be.defined;
        expect(modules["pl/sadzonka-dwuletnia-15-20cm"]).to.be.defined;
        expect(modules["pl/sadzonka-dwuletnia-25-30cm"]).to.be.defined;
        expect(modules["pl/sadzonka-roczna-10-15cm"]).to.be.defined;
        expect(modules["pl/sadzonka-trzyletnia-30-35cm"]).to.be.defined;

    });

    it("should be possible to load modules from different folders recursively (example 3)", function () {

        var modules = simpleload(path.join(__dirname, "/../fixtures/dir_19"), {
            recursive: true,
            suffix: "event.js"
        });

        expect(modules["logged.event"]).to.be.defined;
        expect(modules["article/created.event"]).to.be.defined;
        expect(modules["user/account/deleted.event"]).to.be.defined;
        expect(modules["user/account/locked.event"]).to.be.defined;

    });

});
