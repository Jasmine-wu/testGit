// 需求：实现一个markdown文件加载器，能让我们像这样直接import进来，并返回html格式字符串
import my from "./my.md"
let el = document.createElement("div");
el.innerHTML = my.default;
console.log("my:", my.default);
document.body.append(el)