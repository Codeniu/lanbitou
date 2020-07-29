### 1.本地缓存的三种方式的区别



![img](C:\Users\DELL\Desktop\烂笔头\images\1687094-20190530144512448-1855410641.png) 



###  2.tokenId

 tokenId表示为：用户登录到成功后，服务端分配给客户端的令牌号，同时下发tokenId的过期时间。下次用户直接持有tokenId，在其过期时间内均可跳过用户登录步骤，直接请求其他服务操作。如果tokenId过期，则需重新登录。 



### 3.

一、判断token是否过期、失效

举例：一般响应状态码 code :0，表示请求成功。①响应状态码 code:10010表示token过期 ②响应状态码 code:10011 表示token无效。这些状态码都由你自己和后端的同学一起定义。code等于10010和10011这两种状态都会跳转到登录页，重新进行登录并获取最新的token。

二、在一定时间内刷新token

为什么需要刷新token?因为出于安全性的考虑,一般是一天或几个小时更新token，看项目需要。

怎么实现？我和后端的同学是这么定义的，在发送任何一次请求时，如果需要更新token,响应体中后端的同学给我返回了token这个字段，token出现在了响应体中，说明这时候是需要刷新token的（其他非刷新token的请求时是没有token字段的），这时用localStorage保存最新token，自动覆盖掉原来旧的token，这样下次再调用新接口时用的就是最新的token了，这样用户也感知不到token更新的过程。


```js
/**
* 全局变量 和 设置 、配置等。。。
*/
 
import axios from 'axios' // 引入axios
 
import Storage from '@/assets/js/util/storage.js' // storage工具类，简单的封装
 
 
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
 
 
/* 请求拦截器 */
 
axios.interceptors.request.use(function (config) { // 每次请求时会从localStorage中获取token
 
    let token = Storage.localGet('token')
 
    if (token) {
    
        token = 'bearer' + ' ' + token.replace(/'|"/g, '') // 把token加入到默认请求参数中
 
        config.headers.common['Authorization'] = token
 
    }
 
    return config
 
}, function (error) {
 
    return Promise.reject(error)
 
})
 
/* 响应拦截器 */
 
axios.interceptors.response.use(function (response) { // ①10010 token过期（30天） ②10011 token无效
 
if (response.data.code === 10010 || response.data.code === 10011) {
 
    Storage.localRemove('token') // 删除已经失效或过期的token（不删除也可以，因为登录后覆盖）
 
    router.replace({
 
        path: '/login' // 到登录页重新获取token
 
    })
 
} else if (response.data.token) { // 判断token是否存在，如果存在说明需要更新token
 
    Storage.localSet('token', response.data.token) // 覆盖原来的token(默认一天刷新一次)
 
}
 
    return response
 
}, function (error) {
 
    return Promise.reject(error)
 
})
```

 缓存工具类 Storage 



```js
var Storage = {
    // ==================sessionsTorage设置缓存================
    // 设置缓存
    sessionSet: function (name, data) {
        sessionStorage.removeItem(name)
        sessionStorage.setItem(name, JSON.stringify(data))
    },
    // 获取缓存
    sessionGet: function (name) {
        return JSON.parse(sessionStorage.getItem(name))
    },
    // 清除缓存
    sessionRemove: function (name) {
        sessionStorage.removeItem(name)
    },
    // ==================localStorage设置缓存==================
    // 设置缓存
    localSet: function (name, data) {
        localStorage.removeItem(name)
        localStorage.setItem(name, JSON.stringify(data))
    },
    // 获取缓存
    localGet: function (name) {
        return JSON.parse(localStorage.getItem(name))
    },
    // 清除缓存
    localRemove: function (name) {
        localStorage.removeItem(name)
    }
 
}
 
export default Storage
```

