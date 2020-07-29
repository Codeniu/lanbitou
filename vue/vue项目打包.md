### 1vue打包后样式文件引用加载顺序错误，导致样式错乱

将样式的引用顺序放到App前面。

```js
import Vue from 'vue';
import 'iview/dist/styles/iview.css';
import App from './App';
import router from './router';
import store from './store';
```

### 2.scoped带来的vue中css样式问题 及解决方法

做vue项目也一段时间了，为了确保css不被全局污染，我们给每个组件的style添加了scoped，其实这样就实现了样式的模块化

vue中的scoped属性的效果主要通过PostCSS转译实现，如下是转译前的vue代码：

```html
<style scoped>
.example {
  color: red;
}
</style>
 
<template>
  <div class="example">hello world</div>
</template>
```

 转译后 :

```html
<style>
.example[data-v-5558831a] {
  color: red;
}
</style>
 
<template>
  <div class="example" data-v-5558831a>hello world</div>
</template>
```

总结一下scoped三条渲染规则：

1. 给HTML的DOM节点加一个不重复data属性(形如：data-v-19fca230)来表示他的唯一性
2. 在每句css选择器的末尾（编译后的生成的css语句）加一个当前组件的data属性选择器（如[data-v-19fca230]）来私有化样式
3. 如果组件内部包含有其他组件，只会给其他组件的最外层标签加上当前组件的data属性
   如果是一般的组件去引入模块私有组件时，则主要注意自己的权重问题去覆盖子组件的样式。

如果是私有引入私有呢，比如在vue的开发中，我们需要引用子组件，包括ui组件（element、iview）。但是在父组件中添加scoped之后，在父组件中书写子组件的样式是无效果的。去掉scoped之后，样式可以覆盖。但这样会污染全局样式，为了解决这个问题，vue-loader新增书写方式。

提供了两种解决方案：

1.  混用本地和全局样式

   就是在一个组件内同时使用 scoped 和非scoped代码:

```html
<style>
/* 全局样式 */
</style>
 
<style scoped>
/* 本地样式 */
</style>
```

2. 深度作用选择器
    scoped 样式中的一个选择器能够作用得“更深”，例如影响子组件， 可以使用 >>> 操作符 或者使用 /deep/ 操作符 别名而已

<style scoped>
.father >>> .children {}
</scoped>
=====================>编译为
.father[data-v-f3f3eg9] .children {}
实现样式的穿透。 主要看到了这个issue https://github.com/vuejs/vue-loader/issues/821

这样的写法及修改了子组件的样式，又不会污染全局样式！

官网文档：Scoped CSS · vue-loader

Tips:此方式从 vue-loader 11.2.0 开始支持





### vue  webpack打包时如何去掉console.log？

在webpack.prod.conf.js  文件中（35行左右）将设置修改为

new UglifyJsPlugin({
  uglifyOptions: {
    compress: {
      warnings: false,
      drop_debugger: true,
      drop_console: true
    }
  },
  sourceMap: config.build.productionSourceMap,
  parallel: true
})



### 项目打包前需要注意

config/index.js文件需要需要更改，`assetsPublicPath: '/',`为