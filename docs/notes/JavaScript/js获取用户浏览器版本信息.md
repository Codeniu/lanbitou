

 **navigator.userAgent** 是一个只读的字符串，声明了浏览器用于 **HTTP** 请求的用户代理头的值。我们可以使用它来检测浏览器信息。

```js
function browser() {
  var ua = navigator.userAgent;
  var ret = {},
      webkit = ua.match( /WebKit\/([\d.]+)/ ),
      chrome = ua.match( /Chrome\/([\d.]+)/ ) ||
          ua.match( /CriOS\/([\d.]+)/ ),
 
      ie = ua.match( /MSIE\s([\d\.]+)/ ) ||
          ua.match( /(?:trident)(?:.*rv:([\w.]+))?/i ),
      firefox = ua.match( /Firefox\/([\d.]+)/ ),
      safari = ua.match( /Safari\/([\d.]+)/ ),
      opera = ua.match( /OPR\/([\d.]+)/ );
 
  webkit && (ret.webkit = parseFloat( webkit[ 1 ] ));
  chrome && (ret.chrome = parseFloat( chrome[ 1 ] ));
  ie && (ret.ie = parseFloat( ie[ 1 ] ));
  firefox && (ret.firefox = parseFloat( firefox[ 1 ] ));
  safari && (ret.safari = parseFloat( safari[ 1 ] ));
  opera && (ret.opera = parseFloat( opera[ 1 ] ));  console.log(ua);
  return ret;
}

console.log(browser())
```

