import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: 'index.js',
  output: {
    file: 'build/index.js',
    format: 'cjs',
    interop: false
  },
  plugins: [
    resolve(),
    commonjs()
  ],
  external: ['fs', 'path']
}
