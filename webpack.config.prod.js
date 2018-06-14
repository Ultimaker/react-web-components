// Copyright (c) 2018 Ultimaker B.V.
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require("webpack");
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');

const BUILD_DIR = path.resolve(__dirname, "app/static");
const TMP_DIR = path.resolve(__dirname, "tmp");

module.exports = merge(common, {

  plugins: [
    // clean up build and tmp folders
    new CleanWebpackPlugin([BUILD_DIR, TMP_DIR]),

    // extract css into a seperate file
    new ExtractTextPlugin({ filename: "main.css", allChunks: true }),

    // minify js and include sourcemap for debugging
    new UglifyJSPlugin({
      sourceMap: true
    }),

    // set the NODE_ENV to production
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
  ],

  module: {
    rules: [
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader", // only use style-loader in development
          use: [
            {
              loader: "css-loader", // translates CSS into CommonJS 
              options: {
                minimize: true,
                sourceMap: true
              }
            },
            {
              loader: "sass-loader", // compiles Sass to CSS
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }
    ]
  },
});