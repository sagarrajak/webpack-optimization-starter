const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/js/index.js",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "js/[contenthash].bundle.js",
    clean: true,
  },
   resolve: {
    extensions: ['.ts', '.js']
  },  
  optimization: {
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
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.less$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
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
          filename: './images/[name][ext]'
        }
      },
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
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
  ],
};
