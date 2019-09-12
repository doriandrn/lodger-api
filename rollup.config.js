import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import builtins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'
import babel from 'rollup-plugin-babel'
import ts from 'rollup-plugin-typescript'
import { uglify } from 'rollup-plugin-uglify'

const extensions = [ 'js', 'jsx', `ts`, 'tsx' ];
const input = ['src/index.ts']

export default {
  input,
  inlineDynamicImports: true,

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
    ts({
      lib: ["es5", "es6", "dom"],
      target: "es5"
    }),

    globals(),

    // Allows node_modules resolution
    nodeResolve({
      modulesOnly: true,
      extensions,
      preferBuiltins: true
    }),

    commonjs({
      extensions,
      include: ['node_modules/**/*', '.schemas/*', 'src/lib/*'],
      ignore: ["conditional-runtime-dependency"]
    }),

    babel({
      extensions,
      babelrc: true,
      runtimeHelpers: true,
      include: ['src/**/*'],
      exclude: 'node_modules/**'
    }),

    builtins(),

    uglify()
  ],

  output: {
    dir: 'dist',
    format: 'cjs'
  }
};
