const path = require("path");
const include = path.resolve(__dirname, '../');

module.exports = {
  module: {
      rules: [
          {
            test: /\.tsx/,
            loader: 'babel-loader!ts-loader',
            exclude: /node_modules/,
            include
          }
      ]
  }
};