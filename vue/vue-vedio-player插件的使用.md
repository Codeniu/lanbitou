# 1.播放Rtmp视频流

## 关于加载<span style="color:#345">video-js.swf</span>文件失败的解决办法

https://github.com/videojs/video.js/issues/4299

修改options的flash模块：

```js
flash: {
    hls: { withCredentials: false },
    swf: "/static/video-js.swf" // 引入静态文件swf
    // swf: '//vjs.zencdn.net/swf/5.2.0/video-js.swf' // 在线swf
},
```

未能解决问题，可能是引入的静态文件有问题。

更改为，根据环境进行引入：

```json
const isProduction = process.env.NODE_ENV === 'production';
flash: {
    hls: { withCredentials: false },
    swf: isProduction
    ? '/dams/static/media/video-js.swf'
    : '/static/media/video-js.swf',
},
```



## 参考

- [vue-video-player Demo](https://surmon-china.github.io/vue-video-player/)
- [常见推流协议](https://m.aliyun.com/doc/document_detail/49787.html?spm=5176.app49785.0.0.bgDTlk)
- [开启CORS](https://enable-cors.org/server.html)
- [web直播技术](https://savokiss.com/tech/web-live-tech-with-vue.html)



**vue-vedio-player github地址** 

https://github.com/surmon-china/vue-video-player/blob/master/examples/01-video.vue



**video.js api文档地址**

http://docs.videojs.com/docs/api/player.html



**demo**

1. [基于vue，vue-video-player，iview的播放器](https://github.com/Dyleesunny/custom-video)
2. [自定义bar的样式](https://kmoskwiak.github.io/videojs-resolution-switcher/)





## **事件**

```html
<video-player
 class="vjs-custom-skin"
 ref="videoPlayer1"
 :options="playerOptions"
 :playsinline="true"
 :events="events"
 @play="onPlayerPlay($event)"
 @pause="onPlayerPause($event)"
 @ended="onPlayerEnded($event)"
 @loadeddata="onPlayerLoadeddata($event)"
 @waiting="onPlayerWaiting($event)"
 @playing="onPlayerPlaying($event)"
 @timeupdate="onPlayerTimeupdate($event)"
 @canplay="onPlayerCanplay($event)"
 @canplaythrough="onPlayerCanplaythrough($event)"
 @ready="playerReadied"
 @statechanged="playerStateChanged($event)">
</video-player>
```



# 2.播放m3u8视频

配置options：

```json
html5：{
 hls: { withCredentials: false },
}
```

测试地址：

```
http://yushou.qitu-zuida.com/20180927/15579_a5712c85/index.m3u8

http://hls.cntv.lxdns.com/asp/hls/main/0303000a/3/default/978a64ddd3a1caa85ae70a23414e6540/main.m3u8

http://39.100.227.141:18000/hls/movie.m3u8
```



# 3.项目使用的插件版本

```json
"video.js": "^7.7.5",
"videojs-contrib-hls": "^5.15.0",
"videojs-flash": "^2.2.1",
"vue-video-player": "^5.0.2",
```

rtmp直播流播放时报错：此视频无法播放。可能是videojs-flash版本的问题。

查看网上的例子，例子使用的版本是：

```json
    "videojs-contrib-hls": "5.14.1",
    "videojs-flash": "2.1.0",
    "vue-video-player": "4.0.6"
```

尝试解决 1：

更改vidojs-flash的版本。

```javascript
npm install videojs-flash@2.1.0
```

# 4.VIDEOJS: ERROR: The "flash" tech is undefined. Skipped browser support check for that tech

https://github.com/surmon-china/vue-video-player/issues/221