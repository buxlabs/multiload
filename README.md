# multiload

Simple file loader for Node.js. Automatically loads modules from subdirectories.

## Installation

```bash
npm install multiload
```

## Usage

```javascript
const multiload = require("multiload");
const routers = multiload("./routers");
```

Given a directory structure like:

```
routers/
  home/
    index.js
  forgot-password/
    index.js
```

The function will return:

```javascript
{
  home: require('./routers/home'),
  'forgot-password': require('./routers/forgot-password')
}
```

By default, directory names are kept as-is.

## Options

### `transform`

You can provide a custom transform function to modify directory names:

```javascript
const { camelize } = require("pure-utilities/string");

const routers = multiload("./routers", {
  transform: camelize,
});
```

This will convert directory names to camelCase:

```javascript
{
  home: require('./routers/home'),
  forgotPassword: require('./routers/forgot-password')
}
```

Other examples:

```javascript
// Keep original names (default)
multiload("./routers", { transform: (name) => name });

// Uppercase
multiload("./routers", { transform: (name) => name.toUpperCase() });

// Custom transformation
multiload("./routers", {
  transform: (name) => name.replace(/-/g, "_"),
});
```

## License

MIT
