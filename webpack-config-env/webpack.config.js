const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Webpack = require("webpack");
// 中小型项目：在一个配置文件里根据环境的不同使用不同的配置
// 运行cli: yarn webpack / yarn webpack --env pro
module.exports = (env, argv) => {
  let config = {
    entry: "./src/main.js",
    mode: "development",
    devtool: "eval-cheap-module-source-map",
    devServer: {
      open: true,
      hot: true,
      hotonly: true,
      // 开发mode打包额外静态资源
      contentBase: "./src/public/",
    },

    module: {
      // 针对其他资源的加载规则
      rules: [
        {
          // 1.加载css文件
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          // 2.加载图片资源
          test: /\.(png|jpeg|jpg|gif)$/,
          // use: "file-loader"
          use: {
            loader: "url-loader",
            options: {
              // <10kb- url-loader >10kb->file-laoder
              limit: 10 * 1024,
            },
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin(),
      new Webpack.HotModuleReplacementPlugin(),
    ],
  };
  if (env === "pro") {
    config.mode = "production";
    config.devtool = false;
    config.plugins = [
      ...config.plugins,
      new CleanWebpackPlugin(),
      // 生产mode打包额外资源
      new CopyWebpackPlugin(["./src/public"]),
    ];
  }

  return config;
};
