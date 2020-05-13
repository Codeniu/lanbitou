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

# 安装vim

```
mv /etc/apt/sources.list /etc/apt/sources.list.bak

echo "deb http://mirrors.163.com/debian/ jessie main non-free contrib" >/etc/apt/sources.list
echo "deb http://mirrors.163.com/debian/ jessie-proposed-updates main non-free contrib" >>/etc/apt/sources.list
echo "deb-src http://mirrors.163.com/debian/ jessie main non-free contrib" >>/etc/apt/sources.list
echo "deb-src http://mirrors.163.com/debian/ jessie-proposed-updates main non-free contrib" >>/etc/apt/sources.list

apt-get update 
apt-get install -y vim

```

