var assert     = require("assert"),
	fs         = require("fs"),
	util       = require("util"),
    simpleload = require("../index.js");

// mocha could be used
// the tests are really simple so let's not add any dependencies yet


util.log("Starting the tests.");

// TEST 1

// ensure that the directories listed in the loaded object 
// are available in the directory you've specified
(function (path) {

	var loaded, dirs, prop;

	loaded = simpleload(path);
	dirs = fs.readdirSync(path);
	prop;

	for (prop in loaded) {
		assert(dirs.indexOf(prop) !== -1);
	}

})(__dirname);


// TEST 2

// ensure, that folders in different location are loaded well too

(function (path) {

	var loaded, dirs, prop;

	loaded = simpleload(path);
	dirs = fs.readdirSync(path);
	prop;

	for (prop in loaded) {
		assert(dirs.indexOf(prop) !== -1);
	}

})(__dirname + "/different_location_1");

// TEST 3

// ensure that the contents of the listed are ok
// compare it to the manually loaded dependencies
// simple strings are used in this test

(function (path) {

	var loaded, dir1, dir2, dir3;

	loaded = simpleload(path);
	dir1text   = require("./test_directory_1");
	dir2text   = require("./test_directory_2");
	dir3text   = require("./test_directory_3");

	assert(loaded.test_directory_1 === dir1text);
	assert(loaded.test_directory_2 === dir2text);
	assert(loaded.test_directory_3 === dir3text);

})(__dirname);


util.log("All tests passed, no failures.");