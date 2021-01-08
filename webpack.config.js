const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: {
    site: './public/scripts/App.jsx',
    greuler: './src/index.js'
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  // devtool: process.env.NODE_ENV === 'production' ? 'nosources-source-map' : 'inline-source-map',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './public',
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
          loader: 'babel-loader',
        },
        exclude: /(node_modules)/,
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
        options: {
          removeSVGTagAttrs: false
        }
      }
    ],
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js'],
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}
