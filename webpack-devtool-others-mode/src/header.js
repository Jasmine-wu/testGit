export default () => {
    const el = document.createElement("h2");
    el.textContent = "helloword";
    el.classList.add("header");
    el.addEventListener("click", () => {
        alert("hahhaha")
    })

    return el;
}