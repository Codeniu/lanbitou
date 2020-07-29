# 1.合并两个json对象

```js
var params = this.merge2Json(this.baseInfo, this.eduInfo);
```


```js
    // 合并两个json字符串
    merge2Json(jsonbject1, jsonbject2) {
      var resultJsonObject = {};
      for (var attr in jsonbject1) {
        resultJsonObject[attr] = jsonbject1[attr];
      }
      for (var attr in jsonbject2) {
        resultJsonObject[attr] = jsonbject2[attr];
      }
      return resultJsonObject;
    },
```

# 2.json对象与str相互转换

```js
//对象转字符串
JSON.stringify(jsonObj); 
//字符串转json对象
JSON.parse(str)
```

