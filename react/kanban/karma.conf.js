const testConfig = require('./webpack.test.config.js');

module.exports = function karmaConfig (config) {
  // define configuration for karma
  const configuration = {
    frameworks: [
      'jasmine'
    ],

    files: [
      // Needed because React.js requires bind and phantomjs does not support it
      'node_modules/phantomjs-polyfill/bind-polyfill.js',
      // Grab all files in the __tests__ directory that contain _test
      '__tests__/*_test.*'
    ],

    preprocessors: {
      // Convert files with webpack and load sourcemaps
      '__tests__/*_test.*': ['webpack', 'sourcemap']
    },

    // Using test webpack config
    webpack: testConfig,

    webpackServer: {
      noInfo: true // please don't spam the console when running in karma!
    },

    plugins: [
      'karma-webpack',
      'karma-jasmine',
      'karma-sourcemap-loader',
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-firefox-launcher',
      'karma-coverage',
      'karma-spec-reporter'
    ],

    babelPreprocessor: {
      options: {
        presets: ['airbnb']
      }
    },

    reporters: [
      'progress',
      'spec',
      'coverage'
    ],

    browsers: [
      'Chrome', // run tests using Chrome
      'PhantomJS' // run tests using PhantomJS
    ],

    // Configure code coverage reporter
    coverageReporter: {
      dir: '__tests__/coverage/',
      type: 'html'
    },

    // Hide webpack build information from output
    webpackMiddleware: {
      noInfo: true
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false
  };

  // Set configuration
  config.set(configuration);
}
