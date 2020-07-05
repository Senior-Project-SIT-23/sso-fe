const plugins = [
  ['@babel/plugin-proposal-decorators', { legacy: true }],
  [
    'babel-plugin-import',
    {
      libraryName: '@material-ui/core',
      libraryDirectory: 'esm',
      camel2DashComponentName: false
    },
    'core'
  ],
  [
    'babel-plugin-import',
    {
      libraryName: '@material-ui/icons',
      libraryDirectory: 'esm',
      camel2DashComponentName: false
    },
    'icons'
  ],
  [
    'babel-plugin-import',
    {
      libraryName: 'lodash',
      libraryDirectory: '',
      camel2DashComponentName: false // default: true
    },
    'lodash'
  ]
]

module.exports = { plugins }
