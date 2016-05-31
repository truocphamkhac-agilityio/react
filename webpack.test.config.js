const path = require('path');
const webpack = require('webpack');

const PATHS = {
  app: path.join(__dirname, 'app'),
  public: path.join(__dirname, 'public'),
  style: path.join(__dirname, 'app/main.css'),
  test: path.join(__dirname, '__tests__')
};

const config = {
  context: path.join(__dirname, './app'),
  entry: {
    kanbanreact: ['./index.jsx']
  },
  devtool: 'inline-source-map',
  resolve: {
    alias: {
      'kanbanreact': path.resolve('./app/index.jsx')
    },
    extensions: ['', '.js', '.jsx', '.json']
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: ['isparta-instrumenter'],
        include: PATHS.app
      }
    ],
    loaders: [
      {
        test: /\.(css|scss)$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.(json)$/,
        loaders: [
          'json-loader?cacheDirectory'
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          'babel?cacheDirectory'
        ],
        include: PATHS.test
      }
    ]
  },
  externals: {
    'cheerio': 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  }
};

/**
 * Expose test config.
 */
module.exports = config;
