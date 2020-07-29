### 1如何在el-tree的lable中显示获取到的数据对象中两个属性

![1571021444931](C:\Users\DELL\AppData\Roaming\Typora\typora-user-images\1571021444931.png)

```vue
<el-tree
  :data="treeData"
  node-key="rowKey"
  ref="tree"
  :highlight-current="true"
  :expand-on-click-node="false"
  render-after-expand
  :props="defaultProps"
  :filter-node-method="filterNode"
  @node-click="click"
>
 <span class="custom-tree-node" slot-scope="{ node, data }">
       <span>{{ node.label }}</span>
        <span>
            <a>{{data.order}}、{{data.name}}</a>
        </span>
   </span>
</el-tree>
```
```js
  defaultProps: {
    id: "id",
    children: "children"
  },
```
### 2.img的相关事件





### 3.代码段的运行时间

```js
  // vue
  var start = new Date().getTime();
  var end = new Date().getTime();
  var time = end - start + "ms";
  console.log("图片加载完成所用时间", time);
```


```java
	// 测试运行时间
	long startTime = System.currentTimeMillis();
	代码段......
	// 结束时间
	long endTime = System.currentTimeMillis();
	int time=(int) (endTime - startTime);
	System.err.println("运行时间:" + time + "ms");
```


### 4.ref关于button的引用







​      n = n || 0; // 默认取0  在点击材料时显示该材料的第一张图片





      console.log(_this.$refs.showImg_btn);
      this.$refs.showImg_btn.showImg(this.tableData[0]);
