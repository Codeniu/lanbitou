### 1foreach 如何跳出循环

foreach本身是不能跳出循环的，会一直执行到最后，但是可以通过加上try-catch语句，使其以异常抛出。

```
try
```





### 2 js使用正则表达式获取字符串中特定的字符

1. 需求：从`124fddr323532${xxxasdsafxx}253${bnm}23354${abcd}233545xx54${666}233545xxxxx`这类字符串中获取${}中的内容。注意${xxx}的个数是不确定的。

> 使用了match和exec两种方式实现，直接上代码（更推荐第二种）：

> ```js
>    function getMatchedStrs (str) {
>         var reg = /\$\{(.+?)\}/
>         var reg_g = /\$\{(.+?)\}/g
>         var result = str.match(reg_g)
>         var list = []
>         for (var i = 0; i < result.length; i++) {
>             var item = result[i]
>             list.push(item.match(reg)[1])
>         }
>         return list
>     }
> ```

> ```js
>    function getExecStrs (str) {
>         var reg = /\$\{(.+?)\}/g
>         var list = []
>         var result = null
>         do {
>             result = reg.exec(str)
>             result && list.push(result[1])
>         } while (result)
>         return list
>     }
> ```

2. Python中

```
def findAllStrs():
    strs = '124fddr3235323423532${xxxasdsafxx}253${bnm}23354${abcd}233545xx54${666}233545xxxxx'
    pattern = '\$\{(.+?)\}'
    reg = re.compile(pattern)
    result = reg.findall(strs)
    # print result
    return result
```



### 3.js截取一般的字符

**函数：substring()**

定义：substring(start,end)表示从start到end之间的字符串，包括start位置的字符但是不包括end位置的字符。

功能：字符串截取，比如想从"MinidxSearchEngine"中得到"Minidx"就要用到substring(0,6)

例子：

```js
`var` `src=``"images/off_1.png"``;``alert(src.substring(7,10));``//弹出值为：off`
```

**函数：substr()**

定义：substr(start,length)表示从start位置开始，截取length长度的字符串。

功能：字符串截取

例子：

```js
`var` `src=``"images/off_1.png"``;``alert(src.substr(7,3));``//弹出值为：off`
```

**函数：split()**

功能：使用一个指定的分隔符把一个字符串分割存储到数组

例子：

```js
`str=``"jpg|bmp|gif|ico|png"``;``arr=theString.split(``"|"``);``//arr是一个包含字符值"jpg"、"bmp"、"gif"、"ico"和"png"的数组`
```

**函数：John()**

功能：使用您选择的分隔符将一个数组合并为一个字符串

例子：

```js
`var` `delimitedString=myArray.join(delimiter);``var` `myList=``new` `Array(``"jpg"``,``"bmp"``,``"gif"``,``"ico"``,``"png"``);``var` `portableList=myList.join(``"|"``);``//结果是jpg|bmp|gif|ico|png`
```

**函数：indexOf()**

功能：返回字符串中匹配子串的第一个字符的下标

```js
`var` `myString=``"JavaScript"``;``var` `w=myString.indexOf(``"v"``);w will be 2``var` `x=myString.indexOf(``"S"``);x will be 4``var` `y=myString.indexOf(``"Script"``);y will also be 4``var` `z=myString.indexOf(``"key"``);z will be -1 `
```

**函数：lastIndexOf()**

定义：lastIndexOf()方法返回从右向左出现某个字符或字符串的首个字符索引值（与indexOf相反）

功能：返回字符串索引值

例子：

```js
`var` `src=``"images/off_1.png"``;``alert(src.lastIndexOf(``'/'``));``alert(src.lastIndexOf(``'g'``));``//弹出值依次为：6,15`
```

**补充：substr 和 substring方法的区别**

**substr 方法**

返回一个从指定位置开始的指定长度的子字符串。

stringvar.substr(start [, length ])

参数

stringvar

必选项。要提取子字符串的字符串文字或 String 对象。

start

必选项。所需的子字符串的起始位置。字符串中的第一个字符的索引为 0。

length

可选项。在返回的子字符串中应包括的字符个数。

说明

如果 length 为 0 或负数，将返回一个空字符串。如果没有指定该参数，则子字符串将延续到 stringvar 的最后。

示例

下面的示例演示了substr 方法的用法。

```js
`function` `SubstrDemo(){`` ``var` `s, ss;    ``// 声明变量。`` ``var` `s = ``"The rain in Spain falls mainly in the plain."``;`` ``ss = s.substr(12, 5); ``// 获取子字符串。`` ``return``(ss);    ``// 返回 "Spain"。``}`
```

**substring 方法**

返回位于 String 对象中指定位置的子字符串。

strVariable.substring(start, end)
"String Literal".substring(start, end)

参数

start

指明子字符串的起始位置，该索引从 0 开始起算。

end

指明子字符串的结束位置，该索引从 0 开始起算。

说明

substring 方法将返回一个包含从 start 到最后（不包含 end ）的子字符串的字符串。

substring 方法使用 start 和 end 两者中的较小值作为子字符串的起始点。例如， strvar.substring(0, 3) 和 strvar.substring(3, 0) 将返回相同的子字符串。

如果 start 或 end 为 NaN 或者负数，那么将其替换为0。

子字符串的长度等于 start 和 end 之差的绝对值。例如，在 strvar.substring(0, 3) 和 strvar.substring(3, 0) 返回的子字符串的的长度是 3。

示例

下面的示例演示了 substring 方法的用法。

```js
function SubstringDemo(){ 
    var ss; // 声明变量。 
    var s = "The rain in Spain falls mainly in the plain..";
    ss = s.substring(12, 17); // 取子字符串。 return (ss); 
    // 返回子字符串。}
```



###  4.splice的用法

*array*.splice(*index*,*howmany*,*item1*,.....,*itemX*)

