const test = require('ava')
const path = require('path')
const multiload = require('../..')

test('should be possible to load modules from different folders recursively (example 1)', assert => {
  const modules = multiload(path.join(__dirname, '/../fixture/dir_15'), {
    extension: 'html',
    recursive: true
  })

  assert.truthy(modules['en/terms-of-use'])
  assert.truthy(modules['pl/terms-of-use'])
})

test('should be possible to load modules from different folders recursively (example 2)', assert => {
  const modules = multiload(path.join(__dirname, '/../fixture/dir_16'), {
    extension: 'html',
    recursive: true
  })

  assert.truthy(modules['en/four-years-old-seedling-40-45cm'])
  assert.truthy(modules['en/three-years-old-seedling-30-35cm'])
  assert.truthy(modules['en/two-years-old-seedling-20-25cm'])
  assert.truthy(modules['en/two-years-old-seedling-10-15cm'])
  assert.truthy(modules['pl/sadzonka-czteroletnia-40-45cm'])
  assert.truthy(modules['pl/sadzonka-dwuletnia-15-20cm'])
  assert.truthy(modules['pl/sadzonka-dwuletnia-25-30cm'])
  assert.truthy(modules['pl/sadzonka-roczna-10-15cm'])
  assert.truthy(modules['pl/sadzonka-trzyletnia-30-35cm'])
})
