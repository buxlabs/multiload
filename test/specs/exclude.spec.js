"use strict";

var assert     = require("assert"),
    simpleload = require("../../index.js");

// TEST 1 SUCCESS

// it should be possible to exclude given modules

(function (path) {

  var loaded;

  loaded = simpleload(path, { suffix: "service.js" });
  assert(loaded.base === require("../fixtures/dir_11/base.service"));
  assert(loaded.other === require("../fixtures/dir_11/other.service"));
  assert(Object.keys(loaded).length === 2);


  loaded = simpleload(path, { suffix: "service.js", exclude: "base" });
  assert(loaded.other === require("../fixtures/dir_11/other.service"));
  assert(Object.keys(loaded).length === 1);

})(__dirname + "/../fixtures/dir_11");

// TEST 2 SUCCESS

// it should be possible to exclude given modules when array is passed

(function (path) {

  var loaded;

  loaded = simpleload(path, { suffix: "service.js" });
  assert(loaded.base === require("../fixtures/dir_11/base.service"));
  assert(loaded.other === require("../fixtures/dir_11/other.service"));
  assert(Object.keys(loaded).length === 2);


  loaded = simpleload(path, { suffix: "service.js", exclude: ["base"] });
  assert(loaded.other === require("../fixtures/dir_11/other.service"));
  assert(Object.keys(loaded).length === 1);

})(__dirname + "/../fixtures/dir_11");

