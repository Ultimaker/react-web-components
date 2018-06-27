const path = require("path");
const webpack = require("webpack");

const static_url = "http://localhost:9001";

module.exports = {
  plugins: [
    new webpack.DefinePlugin({ 'process.env.STATIC_URL': JSON.stringify(static_url || "/") }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loaders: ['awesome-typescript-loader', 'react-docgen-typescript-loader'],
        include: path.resolve(__dirname, '../src'),
        exclude: /node_modules/
      },
      {
        test: /\.sass$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
            options: {
              data: "$static_url: " + JSON.stringify(static_url)
            }
          }
        ],
        include: path.resolve(__dirname, '../src'),
        exclude: /node_modules/
      },
      {
        test: /\.(woff|woff2|eot|ttf|png|svg|jpg|ico)$/,
        loader: 'file-loader',
        include: path.resolve(__dirname, '../src'),
        exclude: /node_modules/,
        options: {
          name: '[path][name].[ext]?[hash]',
          context: 'src'
        }
      }
    ]
  }
}
