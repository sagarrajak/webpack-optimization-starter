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
  resolve: {
    extensions: ['.ts', '.js']
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
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 // 4kb
          }
        },
        generator: {
          filename: "./images/[name][ext]",
        },
        use: [
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 40
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75,
              },
            },
          },
        ],
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
    new PurgeCSSPlugin({
      paths: glob.sync(`${path.join(__dirname, "../src")}/**/*`, {
        nodir: true,
      }),
    }),
  ],
};
