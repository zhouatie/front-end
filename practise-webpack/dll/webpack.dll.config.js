const path = require('path')
const webpack = require('webpack')
module.exports = {
  entry: {
    lodash: ['lodash']
  },
  output: {
    path: path.resolve(__dirname, './dll'),
    filename: '[name].dll.js',
    library: '_dll_[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '_dll_[name]',
      path: path.resolve(__dirname, 'dll', '[name].manifest.json')
    })
  ]
}