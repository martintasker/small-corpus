var webpack = require('webpack');

module.exports = {
  entry: {
    "small-corpus-searcher": "./src/small-corpus-searcher.js",
    "small-corpus-searcher.min": "./src/small-corpus-searcher.js"
  },
  output: {
    path: 'build',
    filename: '[name].js',
    library: 'SmallCorpusSearcher',
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
