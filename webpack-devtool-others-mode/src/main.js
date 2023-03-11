import createElement from "./header.js"

const header = new createElement();
document.body.append(header);

console.log("main.js is running");
// 模拟bug
console.log2("main.js is running");