// webpack是node的一个模块，因此是基于commonJS写的
// 打包命令: yarn webpack
// 默认打包入口：src / index.js
// 默认打包出口：dist/main.js

let obj = require("./header.js")
console.log(obj);