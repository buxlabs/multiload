"use strict";

const simpleload = require("../../index.js");
const assert = require("assert");

describe("lazy", function () {

	it("should be possible to load modules lazily", function () {

		var plugins = simpleload(__dirname, { lazy: true });

		assert(plugins.eslint, "eslint should be available");

	});
	
});
