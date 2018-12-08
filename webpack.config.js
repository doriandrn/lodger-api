var path = require('path')

function resolve (dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = {
  entry: "~/index.ts",

  output: {
    filename: "index.js",
    path: resolve('dist')
  },

  mode: "production",

  resolve: {
    extensions: [".js", ".ts"],
    alias: {
      '~': resolve('src'),
      '~/lib': resolve('src/lib/'),
      helpers: resolve('src/lib/helpers'),
      forms: resolve('src/lib/forms'),
      build: resolve('src/lib/build'),
      defs: resolve('src/lib/defs')
    }
  },

  node: {
    fs: 'empty'
  },

  optimization: {
    removeEmptyChunks: true,
    minimize: false,
    concatenateModules: true,
    splitChunks: {
      chunks: 'all'
    }
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          // loader: 'ts-loader',
          // loader: 'awesome-typescript-loader',
          // options: { transpileOnly: true }
        }
      }
    ]
  }
}
