const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  output: {
    filename: './example/bundle.js',
  },
  devServer: {
    contentBase: './example',
    compress: true,
    port: 9966,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.js(x?)$/,
        exclude: /node_modules\/(?!@readme\/syntax-highlighter|swagger2openapi)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  externals: /node_modules\/(?!@readme\/syntax-highlighter|swagger2openapi)/,
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
});
