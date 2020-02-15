import path from 'path';
import fs from 'fs';

// plugins
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import builtins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'
import babel from 'rollup-plugin-babel'
import ts from 'rollup-plugin-typescript'
import { uglify } from 'rollup-plugin-uglify'

const extensions = [ 'js', 'jsx', `ts`, 'tsx' ];
const input = ['src/index.ts'] //, 'src/.schemas/Asociatie.ts'

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
    'rxcollection-subscriber'
  ],

  plugins: [
    // VIRTUAL MODULE
    // for dynamic schema loading
    {
      // this is necessary to tell rollup that it should not try to resolve "dynamic-targets"
      // via other means
      resolveId(id) {
        if (id === 'dynamic-targets') {
          return id;
        }
        return null;
      },

      // create a module that exports an object containing file names as keys and
      // functions that import those files as values
      load(id) {
        if (id === 'dynamic-targets') {
          const targetDir = path.join(__dirname, 'src/.schemas');
          let files = fs.readdirSync(targetDir);
          files.splice(files.indexOf('.DS_Store'), 1)
          const objectEntries = files
            // .map(file => `  '${file}': () => import('${path.join(targetDir, file)}')`);
            .map(file => `  '${file}': import('${path.join(targetDir, file)}') `);
          return `export default {\n${objectEntries.join(',\n')}\n};`;
        }
        return null;
      }
    },
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
      include: ['node_modules/**/*', 'src/.schemas/*', 'src/lib/*'],
      ignore: ["conditional-runtime-dependency"]
    }),

    babel({
      extensions,
      babelrc: true,
      runtimeHelpers: true,
      include: ['src/**/*', 'src/.schemas/*'],
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
