simpleload v0.4.0
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

  suffix - match files based on their suffix

```bash
module.exports = require("simpleload")(__dirname + "/my_modules", { suffix: "job.js" });  
// { a: module1, b: module2, c: module3 }
```    

  as - return object (default) or array of functions

```bash
var modules = require("simpleload")(__dirname + "/my_modules", { as: "values" });
// [ module1, module2, module3 ]
```

  global - expose the loaded modules as global vars

```bash
require("simpleload")(__dirname + "/models", { suffix: "model.js", global: true });
// assert(user === require("./models/user.model"));
```

  namespace - expose the modules in a global namespace

```bash
require("simpleload")(__dirname + "models", { suffix: "model.js", global: true, namespace: "Model" });
// assert(Model.user === require("./models/user.model"));
```

  decorate - process the name of the loaded modules

```bash
require("simpleload")(__dirname + "models", { suffix: "model.js", decorate: "capitalize" });
// assert(Model.User === require("./modules/user.model"));
require("simpleload")(__dirname + "models", { 
    suffix: "model.js", 
    decorate: function (name) {
        return name[0].toUpperCase() + name.slice(1);
    }
});
```

Todo:
-----
* more tests,
* examples,
* docs,
* exclude,
* more decorators,
* refactor