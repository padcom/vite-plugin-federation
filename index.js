const federationPlugin = require('@originjs/vite-plugin-federation')
const { name, dependencies, federation = {} } = require(process.cwd() + '/package.json')

function getLibraryName() {
  return name.split('/').at(-1).replaceAll('-', '_')
}

module.exports = function(options = {}) {
  const name = federation.name || getLibraryName()
  const remotes = federation.remotes || {}
  const exposes = federation.remotes ? federation.exposes : (federation.exposes || { './root': './src/index.js' })
  const shared = dependencies

  return federationPlugin({ name, remotes, exposes, shared, ...options })
}
