const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    greuler: './src/index.js',
    site: './public/src/App.jsx'
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: process.env.NODE_ENV === 'production' ? 'nosources-source-map' : 'inline-source-map',
  devServer: {
    contentBase: './public',
    historyApiFallback: true,
    // https://github.com/webpack/webpack-dev-server/issues/2484
    injectClient: false
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js|\.ts|\.tsx)$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /(node_modules)/
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
        options: {
          removeSVGTagAttrs: false
        }
      }
    ]
  },
  // prettier-ignore
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Greuler',
      template: 'public/index.html'
    })
  ]
}
