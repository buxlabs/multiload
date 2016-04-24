"use strict";

const path       = require("path");
const expect     = require("chai").expect;
const simpleload = require("../../index.js");

describe("global", function () {

    it("should be possible to expose the modules globally with the global flag set to true", function () {

        var modules = simpleload(path.join(__dirname, "/../fixtures/dir_07"), {
            suffix: "model.js",
            global: true
        });

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

    it("should be possible to override a global var if an override flag is passed", function () {

        global.token = "1234";
        global.user = "bob";

        simpleload(path.join(__dirname, "/../fixtures/dir_07"), {
            suffix: "model.js",
            global: true,
            override: true
        });

        expect(global.token).to.not.equal("1234");
        expect(global.user).to.not.equal("bob");

        delete global.token;
        delete global.user;

        expect(global.token).to.not.exist;
        expect(global.user).to.not.exist;

    });

    it("should throw an error if a global var is going to be overriden but no flag is passed", function () {

        expect(global.Model).not.to.exist;

        var modules = simpleload(path.join(__dirname, "/../fixtures/dir_07"), {
            suffix: "model.js",
            namespace: "Model",
            global: true
        });

        expect(modules.token).to.exist;
        expect(modules.user).to.exist;

        expect(global.Model.token).to.equal(modules.token);
        expect(global.Model.user).to.equal(modules.user);

        expect(function () {
            simpleload(path.join(__dirname, "/../fixtures/dir_07"), {
                suffix: "model.js",
                namespace: "Model",
                global: true
            });
        }).to.throw();

        delete global.Model;

    });

    it("should be possible to add modules to chosen global namespace", function () {

        expect(global.Model).not.to.exist;

        var modules = simpleload(path.join(__dirname, "/../fixtures/dir_07"), {
            suffix: "model.js",
            global: true,
            namespace: "Model"
        });

        expect(modules.token).to.exist;
        expect(modules.user).to.exist;

        expect(global.Model.token).to.equal(modules.token);
        expect(global.Model.user).to.equal(modules.user);

        delete global.Model.token;
        delete global.Model.user;
        delete global.Model;

    });

});
