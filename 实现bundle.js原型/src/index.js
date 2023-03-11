// node.js采用的commonjs规范，在node环境中可以用es module规范导出！，导入的时候require("xx").default 加default
// 但是在浏览器中执行就会报错，因为主流浏览器主要采用的是commonjs规范？如何让
var add = require("./add.js").default;

console.log(add(1, 2));
