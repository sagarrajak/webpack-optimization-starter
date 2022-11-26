const path = require("path");
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/js/index.js",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "js/[contenthash].bundle.js",
    clean: true,
  },
  optimization: {
    minimize: true,
    minimizer: [
      `...`,
      new CssMinimizerPlugin({
        // minify: CssMinimizerPlugin.cssoMinify,
        parallel: true,
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /\.module\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.css$/i,
        include: /\.module\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                quietDeps: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpeg|jpg)$/,
        type: 'asset',
        generator: {
          filename: './images/[name].[contenthash:12][ext]'
        }
      }
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
    new PurgeCSSPlugin({
      paths: glob.sync(`${path.join(__dirname, "../src")}/**/*`, {
        nodir: true,
      }),
    }),
  ],
};
