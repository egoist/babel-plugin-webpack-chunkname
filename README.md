
# babel-plugin-webpack-chunkname

[![NPM version](https://img.shields.io/npm/v/babel-plugin-webpack-chunkname.svg?style=flat)](https://npmjs.com/package/babel-plugin-webpack-chunkname) [![NPM downloads](https://img.shields.io/npm/dm/babel-plugin-webpack-chunkname.svg?style=flat)](https://npmjs.com/package/babel-plugin-webpack-chunkname) [![CircleCI](https://circleci.com/gh/egoist/babel-plugin-webpack-chunkname/tree/master.svg?style=shield)](https://circleci.com/gh/egoist/babel-plugin-webpack-chunkname/tree/master)  [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/egoist/donate) [![chat](https://img.shields.io/badge/chat-on%20discord-7289DA.svg?style=flat)](https://chat.egoist.moe)

## Install

```bash
yarn add babel-plugin-webpack-chunkname
```

## Usage

With `.babelrc`:

```json
{
  "plugins": [
    "webpack-chunkname"
  ]
}
```

And it does this:

```js
import('./pages/Home')

      ↓ ↓ ↓ ↓ ↓ ↓

import( /* webpackChunkName: 'pages/Home' */'./pages/Home')
```

And if you're using dynamic imports:

```js
import(`./pages/${name}`)

      ↓ ↓ ↓ ↓ ↓ ↓

import( /* webpackChunkName: 'pages/[request]' */`./pages/${name}`)
```

## Options

#### getChunkName

- __Type__: `(imported: string) => string`
- __Default__: `imported => imported.replace(/^[./]+|(\.js$)/g, '')`

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Author

**babel-plugin-webpack-chunkname** © [EGOIST](https://github.com/egoist), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by EGOIST with help from contributors ([list](https://github.com/egoist/babel-plugin-webpack-chunkname/contributors)).

> [egoist.moe](https://egoist.moe) · GitHub [@EGOIST](https://github.com/egoist) · Twitter [@_egoistlily](https://twitter.com/_egoistlily)
