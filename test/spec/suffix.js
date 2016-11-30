import test from 'ava';
import path from 'path';
import simpleload from '../../index';

test("should be possible to filter out the modules", t => {

    var dir = path.join(__dirname, "/../fixture/dir_05");
    var modules = simpleload(dir, { suffix: "job.js" });

    t.truthy(modules.first.name === "first_job");
    t.truthy(modules.second.name === "second_job");
    t.truthy(modules.third.name === "third_job");

});

test("should be possible to get the modules as an array of values", t => {

    var dir = path.join(__dirname, "/../fixture/dir_05");
    var values = simpleload(dir, { suffix: "job.js", as: "values" });

    t.truthy(Array.isArray(values));
    t.truthy(values[0].name === "first_job");
    t.truthy(values[1].name === "second_job");
    t.truthy(values[2].name === "third_job");

});

test("should match . in the beginning is matched correctly for suffix", t => {

    var dir = path.join(__dirname, "/../fixture/dir_06");
    var modules = simpleload(dir, { suffix: ".schema.js" });

    t.truthy(modules.module_1);
    t.truthy(modules.module_2);
    t.truthy(modules.module_3);

    modules = simpleload(dir, { suffix: ".schema.js", as: "values" });

    t.truthy(modules[0] === "module_1");
    t.truthy(modules[1] === "module_2");
    t.truthy(modules[2] === "module_3");

});

test("shouldn't load files without suffix", t => {

    var dir = path.join(__dirname, "/../fixture/dir_20");
    var modules = simpleload(dir, { suffix: "event.js" });

    t.truthy(modules.loaded);
    t.truthy(modules.uploaded);
    t.truthy(Object.keys(modules).length === 2);

});
