# 使用RecordRTC对video视频进行录制

实现对监控画面进行抓拍以及录像功能时。由后端使用ffmpeg对直播流进行截取，但是由于直播流有一定的缓冲，前端看到的画面对于服务器来说已经是过时的画面，这就导致截取的画面不是自己想要的画面。为了解决这个问题，现考虑从前端页面进行画面的截取。



使用canvas容易实现对video标签的单帧截取。

RecordRTC可以记录一段时间内canvas的变化。

视频截取的思路：在单位时间内将video画面实时绘制到canvas中，然后利用RecordRTC记录canvas。



### **参考**

**[view RecordRTC in Github](https://github.com/muaz-khan/RecordRTC)**

**[CSDN](https://blog.csdn.net/qq_34958474/article/details/89335594?utm_medium=distribute.pc_relevant_bbs_down.none-task--2~all~first_rank_v2~rank_v29-2.nonecase&depth_1-utm_source=distribute.pc_relevant_bbs_down.none-task--2~all~first_rank_v2~rank_v29-2.nonecase)**

**[RecordRTC总结](https://blog.csdn.net/u014293306/article/details/81287026)**

[RecordRTC API](https://recordrtc.org/GifRecorder.html)



### 在`vue`项目中使用`RecordRTC`

安装

```
npm install --save-dev 'recordrtc'
```

引入

```js
import RecordRTC from 'recordrtc';
export default {
  	data() {
        return {
            recorder: null,
        };
    },
    methods:{
        initRecord(){
             const canvas = this.$refs.canvas;
             this.recorder = RecordRTC(canvas, {type:'gif'}
        }
    }
}
```



### 解决报错

这里录制的对象是一个canvas，按上述引入后，点击开始录制后，浏览器控制台报一个警告。经测试，如果录制对象是一个媒体流的话，不会有这样的警告。这里需要做就是把这个screenshot.js引入到项目中去。

Please link: https://www.webrtc-experiment.com/screenshot.js

```javascript
vue.runtime.esm.js?6e6d:619 [Vue warn]: Error in v-on handler: "Please link: https://www.webrtc-experiment.com/screenshot.js"

found in

---> <Test> at src/views/components-demo/RecordRTCDemo/Test.vue
       <Anonymous>
         <AppMain> at src/layout/components/AppMain.vue
           <Layout> at src/layout/index.vue
             <App> at src/App.vue
               <Root>
               
warn @ vue.runtime.esm.js?6e6d:619
logError @ vue.runtime.esm.js?6e6d:1884
globalHandleError @ vue.runtime.esm.js?6e6d:1879
handleError @ vue.runtime.esm.js?6e6d:1839
invokeWithErrorHandling @ vue.runtime.esm.js?6e6d:1862
invoker @ vue.runtime.esm.js?6e6d:2179
original._wrapper @ vue.runtime.esm.js?6e6d:6911

```

在vue中使用RecordRT记录canvas时报错，经验证,应该是缺少screenshot.js这个文件导致的。

修改public文件夹下的index.html文件。添加如下代码

```js
<script src="https://cdn.webrtc-experiment.com/screenshot.js"></script>
```

或者使用本地文件

```js
<script src='./screenshot.js'></script>
```





### `RecordRTC`的使用

[RecordRTC API文档](https://recordrtc.org/RecordRTC.html)



```js
RecordRTC(mediaStream, {
	type: 'outPutType',
})
```

`mediaStream`：输入是一个媒体流。（Single media-stream object, array of media-streams, html-canvas-element, etc.）

`outPutType`：输出类型，有video,gif,audio,canvas



example:

这个例子中会获取本地摄像头的权限。输出类型是video，点击停止按钮后，`recorder.getBlob()`获取到录制的数据，之后做上传，预览等处理。

```js
// click start btn
document.getElementById('btn-start-recording').onclick = function () {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(function (camera) 		{
            // camera就是一个媒体流
            recorder = RecordRTC(camera, {
                type: 'video'
        	});
        	recorder.startRecording();
   	 	}).catch(function (error) {
        	alert('Unable to capture your camera. Please check console logs.');
        	console.error(error);
    	});
}

// click end btn
document.getElementById('btn-stop-recording').onclick = function () {
    this.disabled = true;
    recorder.stopRecording(stopRecordingCallback);
};

function stopRecordingCallback() {
    const video = document.getElementById('video')
    video.src = video.srcObject = null;
    video.muted = false;
    video.volume = 1;
    video.src = URL.createObjectURL(recorder.getBlob());

    recorder.camera.stop();
    recorder.destroy();
    recorder = null;
}
```



### 录制video标签

这里的录制video标签是我们想要实现的目的，实际上录制的对象是canvas。这里的关键有两点：

1.何时停止录制。

2.如何将video的画面实时渲染到canvas中



需求要求点击录制按钮后录制5s的画面，点击开始时记录当前系统的时间，`this.startTimeCutVideo = new Date().getTime();`。在每次循环绘制canvas画面前，用当前时间减去开始时间大于6s时停止记录。



looper中用到了一个API,`requestAnimationFrame(looper)`,这里是循环的关键，这个API的作用是，在页面每次渲染前需要执行looper方法。保证了，video画面绘制到canvas的连续性。

```js
    data() {
        return {
            recorder: null,
            startTimeCutVideo: null,
            endTImeCutVideo: null,
        };
    },
        
     methods:{
         startRecording() {
            this.startTimeCutVideo = new Date().getTime();

            const canvas = this.$refs.canvas;
            this.recorder = RecordRTC(canvas, {
                type: 'gif',
                frameRate: 200,
                quality: 10,
                disableLogs: true,
                onGifRecordingStarted: () => {
                    console.log('录制开始');
                },
                onGifPreview: gifURL => {
                    console.log(gifURL); // 录制中的实时数据，可以显示录制的画面
                },
            });
            this.recorder.startRecording(); // 开始录制
            this.looper();// 循环绘制canvas
        },
        looper() {
            this.endTImeCutVideo = new Date().getTime();
            if ((this.endTImeCutVideo - this.startTimeCutVideo) / 1000 > 6) {
                this.stopRecording();
                return;
            }
            this.drawMedia(); // 刷新canvas
            requestAnimationFrame(this.looper);
        },
       	drawMedia() {
            const canvas = this.$refs.canvas;
            const ctx = canvas.getContext('2d');
            const video = this.$refs.video;
            canvas.setAttribute('width', video.videoWidth);
            canvas.setAttribute('height', video.videoHeight);
            ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        },
        stopRecording() {
            this.recorder.stopRecording(this.stopRecordingCallback);
        },
        stopRecordingCallback() {
            console.log('Gif 录制完成', this.recorder.getBlob());
            // 上传到服务器
            this.upload(this.recorder.getBlob());
            this.recorder.destroy();
            this.recorder = null;
        },
     }
```



demo:[Gitee](https://gitee.com/youngniu/vue-demo/tree/dev/src/views/components-demo/RecordRTCDemo)



截图

![](https://gitee.com/youngniu/pic-bed/raw/master/img/image-20210223101048365.png)