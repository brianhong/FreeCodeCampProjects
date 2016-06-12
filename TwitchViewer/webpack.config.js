const webpack = require('webpack');
const path = require('path');
const validate = require('webpack-validator');

/* Directory path for bundle file output */
const BUILD_DIR = path.resolve(__dirname, 'src/client/public');

/* Directory path for application's codebase */
const APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
 entry: APP_DIR + '/index.jsx',
 output: {
  path: BUILD_DIR,
  filename: 'bundle.js'
 },
 module: {
  loaders: [
   {
    test: /\.jsx?/,
    include: APP_DIR,
    loader: 'babel'
   }
  ]
 }
};

module.exports = validate(config);
