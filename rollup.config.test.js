import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'

export default [
  {
    entry: 'src/juejin-file-uploader.js',
    format: 'umd',
    moduleName: 'JuejinFileUploader',
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**'
      })
    ],
    dest: 'test/dist/juejin-file-uploader.js'
  },
  {
    entry: 'test/test.js',
    format: 'iife',
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**'
      })
    ],
    dest: 'test/dist/test.js'
  }
]
