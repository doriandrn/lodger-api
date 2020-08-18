import path from 'path';
import fs from 'fs';

// plugins
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import builtins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'
import babel from 'rollup-plugin-babel'
import ts from 'rollup-plugin-typescript'
import copy from 'rollup-plugin-copy'
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
    'faker',
    'rxcollection-subscriber'
  ],

  plugins: [
    {
      resolve(id) {
        return id === 'locales' ? id : null
      },
      load (id) {
        if (id !== 'locales') return

        const dirs = ['src/lib/locales']
        let objectEntries = []

        dirs.map(dir => {
          const targetDir = path.join(__dirname, dir);
          let files = fs.readdirSync(targetDir);

          if (files.indexOf('.DS_Store') > -1)
            files.splice(0, 1)

          if (!files.length) return
          objectEntries.push(...files
            .map(file => `  '${file}': () => import('${path.join(targetDir, file)}')`));
            // .map(file => `  '${file}': import('${path.join(targetDir, file)}') `);
        })

        if (objectEntries) return `export default {\n${objectEntries.join(',\n')}\n};`;
      }
    },
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
          const dirs = ['src/.schemas']
          let objectEntries = []

          dirs.map(dir => {
            const targetDir = path.join(__dirname, dir);
            let files = fs.readdirSync(targetDir);

            if (files.indexOf('.DS_Store') > -1)
              files.splice(0, 1)

            if (!files.length) return
            objectEntries.push(...files
              .map(file => `  '${file}': () => import('${path.join(targetDir, file)}')`));
              // .map(file => `  '${file}': import('${path.join(targetDir, file)}') `);
          })

          if (objectEntries) return `export default {\n${objectEntries.join(',\n')}\n};`;
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
    copy({
      targets: [
        { src: 'src/lib/locales/**/*', dest: 'dist/locales' }
      ]
    }),

    builtins(),

    // uglify()
  ],

  output: {
    dir: 'dist',
    format: 'cjs'
  }
};
