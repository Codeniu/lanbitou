# JavaScript

::: tip 说明
JavaScript学习笔记
:::

## 重点：

- JavaScript 里一切皆对象，一切皆可储存在变量里

- map方法会改变原始数组的值吗？

  当数组为基础类型时原数组不变，当数组为引用类型时原数组发生改变。

  下面代码段正确的输出是什么？

```js
// 1 避免源对象被改变
const array1 = [{name:'1'},{name:'3'}]
const map1 = array1.map((x,index) => {
  let obj = {...x}
  obj.name = index
  return obj
});
console.log(map1);
console.log(array1);
//> Array [Object { name: 0 }, Object { name: 1 }]
//> Array [Object { name: "1" }, Object { name: "3" }]

// 2 源对象被改变了
const array1 = [{name:'1'},{name:'3'}]
const map1 = array1.map((x,index) => {
 	let obj = x
	obj.name = index
  return obj
});
console.log(map1); 
console.log(array1);
//> Array [Object { name: 0 }, Object { name: 1 }]
//> Array [Object { name: 0 }, Object { name: 1 }]

```









<!-- prettier-ignore-start -->

!!!include(docs/notes/JavaScript/foreach中异步代码同步.md)!!!

!!!include(docs/notes/JavaScript/js获取用户浏览器版本信息.md)!!!

<!-- prettier-ignore-end -->