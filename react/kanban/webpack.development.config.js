const path = require('path');
const webpack = require('webpack');
const NpmInstallPlugin = require('npm-install-webpack-plugin');

const PATHS = {
  public: path.join(__dirname, 'public'),
  entry: [
    path.join(__dirname, 'app', 'index.jsx'),
    'webpack-dev-server/client?http://0.0.0.0:9000'
  ]
};

const config = {
  devtool: 'eval-source-map',
  devServer: {
    contentBase: PATHS.public,

    // Enable history API fallback so HTML5 History API based
    // routing works. This is a good default that will come
    // in handy in more complicated setups.
    historyApiFallback: true,

    hot: true,
    inline: true,
    watch: true,
    progress: true,
    colors: true,

    // parse host and port from env so this is easy
    // to customize
    host: process.env.HOST,
    port: process.env.PORT
  },
  module: {
    loaders: [
      {
        test: /\.(css|scss)$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new NpmInstallPlugin({
      save: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};

/**
 * Expose.
 */
module.exports = config;
