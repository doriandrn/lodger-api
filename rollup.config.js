import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import builtins from 'rollup-plugin-node-builtins'
// import globals from 'rollup-plugin-node-globals'
import babel from 'rollup-plugin-babel'
import ts from 'rollup-plugin-typescript'
// import globImport from 'rollup-plugin-glob-import'
// import pkg from './package.json's

// import { taxonomies } from './src/index.ts'
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
  // experimentalCodeSplitting: true,
  // inlineDynamicImports: true,
  // optimizeChunks: true,
  // manualChunks: [{
  //   'forms/apartament': ['forms/apartament']
  // }],

  // Specify here external modules which you don't want to include in your bundle (for instance: 'lodash', 'moment' etc.)
  // https://rollupjs.org/guide/en#external-e-external

  external: [
    'pouchdb-adapter-memory',
    'pouchdb-adapter-idb',
    'pouchdb-adapter-http',
    'rxdb',
    'consola',
    'rxcollection-subscriber',
    'debug'
  ],

  plugins: [
    // Allows node_modules resolution

    nodeResolve({
      modulesOnly: true,
      extensions,
      preferBuiltins: false
      // customResolveOptions: {
      //   forms: 'src/lib/forms/*'
      // }
    }),

    ts(),

    // globImport(),

    // globals(),

    commonjs({
      include: ['node_modules/**/*', '.schemas/*', 'src/lib/*'],
      ignore: ["conditional-runtime-dependency"],
      // ignoreGlobal: true,
      namedExports:  {
      //   // left-hand side can be an absolute path, a path
      //   // relative to the current directory, or the name
      //   // of a module in node_modules
      //   // 'forms/apartament': ['forms/apartament']
      //   // 'node_modules/crypto-js/aes.js': [ 'encrypt', 'decrypt' ]
        './String': ['String', 'strings', 'arrays', 'objects']
      }
    }),

    // Compile TypeScript/JavaScript files
    babel({ extensions, include: ['src/**/*'], runtimeHelpers: true }),

    builtins()
  ],

  output: {
    // file: pkg.main,
    dir: 'dist',
    format: 'cjs'
  },
};
