## npm命令



临时指定源

```
npm --registry https://registry.npm.taobao.org install
```

持久使用

```
 npm config set registry https://registry.npm.taobao.org
```

配置后可通过下面方式来验证是否成功

配置后可通过下面方式来验证是否成功

​	`npm config get registry` 

​	`npm info express`



## 使用淘宝 NPM 镜像

```js
npm install -g cnpm --registry=https://registry.npm.taobao.org
```



```js
cnpm install [name]
```





## 删除包

```js
npm uninstall [name] -s-d
```

npm uninstall 模块：删除模块，但不删除模块留在package.json中的对应信息
npm uninstall 模块 --save 删除模块，同时删除模块留在package.json中dependencies下的对应信息
npm uninstall 模块 --save-dev 删除模块，同时删除模块留在package.json中devDependencies下的对应信息





## 更新

```
npm install npm-check-updates

npm-check-updates

npm update vue
```





###  err:npm ERR! Refusing to delete / code EEXIST

https://stackoverflow.com/questions/46541371/npm-err-refusing-to-delete-code-eexist

1. Delete the `node_modules` directory completely.
2. Run `npm install` again.



### Vue packages version mismatch:

- vue@2.6.11
- vue-template-compiler@2.5.17

```
npm update vue-template-compiler
```

