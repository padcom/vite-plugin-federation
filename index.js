const federationPlugin = require('@originjs/vite-plugin-federation')
const { name, dependencies, federation = {} } = require(process.cwd() + '/package.json')

function getLibraryName() {
  return name.split('/').at(-1).replaceAll('-', '_')
}

module.exports = function(options = {}) {
  options = {
    name: federation.name || getLibraryName(),
    shared: dependencies,
    exposes: federation.exposes || {
      './root': './src/index.js'
    },
    ...options
  }

  return federationPlugin(options)
}
