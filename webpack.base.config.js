const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const developmentConfig = require('./webpack.development.config');
const productionConfig = require('./webpack.production.config');
const testConfig = require('./webpack.production.config');

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
  public: path.join(__dirname, 'public'),
  entry: [
    path.join(__dirname, 'app', 'index.jsx')
  ]
};

process.env.BABEL_ENV = TARGET;

const common = {
  entry: PATHS.entry,
  output: {
    path: PATHS.public,
    filename: 'bundle.js'
  },
  resolve: {
    root: [path.resolve(__dirname, 'app')],
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        exclude: /node_modules/,
        loaders: ['babel']
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
        ]
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
};


/**
 * development env
 */

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, developmentConfig);
}

if (TARGET === 'build' || TARGET === 'stats') {
  module.exports = merge(common, {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  });
}


/**
 * production env
 */

if (TARGET === 'buildProd') {
  module.exports = merge(common, productionConfig);
}
