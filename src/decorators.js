const { capitalize, lowercase, uppercase, camelize } = require('pure-utilities/string')

const decorators = {
  capitalize,
  lowercase,
  uppercase,
  camelize,
  eventize (string) {
    return string.replace('/', ':').replace('\\', ':').replace(/([A-Z])/g, ':$1').toLowerCase()
  }
}

module.exports = {

  predefined (modules, name) {
    const decorator = decorators[name]
    if (!decorator) {
      throw new Error('Decorator: ' + name + " doesn't exist")
    }
    return this.decorate(modules, decorator)
  },

  decorate (modules, decorator) {
    Object.keys(modules).forEach(function (key) {
      const result = decorator(key, modules[key])
      modules[result] = modules[key]
      delete modules[key]
    })
    return modules
  }
}
