// 自定义loader：
// 1. 必须是module.exports导出函数
// 2. 函数return返回js代码

module.exports = source => {

    // source是文件内容的字符串
    // 1.将markdown格式的字符串转成html格式的字符串
    // 2.返回的必须是js代码

    let Markdown = require("markdown-it");
    let md = new Markdown()
    const html = md.render(source);

    // 注意：字符串不能直接这样转，换行符内部引号转换以后会出现语法错误
    // return `module.exports = "${html}"`

    // commonJS规范导出：
    // return `module.exports =  ${JSON.stringify(html)}`
    // ES module规范导出：
    return `exports.default =  ${JSON.stringify(html)}`

}