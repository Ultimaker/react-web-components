const path = require("path");

module.exports = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'awesome-typescript-loader',
                include: path.resolve(__dirname, '../src'),
                exclude: /node_modules/
            },
            {
                test: /\.sass$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader'],
                include: path.resolve(__dirname, '../src'),
                exclude: /node_modules/
            },
            {
                test: /\.(woff|woff2|eot|ttf|png|svg|jpg|ico)$/,
                loader: 'file-loader',
                include: path.resolve(__dirname, '../src'),
                exclude: /node_modules/,
                options: {
                    name: 'static/[path][name].[ext]?[hash]',
                    context: 'src'
                }
            }
        ]
    }
}
