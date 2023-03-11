let arr = [1, 3, 4, 5, 6, 6]
    // 对数组的每个元素调用回调函数并返回包含新结果的数组
    // map函数定义的是对每个数组元素的处理
    // 函数内部返回每次处理的结果
    // map函数最终会返回包含所有处理结果的新的数组
const a = arr.map((value) => {
    value = value + 1;
    return value;

})

console.log(a);