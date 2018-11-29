var path = require('path')

function resolve (dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = {
  entry: "./src/index.ts",

  output: {
    filename: "index.js",
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
    minimize: false
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'ts-loader',
          options: { transpileOnly: true }
        }
      }
    ]
  }
}
