var path = require('path')

function resolve (dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = {
  entry: '~/index.ts',

  target: 'node',

  output: {
    filename: 'index.js',
    path: resolve('dist'),
    chunkFilename: "[name].bundle.js",
    libraryTarget: 'umd',
    // library: 'Lodger',
    umdNamedDefine: true
  },

  mode: 'production',

  resolve: {
    extensions: [".js", ".ts"],
    alias: {
      'lodger.config': resolve('./'),
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
    // removeEmptyChunks: true,
    minimize: false,
    // concatenateModules: true,
    moduleIds: 'hashed',
    splitChunks: {
      chunks: 'all'
    },
    nodeEnv: 'production'
  },

  module: {
    rules: [
      // {
      //   test: /\.ts?$/,
      //   exclude: /(node_modules|bower_components)/,
      //   use: {
      //     loader: 'ts-loader',
      //     // loader: 'ts-loader',
      //     // loader: 'awesome-typescript-loader',
      //     options: { transpileOnly: true }
      //   }
      // },
      {
        test: /\.ts?$/,
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
