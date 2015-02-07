simpleload v0.3.2
=================

nodejs: simple module loader

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
--------

`suffix`
match files based on their suffix

    module.exports = require("simpleload")(__dirname + "/my_modules", { suffix: "job.js" });  
    // { a: module1, b: module2, c: module3 }
    
`as`
return object (default) or array of functions

    var modules = require("simpleload")(__dirname + "/my_modules", { as: "values" });
    // [ module1, module2, module3 ]

`global`
expose the loaded modules as global vars

    require("simpleload")(__dirname + "/models", { suffix: "model.js", global: true });
    // assert(user === require("./models/user.model"));

`namespace`
expose the modules in a global namespace

    require("simpleload")(__dirname + "models", { suffix: "model.js", global: true, namespace: "Model" });
    // assert(Model.user === require("./models/user.model"));

Todo:
-----
* more tests,
* examples,
* docs,
* exclude,
* process module names option (user to User etc.)