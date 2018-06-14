// Copyright (c) 2018 Ultimaker B.V.
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require("webpack");

module.exports = (sourceDirs, buildDir, entryPoint) => {
    return {
        plugins: [
            new CleanWebpackPlugin([buildDir, "tmp"]),
            new ExtractTextPlugin({ filename: "main.css", allChunks: true }),
            new UglifyJSPlugin({ sourceMap: true }),
            new webpack.DefinePlugin({ "process.env.NODE_ENV": "production" })
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
                                sourceMap: true
                            }
                        }
                    ]
                })
            }]
        }
    }
}
