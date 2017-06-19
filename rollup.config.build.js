import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import license from 'rollup-plugin-license'
import manifest from './package.json'

const banner = [
  '/**',
  ` * ${manifest.name} v${manifest.version}`,
  ` * (c) ${new Date().getFullYear()} ${manifest.author}`,
  ` * @license ${manifest.license}`,
  ' */'
].join('\n')

export default {
  entry: 'src/juejin-file-uploader.js',
  format: 'umd',
  moduleName: 'JuejinFileUploader',
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    }),
    uglify(),
    license({ banner })
  ],
  dest: 'dist/juejin-file-uploader.min.js'
}
