"use strict";

var 
    assert = require("assert"),
    events = require("events"),
    simpleload = require("../../index.js"),
    channel = new events.EventEmitter();

// it should be possible to register loaded modules
// by name in given channel

(function (path) {

  var modules;

  assert(channel.listeners("user:account:locked").length === 0);
  assert(channel.listeners("user:forgot:password").length === 0);
  assert(channel.listeners("user:registered").length === 0);

  modules = simpleload(path, {
    suffix: ".event.js",
    decorate: "eventize",
    register: [channel, "on"]
  });

  assert(modules["user:account:locked"]() === "userAccountLocked");
  assert(modules["user:forgot:password"]() === "userForgotPassword");
  assert(modules["user:registered"]() === "userRegistered");

  assert(channel.listeners("user:account:locked").length === 1);
  assert(channel.listeners("user:forgot:password").length === 1);
  assert(channel.listeners("user:registered").length === 1);

  assert(channel.listeners("user:account:locked")[0]() === "userAccountLocked");
  assert(channel.listeners("user:forgot:password")[0]() === "userForgotPassword");
  assert(channel.listeners("user:registered")[0]() === "userRegistered");

})(__dirname + "/../fixtures/dir_12");