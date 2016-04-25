"use strict";

const expect     = require("chai").expect;
const simpleload = require("../../index.js");

describe("error handling", function () {

    it("should throw an error if path is not provided", function () {

        var exception;

        try {
            simpleload();
        } catch (e) {
            exception = e;
        }

        expect(exception).to.be.an.instanceof(Error);

    });

    it("should throw an error if such directory doesn't exist", function () {

        var exception,
            path = __dirname + "/../fixtures/dir_XX";

        try {
            simpleload(path);
        } catch (e) {
            exception = e;
        }

        expect(exception).to.be.an.instanceof(Error);

    });

    it("should throw an error if you want to override an existing global var", function () {

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

    it("should throw an error if no modules were found", function () {

        var exception,
            path = __dirname + "/../fixtures/dir_10";

        try {
            simpleload(path);
        } catch (e) {
            exception = e;
        }

        expect(exception.message.indexOf("no modules found")).to.not.equal(-1);

    });

    it("should throw an error if a predefined decorator doesn't exist", function () {
    
        var exception,
            path = __dirname + "/../fixtures/dir_08";

        try {
            simpleload(path, {
                decorate: ";owercase"
            });
        } catch (e) {
            exception = e;
        }

        expect(exception).to.be.an.instanceof(Error);

    });

});

