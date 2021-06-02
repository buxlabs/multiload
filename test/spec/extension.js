const test = require('ava')
const path = require('path')
const multiload = require('../..')

test('should be possible to load html files', assert => {
  const modules = multiload(path.join(__dirname, '../fixture/dir_09'), {
    extension: 'html'
  })

  assert.truthy(typeof modules.firstArticle === 'string')
  assert.truthy(typeof modules.secondArticle === 'string')

  assert.truthy(modules.firstArticle === '<h1>Hello world</h1>')
  assert.truthy(modules.secondArticle === '<h1>Second article</h1>')
})

test('should be possible to load files with extension when a folder exists', assert => {
  const modules = multiload(path.join(__dirname, '../fixture/dir_24'), {
    extension: 'html'
  })

  assert.truthy(typeof modules.firstArticle === 'string')
  assert.truthy(typeof modules.secondArticle === 'string')

  assert.truthy(modules.firstArticle === 'hello world1')
  assert.truthy(modules.secondArticle === 'hello world2')
})

test('should be possible to load json files', assert => {
  const modules = multiload(path.join(__dirname, '../fixture/dir_18'), {
    extension: 'json'
  })

  assert.deepEqual(JSON.parse(modules.data_01), { hello: 'world' })
  assert.deepEqual(JSON.parse(modules.data_02), { world: 'hello' })
})
