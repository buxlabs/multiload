import test from 'ava';
import path from 'path';
import events from 'events';
import simpleload from '../../index';

test('it should be possible to register loaded modules by name in given channel', t => {

    var channel, modules;

    channel = new events.EventEmitter();

    t.truthy(channel.listeners('user:account:locked').length === 0);
    t.truthy(channel.listeners('user:forgot:password').length === 0);
    t.truthy(channel.listeners('user:registered').length === 0);

    modules = simpleload(path.join(__dirname, '/../fixture/dir_12'), {
        suffix: '.event.js',
        decorate: 'eventize',
        register: [channel, 'on']
    });

    t.truthy(modules['user:account:locked']() === 'userAccountLocked');
    t.truthy(modules['user:forgot:password']() === 'userForgotPassword');
    t.truthy(modules['user:registered']() === 'userRegistered');

    t.truthy(channel.listeners('user:account:locked').length === 1);
    t.truthy(channel.listeners('user:forgot:password').length === 1);
    t.truthy(channel.listeners('user:registered').length === 1);

    t.truthy(channel.listeners('user:account:locked')[0]() === 'userAccountLocked');
    t.truthy(channel.listeners('user:forgot:password')[0]() === 'userForgotPassword');
    t.truthy(channel.listeners('user:registered')[0]() === 'userRegistered');

    channel.removeAllListeners();

    t.truthy(channel.listeners('user:account:locked').length === 0);
    t.truthy(channel.listeners('user:forgot:password').length === 0);
    t.truthy(channel.listeners('user:registered').length === 0);

});

test('should be possible to register event handlers recursively', t => {

    var channel, modules;

    channel = new events.EventEmitter();

    t.truthy(channel.listeners('ad:viewed').length === 0);
    t.truthy(channel.listeners('ad:removed').length === 0);
    t.truthy(channel.listeners('user:account:locked').length === 0);

    modules = simpleload(path.join(__dirname, '/../fixture/dir_13'), {
        suffix: '.event.js',
        decorate: 'eventize',
        recursive: true,
        register: [channel, 'on']
    });

    t.truthy(channel.listeners('ad:viewed').length === 1);
    t.truthy(channel.listeners('ad:removed').length === 1);
    t.truthy(channel.listeners('user:account:locked').length === 1);

    channel.removeAllListeners();

    t.truthy(channel.listeners('ad:viewed').length === 0);
    t.truthy(channel.listeners('ad:removed').length === 0);
    t.truthy(channel.listeners('user:account:locked').length === 0);

});

test('should throw an error if the register format is incorrect', t => {

    t.throws(function () {
        simpleload(path.join(__dirname, '/../fixture/dir_13'), {
            suffix: '.event.js',
            decorate: 'eventize',
            recursive: true,
            register: true
        });
    });

});
