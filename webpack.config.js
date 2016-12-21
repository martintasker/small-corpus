var webpack = require('webpack');

module.exports = {
  entry: {
    "small-corpus": "./src/small-corpus.js"
  },
  output: {
    path: 'build',
    filename: '[name].js',
    library: 'SmallCorpus',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  devtool: "source-map",
  plugins: [new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    })]
};
