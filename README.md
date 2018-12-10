# multiload

```
npm install multiload
```

Load multiple files at once

## Usage

* `extension`

```javascript
const multiload = require('multiload')
const path = require('path')
const source = path.join(__dirname, 'articles')
const articles = multiload(source, { extension: 'html' })
contents.foo // 'bar'
```

* `exclude` exclude given modules

```javascript
const multiload = require('multiload')
const path = require('path')
const source = path.join(__dirname, 'articles')
const articles = multiload(source, {
  extension: 'html',
  exclude: 'foo'
});
articles.foo // undefined
```

* `recursive` find modules in subfolders

```javascript
const multiload = require('multiload')
const path = require('path')
const source = path.join(__dirname, 'articles')
const articles = multiload(source, {
  extension: 'html',
  recursive: true
});
articles.foo // 'bar'
articles['bar/baz'] // 'foo'
```
