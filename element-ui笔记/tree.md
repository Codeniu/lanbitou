# el-tree实现点击按钮展开树形结构

需求：通过输入来筛选树中的数据，由于数据是通过懒加载得到的。因此需要手动的点击每个节点来展开它们。然而，如何才能不通过手动点击来展开所有节点呢？



:anger:这个属性没有利用价值 

```vue
:default-expand-all="isExpand"

handelExpand(){
	this.isExpand = !this.isExpand
}
```



利用默认展开节点属性 `:default-expanded-keys="expandList"`

把当前分类节点数据加入默认展开的列表中。

然后遍历当前全部节点，并把所有节点的expanded属性手动置为true.

通过默认的节点筛选函数进行筛选。

```js
searchName() {
    this.expandList = [1];
    this.loading = true;
    if (this.corpId) {
        this.getClassify({ corpId: this.corpId })
            .then(classify => {
            classify.forEach(item => {
                this.expandList.push(item.id);
            });
        })
            .catch(() => {
            this.$message.warning('搜索不可用');
        });
    } else {
        this.$message.warning(
            '获取组织当前用户组织失败，请刷新页面后重试',
        );
    }

    for (
        var i = 0;
        // eslint-disable-next-line no-underscore-dangle
        i < this.$refs.tree.store._getAllNodes().length;
        i++
    ) {
        // eslint-disable-next-line no-underscore-dangle
        this.$refs.tree.store._getAllNodes()[
            i
        ].expanded = true;
    }

    let that = this;
    setTimeout(() => {
        that.$refs.tree.filter(this.filterText);
        this.loading = false;
    }, 3000);
},
```

![YnrVEQ.gif](https://s1.ax1x.com/2020/05/08/YnrVEQ.gif)





实际上：就是先把所有节点全部展开，然后利用节点过滤，实现在全部节点中进行搜索。

