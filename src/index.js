const fs = require('fs')
const decorators = require('./decorators')
const files = require('./files')

module.exports = {
  extensionLoad (path, cfg) {
    const ret = {}
    files.each(path, cfg, function (asset, name) {
      if (!asset.isDirectory()) {
        const content = fs.readFileSync(path + '/' + name, 'utf8')

        const moduleName = name.replace('.' + cfg.extension, '')
        ret[moduleName] = content
      }
    })
    return ret
  },

  exclude (modules, exclude) {
    if (Array.isArray(exclude)) {
      for (let i = 0, ilen = exclude.length; i < ilen; i += 1) {
        delete modules[exclude[i]]
      }
    } else {
      delete modules[exclude]
    }
    return modules
  },

  decorate (modules, cfg) {
    const method = cfg.decorate

    if (typeof method === 'function') {
      return decorators.decorate(modules, method)
    }
    return decorators.predefined(modules, method)
  }

}
