export default {
  input: 'index.js',
  output: {
    file: 'build/index.js',
    format: 'cjs'
  },
  external: ['fs', 'path'],
  interop: false
}
