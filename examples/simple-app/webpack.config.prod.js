// Copyright (c) 2018 Ultimaker B.V.
const path = require('path')
const merge = require('webpack-merge');

const commonsBase = require("../../webpack.config.common.js");
const prodBase = require('../../webpack.config.prod.js');

const webpackArgs = [[path.resolve(__dirname, "app/assets"), path.resolve(__dirname, "../../src")], path.resolve(__dirname, "app/static"), path.resolve(__dirname, "app/assets/index.js")]

const commons = commonsBase(...webpackArgs)
const prod = prodBase(...webpackArgs)

module.exports = merge(commons, prod)
