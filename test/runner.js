"use strict";

var assert     = require("assert"),
    util       = require("util"),
    simpleload = require("../index.js");

// mocha could be used
// the tests are really simple so let's not add any dependencies yet
// simpleload should be synchronous, as it is used for loading simple
// dependencies or modules at start

var startDate, endDate;

startDate = new Date();
util.log("Starting the tests.");

// use simpleload to load the specs
var specs = simpleload(__dirname + "/specs", { suffix: "spec.js", as: "values" });
assert(specs.length === 8);

endDate = new Date();
util.log("All tests passed, no failures. They took " + (endDate - startDate) + " ms to run.");