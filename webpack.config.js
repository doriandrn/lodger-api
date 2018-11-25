module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "./dist/bundle.js",
  },

  devtool: "source-map",
  mode: "production",

  resolve: {
    extensions: [".js", ".ts"]
  },

  optimization: {
    removeEmptyChunks: true,
    minimize: true
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'awesome-typescript-loader'
        }
      }
    ]
  }

}
