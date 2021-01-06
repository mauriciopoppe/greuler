const path = require('path')

module.exports = {
  entry: './src/index.js',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: process.env.NODE_ENV === 'production' ? 'nosources-source-map' : 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'greuler.js',
    library: 'greuler',
    libraryExport: 'default',
    libraryTarget: 'umd'
  },
  devServer: {
    contentBase: './public'
  },
  resolve: {
    extensions: ['.js']
  }
}
