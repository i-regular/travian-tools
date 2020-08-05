const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  watch: false,
  mode: 'development',
  entry: './frontend/index.ts',
  devtool: 'inline-source-map',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'frontend/index.html'
    })
  ]
}