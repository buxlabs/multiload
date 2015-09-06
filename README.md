# simpleload v0.5.4

Load multiple modules into an object or globally. Useful for repetive require calls.

## Usage

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

Instead you can use simpleload:
```javascript
module.exports = require("simpleload")(__dirname);
```
and it'll do the job for you.


Options:
--------

* `suffix` match files based on their suffix

```javascript
var modules = require("simpleload")(__dirname + "/my_modules", { suffix: "job.js" });  
// { a: module1, b: module2, c: module3 }
```    

* `as` return object (default) or array of functions

```javascript
var modules = require("simpleload")(__dirname + "/my_modules", { as: "values" });
// [ module1, module2, module3 ]
```

* `global` expose the loaded modules as global vars

```javascript
require("simpleload")(__dirname + "/models", { 
    suffix: "model.js", 
    global: true 
});
// assert(global.User = require("./models/user.model"));
// assert(User === require("./models/user.model"));
```

* `namespace` expose the modules in a global namespace

```javascript
require("simpleload")(__dirname + "/models", { 
    suffix: "model.js", 
    global: true, 
    namespace: "Model" 
});

// assert(Model.User === require("./models/user.model"));
```

* `decorate` process the name of the loaded modules, you can also use predefined functions, (capitalize, lowercase and eventize)

```javascript
var simpleload = require("simpleload"),
    model = simpleload(__dirname + "/models", { 
        suffix: "model.js", 
        decorate: "lowercase" 
    });
// assert(model.user === require("./modules/user.model"));
```

```javascript
var simpleload = require("simpleload"),
    schema = simpleload(__dirname + "/schemas", { 
        suffix: "schema.js", 
        decorate: function (name) {
            return name[0].toUpperCase() + name.slice(1);
        }
    });
// assert(schema.Login === require("./modules/login.schema"));
```

* `extension` load html files from given folder (can be useful in imports)

```javascript
var simpleload = require("simpleload"),
    contents = simpleload(__dirname + "/articles", {
        extension: "html"
    });
// assert(contents.firstArticle === fs.readFileSync(__dirname + "/articles/firstArticle.html"));
```

* `exclude` exclude given modules

```javascript
var simpleload = require("simpleload"),
    modules = simpleload(__dirname + "/services", {
        suffix: "service.js",
        exclude: "base"
    });
// assert(!modules.base);
```

* `register` register given handlers on given channel method

```javascript
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
* refactor code