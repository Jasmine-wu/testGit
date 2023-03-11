module.exports = (source) => {
  // 传入css-loader处理的json序列化对象
  return `const style = document.createElement("style");
    style.innerHTML = ${source};
    document.head.appendChild(style);`;
};
