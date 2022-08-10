const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
  entry: './src/index.js',
  output: { 
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass|css)$/i, 
        use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ], 
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new HtmlWebpackPlugin({
        template: "./src/index.html"
    })
  ],
  devtool: 'source-map',
  watchOptions: {
    ignored: /node_modules/
  },
  devServer: {
    open: true
  }
};