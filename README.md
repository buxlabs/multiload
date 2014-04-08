simpleload
==========

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

At the moment only directories are included, regular files are ignored

Todo:
-----
* add some test cases,
* show different ways it can be used,
* use cfg object to forbid certain folders if necessary,
* add an option to add files as modules as well (ignore current file)