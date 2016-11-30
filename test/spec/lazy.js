import test from 'ava';
import simpleload from '../../index';

test('should reserve namespaces based on dev dependencies', t => {
    var plugins = simpleload(__dirname + '/../fixture/dir_22/package.json', { lazy: true });

    t.truthy(plugins.chai, 'chai should be defined');
    t.truthy(plugins.eslint, 'eslint should be available');
    t.truthy(plugins.istanbul, 'istanbul should be defined');
    t.truthy(plugins.mocha, 'mocha should be defined');
    t.truthy(plugins.coveralls, 'coveralls should be defined');
});

test('should reserve namespaces based on dependencies', t => {
    var plugins = simpleload(__dirname + '/../fixture/dir_23/package.json', { lazy: true });

    t.truthy(plugins.express, 'express should be defined');
});

test('should load the module on demand', t => {
    var plugins = simpleload(__dirname + '/../fixture/dir_22/package.json', { lazy: true });
    var eslint = plugins.eslint();
    t.truthy(eslint, 'eslint should be loaded on demand');
});
