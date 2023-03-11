import bgImage from "./images/bg2.jpg";

// node遵循的commonJS模块规范，这里为什么可以用import？
// 1.这里没有module.exports导出 2.node时支持导出css文件用import的
import "./css/base.css";

import createEditor from "./editor.js";
// 热更新：在保证页面状态不丢失的前提下，更新页面
// 如何实现？
// 1.devServer:hot:true;开启热更新并关闭自刷新
// 2.new webpack.hotModuleReplacementPlugin()

// 但是这样开启热更新，只有修改css文件能做到热更新
// 修改js代码和图片资源时，自刷新了（浏览器重新刷新），导致页面状态丢失
// 为什么有这个问题？webpack HMR并不是开箱即用的，js/图片的热更新需要手动处理
// 怎么解决这个问题？
// 在哪里手动更新？如何更新？
//

// 1.测试js代码修改能否热更新
const editor = createEditor();
document.body.appendChild(editor);

// 2.测试css模块修改能否热更新

// 3.测试图片修改能否热更新
const img = new Image();
img.src = bgImage;

document.body.appendChild(img);

// 保留最开始的editor
let oldEditor = editor;

// 1.手动处理js模块热替换
if (module.hot) {
  module.hot.accept("./editor", () => {
    console.log("editord更新，这里需要手动处理");
    // 1.先保存旧元素的内容
    const oldContent = oldEditor.innerHTML;
    //  2.移除旧元素
    document.body.removeChild(oldEditor);
    //  3.重新创建元素
    let newEditor = createEditor();
    newEditor.innerHTML = oldContent;
    // 4.
    document.body.insertBefore(newEditor, img);
    // 5.
    oldEditor = newEditor;
  });
}

// 2. 手动处理图片模块热更新
if (module.hot) {
  module.hot.accept("./images/bg2.jpg", () => {
    console.log("图片更新，这里需要手动处理");
    img.src = bgImage;
  });
}
