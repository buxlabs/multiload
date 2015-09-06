"use strict";

var assert     = require("assert"),
    simpleload = require("../../index.js");

describe("global", function () {

    it("should be possible to expose the modules globally with the global flag set to true", function () {

        (function (path) {

            var modules;
  
            modules = simpleload(path, { suffix: "model.js", global: true });
  
            assert(modules.hasOwnProperty("token"));
            assert(modules.hasOwnProperty("user"));
  
            /* globals global, user, token */
            assert(global.token === modules.token);
            assert(global.user === modules.user);
  
            assert(token === modules.token);
            assert(user === modules.user);
  
            assert(token === require("../fixtures/dir_07/token.model"));
            assert(user === require("../fixtures/dir_07/user.model"));
  
            delete global.token;
            delete global.user;
  
            assert(global.token === void 0);
            assert(global.user === void 0);

        })(__dirname + "/../fixtures/dir_07");

    });

    it("should be possible to override a global var if an override flag is passed", function () {

        (function (path) {

            var modules, exception;

            modules = simpleload(path, { suffix: "model.js", global: true });

            assert(modules.hasOwnProperty("token"));
            assert(modules.hasOwnProperty("user"));

            assert(global.token === modules.token);
            assert(global.user === modules.user);

            try {
              modules = simpleload(path, { suffix: "model.js", global: true, override: true });
            } catch (e) {
              exception = e;
            }

            assert(typeof exception === "undefined");

            delete global.token;
            delete global.user;

            assert(global.token === void 0);
          assert(global.user === void 0);

        })(__dirname + "/../fixtures/dir_07");

    });

    it("should be possible to add modules to chosen global namespace", function () {

        (function (path) {

            var modules;

            modules = simpleload(path, { suffix: "model.js", global: true, namespace: "Model" });

            assert(modules.hasOwnProperty("token"));
            assert(modules.hasOwnProperty("user"));

            assert(typeof global.Model === "object");
            assert(global.Model.token === modules.token);
            assert(global.Model.user === modules.user);

            delete global.Model.token;
            delete global.Model.user;
            delete global.Model;

            assert(global.Model === void 0);

        })(__dirname + "/../fixtures/dir_07");

    });

});