# 1.spa (single page application)单页web程序

https://www.cnblogs.com/chayin/p/9738686.html

与之对应mpa( multiple page application )多页应用程序。



# 2.css书写规范

作者：大海我来了
链接：https://juejin.im/post/6885516530331713549
来源：掘金



### 声明的顺序

在 `css` 中存在好几百个属性，如果需要一个 `css` 规则里几乎可以写满这些属性。如果这些声明毫无顺序章法可言，那么在需要修改的时候就会非常的头痛了，一大块声明杂在一个规则里，你就需要慢慢地找慢慢地看了。但是如果你的声明都是按照一定的逻辑顺序来书写，那么声明的层次就非常清晰。声明的时候一般比较重要的属性会优先书写。

1. 如果包含了 `content`属性，则应该最优先书写，即写到声明块的最上面。
2. 定位相关的属性，比如`position`、`top`、`left`、`z-index`、`display`、`float`、`visibility`和`overflow`、`flex`等。
3. 布局相关的属性，比如`display`、`float`、`visibility`、`overflow`、`flex`和`clear`等。
4. 盒模型相关的属性，比如`width`、`height`、`margin`、`padding`、`border`以及`box-sizing`等。
5. 文本排版印刷相关的属性，比如`font`、`line-height`、`vertical-align`、`text-align`和`white-space`、`text-decoration`等。
6. 视觉感官上相关的属性，比如`color`、`background`、`list-style`、`transform`、`transition`和`animation`等。

```css
.box {
    /* Positioning */
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
 
    /* Layout */
    display: block;
    float: right;
 
    /* Box-model */
    width: 100px;
    height: 100px;
    border: 1px solid #e5e5e5;
    border-radius: 3px;
 
    /* Typography */
    font: normal 13px "Helvetica Neue", sans-serif;
    line-height: 1.5;
    text-align: center;
 
    /* Visual */
    color: #333;
    background-color: #f5f5f5;
}
```




# 3.32个手写JS，巩固你的JS基础

作者：洛霞
链接：https://juejin.im/post/6875152247714480136
来源：掘金


## 02.数组去重

```javascript
const arr = [1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}];
// => [1, '1', 17, true, false, 'true', 'a', {}, {}]
复制代码
```

### 方法一：利用Set

```javascript
const res1 = Array.from(new Set(arr));
复制代码
```

### 方法二：两层for循环+splice

```javascript
const unique1 = arr => {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[i] === arr[j]) {
        arr.splice(j, 1);
        // 每删除一个树，j--保证j的值经过自加后不变。同时，len--，减少循环次数提升性能
        len--;
        j--;
      }
    }
  }
  return arr;
}
```




