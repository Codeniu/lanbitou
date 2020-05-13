### 容器改名

```
docker rename <container name> <newcontainer name>
```

### 基本命令

| 命令                           | 描述                      |
| ------------------------------ | :------------------------ |
| docker ps -a                   |                           |
| docker ps -l                   |                           |
| docker start <container id>    |                           |
| docker stop <contaienr name>   |                           |
| docker rm <contaienr name>     |                           |
| docker top <contaienr name>    | 查看WEB应用程序容器的进程 |
| docker inspect<contaienr name> | 查看Docker的底层信息      |

### 运行容器

```
$ docker run --name nginx-test -p 8080:80 -d nginx
$ docker run --name <your container name> -p <local port:container port> -d <image name>
					容器名							本地端口：容器端口					镜像名
```

参数说明：

- **--name nginx-test**：容器名称。
- **-p 8080:80**： 端口进行映射，将本地 8080 端口映射到容器内部的 80 端口。
- **-d **： 设置容器在在后台一直运行。

### 进入容器

```
$ docker exec -it nginx-test bash
$ docker exec -it <contaienr name>
```

参数说明：

- **--it**：i是交互模式，t显示终端。

- **bash**：命令行交互

  

### 保存容器副本

```
docker commit -m="has update" -a="niu" <container id> <author>/<image name>:<tag>
```

例子

```
docker commit -m="has update" -a="runoob" e218edb10161 runoob/ubuntu:v2
```

参数说明：

- **-m**：提交的描述。
- **-a**：作者。