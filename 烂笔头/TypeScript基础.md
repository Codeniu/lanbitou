# TypeScript基础

1.ts基于js又是js的超集 



2.优点：编译时发现错误

编译指令 tsc

```
tsc filename.ts
```



3.字符串模板

```
let name = 'jingxiang'
console.log('niu' + `${name}`)

> niu jingxiang
```



4.类型推论

定义时没有赋值，会被推断成any类型

```
let name : any =''niu'
console.log(typeof(name))
console.log(typeof(<string> name))

> any
> string
```

