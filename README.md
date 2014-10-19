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

You can also match modules based on their suffix:

    module.exports = require("simpleload")(__dirname + "/my_modules", { suffix: "job.js" });

Todo:
-----
* tests,
* examples,
* docs,
* cfg forbidden field