const webpack = require('webpack');
const plugins = process.env.NODE_ENV === 'production' ? [
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin()
] : []

module.exports = {
  entry: "./src/main.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js",
    publicPath: "/"
  },
  plugins: plugins,
  devServer: {
    inline: "true",
    contentBase: __dirname + "/public"
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: "source-map"
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: "babel",
        query: {
          presets: [ "react", "es2015", "stage-0" ],
          plugins: [ __dirname + "/babelRelayPlugin" ]
        }
      }
    ]
  },
  externals:[{
    xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}'
  }]
}
