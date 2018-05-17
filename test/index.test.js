const babel = require('@babel/core')

const plugin = require.resolve('../')

test('main', () => {
  const { code } = babel.transform(`import('foo')\nimport('./foo.js')\nimport(\`./foo/\${bar}\`)`, {
    plugins: [
      'syntax-dynamic-import',
      plugin
    ]
  })
  expect(code).toMatchSnapshot()
})

test('skip exising magic comment', () => {
  const { code } = babel.transform(`import(/* webpackChunkName: 'existing' */'./foo')`, {
    plugins: [
      'syntax-dynamic-import',
      plugin
    ]
  })
  expect(code).toMatchSnapshot()
})

test('replace exising magic comment', () => {
  const { code } = babel.transform(`import(/* webpackChunkName: '__CHUNK_NAME__' */'./foo')`, {
    plugins: [
      'syntax-dynamic-import',
      plugin
    ]
  })
  expect(code).toMatchSnapshot()
})

test('custom', () => {
  const { code } = babel.transform(`import('./foo/bar')`, {
    plugins: [
      'syntax-dynamic-import',
      [plugin, {
        getChunkName(name) {
          return name.replace(/^\.\//, '').replace(/\//g, '-')
        }
      }]
    ]
  })
  expect(code).toMatchSnapshot()
})
