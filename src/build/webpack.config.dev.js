// Copyright (c) 2018 Ultimaker B.V.
const webpack = require("webpack");
const path = require('path');
const merge = require('webpack-merge');
const proxy = require('http-proxy-middleware');
const common = require('./webpack.config.common.js');

module.exports = (sourceDirs, buildDir, entryPoint) => {
  return {
    plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    ],
    module: {
      rules: [{
        test: /\.sass$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }]
      }]
    },
    devtool: 'inline-source-map'
  }
}
