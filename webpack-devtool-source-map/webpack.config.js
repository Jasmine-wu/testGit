const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = {
    // 使用source-map，方便调试
    devtool: "source-map",
    plugins: [
        // 自动生成index.html文件
        new HtmlWebpackPlugin(),
        // 清除上一次打包文件
        new CleanWebpackPlugin(),


    ]

}