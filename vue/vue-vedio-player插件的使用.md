### 关于加载<span style="color:#345">video-js.swf</span>文件失败的解决办法

https://github.com/videojs/video.js/issues/4299

修改options的flash模块：

```js
flash: {
hls: { withCredentials: false },
swf: "/static/video-js.swf" // 引入静态文件swf
// swf: '//vjs.zencdn.net/swf/5.2.0/video-js.swf'
},
```

未能解决问题，可能是引入的静态文件有问题。



- [vue-video-player Demo](https://surmon-china.github.io/vue-video-player/)
- [常见推流协议](https://m.aliyun.com/doc/document_detail/49787.html?spm=5176.app49785.0.0.bgDTlk)
- [开启CORS](https://enable-cors.org/server.html)
- [原文链接](https://savokiss.com/tech/web-live-tech-with-vue.html)







**vue-vedio-player github地址** 

https://github.com/surmon-china/vue-video-player/blob/master/examples/01-video.vue



**video.js api文档地址**

http://docs.videojs.com/docs/api/player.html



**demo**

1. [基于vue，vue-video-player，iview的播放器](https://github.com/Dyleesunny/custom-video)
2. [自定义bar的样式](https://kmoskwiak.github.io/videojs-resolution-switcher/)





**事件**

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





