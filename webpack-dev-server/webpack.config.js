const path = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {

    // output: {
    //     path: path.join(__dirname, "output"),
    //     filename: "bundle.js"
    // },
    devServer: {
        // 指定额外的资源获取路径
        // 当前路径下的public目录
        contentBase: "./public",
        //  代理API
        //在开发服务器中，配置代理将api服务代理到本地服务器
        proxy: {
            '/api': {
                // http://localhost:8080/api/users ->https://api.github.com/api/users
                target: "https://api.github.com",
                // 去掉api, 替换成空字符串
                // https://api.github.com/api/users=> https://api.github.com/users
                pathRewrite: {
                    '^/api': ''
                },
                // 以代理主机作为主机请求而不是localhost
                changeOrigin: true

            }
        }

    },
    //自动生成index.html页面
    plugins: [
            new htmlWebpackPlugin({
                title: "xxxxxxxx"
            }),
        ]
        // 2. yarn webpack-dev-server


}