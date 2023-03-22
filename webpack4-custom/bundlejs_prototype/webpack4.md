# webpack 原理

- Webpack：将使用了 node.js 模块语言的多个 js 文件有依赖问关系的文件打包成一个 js 文件，并且能在浏览器中成功运行.

## 分析存在的问题：

有三个文件，index.js, add.js,index.html

```js
//add.js：
exports.default = function (a, b) {
  return a + b;
};
```

```js
//index.js：
var add = require("./add.js").default;
console.log(add(1, 2));
```

运行 index.js

- 1. node 环境中运行：
  - node index.js
    - 运行 ok
    - // node.js 有模块系统，采用的 commonjs 规范，在 node 环境中可以用 es module 规范导出！，导入的时候 require("xx").default 加 default
- 2. 浏览器环境中运行

  - Index.html 中

    <script src="./src/index.js"></script>

    - 打开浏览器运行报错：require not define

    - 因为浏览器没有 require import exports 这些东西

## 需要解决的问题

- 1. 浏览器不支持 exports，require , module， 如何让浏览器不报错？

```js
<script>
  module.exports = function (a, b) {
    return a + b;
  };

  var add = require("./add.js");


console.log(add(1, 2));

</script>
//这样直接放到一个文件里浏览器从exports就会报错
```

- 谁线报错就提供谁

## 实现 bundle.js 原型

```js
<script>
  // bundle.js原型
  (function (list) {
    function require(filename) {
      let exports = {};

      (function (exports, code) {
        eval(code);
      })(exports, list[filename]);

      return exports;
    }
    // 最开始从入口函数执行
    require("index.js");
  })({
    "add.js": "exports.default = function (a, b){return a+b};",
    "index.js": "var add = require('add.js').default;console.log(add(1, 2));",
  });
</script>
```

## 具体过程

1. 先放一个大的立即执行函数

```js
(function (list) {})();
```

2. 分析入口文件，收集依赖（文件依赖），生成依赖树，将对应的文件内容填写进去，并且进行代码转译

```js
{
    "add.js": "exports.default = function (a, b){return a+b};",
    "index.js": "var add = require('add.js').default;console.log(add(1, 2));",
  }
```

3. 替换 exports ,require

```js
(function (list) {
  //替换掉exports，require
  function require(filename) {
    let exports = {};

    (function (exports, code) {
      eval(code);
    })(exports, list[filename]);

    return exports;
  }
})({
  "add.js": "exports.default = function (a, b){return a+b};",
  "index.js": "var add = require('add.js').default;console.log(add(1, 2));",
});
```

4. 制造一个入口： require（"index.js"）



