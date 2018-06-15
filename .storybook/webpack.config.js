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
            },
            {
                test: /\.(woff|woff2|eot|ttf|png|svg|jpg|ico)$/,
                loader: 'file-loader',
                include: path.resolve(__dirname, '../src'),
                options: {
                    name: 'static/[path][name].[ext]?[hash]',
                    context: 'src'
                }
            }
        ]
    }
};
