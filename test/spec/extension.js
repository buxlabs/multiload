const { test } = require('node:test')
const assert = require('node:assert')
const path = require('path')
const multiload = require('../..')

test('should be possible to load html files', () => {
  const modules = multiload(path.join(__dirname, '../fixture/dir_09'), {
    extension: 'html'
  })

  assert.ok(typeof modules.firstArticle === 'string')
  assert.ok(typeof modules.secondArticle === 'string')

  assert.strictEqual(modules.firstArticle, '<h1>Hello world</h1>')
  assert.strictEqual(modules.secondArticle, '<h1>Second article</h1>')
})

test('should be possible to load files with extension when a folder exists', () => {
  const modules = multiload(path.join(__dirname, '../fixture/dir_24'), {
    extension: 'html'
  })

  assert.ok(typeof modules.firstArticle === 'string')
  assert.ok(typeof modules.secondArticle === 'string')

  assert.strictEqual(modules.firstArticle, 'hello world1')
  assert.strictEqual(modules.secondArticle, 'hello world2')
})

test('should be possible to load json files', () => {
  const modules = multiload(path.join(__dirname, '../fixture/dir_18'), {
    extension: 'json'
  })

  assert.deepStrictEqual(JSON.parse(modules.data_01), { hello: 'world' })
  assert.deepStrictEqual(JSON.parse(modules.data_02), { world: 'hello' })
})
