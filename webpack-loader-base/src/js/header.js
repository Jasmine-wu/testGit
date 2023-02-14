// 默认导出创建元素的函数
export default () => {

    let element = document.createElement("h1");
    element.innerText = "这是一个标题";
    element.classList.add("header")
    element.addEventListener("click", () => {
        alert("标题被点击了")
    })
    return element;

}