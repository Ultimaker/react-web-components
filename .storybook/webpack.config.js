const path = require("path");

module.exports = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
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
