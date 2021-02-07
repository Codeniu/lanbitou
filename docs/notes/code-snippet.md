# 代码片段

js随机码

```js
let randomId = Number(Math.random().toString().substr(3, 0) + Date.now(),).toString(36).toUpperCase();
```

数组生成器

```js
range(start, stop, step) {
    return Array.from(
        { length: (stop - start) / step + 1 },
        (_, i) => start + i * step,
    );
},
```

利用浏览器截图

```
1.打开浏览器调试模式
2.输入ctrl+shift+p
3.输入capture area screenshot(选取区域)或capture full size screenshot(全部网页)
4.回车
```

