### 监听浏览器刷新：

```js
window.onbeforeunload = function(e) {   
	e = e || window.event;
    // 兼容IE8和Firefox 4之前的版本
    if (e) {
    e.returnValue = '关闭提示';
    }
    // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
    return '关闭提示';
}
```



### Vue中监听窗口关闭事件，并在窗口关闭前发送请求

window.beforeunload事件在window.unload事件之前执行。同时注意ajax请求方式必须为同步请求，所以不能使用axios,因为axios不能执行同步请求。

```js
mounted() {
      window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))
      window.addEventListener('unload', e => this.unloadHandler(e))
    },
    destroyed() {
      window.removeEventListener('beforeunload', e => this.beforeunloadHandler(e))
      window.removeEventListener('unload', e => this.unloadHandler(e))
    },
    methods: {
      beforeunloadHandler(){
        this._beforeUnload_time=new Date().getTime();
      },
      unloadHandler(e){
        this._gap_time=new Date().getTime()-this._beforeUnload_time;
        debugger
        //判断是窗口关闭还是刷新
        if(this._gap_time<=5){
          //如果是登录状态，关闭窗口前，移除用户
          if(!this.showLoginButton){
            $.ajax({
              url: '/pictureweb/user/remove',
              type: 'get',
              async:false, //或false,是否异步
             
            })
          }
        }
      },
}
```