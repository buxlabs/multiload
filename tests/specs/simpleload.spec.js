"use strict";

var assert     = require("assert"),
    fs         = require("fs"),
    simpleload = require("../../index.js");

describe("simpleload", function () {

    it("should load modules", function () {

        (function (path) {

          var loaded, dirs, prop;

          loaded = simpleload(path);
          dirs = fs.readdirSync(path);

          for (prop in loaded) {
            if (loaded.hasOwnProperty(prop)) {
              assert(dirs.indexOf(prop) !== -1);
            }
          }

        })(__dirname + "/../fixtures");

    });

    it("should load modules like require", function () {
        (function (path) {

            var loaded, dir1text, dir2text, dir3text;
  
            loaded = simpleload(path);
            dir1text   = require("../fixtures/dir_02");
            dir2text   = require("../fixtures/dir_03");
            dir3text   = require("../fixtures/dir_04");
  
            assert(loaded.dir_02 === dir1text);
            assert(loaded.dir_03 === dir2text);
            assert(loaded.dir_04 === dir3text);

        })(__dirname + "/../fixtures");
    });

    it("should load modules from different locations", function () {
        (function (path) {

            var loaded, dirs, prop;
  
            loaded = simpleload(path);
            dirs = fs.readdirSync(path);
  
            for (prop in loaded) {
                assert(dirs.indexOf(prop) !== -1);
            }

        })(__dirname + "/../fixtures/dir_01");
    });

});
