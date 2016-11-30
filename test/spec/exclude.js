import test from 'ava';
import path from 'path';
import simpleload from '../../index';

test('should be possible to exclude given modules', t => {
    var modules = simpleload(path.join(__dirname, '/../fixture/dir_11'), {
        suffix: 'service.js'
    });
    t.truthy(modules.base === require('../fixture/dir_11/base.service'));
    t.truthy(modules.other === require('../fixture/dir_11/other.service'));
    t.truthy(Object.keys(modules).length === 2);

    modules = simpleload(path.join(__dirname, '/../fixture/dir_11'), {
        suffix: 'service.js',
        exclude: 'base'
    });
    t.truthy(modules.other === require('../fixture/dir_11/other.service'));
    t.truthy(Object.keys(modules).length === 1);
});

test('should be possible to exclude given modules when array is passed', t => {
    var modules = simpleload(path.join(__dirname, '/../fixture/dir_11'), {
        suffix: 'service.js'
    });
    t.truthy(modules.base === require('../fixture/dir_11/base.service'));
    t.truthy(modules.other === require('../fixture/dir_11/other.service'));
    t.truthy(Object.keys(modules).length === 2);

    modules = simpleload(path.join(__dirname, '/../fixture/dir_11'), {
        suffix: 'service.js',
        exclude: ['base']
    });
    t.truthy(modules.other === require('../fixture/dir_11/other.service'));
    t.truthy(Object.keys(modules).length === 1);
});

test('should not exclude if falsy option was falled', t => {

    var modules = simpleload(path.join(__dirname, '/../fixture/dir_11'), {
        suffix: 'service.js',
        exclude: false
    });
    t.truthy(modules.base === require('../fixture/dir_11/base.service'));
    t.truthy(modules.other === require('../fixture/dir_11/other.service'));
    t.truthy(Object.keys(modules).length === 2);

});
