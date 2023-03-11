import "./css/main.css";
import icon from "./img/bg.png";
// import createHeader from "./js/header.js"
// 默认导出，导入时加default
let createHeader = require("./js/header.js").default;

const header = createHeader();
header.innerText = "这是一个标题";
document.body.append(header);

let bg = new Image();
bg.src = icon;
document.body.append(bg);

// ES6新特性箭头函数，使用babel-loader转译成ES5function的形式
const fn = () => {
  console.log("箭头函数");
};

// babel-loader转译sync await语法
function syncRequst() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("这是成功的返回结果");
    }, 1000);
  });
}

// export const result = await syncRequst()
async function getResult() {
  return (result = await syncRequst());
}

// console.log(getResult())

console.log("css-loader转换后的css文件：", main);
