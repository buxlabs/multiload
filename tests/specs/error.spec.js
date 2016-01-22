"use strict";

var expect     = require("chai").expect,
    simpleload = require("../../index.js");

describe("error handling", () => {

    it("should throw an error if such directory doesn't exist", () => {

        var exception,
            path = __dirname + "/../fixtures/dir_XX";

        try {
            simpleload(path);
        } catch (e) {
            exception = e;
        }

        expect(exception).to.be.an.instanceof(Error);

    });

    it("should throw an error if you want to override an existing global var", () => {

        var modules, exception,
            path = __dirname + "/../fixtures/dir_07";

        modules = simpleload(path, { suffix: "model.js", global: true });

        expect(modules.token).to.exist;
        expect(modules.user).to.exist;

        expect(global.token).to.equal(modules.token);
        expect(global.user).to.equal(modules.user);

        try {
            simpleload(path, { suffix: "model.js", global: true });
        } catch (e) {
            exception = e;
        }

        expect(exception).to.be.an.instanceof(Error);

        delete global.token;
        delete global.user;

        expect(global.token).to.not.exist;
        expect(global.user).to.not.exist;

    });

    it("should throw an error in case of an unsupported extension", () => {

        var exception,
            path = __dirname + "/../fixtures/dir_09";

        try {
            simpleload(path, {
                extension: "exe"
            });
        } catch (e) {
            exception = e;
        }
        // expect that the exception will occur
        expect(exception).to.be.an.instanceof(Error);
        // we expect that the error message will contain the
        // extension name
        expect(exception.message.indexOf("exe")).to.not.equal(-1);

    });

    it("should throw an error if no modules were found", () => {

        var exception,
            path = __dirname + "/../fixtures/dir_10";

        try {
            simpleload(path);
        } catch (e) {
            exception = e;
        }

        expect(exception.message.indexOf("no modules found")).to.not.equal(-1);

    });

});
