"use strict";

var expect     = require("chai").expect,
    simpleload = require("../../index.js");

describe("global", () => {

    it("should be possible to expose the modules globally with the global flag set to true", () => {

        var path = __dirname + "/../fixtures/dir_07",
            modules;

        modules = simpleload(path, { suffix: "model.js", global: true });

        expect(modules.token).to.exist;
        expect(modules.user).to.exist;

        expect(global.token).to.equal(modules.token);
        expect(global.user).to.equal(modules.user);
        /* global token, user */
        expect(token).to.equal(modules.token);
        expect(user).to.equal(modules.user);

        expect(token).to.equal(require("../fixtures/dir_07/token.model"));
        expect(user).to.equal(require("../fixtures/dir_07/user.model"));

        delete global.token;
        delete global.user;

        expect(global.token).to.not.exist;
        expect(global.user).to.not.exist;

    });

    it("should be possible to override a global var if an override flag is passed", () => {

        var path = __dirname + "/../fixtures/dir_07",
            modules, exception;

        modules = simpleload(path, { suffix: "model.js", global: true });

        expect(modules.token).to.exist;
        expect(modules.user).to.exist;

        expect(global.token).to.equal(modules.token);
        expect(global.user).to.equal(modules.user);

        try {
            simpleload(path, { suffix: "model.js", global: true, override: true });
        } catch (e) {
            exception = e;
        }

        expect(exception).to.not.exist;

        delete global.token;
        delete global.user;

        expect(global.token).to.not.exist;
        expect(global.user).to.not.exist;

    });

    it("should be possible to add modules to chosen global namespace", () => {

        var path = __dirname + "/../fixtures/dir_07",
            modules;

        modules = simpleload(path, { suffix: "model.js", global: true, namespace: "Model" });

        expect(modules.token).to.exist;
        expect(modules.user).to.exist;

        expect(global.Model.token).to.equal(modules.token);
        expect(global.Model.user).to.equal(modules.user);

        delete global.Model.token;
        delete global.Model.user;
        delete global.Model;

        expect(global.Model).to.not.exist;

    });

});