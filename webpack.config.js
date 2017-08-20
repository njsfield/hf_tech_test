const path = require('path');

// Paths
const publicPath = path.join(__dirname, 'public');
const srcPath = path.join(__dirname, 'src');

module.exports = {
  // Set entry file
  entry: {
    main: path.join(srcPath, 'static', 'js', 'app.js')
  },
  // set output JS file
  output: {
    filename: 'app.js',
    path: path.join(publicPath, 'js')
  },
  devtool: 'source-map',
  module: {
    loaders: [
      // Processes Javascript from webpack-build.js
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader' // & transpile
      }
    ]
  }
};
