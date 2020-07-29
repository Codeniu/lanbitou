## 关于row-key属性

在el-table表格中使用row-ke报错，如下：

![image-20200324155754758](E:\工作\烂笔头\images\image-20200324155754758.png)

原因：

 `row-key="leaderSort"`导致的，如果去掉这个属性，则不会报错。

```html
    <el-table
      ref="dragTable"
      v-loading="listLoading"
      row-key="leaderSort"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
```

检查package.json文件element-ui的版本，可能是由于版本过低导致的。

![image-20200324163210900](E:\工作\烂笔头\images\image-20200324163210900.png)

更新了vue和element-ui的版本后可以正常使用了。



[参考](https://www.twblogs.net/a/5d5ec9e2bd9eee541c3262f4/zh-cn)

