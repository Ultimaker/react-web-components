// Copyright (c) 2018 Ultimaker B.V.
const path = require('path')
const merge = require('webpack-merge');

const commonsBase = require("../../src/build/webpack.config.common.js");
const prodBase = require('../../src/build/webpack.config.prod.js');

const webpackConfig = {
    sourceDirs: [
        path.resolve(__dirname, "app/assets"),
        path.resolve(__dirname, "../../src")
    ],
    buildDir: path.resolve(__dirname, "build"),
    entryPoint: path.resolve(__dirname, "app/assets/index.js"),
    htmlTemplate: path.resolve(__dirname, 'app/index.html'),
    env: {
        STATIC_URL: "/",
        NODE_ENV: "production"
    }
}

const commons = commonsBase(webpackConfig)
const prod = prodBase(webpackConfig)

module.exports = merge(commons, prod)
