"use strict";

var assert     = require("assert"),
    simpleload = require("../../index.js");

describe("decorators", function () {

    it("should be possible to capitalize the names of the modules", function () {

        (function (path) {

            var modules;
  
            modules = simpleload(path, { 
              suffix: "model.js", 
              decorate: function (name) {
                return name[0].toUpperCase() + name.slice(1);
              }
            });
  
            assert(typeof modules.User === "string", "modules.User should be defined");
            assert(typeof modules.Token === "string", "modules.Token should be defined");

        })(__dirname + "/../fixtures/dir_07");

    });

    it("should be possible to capitalize with a predefined function", function () {

        (function (path) {

            var modules;
  
            modules = simpleload(path, { 
              suffix: ".model.js", 
              decorate: "capitalize"
            });
  
            assert(typeof modules.User === "string", "modules.User should be defined");
            assert(typeof modules.Token === "string", "modules.Token should be defined");

        })(__dirname + "/../fixtures/dir_07");

    });

    it("should be possible to lowercase with a predefined function", function () {

        (function (path) {

            var modules;
  
            modules = simpleload(path, {
              suffix: ".handler.js",
              decorate: "lowercase"
            });
  
            assert(typeof modules.base === "string", "modules.base should be defined");
            assert(typeof modules.common === "string", "modules.common should be defined");

        })(__dirname + "/../fixtures/dir_08");

    });

    it("should be possible to use the eventize decorator", function () {

        (function (path) {

            var modules;
  
            modules = simpleload(path, {
              suffix: ".event.js",
              decorate: "eventize"
            });
  
            assert(modules["user:account:locked"]() === "userAccountLocked");
            assert(modules["user:forgot:password"]() === "userForgotPassword");
            assert(modules["user:registered"]() === "userRegistered");

        })(__dirname + "/../fixtures/dir_12");

    });

});