viewerjs的使用

```js
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';

methods:{
    priview(val) {
            let src;
            if (!this.isPageModel) {
                if (this.nextStyle !== '') {
                    src = this.nextImgSrc;
                } else {
                    src = this.currentImgSrc;
                }
            } else if (val === 1) {
                src = this.currentImgSrc;
            } else {
                src = this.currentHdImgSrc;
            }
            let image = new Image();
            image.src = src;
            let viewer = new Viewer(image, {
                hidden: function() {
                    viewer.destroy();
                },
            });
            viewer.show();
            setTimeout(() => {
                WatermarkBody.set();
            }, 1000);
        },
}
```

模态层添加水印

```js
/**
 * 针对viewer组件 显示水印
 *
 * 在viewer.show();下方加入如下代码
 *
 *  import WatermarkBody from '@/utils/watermarkBody'; // 加入水印
    setTimeout(() => {
        WatermarkBody.set();
    }, 1000);
 * */

let watermark = {};
let setWatermark = () => {
    let id = '1.23452384164.123412416';
    let className = 'viewer-container';
    let objList = document.getElementsByClassName(className);
    if (objList.length === 0) {
        return;
    }

    let imgObj = objList[0];

    let idObj = document.getElementById(id);
    if (idObj !== null) {
        imgObj.removeChild(idObj);
    }

    // 创建一个画布
    let can = document.createElement('canvas');
    // 设置画布的长宽
    can.width = 300;
    can.height = 200;

    let cans = can.getContext('2d');
    // 旋转角度
    cans.rotate((-15 * Math.PI) / 180);
    // cans.font = '18px Vedana';
    cans.font = '18px SimSun'; // 宋体

    // 设置填充绘画的颜色、渐变或者模式
    cans.fillStyle = 'rgba(200, 200, 200, 0.50)';

    // 设置文本内容的当前对齐方式
    cans.textAlign = 'left';
    // 设置在绘制文本时使用的当前文本基线
    cans.textBaseline = 'Middle';
    // 在画布上绘制填色的文本（输出的文本，开始绘制文本的X坐标位置，开始绘制文本的Y坐标位置）
    // cans.fillText(str, 0, 70);
    // 水印内容
    let userName = window.sessionStorage.getItem('userTitle');
    cans.fillText(userName, 0, 70);

    // 在画布上填充时间
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let time = year + '-' + month + '-' + day;
    cans.fillText(time, 0, 100);

    let div = document.createElement('div');
    div.id = id;
    div.style.pointerEvents = 'none';
    // 设置换行
    div.style.whiteSpace = 'pre';
    // 设置水印显示区域的样式
    div.style.position = 'absolute';
    div.style.top = '0px';
    div.style.zIndex = '999';
    // 设置水印区域为imgobj对象所在的大小
    div.style.width = imgObj.clientWidth + 'px';
    div.style.height = imgObj.clientHeight + 'px';
    div.style.background =
        'url(' + can.toDataURL('image/png') + ') left top repeat';
    imgObj.appendChild(div);
    return id;
};

// 该方法只允许调用一次
watermark.set = () => {
    let id = setWatermark();
    setInterval(() => {
        if (document.getElementById(id) === null) {
            id = setWatermark();
        }
    }, 500);
    window.onresize = () => {
        setWatermark();
    };
};

export default watermark;

```

