// Copyright (c) 2018 Ultimaker B.V.
const path = require('path')
const merge = require('webpack-merge');

const commonsBase = require("../../webpack.config.common.js");
const devBase = require('../../webpack.config.dev.js');

const webpackArgs = [[path.resolve(__dirname, "app/assets"), path.resolve(__dirname, "../../src")], path.resolve(__dirname, "app/static"), path.resolve(__dirname, "app/assets/index.js")]

const commons = commonsBase(...webpackArgs)
const dev = devBase(...webpackArgs)

module.exports = merge(commons, dev, {
    devServer: {
        contentBase: path.resolve(__dirname, './dev'),
        host: '127.0.0.1',
        port: 8000,
        historyApiFallback: true
    }
})
