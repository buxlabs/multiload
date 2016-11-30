import test from 'ava';
import path from 'path';
import simpleload from '../../index';

test('should throw an error if path is not provided', t => {
    t.throws(function () {
        simpleload();
    });
});

test('should throw an error if such directory doesn not exist', t => {
    t.throws(function () {
        simpleload(path.join(__dirname, '/../fixture/dir_XX'));
    });
});

test('should throw an error if you want to override an existing global var', t => {

    var modules = simpleload(path.join(__dirname, '/../fixture/dir_07'), {
        suffix: 'model.js',
        global: true
    });

    t.truthy(modules.token);
    t.truthy(modules.user);

    t.truthy(global.token === modules.token);
    t.truthy(global.user === modules.user);

    t.throws(function () {
        simpleload(path.join(__dirname, '/../fixture/dir_07'), { 
            suffix: 'model.js', global: true 
        });
    });

    delete global.token;
    delete global.user;

    t.falsy(global.token);
    t.falsy(global.user);

});

test('should throw an error if no modules were found', t => {
    t.throws(function () {
        simpleload(path.join(__dirname, '/../fixture/dir_10'));
    });
});

test('should throw an error if a predefined decorator does not exist', t => {
    t.throws(function () {
        simpleload(path.join(__dirname, '/../fixture/dir_08'), {
            decorate: ';owe.case'
        });
    });
});

