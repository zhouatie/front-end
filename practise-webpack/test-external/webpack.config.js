const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const path = require('path');

module.exports = {
  mode: 'development',
  entry: './index.js',
  externals: {
    lodash: 'lodash'
  },
  devServer: {
    port: 8080,
    hot: true,
    open: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html')
    })
  ]
}