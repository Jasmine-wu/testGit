const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// 2.
const webapck = require("webpack");

module.exports = {
  mode: "none",
  devServer: {
    // 启动时自动打开浏览器
    open: true,
    // 启动热更新插件
    hot: true,
    // 开启热更新时，关闭自刷新
    // 如果使用hot:true， 当手动处理热替换里的代码出现错误时，浏览器会启动自刷新，控制台错误信息会被覆盖掉，开发者不会知道自己代码写过错了
    // 解决上面的问题：hotOnly: true
    hotOnly: true, //开启热更新同时关闭自刷新
  },
  devtool: "cheap-module-eval-source-map",
  output: {
    path: path.join(__dirname, "/output"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: "url-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new CleanWebpackPlugin(),
    new webapck.HotModuleReplacementPlugin(),
  ],
};
