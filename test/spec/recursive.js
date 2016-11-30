import test from 'ava';
import path from 'path';
import simpleload from '../../index';

test('should be possible to load modules recursively', t => {
    var modules = simpleload(path.join(__dirname, '/../fixture/dir_14'), { 
        suffix: 'event.js',
        recursive: true
    });

    t.truthy(modules['ad/created']);
    t.truthy(modules['user/created']);
});

test('should be possible to load modules from different folders recursively (example 1)', t => {
    var modules = simpleload(path.join(__dirname, '/../fixture/dir_15'), {
        extension: 'html',
        recursive: true
    });

    t.truthy(modules['en/terms-of-use']);
    t.truthy(modules['pl/terms-of-use']);
});

test('should be possible to load modules from different folders recursively (example 2)', t => {
    var modules = simpleload(path.join(__dirname, '/../fixture/dir_16'), {
        extension: 'html',
        recursive: true
    });

    t.truthy(modules['en/four-years-old-seedling-40-45cm']);
    t.truthy(modules['en/three-years-old-seedling-30-35cm']);
    t.truthy(modules['en/two-years-old-seedling-20-25cm']);
    t.truthy(modules['en/two-years-old-seedling-10-15cm']);
    t.truthy(modules['pl/sadzonka-czteroletnia-40-45cm']);
    t.truthy(modules['pl/sadzonka-dwuletnia-15-20cm']);
    t.truthy(modules['pl/sadzonka-dwuletnia-25-30cm']);
    t.truthy(modules['pl/sadzonka-roczna-10-15cm']);
    t.truthy(modules['pl/sadzonka-trzyletnia-30-35cm']);
});

test('should be possible to load modules from different folders recursively (example 3)', t => {
    var modules = simpleload(path.join(__dirname, '/../fixture/dir_19'), {
        recursive: true,
        suffix: 'event.js'
    });
    
    t.truthy(modules['logged']);
    t.truthy(modules['article/created']);
    t.truthy(modules['user/account/deleted']);
    t.truthy(modules['user/account/locked']);
});
