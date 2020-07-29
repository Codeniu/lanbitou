# 解决chrome本地跨域问题：

**1.新建一个文件夹`MyChromeDevUserData`**

在chrome快捷方式的属性的目标后面添加：

```js
--disable-web-security --user-data-dir=C:\MyChromeDevUserData
```



**2.解除浏览器的跨域访问限制**

```
--allow-file-access-from-files
```





## 使用 XMLHttpRequest 读取 本地XML 文件失败问题的分析

**背景：**

在网站建设过程中，XML可以将数据从 HTML 文档中分离出来，所谓分离，就是在 HTML 中仅仅编写与页面相关的程序，而网站中的数据则储存在 XML 文档中，这种方法把程序和数据分离开来，使得文档更为清晰。当 HTML 需要调用 XML 中的数据时，通过 JAVASCRIPT 或者 JQUERY 语言实现。

**问题：**

调用 XML 的数据时，页面没有任何显示，表明调用失败，按F12键查看控制器中显示的信息，显示如下错误代码：

Failed to load file:///D:/AppServ/www/workspace/note.xml: Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https.

**分析：**

由错误提示可以大致了解到文件加载失败的原因是进行了跨域访问，因为使用 JAVASCRIPT 或者 JQUEY 调用数据，JAVASCRIPT 或者 JQUEY 存在跨域访问限制，因此数据调用失败。

**解决：**

网上搜索了诸多解决方案，其中一种是更改 chrome 浏览器的目标字段，增加 “--allow-file-access-from-files”字段，解除浏览器的跨域访问限制，但是没有解决问题。

后来查到一些资料说明产生这个问题的原因与执行本地代码相关，解决方法是需要通过服务器访问，于是才醒悟在打开页面时采取双击页面的方式，此种方式打开的页面在地址栏显示的是绝对路径，说明页面并没有通过服务器进行访问。于是改变打开页面的方式，即在网址中输入 localhost 来打开页面，测试后数据被成功读取。

**总结：**

通过双击打开页面的方式仅仅执行了本地代码，并没有通过服务器，在使用 JAVASCRIPT 或者 JQUEY 调用数据时被认为是跨域请求，导致数据调用失败。百度上介绍跨域请求的案例较多，但是没有找到直接解释本地代码和跨域的关系，这里只是粗浅的告诉大家在本地代码中通过服务器调用数据将被认为是跨域操作。
————————————————
版权声明：本文为CSDN博主「sillylarry」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/sillylarry/java/article/details/81095913



## 在网址中输入 localhost 来打开本地页面

原文链接：[vscode通过服务器打开html文件](https://www.cnblogs.com/luzhanshi/p/11994839.html)

1. 下载插件：Live Server

2. 安装完成之后直接在html上右键使用Live Server打开
3. liveServer.settings.port 是设置端口的



