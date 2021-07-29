const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // mode: "development",
  entry: path.resolve(__dirname, './index.js'),
  output: {
    path: path.resolve(__dirname, './dist')
  },
  resolve: {
    modules: [path.resolve(__dirname, '../node_modules'), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            // "presets": [["@babel/preset-env", {
            //   "corejs": 3,
            //   "useBuiltIns": "usage",
            //   targets: {
            //     "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
            //   },
            // }]]
            plugins: [[path.resolve(__dirname, './plugins/babel-plugin-import.js'), {library: 'lodash'}]]
          }
        }]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html')
    })
  ]
}