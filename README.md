simpleload v0.5.3
=================

load multiple modules easily

What can I use it for?
----------------------

Let's assume that you need to load the modules in the following way:

```bash    
module.exports = {
    home: require("./home"),
    users: require("./users"),
    login: require("./login"),
    logout: require("./logout"),
    activate: require("./activate")
};
```

or

```bash
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
```

Instead you can use simpleload:
```bash
module.exports = require("simpleload")(__dirname);
```
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
require("simpleload")(__dirname + "/models", { 
    suffix: "model.js", 
    global: true, 
    namespace: "Model" 
});

// assert(Model.user === require("./models/user.model"));
```

  decorate - process the name of the loaded modules

  you can also use predefined functions, (capitalize, lowercase, eventize)
```bash
var simpleload = require("simpleload"),
    model = simpleload(__dirname + "/models", { 
        suffix: "model.js", 
        decorate: "capitalize" 
    });
// assert(model.User === require("./modules/user.model"));

var simpleload = require("simpleload"),
    schema = simpleload(__dirname + "/schemas", { 
        suffix: "schema.js", 
        decorate: function (name) {
            return name[0].toUpperCase() + name.slice(1);
        }
    });
// assert(schema.Login === require("./modules/login.schema"));
```

  extension - load html files from given folder (can be useful in imports)

```bash
var simpleload = require("simpleload"),
    contents = simpleload(__dirname + "/articles", {
        extension: "html"
    });
// assert(contents.firstArticle === fs.readFileSync(__dirname + "/articles/firstArticle.html"));
```

  exclude - exclude given modules

```bash
var simpleload = require("simpleload"),
    modules = simpleload(__dirname + "/services", {
        suffix: "service.js",
        exclude: "base"
    });
// assert(!modules.base);
```

  register - register given handlers on given channel method

```bash
var simpleload = require("simpleload"),
    events = require("events"),
    channel = new events.EventEmitter(),
    modules = simpleload(__dirname + "/events", {
        suffix: "event.js",
        decorate: "eventize",
        register: [channel, "on"]
    });
// assert(modules.listeners["user:registered"].length === 1);
```

Todo:
-----
* more specs,
* examples,
* better docs,
* more decorators,
* support more file formats for extension option,
* refactor code,
* refactor specs