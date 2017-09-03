module.exports = {
  entry: "./src/main.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js",
    publicPath: "/"
  },
  devServer: {
    inline: "true",
    contentBase: __dirname + "/public"
  },
  module: {
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
