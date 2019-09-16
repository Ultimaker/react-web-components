const path = require('path');
const sass = require('sass');
const webpack = require('webpack');

const static_url = process.env.STATIC_URL || 'http://localhost:9001';

module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            'process.env.STATIC_URL': JSON.stringify(static_url || '/'),
        }),
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loaders: [
                    'awesome-typescript-loader',
                    'react-docgen-typescript-loader',
                ],
                include: path.resolve(__dirname, '../src'),
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [
                    // creates style nodes from JS strings
                    'style-loader',
                    // translates CSS into CommonJS
                    'css-loader',
                    // compiles Sass to CSS, using Dart Sass
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: sass,
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(woff2?|eot|ttf|png|svg|jpg|ico)$/,
                loader: 'file-loader',
                include: path.resolve(__dirname, '../src'),
                exclude: /node_modules/,
                options: {
                    name: '[path][name].[ext]?[hash]',
                    context: 'src',
                },
            },
        ],
    },
};
