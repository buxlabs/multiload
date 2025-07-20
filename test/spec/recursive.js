const { test } = require('node:test')
const assert = require('node:assert')
const path = require('path')
const multiload = require('../..')

test('should be possible to load modules from different folders recursively (example 1)', () => {
  const modules = multiload(path.join(__dirname, '/../fixture/dir_15'), {
    extension: 'html',
    recursive: true
  })

  assert.ok(modules['en/terms-of-use'])
  assert.ok(modules['pl/terms-of-use'])
})

test('should be possible to load modules from different folders recursively (example 2)', () => {
  const modules = multiload(path.join(__dirname, '/../fixture/dir_16'), {
    extension: 'html',
    recursive: true
  })

  assert.ok(modules['en/four-years-old-seedling-40-45cm'])
  assert.ok(modules['en/three-years-old-seedling-30-35cm'])
  assert.ok(modules['en/two-years-old-seedling-20-25cm'])
  assert.ok(modules['en/two-years-old-seedling-10-15cm'])
  assert.ok(modules['pl/sadzonka-czteroletnia-40-45cm'])
  assert.ok(modules['pl/sadzonka-dwuletnia-15-20cm'])
  assert.ok(modules['pl/sadzonka-dwuletnia-25-30cm'])
  assert.ok(modules['pl/sadzonka-roczna-10-15cm'])
  assert.ok(modules['pl/sadzonka-trzyletnia-30-35cm'])
})
