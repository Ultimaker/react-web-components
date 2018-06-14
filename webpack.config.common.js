const webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require("path");

const BUILD_DIR = path.resolve(__dirname, "app/static");
const APP_DIR = path.resolve(__dirname, "app/assets");
const TMP_DIR = path.resolve(__dirname, "tmp");

module.exports = {

  entry: [
    "react-hot-loader/patch",
    APP_DIR + "/javascripts/index.js"
  ],

  plugins: [
    // copy assets to static folder
    new CopyWebpackPlugin([
      { from: APP_DIR + '/fonts', to: BUILD_DIR + '/fonts' },
      { from: APP_DIR + '/images', to: BUILD_DIR + '/images' },
      { from: APP_DIR + '/locales', to: BUILD_DIR + '/locales' },
    ]),
    new webpack.NormalModuleReplacementPlugin(
      /\/iconv-loader$/, 'node-noop'
    )
  ],

  output: {
    filename: "bundle.js",
    path: BUILD_DIR,
    publicPath: "/static/"
  },

  resolve: {
    // Add ".ts" and ".tsx" as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      // All files with a ".ts" or ".tsx" extension will be handled by "awesome-typescript-loader".
      { test: /\.tsx?$/, loader: ["react-hot-loader/webpack", "awesome-typescript-loader"] },

      // All output ".js" files will have any sourcemaps re-processed by "source-map-loader".
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
    ]
  },
};
