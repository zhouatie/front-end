const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const webpack = require('webpack')
// console.log(webpack.optimize.CommonsChunkPlugin, 'c===========c')
module.exports = {
  entry: {
    app: './src/app.js',
    b: './src/b.js'
  },
  output: {
    path: path.resolve(__dirname,'./dist'),
    filename: '[name].js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'xixi',
      // async: 'vendor-async',
      // children: true,
      minChunks: 2
    })
  ]
}