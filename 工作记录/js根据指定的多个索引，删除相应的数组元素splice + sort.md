### js 根据指定的多个索引，删除相应的数组元素。splice + sort

```js
var productItems = ["a", "b", "c", "d"];
 
var indexs = [1, 2, 3,];
 
indexs.sort(function(a, b) { return b - a});
 
indexs.forEach(function(index) { productItems.splice(index, 1) })

```

 将索引集合按照倒序排列，然后splice从数组尾巴开始删除，这样就不会数组的变化就不会影响删除的实现 





### 数组，拆分数组



   //   let temp_array = listTemp.slice(0, now_count);

   //   let temp_array2 = listTemp.slice(now_count);

上面这种写法是错误的，listTemp.slice（）后listTemp已经发生了改变。

正确的写法：

   //   let temp_array = listTemp.slice(0, now_count);

   //   let temp_array2 = listTemp



### 数组合并

list.push.apply( list,listTemp);



### 数组反转

names.reverse();  