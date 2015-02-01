/* globals require, __dirname */
"use strict";

var assert     = require("assert"),
		fs         = require("fs"),
		util       = require("util"),
  	simpleload = require("../index.js");

// mocha could be used
// the tests are really simple so let's not add any dependencies yet


util.log("Starting the tests.");

// SUCCESS TESTS

// TEST 1 SUCCESS

// ensure that the directories listed in the loaded object 
// are available in the directory you've specified
(function (path) {

	var loaded, dirs, prop;

	loaded = simpleload(path);
	dirs = fs.readdirSync(path);

	for (prop in loaded) {
		assert(dirs.indexOf(prop) !== -1);
	}

})(__dirname);


// TEST 2 SUCCESS

// ensure, that folders in different location are loaded well too

(function (path) {

	var loaded, dirs, prop;

	loaded = simpleload(path);
	dirs = fs.readdirSync(path);

	for (prop in loaded) {
		assert(dirs.indexOf(prop) !== -1);
	}

})(__dirname + "/different_location_1");

// TEST 3 SUCCESS

// ensure that the contents of the listed are ok
// compare it to the manually loaded dependencies
// simple strings are used in this test

(function (path) {

	var loaded, dir1text, dir2text, dir3text;

	loaded = simpleload(path);
	dir1text   = require("./test_directory_1");
	dir2text   = require("./test_directory_2");
	dir3text   = require("./test_directory_3");

	assert(loaded.test_directory_1 === dir1text);
	assert(loaded.test_directory_2 === dir2text);
	assert(loaded.test_directory_3 === dir3text);

})(__dirname);

// TEST 4 SUCCESS

// ensure, that it's possible to filter out the modules

(function (path) {

	var loaded;

	loaded = simpleload(path, { suffix: "job.js" });

	assert(loaded.first.name === "first_job");
	assert(loaded.second.name === "second_job");
	assert(loaded.third.name === "third_job");

})(__dirname + "/test_directory_4");

// TEST 5 SUCCESS

// test if it's possible to get the modules as array of values

(function (path) {

	var values;

	values = simpleload(path, { suffix: "job.js", as: "values" });

	assert(Array.isArray(values));
	assert(values[0].name === "first_job");
	assert(values[1].name === "second_job");
	assert(values[2].name === "third_job");

})(__dirname + "/test_directory_4");

// TEST 6 SUCCESS

// test if a . in the beginning is matched correctly for suffix
(function (path) {

	var modules;

	modules = simpleload(path, { suffix: ".schema.js" });

	assert(modules.hasOwnProperty("module_1"));
	assert(modules.hasOwnProperty("module_2"));
	assert(modules.hasOwnProperty("module_3"));

	modules = simpleload(path, { suffix: ".schema.js", as: "values" });

	assert(modules[0] === "module_1");
	assert(modules[1] === "module_2");
	assert(modules[2] === "module_3");

})(__dirname + "/test_directory_5");

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

})(__dirname + "/non_existing_directory_123");

// 


util.log("All tests passed, no failures.");