const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");


module.exports = {
  mode: 'development',
  entry: "./src/js/index.js",
  devServer: {
    port: 9000,
    static: {
      directory: path.resolve(__dirname, "../dist"),
    },
    devMiddleware: {
      index: "index.html",
    },
    client: {
      overlay: true,
    },
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "js/[contenthash].bundle.js",
    clean: true,
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /\.module\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.css$/i,
        include: /\.module\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName:'[name]__[local]--[hash:base64:5]',
              },
            }
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:12].css",
    }),
    new HtmlWebpackPlugin({
      template: "src/template.html",
      title: "My App",
    }),
  ],
}
