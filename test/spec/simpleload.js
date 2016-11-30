import test from 'ava';
import fs from 'fs';
import path from 'path';
import simpleload from '../../index';

test('should load modules', t => {

    var dir = path.join(__dirname, '/../fixture/dir_17'),
        modules, dirs, module;

    modules = simpleload(dir);
    dirs = fs.readdirSync(dir);

    for (module in modules) {
        if (modules.hasOwnProperty(module)) {
            t.truthy(dirs.indexOf(module) !== -1);
        }
    }

});

test('should load modules like require', t => {

    var modules = simpleload(path.join(__dirname, '/../fixture/dir_17'));

    t.truthy(modules.subdir_01 === require('../fixture/dir_17/subdir_01'));
    t.truthy(modules.subdir_02 === require('../fixture/dir_17/subdir_02'));

});

test('should load modules from different locations', t => {
    var dir = path.join(__dirname, '/../fixture/dir_01'),
        modules, dirs, module;

    modules = simpleload(dir);
    dirs = fs.readdirSync(dir);

    for (module in modules) {
        if (modules.hasOwnProperty(module)) {
            t.truthy(dirs.indexOf(module) !== -1);
        }
    }
});
