"use strict";

var assert     = require("assert"),
    fs         = require("fs"),
    simpleload = require("../../index.js");

// TEST 1 SUCCESS

// ensure that the directories listed in the loaded object 
// are available in the directory you've specified
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

// TEST 2 SUCCESS

// ensure that the contents of the listed are ok
// compare it to the manually loaded dependencies
// simple strings are used in this test

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

// TEST 3 SUCCESS

// ensure, that folders in different location are loaded well too

(function (path) {

  var loaded, dirs, prop;

  loaded = simpleload(path);
  dirs = fs.readdirSync(path);

  for (prop in loaded) {
    assert(dirs.indexOf(prop) !== -1);
  }

})(__dirname + "/../fixtures/dir_01");
