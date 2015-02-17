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
		if (loaded.hasOwnProperty(prop)) {
			assert(dirs.indexOf(prop) !== -1);
		}
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

})(__dirname + "/specdir_01");

// TEST 3 SUCCESS

// ensure that the contents of the listed are ok
// compare it to the manually loaded dependencies
// simple strings are used in this test

(function (path) {

	var loaded, dir1text, dir2text, dir3text;

	loaded = simpleload(path);
	dir1text   = require("./specdir_02");
	dir2text   = require("./specdir_03");
	dir3text   = require("./specdir_04");

	assert(loaded.specdir_02 === dir1text);
	assert(loaded.specdir_03 === dir2text);
	assert(loaded.specdir_04 === dir3text);

})(__dirname);

// TEST 4 SUCCESS

// ensure, that it's possible to filter out the modules

(function (path) {

	var loaded;

	loaded = simpleload(path, { suffix: "job.js" });

	assert(loaded.first.name === "first_job");
	assert(loaded.second.name === "second_job");
	assert(loaded.third.name === "third_job");

})(__dirname + "/specdir_05");

// TEST 5 SUCCESS

// test if it's possible to get the modules as array of values

(function (path) {

	var values;

	values = simpleload(path, { suffix: "job.js", as: "values" });

	assert(Array.isArray(values));
	assert(values[0].name === "first_job");
	assert(values[1].name === "second_job");
	assert(values[2].name === "third_job");

})(__dirname + "/specdir_05");

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

})(__dirname + "/specdir_06");

// TEST 7 SUCCESS

// test if it's possible to expose the modules globally with the global flag set to true
(function (path) {

	var modules;

	modules = simpleload(path, { suffix: "model.js", global: true });

	assert(modules.hasOwnProperty("token"));
	assert(modules.hasOwnProperty("user"));

	assert(global.token === modules.token);
	assert(global.user === modules.user);

	assert(token === modules.token);
	assert(user === modules.user);

	assert(token === require("./specdir_07/token.model"));
	assert(user === require("./specdir_07/user.model"));

	delete global.token;
	delete global.user;

	assert(global.token === void 0);
	assert(global.user === void 0);

})(__dirname + "/specdir_07");

// TEST 8 SUCCESS

// it should be possible to override a global var if an override flag is passed

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

})(__dirname + "/specdir_07");

// TEST 9 SUCCESS

// it should be possible to add modules to chosen global namespace
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

})(__dirname + "/specdir_07");

// TEST 10 success

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

})(__dirname + "/specdir_07");

// TEST 11 success

// it should be possible to capitalize the names of the modules with
// use of a predefined function

(function (path) {

	var modules;

	modules = simpleload(path, { 
		suffix: "model.js", 
		decorate: "capitalize"
	});

	assert(typeof modules.User === "string", "modules.User should be defined");
	assert(typeof modules.Token === "string", "modules.Token should be defined");

})(__dirname + "/specdir_07");

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

})(__dirname + "/specdir_XX");

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

})(__dirname + "/specdir_07");

util.log("All tests passed, no failures.");