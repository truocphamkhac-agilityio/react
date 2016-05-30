const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Load package.json so we can use `dependencies` from there
const pkg = require('./package.json');

process.env.NODE_ENV = 'production'

const PATH = {
  public: path.join(__dirname, 'public'),
  entry: [
    path.join(__dirname, 'app', 'index.jsx')
  ]
};

// define configs for production mode
const config = {
  entry: {
    // vendor:['react','react-dom'],
    vendor: Object.keys(pkg.dependencies).filter(v => {
      return v !== 'alt-utils';
    }),
    app: PATH.entry
  },
  output: {
    path: PATH.public,
    filename: '[name].[hash].js', // output using entry name
    chunkFilename: '[chunkhash].js'
  },
  resolve: {
    root: [path.resolve(__dirname, 'app')],
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.css$/,
      // loaders: ['style', 'css']
      loader: ExtractTextPlugin.extract('style', 'css')
    }, {
      test: /(\.jsx|\.js)$/,
      exclude: /node_modules/,
      loaders: ['babel']
    }, {
      test: /.*\.(gif|png|jpe?g|svg)$/i,
      loaders: [
        'file?hash=sha512&digest=hex&name=[hash].[ext]',
        'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
      ]
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/octet-stream'
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file'
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=image/svg+xml'
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      // A common mistake is not stringifying the "production" string.
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new CleanPlugin(PATH.public),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    // Extract vendor and manifest files
    new webpack.optimize.CommonsChunkPlugin({
      minChunks: Infinity,
      names: ['vendor']
    }),
    new HtmlWebpackPlugin({
      template: 'node_modules/html-webpack-template/index.ejs',
      title: 'Kanban app',
      appMountId: 'app',
      inject: false
    }),
    // Output extracted CSS to a file
    new ExtractTextPlugin('[name].[chunkhash].css')
  ]
};

module.exports = config;







