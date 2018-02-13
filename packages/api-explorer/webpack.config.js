module.exports = {
  entry: './src/index.jsx',
  module: {
    rules: [
      {
        test: /\.js(x?)$/,
        target: 'web',
        exclude: /node_modules\/(?!@readme\/syntax-highlighter|swagger2openapi)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  externals: /node_modules\/(?!@readme\/syntax-highlighter|swagger2openapi)/,
  output: {
    filename: './dist/index.js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
};
