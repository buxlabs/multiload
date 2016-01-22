"use strict";

var expect     = require("chai").expect,
    fs         = require("fs"),
    simpleload = require("../../index.js");

describe("extension", () => {

    it("should be possible to load html files", () => {

        var path = __dirname + "/../fixtures/dir_09",
            modules;

        modules = simpleload(path, {
            extension: "html"
        });

        expect(modules.firstArticle).to.be.a("string");
        expect(modules.secondArticle).to.be.a("string");

        expect(modules.firstArticle).to.equal("<h1>Hello world</h1>");
        expect(modules.secondArticle).to.equal("<h1>Second article</h1>");

        expect(modules.firstArticle).to.equal(fs.readFileSync(path + "/firstArticle.html", "utf-8"));
        expect(modules.secondArticle).to.equal(fs.readFileSync(path + "/secondArticle.html", "utf-8"));

    });

});

