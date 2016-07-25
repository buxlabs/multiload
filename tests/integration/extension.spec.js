"use strict";

const fs         = require("fs");
const path       = require("path");
const expect     = require("chai").expect;
const simpleload = require("../../index.js");

describe("extension", function () {

    it("should be possible to load html files", function () {

        var modules = simpleload(path.join(__dirname, "/../fixtures/dir_09"), {
            extension: "html"
        });

        expect(modules.firstArticle).to.be.a("string");
        expect(modules.secondArticle).to.be.a("string");

        expect(modules.firstArticle).to.equal("<h1>Hello world</h1>");
        expect(modules.secondArticle).to.equal("<h1>Second article</h1>");

    });

    it("should be possible to load files with extension when a folder exists", function () {

        var modules = simpleload(path.join(__dirname + "/../fixtures/dir_24"), {
            extension: "html"
        });

        expect(modules.firstArticle).to.be.a("string");
        expect(modules.secondArticle).to.be.a("string");

        expect(modules.firstArticle).to.equal("hello world1");
        expect(modules.secondArticle).to.equal("hello world2");

    });

    it("should be possible to load json files", function () {

        var modules = simpleload(path.join(__dirname, "/../fixtures/dir_18"), {
            extension: "json"
        });

        expect(JSON.parse(modules.data_01)).to.deep.equal({ hello: "world" });
        expect(JSON.parse(modules.data_02)).to.deep.equal({ world: "hello" });

    });

});

