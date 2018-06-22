// Copyright (c) 2018 Ultimaker B.V.
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require("webpack");
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = ({ buildDir, env, htmlTemplate }) => {
  return {
    plugins: [
      new CleanWebpackPlugin([buildDir, "tmp"]),
      new ExtractTextPlugin({ filename: "bundle.css", allChunks: true }),
      new UglifyJSPlugin({ sourceMap: true }),
      new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify(env.NODE_ENV || "production") }),
      new HtmlWebpackPlugin({
        template: htmlTemplate,
        inject: false
      }),
      new InterpolateHtmlPlugin(env)
    ],
    module: {
      rules: [{
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
                sourceMap: true,
                data: "$static_url: " + JSON.stringify(env.STATIC_URL || "/")
              }
            }
          ]
        })
      }]
    }
  }
}
