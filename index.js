const { resolve } = require('path')
const federationPlugin = require('@originjs/vite-plugin-federation')

const { name, dependencies, federation } = require(resolve(process.cwd(), 'package.json'))

function getLibraryName() {
  return name.split('/').at(-1).replaceAll('-', '_')
}

module.exports = function(options = {}) {
  const mode = options.mode || 'development'

  const envFileName = resolve(process.cwd(), '.env')
  require('dotenv').config({ path: envFileName + '.' + mode + '.local' })
  require('dotenv').config({ path: envFileName + '.' + mode })
  require('dotenv').config({ path: envFileName })

  const name = federation.name || getLibraryName()
  const remotes = federation.remotes || {}
  Object.keys(remotes).forEach(remote => {
    if (process.env[remotes[remote]]) remotes[remote] = process.env[remotes[remote]]
  })
  const exposes = federation.remotes ? federation.exposes : (federation.exposes || {
    './root': './src/index.js'
  })
  const shared = dependencies

  return federationPlugin({ name, remotes, exposes, shared, ...options })
}
