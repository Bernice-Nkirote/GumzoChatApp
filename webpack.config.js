const path = require('path');

module.exports = {
  target: 'node',
  entry: './server.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Apply loader to .js files
        exclude: /node_modules/, // Exclude node_modules
        use: {
          loader: 'babel-loader', // Use Babel for JavaScript
        },
      },
      {
        test: /\.css$/, // Apply loader to .css files
        use: ['style-loader', 'css-loader'], // Use style-loader and css-loader for CSS
      },
    ],
  },
};
