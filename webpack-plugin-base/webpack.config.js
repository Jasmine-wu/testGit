let path = require("path")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
    mode: "none",
    output: {
        // 绝对路径
        path: path.join(__dirname, "output"),
        filename: "bundle.js"
    },

    devServer: {
        // 即dev server打包不进去的资源，但是实际又需要的资源，真正运行时要如何访问到？
        // contentBase指定额外的静态资源访问路径
        // 实际开发阶段时替代copy-webpack-plugin的更好的选择
        contentBase: "./src/public"
    },

    plugins: [
        // 1.每次打包前先清理输出目录下旧文件，避免手动删除旧文件
        new CleanWebpackPlugin(),
        // 2.在打包输出文件里自动生成html文件，并引入打包文件路径
        new HtmlWebpackPlugin({
            title: "xxx app",
            meta: {
                viewport: "width=device-width"

            },
            // 根据模版自动生成，没有模版就会自己根据配置项生成
            template: "./src/index.html"
        }),

        // 根据模版生成第二次html页面
        new HtmlWebpackPlugin({
            filename: "index2.html",
            title: "xxx3333 app",
            meta: {
                viewport: "width=device-width"

            },
            // 根据模版自动生成，没有模版就会自己根据配置项生成
            template: "./src/index.html"
        }),

        // 自动复制指定资源到输出目录
        // 实际开发阶段不要用这个插件，而是指定dev server的contentBase
        // new CopyWebpackPlugin([
        //     "./src/public" //复制public目录下的资源
        // ])

    ]



}