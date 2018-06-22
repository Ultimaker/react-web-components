// Copyright (c) 2018 Ultimaker B.V.
const webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = ({ sourceDirs, buildDir, entryPoint, env }) => {

  resourceTypes = ["fonts", "images", "locales"]
  assetsToCopy = []

  for (sourceDir of sourceDirs) {
    for (type of resourceTypes) {
      assetsToCopy.push({
        from: `${sourceDir}/${type}`,
        to: `${buildDir}/${type}`,
      })
    }
  }

  return {

    entry: [
      "react-hot-loader/patch",
      entryPoint
    ],

    plugins: [
      new webpack.DefinePlugin({ 'process.env.STATIC_URL': JSON.stringify(env.STATIC_URL || "/") }),
      new CopyWebpackPlugin(assetsToCopy),
      new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, 'node-noop'),
    ],

    output: {
      filename: "bundle.js",
      path: buildDir,
      publicPath: env.STATIC_URL || "/"
    },

    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
      rules: [
        // All files with a ".ts" or ".tsx" extension will be handled by "awesome-typescript-loader".
        { test: /\.tsx?$/, loader: ["react-hot-loader/webpack", "awesome-typescript-loader"] },
        // All output ".js" files will have any sourcemaps re-processed by "source-map-loader".
        { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      ]
    }
  }
}
