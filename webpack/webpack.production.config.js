const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  mode: 'production'
})