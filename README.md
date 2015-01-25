simpleload v0.2.2
=================

nodejs: load the modules from current dir easily

What can I use it for?
----------------------

Let's assume that you need to load the modules in the following way:
    
    module.exports = {
        home: require("./home"),
        users: require("./users"),
        login: require("./login"),
        logout: require("./logout"),
        activate: require("./activate")
    };

or

    var home = require("./home"),
        users = require("./users"),
        login = require("./login"),
        logout = require("./logout"),
        activate = require("./activate")

    module.exports = {
        home: home,
        users: users,
        login: login,
        logout: logout,
        activate: activate
    };

Instead you can use simpleload:

    module.exports = require("simpleload")(__dirname);

and it'll do the job for you.


Options:

- suffix
match files based on their suffix

    module.exports = require("simpleload")(__dirname + "/my_modules", { suffix: "job.js" });  
    // { a: fn1, b: fn2, c: fn3 }
    
- as
return object (default) or array of functions

    module.exports = require("simpleload")(__dirname + "/my_modules", { as: "values" });
    // [ fn1, fn2, fn3 ]


Todo:
-----
* more tests,
* examples,
* docs,
* exclude