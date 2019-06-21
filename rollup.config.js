import pkg from './package.json';
import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import { uglify } from 'rollup-plugin-uglify';

const banner = [
  '/*!',
  ` * sync-jsonp v${pkg.version}`,
  ` * (c) 2019 - ${new Date().getFullYear()} jackness`,
  ' * Released under the MIT License.',
  ' */'
].join('\n');

export default {
  input: './src/sync-jsonp.ts',
  output: [{
    file: './output/sync-jsonp.js',
    format: 'cjs',
    banner: banner,
    exports: 'named'
  }],
  plugins: [
    nodeResolve({jsnext: true}),
    commonjs(),
    json(),
    typescript({
      typescript: require('typescript')
    }),
    (process.env.NODE_ENV === 'production' && uglify())
  ]
};
