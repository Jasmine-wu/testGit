const common = require("./webpack-common");
const { merge} = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

// 运行命令: yarn webpack --config webpack-prod.js


// module.exports = Object.assign({}, common, {
//   mode: "production",
//   plugins: [
//     new CleanWebpackPlugin(),
//     // 生产mode打包额外资源
//     new CopyWebpackPlugin(["public"]),
//   ],
// });

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new CleanWebpackPlugin(),
    // 生产mode打包额外资源
    new CopyWebpackPlugin(["public"]),
  ],
});
