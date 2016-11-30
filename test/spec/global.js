import test from 'ava';
import path from 'path';
import simpleload from '../../index';

test('should be possible to expose the modules globally with the global flag set to true', t => {

    var modules = simpleload(path.join(__dirname, '/../fixture/dir_07'), {
        suffix: 'model.js',
        global: true
    });

    t.truthy(modules.token);
    t.truthy(modules.user);

    t.truthy(global.token === modules.token);
    t.truthy(global.user === modules.user);
    /* global token, user */
    t.truthy(token === modules.token);
    t.truthy(user === modules.user);

    t.truthy(token === require('../fixture/dir_07/token.model'));
    t.truthy(user === require('../fixture/dir_07/user.model'));

    delete global.token;
    delete global.user;

    t.falsy(global.token);
    t.falsy(global.user);

});

test('should be possible to override a global var if an override flag is passed', t => {

    global.token = '1234';
    global.user = 'bob';

    simpleload(path.join(__dirname, '/../fixture/dir_07'), {
        suffix: 'model.js',
        global: true,
        override: true
    });

    t.falsy(global.token === '1234');
    t.falsy(global.user === 'bob');

    delete global.token;
    delete global.user;

    t.falsy(global.token);
    t.falsy(global.user);

});

test('should throw an error if a global var is going to be overriden but no flag is passed', t => {

    t.falsy(global.Model);

    var modules = simpleload(path.join(__dirname, '/../fixture/dir_07'), {
        suffix: 'model.js',
        namespace: 'Model',
        global: true
    });

    t.truthy(modules.token);
    t.truthy(modules.user);

    t.truthy(global.Model.token === modules.token);
    t.truthy(global.Model.user === modules.user);

    t.throws(function () {
        simpleload(path.join(__dirname, '/../fixture/dir_07'), {
            suffix: 'model.js',
            namespace: 'Model',
            global: true
        });
    });

    delete global.Model;

});

test('should be possible to add modules to chosen global namespace', t => {

    t.falsy(global.Model);

    var modules = simpleload(path.join(__dirname, '/../fixture/dir_07'), {
        suffix: 'model.js',
        global: true,
        namespace: 'Model'
    });

    t.truthy(modules.token);
    t.truthy(modules.user);

    t.truthy(global.Model.token === modules.token);
    t.truthy(global.Model.user === modules.user);

    delete global.Model.token;
    delete global.Model.user;
    delete global.Model;

});
