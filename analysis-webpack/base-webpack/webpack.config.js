const path = require('path')
const DonePlugins = require('./DonePlugin.js')

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, './src/index.js'),
  plugins: [
    new DonePlugins()
  ]
}