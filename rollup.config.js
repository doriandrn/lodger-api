import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import builtins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'
import babel from 'rollup-plugin-babel'
import ts from 'rollup-plugin-typescript'
import globImport from 'rollup-plugin-glob-import'
import pkg from './package.json'

// function resolve (dir) {
//   return path.join(__dirname, '.', dir)
// }

const paths  =  {
  '~': resolve('src'),
  '~/lib': resolve('src/lib/'),
  helpers: resolve('src/lib/helpers'),
  forms: resolve('src/lib/forms'),
  build: resolve('src/lib/build'),
  defs: resolve('src/lib/defs')
}

const extensions = [
  '.js', '.jsx', '.ts', '.tsx',
];

const name = 'Lodger';

export default {
  input: './src/index.ts',
  // experimentalCodeSplitting: true,
  inlineDynamicImports: true,

  // Specify here external modules which you don't want to include in your bundle (for instance: 'lodash', 'moment' etc.)
  // https://rollupjs.org/guide/en#external-e-external

  external: [
    'pouchdb-adapter-memory',
    'pouchdb-adapter-idb',
    'pouchdb-adapter-http',
    'rxdb',
    'debug',
    'vue',
    'vuex'
  ],

  plugins: [
    // Allows node_modules resolution

    resolve({
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
      include: ['node_modules/**/*', 'forms/*'],
      ignore: ["conditional-runtime-dependency"],
      namedExports:  {
        // left-hand side can be an absolute path, a path
        // relative to the current directory, or the name
        // of a module in node_modules
        'forms/apartament': ['forms/apartament']
        // 'node_modules/crypto-js/aes.js': [ 'encrypt', 'decrypt' ]
      }
    }),

    // Compile TypeScript/JavaScript files
    babel({ extensions, include: ['src/**/*'], runtimeHelpers: true }),

    builtins()
  ],

  output: {
    file: pkg.main,
    format: 'cjs',
    inlineDynamicImports: true,
    // experimentalCodeSplitting: true,
    // globals: {
    //   rxdb: 'RxDB',
    //   debug: 'Debug',
    //   'pouchdb-adapter-memory': 'memoryAdapter',
    //   'pouchdb-adapter-idb': 'idbAdapter',
    //   'pouchdb-adapter-http': 'httpAdapter'
    // },
  },
};
