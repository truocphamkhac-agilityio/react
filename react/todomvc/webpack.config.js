const path = require('path');
const webpack = require('webpack');

const PATH = {
  public: path.join(__dirname, 'public'),
  entry: [
    path.join(__dirname, 'app', 'index.js'),
    'webpack-dev-server/client?http://0.0.0.0:9000'
  ]
};

const config = {
  entry: PATH.entry,
  output: {
    path: PATH.public,
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: PATH.public,
    hot: true,
    inline: true,
    watch: true,
    progress: true
  },
  resolve: {
    root: [path.resolve(__dirname, 'src')],
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass']
    }, {
      test: /(\.jsx|\.js)$/,
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel']
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};

module.exports = config;
