import test from 'ava';
import fs from 'fs';
import path from 'path';
import simpleload from '../../index';

test('should be possible to load html files', t => {
    var modules = simpleload(path.join(__dirname, '/../fixture/dir_09'), {
        extension: 'html'
    });

    t.truthy(typeof modules.firstArticle === 'string');
    t.truthy(typeof modules.secondArticle === 'string');

    t.truthy(modules.firstArticle === '<h1>Hello world</h1>');
    t.truthy(modules.secondArticle === '<h1>Second article</h1>');
});

test('should be possible to load files with extension when a folder exists', t => {
    var modules = simpleload(path.join(__dirname + '/../fixture/dir_24'), {
        extension: 'html'
    });

    t.truthy(typeof modules.firstArticle === 'string');
    t.truthy(typeof modules.secondArticle === 'string');

    t.truthy(modules.firstArticle === 'hello world1');
    t.truthy(modules.secondArticle === 'hello world2');
});

test('should be possible to load json files', t => {
    var modules = simpleload(path.join(__dirname, '/../fixture/dir_18'), {
        extension: 'json'
    });

    t.deepEqual(JSON.parse(modules.data_01), { hello: 'world' });
    t.deepEqual(JSON.parse(modules.data_02), { world: 'hello' });
});

