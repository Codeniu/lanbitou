### 图像处理的流程：

1. 扫描图像经过“旋转、纠偏、裁边、去污”后保存为原始图像；
2. 批量高清转换（去噪点、黑白阈值、jpg损耗、RGB调色）后生成高清图像；
3. 在图像处理界面可以调出原始图像、高清图像，再通过两边图片的对比完成高清图像的抠取照片、字迹加黑等





### 图片显示

```html
<el-image :src="imgUrl" fit="fill" style="padding:5px;">
    <div slot="placeholder" class="image-slot">
      加载中
    <span class="dot">...</span>
  </div>
</el-image>
```



### 图片查看插件

1. [vue-photo-preview]( https://blog.csdn.net/wcharles666/article/details/81332867 )
2. [previewer.js]( https://blog.csdn.net/cxxc1976549895/article/details/82895892 )



在vue页面中获取viewer对象

```vue
<template>
  <div>
    <div id="galley">
      <ul id="galley-items">
        <li v-for="(item,index) of imgArr" :key="index">
          <img :src="item" alt="图片描述" />
        </li>
      </ul>
    </div>
    <div>
      <el-button @click="prev">prev</el-button>
      <el-button @click="next">next</el-button>
    </div>
  </div>
</template>

<script>
import Viewer from "viewerjs";
import "viewerjs/dist/viewer.css";

export default {
  name: "HelloWorld",
  data() {
    return {
      imgArr: [
        "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3272199364,3404297250&fm=26&gp=0.jpg",
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3267295166,2381808815&fm=26&gp=0.jpg",
        "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3429654663,2972188411&fm=26&gp=0.jpg"
      ],
      ViewerDom: null,
      viewer: null
    };
  },
  mounted() {
    const ViewerDom = document.getElementById("galley-items");
    const options = {
      inline: false,
      button: true, //右上角按钮
      navbar: true, //底部缩略图
      title: true, //当前图片标题
      tooltip: true, //显示缩放百分比
      //底部工具栏
      toolbar: {
        zoomIn: 1,
        zoomOut: 1,
        oneToOne: 1,
        reset: 0,
        prev: 0,
        play: 0,
        next: 0,
        rotateLeft: 1,
        rotateRight: 1,
        flipHorizontal: 0,
        flipVertical: 0
      },
      movable: true, //是否可以移动
      zoomable: true, //是否可以缩放
      rotatable: true, //是否可旋转
      scalable: true, //是否可翻转
      transition: true, //使用 CSS3 过度
      fullscreen: true, //播放时是否全屏
      keyboard: true, //是否支持键盘
      url: "data-source",
      ready: function(e) {
        // console.log(e.type, '组件以初始化');
      },
      show: function(e) {
        // console.log(e.type, '图片显示开始');
      },
      shown: function(e) {
        // console.log(e.type, '图片显示结束');
      },
      hide: function(e) {
        // console.log(e.type, '图片隐藏完成');
      },
      hidden: function(e) {
        // console.log(e.type, '图片隐藏结束');
      },
      view: function(e) {
        // console.log(e.type, '视图开始');
      },
      viewed: function(e) {
        // console.log(e.type, '视图结束');
        // 索引为 1 的图片旋转20度
        // if(e.detail.index === 1){
        //     this.viewer.rotate(20);
        // }
      },
      zoom: function(e) {
        // console.log(e.type, '图片缩放开始');
      },
      zoomed: function(e) {
        // console.log(e.type, '图片缩放结束');
      }
    };
    const viewer = new Viewer(ViewerDom, options);
    this.ViewerDom = ViewerDom;
    this.viewer = viewer;
  },
  methods: {
    prev() {
      this.viewer.prev();
    },
    next() {
      this.viewer.next();
    }
  }
};
</script>

<style scoped>
#galley {
  width: 400px;
  height: 400px;
  border: 1px solid red;
}
#galley-items {
  list-style: none;
  margin: 0;
  padding: 0;
}

#galley-items > li {
  border: 1px solid transparent;
  float: left;
  height: calc(100% / 3);
  margin: 0 -1px -1px 0;
  overflow: hidden;
  width: calc(100% / 3);
}

#galley-itemss > li > img {
  cursor: -webkit-zoom-in;
  cursor: zoom-in;
  width: 100%;
}
</style>

```





### viewer以组件形式引用

```vue
<!--
  功能：test
  作者：njx
  时间：2019年10月28日 10:31:32
  版本：v1.0
-->
<template>
  <div>
    <el-button @click="getImgs">hit me</el-button>
    <div id="app-container" style="width:400px;height: 600px;">
      <viewer :images="images" ref="viewer">
        <img v-for="item in images" :src="item.src" :key="item.index" height="100" hidden />
      </viewer>
    </div>
  </div>
</template>

<script>
import Viewer from 'v-viewer';
export default {
  name: "demo",
  props: {},
  components: {},
  data() {
    return {
      images: [
        {
          src:
            "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3272199364,3404297250&fm=26&gp=0.jpg",
          index: 1
        },
        {
          src:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3267295166,2381808815&fm=26&gp=0.jpg",
          index: 2
        },
        {
          src:
            "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3429654663,2972188411&fm=26&gp=0.jpg",
          index: 3
        }
      ],
    };
  },
  computed: {},
  watch: {},
  methods: {
    getImgs() {
    }
  },
  created() {},
  mounted() {}
};
</script> 

<style scoped>
</style>

```



### 全局引用

```js

// 图片浏览插件 v-viewer
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Vue.use(Viewer);
Viewer.setDefaults({
  'inline': false,
  'button': true, //右上角按钮
  "navbar": true, //底部缩略图
  "title": true, //当前图片标题
  "tooltip": true, //显示缩放百分比
  //底部工具栏
  toolbar: {
    zoomIn: 1,
    zoomOut: 1,
    oneToOne: 1,
    reset: 0,
    prev: 0,
    play: 0,
    next: 0,
    rotateLeft: 1,
    rotateRight: 1,
    flipHorizontal: 0,
    flipVertical: 0,
  },
  "movable": true, //是否可以移动
  "zoomable": true, //是否可以缩放
  "rotatable": true, //是否可旋转
  "scalable": true, //是否可翻转
  "transition": true, //使用 CSS3 过度
  "fullscreen": true, //播放时是否全屏
  "keyboard": true, //是否支持键盘
  "url": "data-source",
  ready: function (e) {
    // console.log(e.type, '组件以初始化');
  },
  show: function (e) {
    // console.log(e.type, '图片显示开始');
  },
  shown: function (e) {
    // console.log(e.type, '图片显示结束');
  },
  hide: function (e) {
    // console.log(e.type, '图片隐藏完成');
  },
  hidden: function (e) {
    // console.log(e.type, '图片隐藏结束');
  },
  view: function (e) {
    // console.log(e.type, '视图开始');
  },
  viewed: function (e) {
    // console.log(e.type, '视图结束');
    // 索引为 1 的图片旋转20度
    // if(e.detail.index === 1){
    //     this.viewer.rotate(20);
    // }
  },
  zoom: function (e) {
    // console.log(e.type, '图片缩放开始');
  },
  zoomed: function (e) {
    // console.log(e.type, '图片缩放结束');
  },
});

```



### js使用

```js
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';

<span
	style="cursor: pointer;"
	@click="priview"
>预览</span>

// 大图预览
priview() {
    var src = 'img-url'; // 填写图片地址
    var image = new Image();
    image.src = src;
    var viewer = new Viewer(image, {
        hidden: function() {
            viewer.destroy();
        },
    });
    viewer.show();
},
```





# 示例：

## 1.以组件方式

```html
<div v-show="false">
      <viewer
        ref="viewer"
        :images="imgArr"
        class="viewer"
        @inited="inited"
      >
        <template slot-scope="scope">
          <img
            v-for="(src,index) in scope.images"
            :key="index"
            :src="src"
          />
          {{ scope.options }}
        </template>
      </viewer>
 </div>

	  <span
      style="cursor: pointer;"
      @click="handleRow"
      >预览</span>



```

js

```js
// 图片列表
imgArr:[]       

		// 初始化
        inited(viewer) {
            this.$viewer = viewer;
        },
            
        // 显示
        show() {
            this.$viewer.show();
        },
            
		// 大图预览
        handleRow() {
            this.show();
        },

```

