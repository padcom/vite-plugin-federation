# @padcom/vite-plugin-federation

This is a configuration plugin for [@originjs/vite-plugin-federation](https://www.npmjs.com/package/@originjs/vite-plugin-federation). It allows, instead of crafting the configuration each time manually, to get it configured with data from `package.json`.

## Installation

To install the package issue the following command:

```
$ npm install --save-dev @padcom/vite-plugin-federation
```

## Configuration

Once the plugin is installed you need to let Vite know you want to use it:

```
vite.config.js:

import { defineConfig } from 'vite'
import federation from '@padcom/vite-plugin-federation'

export default defineConfig(config => ({
  build: {
    target: 'esnext',
  },
  plugins: [
    federation({ mode: config.mode }),
  ],
}))
```

That's it! No more manual federation configuration!

## What's in the box?

Once you install this plugin the following will happen:

1. The name of the exposed package will come from either the `package.json`/`name` or from `package.json`/`federation/name`.
2. Shared dependencies will be loaded from `package.json`/`dependencies`
3. If there is no `remotes` section in `package.json`/`federation` then the exposed elements will be either `package.json`/`federation/exposes` or

```
{
  './root': './src/index.js'
}
```
4. If `package.json`/`remotes` is set then there are no automatic exposes and whatever is added to `package.json`/`exposes` will be forwarded to the underlying plugin.

So if you're creating a federated module and you just want to expose everything all at once then create a file `./src/index.js` in your project, export all your elements from that file and you're all set.

### Importing exposed elements

Once your library is ready you can import it in another project like so:

```
const library = await import('libraryName/root')
const root = library.default
```

### Configuring for different environments

To tell the federation plugin where the right version of the library is we can use the `mode` switch from vite. The plugin uses [dotenv](https://www.npmjs.com/package/dotenv) and if the content of the location of the remote is found in environment variables then it is automatically substituted with the value of that env variable from `.env` file in your project's root folder:

```
LIBRARY_URL=http://localhost:5001/assets/remoteEntry.js
```

and then use it in `package.json`

```
{
  "federation": {
    "remotes": {
      "library": "LIBRARY_URL"
    }
  }
}
```

If you want to provide a differenty URL for production create the `.env.production` file with the following content:

```
LIBRARY_URL=https://somewhere.on-the-internet.net/assets/remoteEntry.js
```
