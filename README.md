# simpleload

[![Build Status](https://api.travis-ci.org/buxlabs/simpleload.svg?branch=master)](https://api.travis-ci.org/buxlabs/simpleload.svg?branch=master)

```
npm install @buxlabs/simpleload
```

Load multiple files at once

## Usage

* `extension`

```javascript
const simpleload = require('simpleload')
const path = require('path')
const source = path.join(__dirname, 'articles')
const articles = simpleload(source, { extension: 'html' })
contents.foo // 'bar'
```

* `exclude` exclude given modules

```javascript
const simpleload = require('simpleload')
const path = require('path')
const source = path.join(__dirname, 'articles')
const articles = simpleload(source, {
  extension: 'html',
  exclude: 'foo'
});
articles.foo // undefined
```

* `recursive` find modules in subfolders

```javascript
const simpleload = require('simpleload')
const path = require('path')
const source = path.join(__dirname, 'articles')
const articles = simpleload(source, {
  extension: 'html',
  recursive: true
});
articles.foo // 'bar'
articles['bar/baz'] // 'foo'
```
