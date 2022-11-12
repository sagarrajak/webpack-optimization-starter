const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    entry: "./src/js/index.js",
    output: {
      path: path.resolve(__dirname, "../dist"),
      filename: "js/[contenthash].bundle.js",
      clean: true
    },
    optimization: {
      minimizer: [
        new CssMinimizerPlugin(),
      ],
    },
    module: {
      rules: [
        {
          test: /\.(css)$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        }
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:12].css' 
      }),
      new HtmlWebpackPlugin({
        template: "src/template.html",
        title: "My App",
      }),
    ]
  };
  