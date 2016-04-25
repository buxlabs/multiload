"use strict";

const expect = require("chai").expect;
const events = require("events");
const simpleload = require("../../index.js");

describe("register", function () {

    it("it should be possible to register loaded modules by name in given channel", function () {

        var path = __dirname + "/../fixtures/dir_12",
            modules,
            channel;

        channel = new events.EventEmitter();
  
        expect(channel.listeners("user:account:locked")).to.have.length(0);
        expect(channel.listeners("user:forgot:password")).to.have.length(0);
        expect(channel.listeners("user:registered")).to.have.length(0);
  
        modules = simpleload(path, {
            suffix: ".event.js",
            decorate: "eventize",
            register: [channel, "on"]
        });
  
        expect(modules["user:account:locked"]()).to.equal("userAccountLocked");
        expect(modules["user:forgot:password"]()).to.equal("userForgotPassword");
        expect(modules["user:registered"]()).to.equal("userRegistered");
  
        expect(channel.listeners("user:account:locked")).to.have.length(1);
        expect(channel.listeners("user:forgot:password")).to.have.length(1);
        expect(channel.listeners("user:registered")).to.have.length(1);
  
        expect(channel.listeners("user:account:locked")[0]()).to.equal("userAccountLocked");
        expect(channel.listeners("user:forgot:password")[0]()).to.equal("userForgotPassword");
        expect(channel.listeners("user:registered")[0]()).to.equal("userRegistered");

        channel.removeAllListeners();

        expect(channel.listeners("user:account:locked")).to.have.length(0);
        expect(channel.listeners("user:forgot:password")).to.have.length(0);
        expect(channel.listeners("user:registered")).to.have.length(0);

    });

    it("should be possible to register event handlers recursively", function () {

        var path = __dirname + "/../fixtures/dir_13",
            modules,
            channel;

        channel = new events.EventEmitter();

        expect(channel.listeners("ad:viewed")).to.have.length(0);
        expect(channel.listeners("ad:removed")).to.have.length(0);
        expect(channel.listeners("user:account:locked")).to.have.length(0);

        modules = simpleload(path, {
            suffix: ".event.js",
            decorate: "eventize",
            recursive: true,
            register: [channel, "on"]
        });

        expect(channel.listeners("ad:viewed")).to.have.length(1);
        expect(channel.listeners("ad:removed")).to.have.length(1);
        expect(channel.listeners("user:account:locked")).to.have.length(1);

        channel.removeAllListeners();

        expect(channel.listeners("ad:viewed")).to.have.length(0);
        expect(channel.listeners("ad:removed")).to.have.length(0);
        expect(channel.listeners("user:account:locked")).to.have.length(0);

    });

    it("should throw an error if the register format is incorrect", function () {

        var path = __dirname + "/../fixtures/dir_13";

        expect(function () {
            simpleload(path, {
                suffix: ".event.js",
                decorate: "eventize",
                recursive: true,
                register: true
            });
        }).to.throw();

    });

});
