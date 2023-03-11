// 注意webpack打包的js文件不能这样混用
// 只能module.exports+require 或者 import+ export
// require("./css/editor.css");
import "./css/editor.css";

export default () => {
  let editor = document.createElement("div");
  editor.contentEditable = true;
  editor.className = "editor";
  console.log("添加2222222ss");

  return editor;
};
