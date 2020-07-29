### HTML5规范里增加了一个自定义data属性.

```
为前端开发者提供自定义的属性，这些属性集可以通过对象的dataset属性获取，不支持该属性的浏览器可以通过 getAttribute方法获取<div data-author="david" data-time="2011-06-20" data-comment-num="10">...</div>div.dataset.commentNum; // 10
```



通过js方式给data-*设置值

<div id="content" data-user-list="user_list">data-user_list自定义属性 </div>
//js

var content= document.getElementById('content');

content.dataset.name='我叫tom'

alert(content.dataset.name)