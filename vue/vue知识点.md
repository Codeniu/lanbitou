## 生命周期

 ![img](E:\工作\烂笔头\images\lifecycle.png) 



### 1.钩子函数：created:

1. created:在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
2. mounted:在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。

其实两者比较好理解，通常created使用的次数多，而mounted通常是在一些插件的使用或者组件的使用中进行操作，比如插件chart.js的使用: var ctx = document.getElementById(ID);通常会有这一步，而如果你写入组件中，你会发现在created中无法对chart进行一些初始化配置，一定要等这个html渲染完后才可以进行，那么mounted就是不二之选。下面看一个例子（用组件）。


### 2.vue,js,html三种文件之间是怎样的关系？

vue文件配合webpack  使得组件化变得更加的清晰明了 ，分工更加的明确。

加入说你要做一个网页的轮播图，如果你在js中注册，首先那种字符串html看的人就眼花，

而在vue文件中你可以像写html一样写他，而且一般来说一个vue文件就是一个独立的组件，如果你需要他就只要引入，传入他需要的参数就可以了。

一句话吧：我要vue文件就是为了方便，结构清晰。

vue文件就是格式更规范的html吗？ 肯定不能这么理解。还有比html更规范的html吗？你这话本身就是一个病句。 angular可以直接引用html作为组件。vue为了实现更好的封装才推出了vue文件，你可以在vue文件里实现一个功能，这个文件可以包含css、js、html。 你可以直接这么认为vue文件就是html文件，唯一的区别就是浏览器不认识vue文件。

**一般来说:**

- 1.功能模块都写在.vue文件里，这个叫组件。

- 2.所有的.vue都会打包成一个js，然后html引入这个js就ok了。之所以写.vue组件，是为了维护方便。

- 每个.Vue文件最后都会转换成一个js的!!!

  

### 3.官方规范，一般组件文件的首字母大写



### 4. index.vue嵌入index.html文件的方式
1. 使用iframe框

```html
    <iframe src="scan.html" frameborder="1" width="100%">
    </iframe>
```

2. vue.中写

```js
windows.location.href=""
```

### 5. 解决el-tree中默认展开节点的问题	"['2099']"

```html
    <el-tree
      class="filter-tree"
      :data="data"
      :props="defaultProps"
      :filter-node-method="filterNode"
      ref="tree"
      node-key="id"
      :default-expanded-keys="['2099']"
      @node-click="handleNodeClick"
      accordion
      icon-class="el-icon-folder-add"
    ></el-tree>
```

### 6. 解决组织树中节点过滤的问题 **orgName**根据你的**data**里面的数据来过滤，可以是**id**，也可以是**orgPid**，开始写的**lable**，一直报错indexof（）未定义.

```js
  methods: {
    // 过滤
    filterNode(value, data) {
      if (!value) return true;
      return data.orgName.indexOf(value) !== -1;
    },
  }
```

### 7.解决按百分比设置div框的height不生效的问题

主要是div的父级以及父父级元素都要设置百分比		div--》body--》html

[详细的教程](https://blog.csdn.net/ann295258232/article/details/54408431)



### 8.由于 JavaScript 的限制， Vue 不能检测以下变动的数组：

1. 当你利用索引直接设置一个项时，例如：`vm.items[indexOfItem] = newValue`
2. 当你修改数组的长度时，例如：`vm.items.length = newLength`

为了避免第一种情况，以下两种方式将达到像 `vm.items[indexOfItem] = newValue` 的效果，
同时也将触发状态更新：

```
// Vue.setVue.set(example1.items, indexOfItem, newValue)
// Array.prototype.spliceexample1.items.splice(indexOfItem, 1, newValue)
```

避免第二种情况，使用 `splice`：

```
example1.items.splice(newLength)
```

### 9.vue.nextTick()方法的使用详解

 **nextTick()，是将回调函数延迟在下一次dom更新数据后调用**

简单的理解是：**当数据更新了，在dom中渲染后，自动执行该函数，** 

 https://blog.csdn.net/zhouzuoluo/article/details/84752280 





###  10.*const* { cropper } = *this*;

等价于与const cropper = this.cropper;



div的一个click事件的函数如下方式：

click({ *target* })（）

div的点击事件的默认参数是e，以{target}定义参数，在函数体中相当于，省略这一步：const target = e.target