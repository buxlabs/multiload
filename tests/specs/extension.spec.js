"use strict";

var assert     = require("assert"),
    fs         = require("fs"),
    simpleload = require("../../index.js");

describe("extension", function () {

    it("should be possible to load html files", function () {

        (function (path) {

            var modules;
  
            modules = simpleload(path, {
              extension: "html"
            });
  
            assert(typeof modules.firstArticle === "string");
            assert(typeof modules.secondArticle === "string");
  
            assert(modules.firstArticle === "<h1>Hello world</h1>");
            assert(modules.secondArticle === "<h1>Second article</h1>");
  
            assert(modules.firstArticle === fs.readFileSync(path + "/firstArticle.html", "utf-8"));
            assert(modules.secondArticle === fs.readFileSync(path + "/secondArticle.html", "utf-8"));

        })(__dirname + "/../fixtures/dir_09");

    });

});

