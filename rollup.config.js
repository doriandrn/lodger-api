import path from 'path';
import fs from 'fs';

// plugins
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
// import builtins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'
import babel from 'rollup-plugin-babel'
import ts from 'rollup-plugin-typescript'
import copy from 'rollup-plugin-copy'
import json from '@rollup/plugin-json'

import { terser } from "rollup-plugin-terser"

const extensions = [ 'js', 'jsx', 'ts', 'tsx', 'json' ];
const input = [ 'src/index.ts' ]

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
    // VIRTUAL MODULES
    // for dynamic schema loading & locales
    {
      // this is necessary to tell rollup that it should not try to resolve "dynamic-targets"
      // via other means
      resolveId(id) {
        return ['dynamic-targets', 'locales'].indexOf(id) > -1 ? id : null
      },

      // create a module that exports an object containing file names as keys and
      // functions that import those files as values
      async load(id) {
        let objectEntries = []
        let dirs

        switch (id) {
          case 'dynamic-targets':
            dirs = ['src/.schemas']

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

            if (objectEntries)
              return `export default {\n${objectEntries.join(',\n')}\n};`;

          case 'locales':
            dirs = ['src/lib/locales']

            dirs.map(dir => {
              const targetDir = path.join(__dirname, dir);
              let files = fs.readdirSync(targetDir);

              if (files.indexOf('.DS_Store') > -1)
                files.splice(0, 1)

              if (!files.length) return
              objectEntries.push(...files
                .map(file => `  '${file.split('.')[0]}': () => import('${path.join(targetDir, file)}')`));
                // .map(file => `  '${file}': import('${path.join(targetDir, file)}') `);
            })

            if (objectEntries)
              return `export default {\n${objectEntries.join(',\n')}\n};`;
        }

        return null;
      }
    },
    ts({
      lib: ["es5", "es6", "dom"],
      target: "es5"
    }),

    json(),

    globals(),

    // Allows node_modules resolution
    nodeResolve({
      modulesOnly: true,
      extensions,
      preferBuiltins: true
    }),

    commonjs({
      extensions,
      // namedExports: {
      //   'src/lib/maintainable/langs.js': ['supportedLangs']
      // },
      include: ['node_modules/**/*', 'src/.schemas/*', 'src/lib/*', 'src/lib/maintainable/*', 'src/static/*'],
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
        { src: 'src/lib/static/data/currencies/symbols-names.json', dest: 'dist/currencies' }
      ]
    }),

    // builtins(),

    terser()
  ],

  output: {
    dir: 'dist',
    format: 'cjs'
  }
};
