// Copyright (c) 2018 Ultimaker B.V.
const webpack = require("webpack");

module.exports = ({ env }) => {
  return {
    plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV || "development") }),
    ],
    module: {
      rules: [{
        test: /\.sass$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              data: "$static_url: " + JSON.stringify(env.STATIC_URL || "/static")
            }
          }
        ]
      }]
    },
    devtool: 'inline-source-map'
  }
}
