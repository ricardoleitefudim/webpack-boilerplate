const webpack = require('webpack');
const path = require('path');

const projectDir = path.resolve(`${__dirname}`);
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context : projectDir,

  entry: {
    'app': [
      'babel-polyfill',
      'react-hot-loader/patch',
      './src/index'
    ]
  },

  output: {
    path: `${projectDir}/dist`,

    publicPath: '/dist/',
    // necessary for HMR to know where to load the hot update chunks

    filename: 'js/[name].js', // is a template to receive each name of js file on outputBundlesEntires
    // the output bundle
  },

  resolve: {
    extensions: ['.js'],
  },

  devServer: {
    inline: true,
    stats: 'errors-only',
  },

  module: {
    rules: [
      {
         test: /\.js$/,
         include: `${projectDir}/src`,
        loaders: ['react-hot-loader/webpack', 'babel']
          
      },
      {
        test: /\.css$/,
        include: `${projectDir}/src`,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader",
          publicPath: "/dist"
        }),
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new ExtractTextPlugin({
      filename: 'css/styles.css',
      disable: false,
      allChunks: true,
    }),
  ],
};