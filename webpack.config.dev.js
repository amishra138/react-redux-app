const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

process.env.NODE_ENV = "development";

module.exports = {
  mode: "development",
  target: "web",
  devtool: "cheap-module-source-map", //recommended for dev enviornment, source maps let us see our original code when debugging in the browser
  entry: "./src/index", //default for webpack
  //Note - Webpack doesn't output code in development mode. It serves our app from memory
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/", //this specifies public url of the output dir when it referenced in browser
    filename: "bundle.js",
  },
  //this well define to serve your app, it could be via express server or node
  devServer: {
    stats: "minimal", //dont' get a lot of noise when it's running
    overlay: true, // it overlays any error that occur in the browser.
    historyApiFallback: true, // this means that all request will be sent to index.html. This way we can load deeplinks, and they'll all be handled by React Router.
    disableHostCheck: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    https: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      facicon: "src/favicon.ico",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/, //ignore-this-folder
        use: ["babel-loader", "eslint-loader"],
      },
      {
        test: /(\.css)$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
