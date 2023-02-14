const path = require("path")

module.exports = {
    mode: "none",
    output: {
        path: path.join(__dirname, "/output"),
        filename: "bundle.js", //默认是main.js
        publicPath: "/output"

    },
    module: {
        rules: [{
            test: /.md$/,
            // use:可以用模块名称和模块文件的相对路径
            use: "./markdown-loader"
        }]

    }

}