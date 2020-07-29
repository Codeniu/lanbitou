# js forEach循环调用异步方法，如何实现同步

### 准备代码：

```js
const res = []
const arr = [1,2,3,4,5]
 
function t(num) {
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      console.log('定时器', num)
      resolve()
    }, 1000)
  })
}
 
function t2(item){
  console.log('进入res')
  res.push(item)
}
```





### 情况1: forEach内部等待异步执行完成

```js
arr.forEach(async (item, index) =>{
  await t(item)
  t2(item)
})
```

结果：

```
定时器 1
进入res
定时器 2
进入res
定时器 3
进入res
定时器 4
进入res
定时器 5
进入res
```



### 情况2：forEach外部等待forEach执行完成

```js
let asyncFun = []
arr.forEach((item, index) =>{
  asyncFun.push(t(item))
  t2(item)
})
Promise.all(asyncFun).then(() => {
  console.log('res', res)
})
```

结果：

```
定时器 1
定时器 2
定时器 3
定时器 4
定时器 5
res (10) [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
```





### 情况3: 既需要forEach内部同步执行，又需要forEach外部同步执行

```js
Promise.all(
  arr.map( item =>{
    return new Promise(async (resolve, reject) =>{
      await t(item)
      t2(item)
      resolve()
    })
  })
).then(() =>{
  console.log('object', res)
})
```

结果：

```
定时器 1
进入res
定时器 2
进入res
定时器 3
进入res
定时器 4
进入res
定时器 5
进入res
object (15) [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
```

