import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import builtins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'
import babel from 'rollup-plugin-babel'
import ts from 'rollup-plugin-typescript'
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

  // Specify here external modules which you don't want to include in your bundle (for instance: 'lodash', 'moment' etc.)
  // https://rollupjs.org/guide/en#external-e-external
  // external: ['fs', 'tty', 'os', 'util', 'debug', 'rxdb'],
  external: [
    'debug',
    'rxdb',
    'pouchdb-adapter-memory',
    'pouchdb-adapter-idb',
    'pouchdb-adapter-http'
  ],

  globals: {
    rxdb: 'RxDB',
    debug: 'Debug'
  },

  plugins: [
    // Allows node_modules resolution
    resolve({ extensions, preferBuiltins: true }),

    globals(),

    // Allow bundling cjs modules. Rollup doesn't understand cjs
    commonjs({
      namedExports:  {
        // left-hand side can be an absolute path, a path
        // relative to the current directory, or the name
        // of a module in node_modules
        'node_modules/crypto-js/aes.js': [ 'encrypt', 'decrypt' ]
      }
    }),

    ts(),

    builtins(),

    // Compile TypeScript/JavaScript files
    babel({ extensions, include: ['src/**/*'] }),
  ],

  output: {
    file: pkg.main,
    format: 'cjs',
  },
};
