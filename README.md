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
  forgotPassword: require('./routers/forgot-password')
}
```

Directory names are automatically converted to camelCase.

## License

MIT
