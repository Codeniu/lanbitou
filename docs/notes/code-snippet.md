# JavaScript 代码片段

## js随机码

```js
let randomId = Number(Math.random().toString().substr(3, 0) + Date.now(),).toString(36).toUpperCase();
```

## 数组生成器

```js
range(start, stop, step) {
    return Array.from(
        { length: (stop - start) / step + 1 },
        (_, i) => start + i * step,
    );
},
```

## 利用浏览器截图

1. 打开浏览器调试模式
2. 键盘按下 ctrl+shift+p
3. 输入capture area screenshot(选取区域)或capture full size screenshot(全部网页)
4. 回车

## 从 url 获取参数并转换为 object

网页的路径通常是: <www.baidu.com?search=js&xxx=kkkin>，我们经常需要获取参数，这可以通过使用第三方 `qs package` 来实现。如果您只想获取参数，那么可以实现这行代码，并且不需要导入 qs。

```js
const getParameters = URL => JSON.parse(`{"${decodeURI(URL.split("?")[1]).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')}"}`
  )
getParameters("https://www.google.com.hk/search?q=js+md&newwindow=1");
// {q: 'js+md', newwindow: '1'}
```

## 生成随机颜色（hex）

```js
const randomHexColor = () => `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")}`
console.log(randomHexColor());
// #a2ce5b
```

## Check if the current tab is in the background

```js
const isTabActive = () => !document.hidden; 
isTabActive()
// true|false
```

## Check device type

```js
const judgeDeviceType =
      () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(navigator.userAgent) ? 'Mobile' : 'PC';
judgeDeviceType()  // PC | Mobile
```

## Copy text to clipboard

```js
const copyText = async (text) => await navigator.clipboard.writeText(text)
copyText('hello world')
```

## get selected text

```js
const getSelectedText = () => window.getSelection().toString();
getSelectedText();
// return content
```

## 获取两个日期之间的天数

```js
const dayDiff = (date1, date2) => Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000);
dayDiff(new Date("2021-10-21"), new Date("2022-02-12"))
// Result: 114
```

## Convert RGB to hex

```js
const rgbToHex = (r, g, b) =>   "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
rgbToHex(255, 255, 255); 
//  #ffffff
```
