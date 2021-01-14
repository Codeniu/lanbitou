# vue

::: tip 说明
vue 学习笔记
:::

<!-- prettier-ignore-start -->

!!!include(docs/notes/Vue/使用Vuex保存字典数据.md)!!!

<!-- prettier-ignore-end -->



## 知识点

### Vue父组件使用子组件时，需要携带参数，函数内如何获取子组件给的值

**通过`$event`获取**

```js
// son
this.$emit('selectChange', val)

// parent
@selectChange="selectChange($event,index)"
```

当需要emit多个参数时，可以将其合并成一个对象。