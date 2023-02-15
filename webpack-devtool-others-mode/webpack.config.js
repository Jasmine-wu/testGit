const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const path = require("path");
const { plugins } = require("../webpack-devtool-source-map/webpack.config");
const { mode } = require("../webpack-loader-base/webpack.config");
console.log(path);

// 需求：为各种source-map模式配置单独的打包任务。方便对比各种模式的区别
// devtool的各种模式一共13种,包含none
const modes = [
    "eval", //控制bug提示点进去可以定位到具体的源码文件
    "eval-source-map", //到文件+具体行/列
    "cheap-eval-source-map", //到文件+行
    "cheap-module-eval-source-map", //
    "cheap-source-map",
    "cheap-module-source-map",
    "inline-cheap-source-map",
    "inline-cheap-module-source-map",
    "source-map",
    "inline-source-map",
    "hidden-source-map",
    "nosources-source-map",
]


const tasks = modes.map((modeName) => {
    return {

        mode: "none",
        devtool: modeName,
        entry: "./src/main.js",
        output: {
            path: path.join(__dirname, "/output"),
            filename: `js/${modeName}.js`
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: `${modeName}.html`
            }),
            new CleanWebpackPlugin(),
        ],
        module: {
            rules: [ // 转译js代码，其实就是语言版本降级，兼容各种浏览器，有些浏览器并不支持js最新语法
                {
                    test: /\.js$/,
                    // 排除掉第三方库文件夹，第三房库的文件都是已经做好转译
                    exclude: /node_modules/,
                    use: {
                        // 开启babel-loader缓存
                        loader: "babel-loader?cacheDirectory=true",
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }

            ]
        }


    }
})


module.exports = tasks;