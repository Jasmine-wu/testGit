module.exports = {
  // 为了方便看打包结果，我们使用none mode,并手动开启相关功能实现tree-shaking
  mode: "none",
  // index.js只导入了Button但所有component/index.js所有导出都打包进了打包文件里
  // 我们只想要Button打包进来怎么办？
  // - 1.开启webpack的sizeEffects功能，sideEffects=true，webpack打包时就会先去检查当前模块所属的package.json文件中有没有开启sideEffects标识，以此来判断这个模块是否有副作用
  // - 2.如果你在package.json文件里设置了sideEffects：false，即node模块文件都没有副作用，没有副作用，打包的时候遇到import {a} from xx，就不会被xx导出文件里所有的导出都打打包进来
  // 原理是 webpack 能将标记为 side-effects-free 的包由 import {a} from xx 转换为 import {a} from 'xx/a'，从而自动修剪掉不必要的 import，作用同 babel-plugin-import

  // 使用注意：
  // 1.你先要确定你的node模块有没有副作用，如果你的代码有副作用，但是你在package.json中申明了sideEffects：false，那你有副作用的代码是不会被打包进来的
  // 2.比如你修改了js对象的原型这种代码，以及导入css模块，这些都属于副作用，是不会被打包进来的
  // 解决： 在 package.json文件里，false改成数组[],指明哪些文件有副作用，那么webpack就不会忽略这些文件，能够打包进来

  optimization: {
    sideEffects: true,
  },
};
