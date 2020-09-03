# TypeScript基础

## 1. 什么是ts

ts基于js又是js的超集



## 2. 优点：编译时发现错误

编译指令 tsc

```
tsc filename.ts
```



## 3. 字符串模板

```
let name = 'jingxiang'
console.log('niu' + `${name}`)

> niu jingxiang
```



## 4. 类型推论

 在ts中，变量在声明的时候，如果没有定义其类型，会被识成默认类型 

```
let name : any =''niu'
console.log(typeof(name))
console.log(typeof(<string> name))

> any
> string
```



## 5. underfine，null类型

```tsx
// undefined和null是所有类型子类型，都可以赋值
let num: Symbol = undefined;ss
let num: number = undefined;
// undefined类型， 只能给undefined
let u: undefined = undefined; 
let n: null = null;
```

## 6. 基础数据类型

- boolean 、number、string、null、 undefined、 Symbol
- void 空类型







