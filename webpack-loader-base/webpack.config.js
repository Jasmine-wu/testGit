let path = require("path")
module.exports = {
    // 修改打包模式
    mode: "none",
    entry: "./src/main.js",
    // 修改出口文件名和文件路径
    // 默认出口：/dist/main.js
    output: {
        filename: "bundle.js",
        // 必须是绝对路径
        path: path.join(__dirname, "output"),
        // 注意，加载图片资源的默认加载的是网站的根目录，但打包后的图片在网站的output/目录下
        publicPath: "output/"

    },
    module: {
        // 针对其他资源的加载规则
        rules: [{
            // 加载css文件
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        }, {
            // 加载图片资源
            test: /\.(png|jpeg|jpg|gif)$/,
            // use: "file-loader"
            use: {
                loader: "url-loader",
                options: {
                    // <10kb- url-loader >10kb->file-laoder
                    limit: 10 * 1024
                }
            }
        }],
    }

}