# multiload

multiload is a tiny Node.js helper to load many files from a directory into a single object (or array). It supports loading JavaScript modules (via require) or raw file contents (HTML, JSON, etc.), recursive traversal, excluding certain modules, and simple name-decoration helpers.

Install

```
npm install multiload
```

Quick summary

- Input: a directory path.
- Output: an object keyed by filename (without extension) or an array of module exports when `format: 'array'`.
- Supports options: `extension`, `recursive`, `exclude`, `decorate`, `format`.

Usage

Basic (load Node modules from a folder)

```javascript
const multiload = require("multiload");
const path = require("path");

const modules = multiload(path.join(__dirname, "fixture/dir_25"), {
  recursive: true,
});

// modules['one/index'] will be the module exported by one/index.js
console.log(Object.keys(modules));
```

Load raw files by extension (e.g. html, json)

```javascript
const articles = multiload(path.join(__dirname, "fixture/dir_09"), {
  extension: "html",
});

// For html files the content is returned as string
console.log(typeof articles.firstArticle); // 'string'
```

When loading files by extension, filenames keep folder paths when `recursive: true`:

```javascript
const pages = multiload(path.join(__dirname, "fixture/dir_16"), {
  extension: "html",
  recursive: true,
});

// pages['en/four-years-old-seedling-40-45cm'] -> file contents
```

Options

- `extension` (string) — if provided, files are read as raw text (fs.readFileSync) and returned as string values; otherwise JavaScript files are required with `require()`.
- `recursive` (boolean) — when true, subdirectories are traversed and keys include the subpath (e.g. `sub/thing`).
- `exclude` (string | string[]) — remove key(s) from the returned object.
- `decorate` (string | function) — transform keys using one of the predefined decorators or a custom function. Predefined decorators: `capitalize`, `lowercase`, `uppercase`, `camelize`, `eventize`.
  - When `decorate` is a string it must match a predefined decorator name. When it's a function it receives `(key, value)` and must return the new key.
- `format` (string) — when set to `'array'`, the modules are returned as an array of values instead of an object keyed by name.

Behavior & errors

- If `path` is not a non-empty string an error is thrown: `multiload: path has to be defined properly`.
- If no modules are found after applying filters, an error is thrown: `multiload: no modules found, check folder and options`.

Examples

Exclude modules

```javascript
const modules = multiload(path.join(__dirname, "fixture/dir_25"), {
  recursive: true,
  exclude: ["one/index"],
});

console.log(modules["one/index"]); // undefined
```

Decorate names (predefined)

```javascript
const decorated = multiload(path.join(__dirname, "fixture/dir_25"), {
  recursive: true,
  decorate: "eventize",
});

// keys will be transformed by the `eventize` decorator
```

Decorate names (custom)

```javascript
const decorated = multiload(path.join(__dirname, "fixture/dir_25"), {
  recursive: true,
  decorate: (key, value) => key.replace(/\//g, ":"),
});
```

Testing

This repository uses Node's built-in test runner. Run the test suite with:

```bash
npm test
```

Notes for maintainers

- Node engine: >=14.17.0 (see `package.json`).
- The small `src` helpers are intentionally simple and synchronous (fs.readFileSync, require, fs.statSync).

License

MIT — see the `LICENSE` file.
