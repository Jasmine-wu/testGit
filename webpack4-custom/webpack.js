// 需求：实现两个使用了ES Module的js文件合并成一个bundle.js文件，并能在浏览器成功运行

// 先安装依赖：
// yarn add @babel/parser :将字符串代码转换成抽象语法树（对象）
// yarn add @babel/traverse：遍历（访问）抽象语法树中的节点
// yarn add @babel/core：es6语法转ES5，安装babel依赖这个核心模块
// yarn add @babel/preset-env: 编译es6代码

const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");

// 1.分析单个模块
function getModuleInfo(fileName) {
  const fileContent = fs.readFileSync(fileName, "utf-8");
  const astTree = parser.parse(fileContent, {
    sourceType: "module",
  });

  const deps = {};
  traverse(astTree, {
    //  visitor
    // 1.1 收集依赖
    ImportDeclaration({ node }) {
      const imortedFilePath = node.source.value; //./add.js
      //  相对路径转绝对路径./add.js=> ./src/add.js
      const absPath = "./" + path.join(path.dirname(fileName), imortedFilePath);
      deps[imortedFilePath] = absPath;
      //   console.log(absPath);
    },
  });
  // 1.2.代码转译: ES6->ES5
  const { code } = babel.transformFromAst(astTree, null, {
    presets: ["@babel/preset-env"],
  });

  // 1.3.构造moduleInfo
  const moduleInfo = {
    fileName,
    deps,
    code,
  };
  return moduleInfo;
}

// 2. 分析依赖构建依赖树和打包
function parseModules(fileName) {
  const enty = getModuleInfo(fileName);

  //   console.log(enty);
  const temp = [enty];
  //   console.log(temp);
  const depsGraph = {};

  getDeps(temp, enty);
  temp.forEach((moduleInfo) => {
    // console.log(moduleInfo);
    depsGraph[moduleInfo.fileName] = {
      deps: moduleInfo.deps,
      code: moduleInfo.code,
    };
  });

  return depsGraph;
}

function getDeps(temp, { deps }) {
  Object.keys(deps).forEach((key) => {
    const child = getModuleInfo(deps[key]);
    temp.push(child);
    getDeps(temp, child);
  });
}

function bundle(file) {
  const depsGraph = JSON.stringify(parseModules(file));
  return `(function (graph) {
        function require(file) {
            function absRequire(relPath) {
                return require(graph[file].deps[relPath])
            }
            var exports = {};
            (function (require,exports,code) {
                eval(code)
            })(absRequire,exports,graph[file].code)
            return exports
        }
        require('${file}')
    })(${depsGraph})`;
}

const content = bundle("./src/index.js");

!fs.existsSync("./dist") && fs.mkdirSync("./dist");
fs.writeFileSync("./dist/bundle.js", content);
