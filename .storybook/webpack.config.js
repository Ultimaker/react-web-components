const path = require("path");

module.exports = {
    module: {
        rules: [
            {
                test: /\.tsx/,
                loader: 'awesome-typescript-loader',
                include: path.resolve(__dirname, '../src')
            },
            {
                test: /\.sass$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader'],
                include: path.resolve(__dirname, '../src')
            }
        ]
    }
};
