const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const resolve = (dir) => path.resolve(__dirname, dir)
module.exports = {
  entry: './promise-demo.js',
  output: {
    filename: 'bundle.js'
  },
  devServer: {
    port: 9999,
    hot: true,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [resolve('./node_modules')]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ]
}