"use strict";

var assert     = require("assert"),
    simpleload = require("../../index.js");

// ERROR TESTS

// TEST 1 ERROR

// it should throw an error if such directory doesn't exist

(function (path) {

  var loaded, exception;

  try {
    loaded = simpleload(path);
  } catch (e) {
    exception = e;
  }

  assert(typeof exception === "object");

})(__dirname + "/dir_XX");

// TEST 2 ERROR

// it should throw an error if you want to override an existing global var

(function (path) {

  var modules, exception;

  modules = simpleload(path, { suffix: "model.js", global: true });

  assert(modules.hasOwnProperty("token"));
  assert(modules.hasOwnProperty("user"));

  assert(global.token === modules.token);
  assert(global.user === modules.user);

  try {
    modules = simpleload(path, { suffix: "model.js", global: true });
  } catch (e) {
    exception = e;
  }

  assert(typeof exception === "object");

  delete global.token;
  delete global.user;

  assert(global.token === void 0);
  assert(global.user === void 0);

})(__dirname + "/dir_07");

// TEST 3 ERROR

// it should throw an error in case of an unsupported extension

(function (path) {

  var loaded, exception;

  try {
    loaded = simpleload(path, {
      extension: "exe"
    });
  } catch (e) {
    exception = e;
  }
  // expect that the exception will occur
  assert(typeof exception === "object");
  // we expect that the error message will contain the
  // extension name
  assert(exception.message.indexOf("exe") !== -1);

})(__dirname + "/dir_09");

// TEST 4 ERROR

// it should throw an error if 
// no modules were found

(function (path) {


  var exception;

  try {
    simpleload(path);
  } catch (e) {
    exception = e;
  }

  assert(exception);
  assert(exception.message.indexOf("no modules found") !== -1);

})(__dirname + "/dir_10");