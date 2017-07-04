import node from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel'

export default {
  entry: 'src/index.js',
  format: 'umd',
  plugins: [
    node(),
    commonjs({
      namedExports: {
        'node_modules/webcola/dist/index.js': [ 'd3adaptor' ]
      }
    }),
    babel({
      exclude: 'node_modules/**'
    })
  ],
  cache: null,
  moduleName: 'greuler',
  dest: './.tmp/greuler.js',
  sourceMap: true
}
