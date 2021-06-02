const fs = require('fs')
const path = require('path')

module.exports = {

  walk (dir, subdir) {
    let results = []

    const list = fs.readdirSync(dir)
    list.forEach(function (asset) {
      const route = path.join(dir, asset)

      const filepath = subdir ? path.join(subdir, asset) : asset

      const stat = fs.statSync(route)
      if (stat.isDirectory()) {
        results = results.concat(this.walk(route, filepath))
      } else {
        results.push(filepath)
      }
    }, this)
    return results
  },

  load (dir, cfg) {
    if (cfg.recursive) {
      return this.walk(dir)
    }
    return fs.readdirSync(dir)
  },

  each (dir, cfg, callback, context) {
    const assets = this.load(dir, cfg)
    for (let i = 0, ilen = assets.length; i < ilen; i += 1) {
      const name = assets[i]
      const asset = fs.statSync(`${dir}/${name}`)
      callback(asset, name)
    }
  }

}
