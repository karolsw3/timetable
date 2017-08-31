var path = require('path');
module.exports = {
  entry:  __dirname + "/src/index.js",
  module: {
    rules: [{
      test: /\.js$/,
      use: [
        'babel-loader'
      ],
    }],
  },
  resolve: {
    extensions: ['.js'],
  },
  output: {
    path: path.resolve(__dirname, 'public/'),
    publicPath: "/public/",
    filename: "bundle.js"
  }

}
     