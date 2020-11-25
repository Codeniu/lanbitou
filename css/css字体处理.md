# 1.前端如何实现向word一样输入字符，超出后另起一页

思路：宽高固定，字体大小固定。根据字数计算行数。进行文字分段。

主要用到的方法有：slice()





# 2. css设置各种中文字体如雅黑、黑体、宋体、楷体等等

MicrosoftJhengHei为微软正黑体，STHeiti为华文黑体，MingLiu记得11px下的中文有着不凡的效果。

在css中推荐使用中文字体的英文表示法，以下附常见中文字体的英文名：

**Mac OS的一些：**

华文细黑：STHeiti Light [STXihei]
华文黑体：STHeiti
华文楷体：STKaiti
华文宋体：STSong
华文仿宋：STFangsong
儷黑 Pro：LiHei Pro Medium
儷宋 Pro：LiSong Pro Light
標楷體：BiauKai
蘋果儷中黑：Apple LiGothic Medium
蘋果儷細宋：Apple LiSung Light

**Windows的一些：**

新細明體：PMingLiU
細明體：MingLiU
標楷體：DFKai-SB
黑体：SimHei
宋体：SimSun
新宋体：NSimSun
仿宋：FangSong
楷体：KaiTi
仿宋_GB2312：FangSong_GB2312
楷体_GB2312：KaiTi_GB2312
微軟正黑體：Microsoft JhengHei
微软雅黑体：Microsoft YaHei
装Office会生出来的一些：

隶书：LiSu
幼圆：YouYuan
华文细黑：STXihei
华文楷体：STKaiti
华文宋体：STSong
华文中宋：STZhongsong
华文仿宋：STFangsong
方正舒体：FZShuTi
方正姚体：FZYaoti
华文彩云：STCaiyun
华文琥珀：STHupo
华文隶书：STLiti
华文行楷：STXingkai
华文新魏：STXinwei

注：如果字体的名称是一个单词的，不需要加引号，否则在ie6，7里面会失效，并且后面的样式也会不生效



# 3.vue项目引入字体文件

1.把字体文件放到asset/fonts文件夹中

2.在style文件夹下新建font.less文件，并填入以下代码

```less
@font-face {
    font-family: 'simfang';
    src: url('../assets/font/simfang.ttf'); // 仿宋
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'simhei';
    src: url('../assset/font/simhei.tff'); // 黑
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'simkai';
    src: url('../assset/font/simkai.tff'); // 楷体
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'simsun';
    src: url('../assset/font/simsun.tff'); // 宋
    font-weight: normal;
    font-style: normal;
  }
```

3.在vue.config.js中做相关的配置。

```js
chainWebpack(config) {
    config.module
    .rule('font')
    .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/)
    // .use('url-loader')
    // .loader('url-loader')
    .exclude.add(resolve('src/assets/fonts'))
    .end();
}
```



# 4.字号

初号44pt

小初36pt

一号26pt

小一24pt

二号22pt

小二18pt

三号16pt

小三15pt

四号14pt

小四12pt

五号10.5pt

小五9pt

六号7.5pt

小六6.5pt

七号5.5pt

八号5pt