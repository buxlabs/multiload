import { capitalize, lowercase, uppercase, camelize } from 'pure-utilities/string'

var decorators = {
  capitalize,
  lowercase,
  uppercase,
  camelize,
  eventize (string) {
    return string.replace('/', ':').replace('\\', ':').replace(/([A-Z])/g, ':$1').toLowerCase()
  },
  uppercase (string) {
    return string.toUpperCase()
  }
}

export default {

  predefined (modules, name) {
    var decorator = decorators[name]
    if (!decorator) {
      throw new Error('Decorator: ' + name + " doesn't exist")
    }
    return this.decorate(modules, decorator)
  },

  decorate (modules, decorator) {
    Object.keys(modules).forEach(function (key) {
      var result = decorator(key, modules[key])
      modules[result] = modules[key]
      delete modules[key]
    })
    return modules
  }
}
