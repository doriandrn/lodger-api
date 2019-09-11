import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import builtins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'
import babel from 'rollup-plugin-babel'
import ts from 'rollup-plugin-typescript'
import { uglify } from 'rollup-plugin-uglify'
// import globImport from 'rollup-plugin-glob-import'
// import pkg from './package.json's

import { taxonomies } from './src/index.ts'
import path from 'path'

function resolve (dir) {
  return path.join(__dirname, '.', dir)
}

const paths  =  {
  '~': resolve('src'),
  '~/lib': resolve('src/lib/'),
  helpers: resolve('src/lib/helpers'),
  schemas: resolve('src/lib/.schemas'),
  build: resolve('src/lib/build'),
  defs: resolve('src/lib/defs')
}

const ext = `ts`
const extensions = [
  'js', 'jsx', ext, 'tsx',
];

const name = 'Lodger';

const input = []
const formsPath = `./src/.schemas`

// taxonomies.forEach(tax => input.push(`${formsPath}/${tax}.${ext}`))
input.push('./src/index.ts')

export default {
  input,
  inlineDynamicImports: true,
  // manualChunks: [{
  //   'forms/apartament': ['forms/apartament']
  // }],

  external: [
    'pouchdb-adapter-memory',
    'pouchdb-adapter-idb',
    'pouchdb-adapter-http',
    'rxdb',
    'mobx',
    'consola',
    'rxcollection-subscriber',
    'debug',
    'regenerator-runtime'
  ],

  plugins: [
    ts(),

    // globImport(),

    globals(),

    commonjs({
      include: ['node_modules/**/*', '.schemas/*', 'src/lib/*'],
      ignore: ["conditional-runtime-dependency"]
    }),

    // Compile TypeScript/JavaScript files
    babel({
      extensions,
      include: ['src/**/*'],
      runtimeHelpers: true,
      presets: ['@babel/preset-env']
    }),

    // Allows node_modules resolution
    nodeResolve({
      modulesOnly: true,
      extensions,
      preferBuiltins: true
      // customResolveOptions: {
      //   forms: 'src/lib/forms/*'
      // }
    }),

    builtins(),

    // uglify()
  ],

  output: {
    // file: pkg.main,
    dir: 'dist',
    format: 'cjs'
  },
};
