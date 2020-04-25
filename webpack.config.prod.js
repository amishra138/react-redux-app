const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpackBundleAnalyzer = require("webpack-bundle-analyzer");

process.env.NODE_ENV = "production";

module.exports = {
  mode: "production",
  target: "web",
  devtool: "source-map", //recommended for prod enviornment, source maps let us see our original code when debugging in the browser
  entry: "./src/index", //default for webpack
  //Note - Webpack doesn't output code in development mode. It serves our app from memory
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/", //this specifies public url of the output dir when it referenced in browser
    filename: "bundle.js",
  },
  plugins: [
    //Display a report of what's in our bundle
    new webpackBundleAnalyzer.BundleAnalyzerPlugin({ analyzerMode: "static" }),

    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),

    // Now webpack will replace process.env.API_URL anywhere in our code with the URL we've specified here.
    new webpack.DefinePlugin({
      //This global makes sure react is build in prod mode
      "process.env.API_URL": JSON.stringify("http://localhost:3001"),
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      facicon: "src/favicon.ico",
      minify: {
        // see https://github.com/kangax/html-minifier#options-quick-reference
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
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
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [require("cssnano")],
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
};
