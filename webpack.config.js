const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: {
    site: './public/scripts/index.js',
    greuler: './src/index.js'
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: process.env.NODE_ENV === 'production' ? 'nosources-source-map' : 'inline-source-map',
  output: {
    filename: '[name].js',
    libraryTarget: 'umd',
    library: ['[name]'],
    libraryExport: 'default',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: './public'
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
}
