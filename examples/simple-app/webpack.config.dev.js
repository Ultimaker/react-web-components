// Copyright (c) 2018 Ultimaker B.V.
const path = require('path')
const merge = require('webpack-merge');

const commonsBase = require("../../src/build/webpack.config.common.js");
const devBase = require('../../src/build/webpack.config.dev.js');

const webpackConfig = {
    sourceDirs: [
        path.resolve(__dirname, "app/assets"),
        path.resolve(__dirname, "../../src")
    ],
    buildDir: path.resolve(__dirname, "app/static"),
    entryPoint: path.resolve(__dirname, "app/assets/index.js"),
    env: {
        STATIC_URL: "/",
        NODE_ENV: "development"
    }
}

const commons = commonsBase(webpackConfig)
const dev = devBase(webpackConfig)

module.exports = merge(commons, dev, {
    devServer: {
        contentBase: path.resolve(__dirname, 'dev'),
        host: '127.0.0.1',
        port: 8000,
        historyApiFallback: true
    }
})
