# apt-get

1. ### apt-get:ubuntu下的包管理器

2. ### 配置apt-get源

   1、复制原文件备份
    sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak

   2、编辑源列表文件

   sudo vim /etc/apt/sources.list

   3、将原来的列表删除，添加如下内容

- 阿里云的源
   deb [http://mirrors.aliyun.com/ubuntu/](https://link.jianshu.com?t=http%3A%2F%2Fmirrors.aliyun.com%2Fubuntu%2F) vivid main restricted universe multiverse
   deb [http://mirrors.aliyun.com/ubuntu/](https://link.jianshu.com?t=http%3A%2F%2Fmirrors.aliyun.com%2Fubuntu%2F) vivid-security main restricted universe multiverse
   deb [http://mirrors.aliyun.com/ubuntu/](https://link.jianshu.com?t=http%3A%2F%2Fmirrors.aliyun.com%2Fubuntu%2F) vivid-updates main restricted universe multiverse
   deb [http://mirrors.aliyun.com/ubuntu/](https://link.jianshu.com?t=http%3A%2F%2Fmirrors.aliyun.com%2Fubuntu%2F) vivid-proposed main restricted universe multiverse
   deb [http://mirrors.aliyun.com/ubuntu/](https://link.jianshu.com?t=http%3A%2F%2Fmirrors.aliyun.com%2Fubuntu%2F) vivid-backports main restricted universe multiverse
   deb-src [http://mirrors.aliyun.com/ubuntu/](https://link.jianshu.com?t=http%3A%2F%2Fmirrors.aliyun.com%2Fubuntu%2F) vivid main restricted universe multiverse
   deb-src [http://mirrors.aliyun.com/ubuntu/](https://link.jianshu.com?t=http%3A%2F%2Fmirrors.aliyun.com%2Fubuntu%2F) vivid-security main restricted universe multiverse
   deb-src [http://mirrors.aliyun.com/ubuntu/](https://link.jianshu.com?t=http%3A%2F%2Fmirrors.aliyun.com%2Fubuntu%2F) vivid-updates main restricted universe multiverse
   deb-src [http://mirrors.aliyun.com/ubuntu/](https://link.jianshu.com?t=http%3A%2F%2Fmirrors.aliyun.com%2Fubuntu%2F) vivid-proposed main restricted universe multiverse
   deb-src [http://mirrors.aliyun.com/ubuntu/](https://link.jianshu.com?t=http%3A%2F%2Fmirrors.aliyun.com%2Fubuntu%2F) vivid-backports main restricted universe multiverse
- ubuntu的源， 最好也加上，避免某些库下载不到
   deb [http://archive.ubuntu.com/ubuntu/](https://link.jianshu.com?t=http%3A%2F%2Farchive.ubuntu.com%2Fubuntu%2F) trusty main restricted universe multiverse
   deb [http://archive.ubuntu.com/ubuntu/](https://link.jianshu.com?t=http%3A%2F%2Farchive.ubuntu.com%2Fubuntu%2F) trusty-security main restricted universe multiverse
   deb [http://archive.ubuntu.com/ubuntu/](https://link.jianshu.com?t=http%3A%2F%2Farchive.ubuntu.com%2Fubuntu%2F) trusty-updates main restricted universe multiverse
   deb [http://archive.ubuntu.com/ubuntu/](https://link.jianshu.com?t=http%3A%2F%2Farchive.ubuntu.com%2Fubuntu%2F) trusty-proposed main restricted universe multiverse
   deb [http://archive.ubuntu.com/ubuntu/](https://link.jianshu.com?t=http%3A%2F%2Farchive.ubuntu.com%2Fubuntu%2F) trusty-backports main restricted universe multiverse

4、运行sudo apt-get update

5、运行sudo apt-get upgrade

6、常用命令

```csharp
apt-cache search packagename 搜索包
apt-cache show packagename 获取包的相关信息，如说明、大小、版本等
apt-get install packagename 安装包
apt-get install packagename - - reinstall 重新安装包
apt-get -f install 修复安装"-f = --fix-missing"
apt-get remove packagename 删除包
apt-get remove packagename - - purge 删除包，包括删除配置文件等
apt-get update 更新源
apt-get upgrade 更新已安装的包
apt-get dist-upgrade 升级系统
apt-get dselect-upgrade 使用 dselect 升级
apt-cache depends packagename 了解使用依赖
apt-cache rdepends packagename 是查看该包被哪些包依赖
apt-get build-dep packagename 安装相关的编译环境
apt-get source packagename 下载该包的源代码
apt-get clean 清理无用的包
apt-get autoclean 清理无用的包
apt-get check 检查是否有损坏的依赖
```



作者：大富帅
链接：https://www.jianshu.com/p/fb337765c2c2
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。



# wget

wget是一个linux下的下载工具，类似于windows下的迅雷。

wget是一个Linux环境下用于从World Wide Web上提取文件的工具，这是一个GPL许可证下的自由软件，其作者为Hrvoje Niksic 。wget支持HTTP和FTP协议，支持代理服务器和断点续传功能，能够自动递归远程主机的目录，找到合乎条件的文件并将其下载到本地硬盘上；如果必要，wget将恰当地转换页面中的超级连接以在本地生成可浏览的镜像。由于没有交互式界面，wget可在后台运行，截获并忽略HANGUP信号，因此在用户推出登录以后，仍可继续运行。通常，wget用于成批量地下载Internet网站上的文件，或制作远程网站的镜像。



# systemctl

systemd 是 Linux 下的一款系统和服务管理器，检视和控制systemd的主要命令是systemctl。

**详情：**

https://www.cnblogs.com/lxjshuju/p/7183689.html

http://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-commands.html



显示 系统状态:

```
$ systemctl status
```

输出激活的单元：

```
$ systemctl
```

下面命令等效：

```
$ systemctl list-units
```

输出执行失败的单元：

```
$ systemctl --failed
```

全部可用的单元文件存放在 /usr/lib/systemd/system/ 和 /etc/systemd/system/ 文件夹（后者优先级更高）。

查看全部已安装服务：

```
$ systemctl list-unit-files
```

马上激活单元：

```
# systemctl start <单元>
```

马上停止单元：

```
# systemctl stop <单元>
```

重新启动单元：

```
# systemctl restart <单元>
```

又一次载入配置：

```
# systemctl reload <单元>
```

输出单元执行状态：

```
$ systemctl status <单元>
```

检查单元是否配置为自己主动启动：

```
$ systemctl is-enabled <单元>
```

开机自己主动激活单元：

```
# systemctl enable <单元>
```

取消开机自己主动激活单元：

```
# systemctl disable <单元>
```

禁用一个单元(禁用后，间接启动也是不可能的)：

```
# systemctl mask <单元>
```

取消禁用一个单元：

```
# systemctl unmask <单元>
```

显示单元的手冊页（必须由单元文件提供）：

```
# systemctl help <单元>
```

又一次载入 systemd，扫描新的或有变动的单元：

```
# systemctl daemon-reload
```





# 守护进程

什么是守护进程？
守护进程（Daemon Process），也就是通常说的 Daemon 进程（精灵进程），是 Linux 中的后台服务进程。它是一个生存期较长的进程，通常独立于控制终端并且周期性地执行某种任务或等待处理某些发生的事件。



守护进程是个特殊的孤儿进程，这种进程脱离终端，为什么要脱离终端呢？之所以脱离于终端是为了避免进程被任何终端所产生的信息所打断，其在执行过程中的信息也不在任何终端上显示。由于在 Linux 中，每一个系统与用户进行交流的界面称为终端，每一个从此终端开始运行的进程都会依附于这个终端，这个终端就称为这些进程的控制终端，当控制终端被关闭时，相应的进程都会自动关闭。



Linux 的大多数服务器就是用守护进程实现的。比如，Internet 服务器 inetd，Web 服务器 httpd 等。



**如何查看守护进程**
在终端敲：ps axj

a 表示不仅列当前用户的进程，也列出所有其他用户的进程
x 表示不仅列有控制终端的进程，也列出所有无控制终端的进程
j 表示列出与作业控制相关的信息



![YrPNid.png](https://s1.ax1x.com/2020/05/15/YrPNid.png)

**从上图可以看出守护进行的一些特点：**

守护进程基本上都是以超级用户启动（ UID 为 0 ）
没有控制终端（ TTY 为 ？）
终端进程组 ID 为 -1 （ TPGID 表示终端进程组 ID）
————————————————
版权声明：本文为CSDN博主「lianghe_work」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/lianghe_work/article/details/47659889





# linux快捷键

```
ctrl+l	清屏

ctrl+a	移动光标到行首
ctrl+e			行尾

ctrl+r	查找历史命令

ctrl+u	清除光标前内容


```





# 测试工程师必须要掌握的linux命令

**软件测试工程师linux十大场景命令使用**

1.**实时查看tomcat日志文件查看：**

```
cd /home/tomcat/logs #也可用相对目录
tail –f  catalina.out #实时打印日志文件
ctrl+c #退出查看
```

**2.修改配置文件内容**

最常见的就是修改环境变量

```
vim /etc/profile输入字母i，
进入编辑模式（INSERT）输入内容，
按esc，进入命令模式 。
执行:wq，保持修改。
输入 soucre /etc/profile 使环境变量生效。
可以通过 cat  /etc/profile查看文件是否修改成功。
```

[vim编辑器使用](http://mp.weixin.qq.com/s?__biz=MzI5NzIyMjQwNA==&mid=2247483730&idx=1&sn=9b37524fa3811554a4ced2e335e66acf&chksm=ecb92939dbcea02f4bc8b881f0b52a8d25f186638d6c32321edfb78136f1e57ecce3210eeb86&scene=21#wechat_redirect)



**3.查看tomcat进程，杀死进程，重启进程。**

```
查看tomcat进程
ps -ef|grep tomcat
ps –aux|grep tomcat
杀死进程
kill -9 进程ID
ps -ef|grep tomcat#查看进程是否已关闭
进入tomcat的bin目录cd /usr/local/tomcat/bin
启动tomcat./startup.sh
```

**4.压缩解压缩文件**

```
tar cvf a.tar 1.txt 2.txt 3.txt#将3个文件放到文件包a.tar中。
tar cvf /tmp/a1.tar *.txt#指定包存放的位置。、
tar xvf a.tar#将文件解压缩到当前目录。
tar -zcvf a.tar.gz *.txt#打包与压缩为a.tar.gz。
tar -zxvf a.tar.gz#解压缩并解包。
```

**5.上传/下载**

在xshell中可以通过下面的命令进行上传下载：

```
一般般需要安装，可使用 yum install lrzszrz：选择上传文件sz 文件名：选择下载路径
```

**6.文件查找**

[文件查找](http://mp.weixin.qq.com/s?__biz=MzI5NzIyMjQwNA==&mid=2247483740&idx=1&sn=5f11ca0d9098fa3be447b6229ae117c9&chksm=ecb92937dbcea021d7ffaaed31f9e7e0217f01a0be99fcc831439fd6b7274718607ea17dd04d&scene=21#wechat_redirect)

**7.权限修改**

[linux用户管理，及权限修改](http://mp.weixin.qq.com/s?__biz=MzI5NzIyMjQwNA==&mid=2247483736&idx=1&sn=c9e7016d4128b600c4bdc6499b1932d2&chksm=ecb92933dbcea0253f472b29c361bd509646708d6ad05954377f632ffbe3312fecd90cd60eaa&scene=21#wechat_redirect)

**8.移动、复制命令**

```
移动mv
移动当前目录文件夹AA 到/home/aa/
mv AA/ /home/aa/
移动当前目录文件a.txt到 /home/aa/目录，并重命名为b.txt
mv a.txt /home/aa/b.txt

复制cp
复制当前目录文件a.txt到/home/B目录
cp a.txt /home/B

复制文件夹 AA到/home/B目录
cp -r AA/ /home/B

跨服务器复制：scp
```

**9.服务器性能监控**

```
free  -h
```



**10.其他技巧**

```
1.快速清屏 ctrl+l
2.快速罗列所有文件及文件夹 ll
3.命令补全，输入部分命令，点击tab键。
4.输入 history ，查看历史命令执行记录。
5.命令 -help：查看命令帮助
```

**linux学习方法：**

1.最快掌握linux命令的办法就是多敲命令，多实践。

2.安装一个虚拟机，可以选择VMware， 在虚拟机安装个Linux操作系统，如centos。

3.学会使用SecureCRT 或 Xshell远程连接服务器。

4.会使用基本的命令后，就可以尝试安装配置一些软件，如JDK，mysql，redis，tomcat等，  这样就能把零散的命令结合起来，刚开始会遇到很多问题，但是你熟悉几遍之后发现你敲键盘的手会如此飞快。

5.在掌握linux命令之后，就可以尝试写一些shell脚本，把一些重复的工作自动化，如定时备份文件，一键部署脚本等。





