const path = require("path");

module.exports = {
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
              data: "$static_url: " + JSON.stringify("")
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
          name: 'static/[path][name].[ext]?[hash]',
          context: 'src'
        }
      }
    ]
  }
}
