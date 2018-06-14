// Copyright (c) 2018 Ultimaker B.V.
const webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (sourceDirs, buildDir, entryPoint) => {

    assetsToCopy = []
    for (sourceDir in sourceDirs) {
      assetsToCopy.push({
            from: sourceDir + "/fonts",
            to: buildDir + "/fonts"
        })
        assetsToCopy.push({
            from: sourceDir + "/images",
            to: buildDir + "/images"
        })
        assetsToCopy.push({
            from: sourceDir + "/locales",
            to: buildDir + "/locales"
        })
    }

    return {
        
        entry: [
            "react-hot-loader/patch",
            entryPoint
        ],

        plugins: [
            new CopyWebpackPlugin(assetsToCopy),
            new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, 'node-noop')
        ],

        output: {
            filename: "bundle.js",
            path: buildDir,
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
        }
    }
}
