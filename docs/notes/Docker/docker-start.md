# 1 镜像源

> setting > Docker Engine

```
{
  "registry-mirrors": [
    "https://registry.docker-cn.com",
     "https://docker.mirrors.ustc.edu.cn"
  ],
  "insecure-registries": [],
  "debug": true,
  "experimental": true
}
```

> 检查是否安装成功：

使用`docker info`命令：

看到以下信息表示安装成功。

```
 Registry Mirrors:
  https://registry.docker-cn.com/
  https://docker.mirrors.ustc.edu.cn/
```

> 几个速度比较快的镜像地址

Docker 官方中国区: https://registry.docker-cn.com

网易: http://hub-mirror.c.163.com

中科大: https://docker.mirrors.ustc.edu.cn

# 2 Docker 拉取 ubuntu 镜像

`docker pull ubuntu`安装最新版本的 ubuntu 镜像

> 检查是否安装成功

`docker images`命令

```
PS C:\Users\DELL> docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
ubuntu              latest              1d622ef86b13        47 hours ago        83.8MB
<none>              <none>              10e305a20c54        5 months ago        377MB
golang              1.11-alpine         e116d2efa2ab        8 months ago        345MB
```

# 3 在 ubuntu 镜像中安装 apt-get

1. 备份

```
 cp /etc/apt/sources.list /etc/apt/sources.list.bak
```

2. 修改源（直接修改，未使用 vi 或者 vim 修改）

```
echo "">sources.list
echo "deb http://mirrors.163.com/ubuntu/ artful main restricted universe multiverse">>sources.list
echo "deb http://mirrors.163.com/ubuntu/ artful-security main restricted universe multiverse">>sources.list
echo "deb http://mirrors.163.com/ubuntu/ artful-updates main restricted universe multiverse">>sources.list
echo "deb http://mirrors.163.com/ubuntu/ artful-proposed main restricted universe multiverse">>sources.list
echo "deb http://mirrors.163.com/ubuntu/ artful-backports main restricted universe multiverse">>sources.list
echo "deb-src http://mirrors.163.com/ubuntu/ artful main restricted universe multiverse">>sources.list
echo "deb-src http://mirrors.163.com/ubuntu/ artful-security main restricted universe multiverse">>sources.list
echo "deb-src http://mirrors.163.com/ubuntu/ artful-updates main restricted universe multiverse">>sources.list
echo "deb-src http://mirrors.163.com/ubuntu/ artful-proposed main restricted universe multiverse">>sources.list
echo "deb-src http://mirrors.163.com/ubuntu/ artful-backports main restricted universe multiverse">>sources.list
```

在此https://www.jianshu.com/p/2072d1ab11db获取更多信息

# 4.保存修改后的容器

查看正在运行的容器`docker ps`

```
PS D:\dams-vue> docker ps
CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES
62ecc03257f8 youngniu/ubuntu "/bin/bash" 6 minutes ago Up 6 minutes admiring_shockley
```

进入正在运行的容器内

```
docker exec –it 3bd0eef03413（容器id） bash
```

查看被修改的容器：

```
docker ps -l
```

提交指定容器保存为新的镜像：

```
 docker commit -m="some info" -a="author" <container id> <new image name>
```

查看本地所有镜像：

```
docker images
```

# 5 docker 运行 redis 容器

```
docker pull redis:latest	拉取镜像

docker images	查看是否拉去成功

docker run -itd --name redis-test -p 6379:6379 redis	运行redis容器

docker ps	查看是否运行成功

docker exec -it redis-test /bin/bash	进入到当前容器中

redis-cli	运行redis

```

# 6 常用命令

```
docker search mysql
```

# 7 安装 sqlserve

```
sudo docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=YourStrong@Passw0rd" -p 1433:1433 --name mssql -d mcr.microsoft.com/mssql/server:2017-latest
```

# 8 安装 vim

```
mv /etc/apt/sources.list /etc/apt/sources.list.bak

echo "deb http://mirrors.163.com/debian/ jessie main non-free contrib" >/etc/apt/sources.list
echo "deb http://mirrors.163.com/debian/ jessie-proposed-updates main non-free contrib" >>/etc/apt/sources.list
echo "deb-src http://mirrors.163.com/debian/ jessie main non-free contrib" >>/etc/apt/sources.list
echo "deb-src http://mirrors.163.com/debian/ jessie-proposed-updates main non-free contrib" >>/etc/apt/sources.list

apt-get update
apt-get install -y vim

```
