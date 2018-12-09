var path = require('path')

function resolve (dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = {
  entry: './src/index.ts',

  target: 'node',

  output: {
    filename: 'index.js',
    path: resolve('dist'),
    chunkFilename: "[chunkhash].bundle.js",
    libraryTarget: 'umd',
    // library: 'Lodger',
    umdNamedDefine: true
  },

  mode: 'production',

  resolve: {
    extensions: [".js", ".ts"],
    alias: {
      '~': resolve('src'),
      '~/lib': resolve('src/lib/'),
      helpers: resolve('src/lib/helpers'),
      forms: resolve('src/lib/forms'),
      build: resolve('src/lib/build'),
      defs: resolve('src/lib/defs'),
      'lodger.config': resolve('./src/lodger.config.ts')
    }
  },

  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
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
