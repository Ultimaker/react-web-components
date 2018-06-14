// Copyright (c) 2018 Ultimaker B.V.
const webpack = require("webpack");
const path = require('path');
const merge = require('webpack-merge');
const proxy = require('http-proxy-middleware');
const common = require('./webpack.config.common.js');

module.exports = merge(common, {

  plugins: [
    // relative path of the module is displayed when HMR is enabled
    new webpack.NamedModulesPlugin(),

    // set the NODE_ENV to development
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
  ],

  module: {
    rules: [
      {
        test: /\.sass$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }]
      }
    ]
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'inline-source-map'
});
