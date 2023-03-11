module.exports = {
  mode: "none",

  //   module: {
  // rules: [
  //   {
  //     test: /\.js$/,
  //     use: {
  //       loader: "babel-loader",
  //       options: {
  //         // presets: ["@babel/preset-env"],
  //         presets: [
  //           [
  //             "@babel/preset-env",
  //             {
  //               // 开启preset-env里将使用了esmodule的代码转换成commonjs规范的代码
  //               // 你会发现 tree-shaking失效了，导出但是未被使用的代码也被打包了进来
  //                 modules: "commonjs",
  //                 // 如果你不确定到底也没有开启影响了tree-shaking，可以将 modules: false, 不开启，

  //             },
  //           ],
  //         ],
  //       },
  //     },
  //   },
  // ],
  // },

  // 在非prodution模式如何开启tree-shaking？
  // usedExports: 标记使用了的代码和未使用的代码
  // minimize： 代码压缩，并移除未使用代码

  // 进一步优化打包效果
  // 打包体积优化
  // 1.合并模块。合并模块又叫Scope Hositing
  // - webpack打包时会把一个模块（js文件）放到一个函数里，如果文件很多，函数就会很多
  // - 如果把模块都放到一个函数里，运行效率会快，代码体积会更小
  // - 如何做？使用concatenateModules: 尽可能将所有模块放到一个函数里

  // tree-shaking的问题：
  // 使用babel-loader会使的tree-shaking失效？
  // 取决于有没有使用babel里将ES Modules转换成了comomnjs规范的插件
  // babel-loader的插件集合@babel/presets-env里刚好有这样的插件，默认是不转换的
  // 使用tree-shaking的前提是代码必须使用的是ES Modules
  // tree-shaking的工作原理：她依赖的是 ES Module静态分析能力，他会收集所有的export导出变量，打上使用和未使用的标记，再使用其他工具对标记的未使用代码进行移除

  // 再进一步优化打包结果
  // 4新特性：sideEffects。为tree-shaking提供更大的压缩空间
  // webpack 开启sideEffects功能，他回去检查你node包package.json文件里sideEffects标注
  // 原理：原理是 webpack 能将标记为 side-effects-free 的包由 import {a} from xx 转换为 import {a} from 'xx/a'，从而自动修剪掉不必要的 import，作用同 babel-plugin-import

  // 判断这个包是否会对包以外的对象产生影响，比如是否修改了 window 上的属性，是否复写了原生对象方法等。如果我们能保证这一点，其实我们就能知道整个包是否能设置 sideEffects:false
  optimization: {
    usedExports: true, //标记使用和未使用代码
    minimize: true, // 开启代码压缩,移除未使用代码
    // concatenateModules: true, //进一步优化打包体积，打包时，将所有模块放到一个函数里
  },
};
