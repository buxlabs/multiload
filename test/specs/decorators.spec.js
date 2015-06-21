"use strict";

var assert     = require("assert"),
    simpleload = require("../../index.js");

// TEST 1 SUCCESS

// it should be possible to capitalize the names of the modules

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

// TEST 2 SUCCESS

// it should be possible to capitalize the names of the modules with
// use of a predefined function

(function (path) {

  var modules;

  modules = simpleload(path, { 
    suffix: ".model.js", 
    decorate: "capitalize"
  });

  assert(typeof modules.User === "string", "modules.User should be defined");
  assert(typeof modules.Token === "string", "modules.Token should be defined");

})(__dirname + "/../fixtures/dir_07");

// TEST 3 SUCCESS

// it should be possible to lowercase the names of modules with 
// use of a predefined function

(function (path) {

  var modules;

  modules = simpleload(path, {
    suffix: ".handler.js",
    decorate: "lowercase"
  });

  assert(typeof modules.base === "string", "modules.base should be defined");
  assert(typeof modules.common === "string", "modules.common should be defined");

})(__dirname + "/../fixtures/dir_08");

// TEST 4 SUCCESS

// it should be possible to use the eventize decorator

(function (path) {

  var modules;

  modules = simpleload(path, {
    suffix: ".event.js",
    decorate: "eventize"
  });

  assert(modules["user:account:locked"] === "userAccountLocked");
  assert(modules["user:forgot:password"] === "userForgotPassword");
  assert(modules["user:registered"] === "userRegistered");

})(__dirname + "/../fixtures/dir_12");