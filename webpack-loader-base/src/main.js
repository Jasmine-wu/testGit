import "./css/main.css"
import icon from "./img/bg.png"
// import createHeader from "./js/header.js"
// 默认导出，导入时加default
let createHeader = require("./js/header.js").default

const header = createHeader();
header.innerText = "这是一个标题"
document.body.append(header);

let bg = new Image()
bg.src = icon;
document.body.append(bg);