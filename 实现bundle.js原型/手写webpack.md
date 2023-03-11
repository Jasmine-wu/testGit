



# webpack原理

- Webpack：将使用了node.js模块语言的多个js文件有依赖问关系的文件打包成一个js文件，并且能在浏览器中成功运行

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

运行index.js

- 1. node环境中运行：
  - node index.js 
    - 运行ok
    - // node.js有模块系统，采用的commonjs规范，在node环境中可以用es module规范导出！，导入的时候require("xx").default 加default
  
- 2. 浏览器环境中运行

  - Index.html中

    <script src="./src/index.js"></script>

    - 打开浏览器运行报错：require not define

    - 因为浏览器没有require import exports这些东西

## 需要解决的问题
- 1. 浏览器不支持exports，require , module， 如何让浏览器不报错？

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



- 是先报错就提供谁

- 解决思路：

## 实现bundle.js原型

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



## webpack原理分析

- 1.先放一个大的立即执行函数

  ```js
  (function(list){
    
  })()
  ```

- 2.分析入口文件，收集依赖（文件依赖），生成依赖树，将对应的文件内容填写进去，并且进行代码转译

  ```js
  {
      "add.js": "exports.default = function (a, b){return a+b};",
      "index.js": "var add = require('add.js').default;console.log(add(1, 2));",
    }
  ```

- 3. 替换exports ,require

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

  

- 4.制造一个入口： require（"index.js"）

## 实现一个简单的bundle.js

将两个使用ES Module的有依赖关系的js文件打包成一个bundle.js文件.

- 处理模块化
- 多模块合并打包

具体实现：

1.新建三个文件 src/index.js,src/add.js , index.html

 src/add.js

```js
export default (a, b) => {
  return a + b;
};

```

src/index.js

```js
import add from "./add.js"
console.log(add(1,2));
```

index.html

<script src="./src/index.js"></script>

开启本地服务，运行index.html， 从export开始就报错。

2. 添加依赖
   - yarn init -y 
   - yarn add @babel/parser ：将字符串代码转换成抽象语法树
   - yarn add @babel/traverse: 访问器,在抽象语法书中我们想访问的部分
   - yarn add @babel/preset-env: 编译es6代码
   - Yarn add @babel/core： 使用babel需要这个核心模块
3. 代码实现
  - 1. 








