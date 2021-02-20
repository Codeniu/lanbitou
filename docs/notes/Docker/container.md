## 容器

### 容器改名

```
docker rename <container name> <newcontainer name>
```

### 基本命令

| 命令                            | 描述                        |
| ------------------------------- | :-------------------------- |
| docker ps -a                    | 列出活动的容器              |
| docker ps -l                    |                             |
| docker start "container id"     | 启动                        |
| docker stop "contaienr_name"    | 停止                        |
| docker rm "contaienr name"      | 删除容器                    |
| docker top "contaienr name"     | 查看 WEB 应用程序容器的进程 |
| docker inspect "contaienr name" | 查看 Docker 的底层信息      |

### 运行（创建）容器

```
$ docker run --name nginx-test -p 8080:80 -d nginx
$ docker run --name <your container name> -p <local port:container port> -d <image name>
					容器名					本地端口：容器端口			镜像名
```

参数说明：

- **--name nginx-test**：容器名称
- **-p 8080:80**： 端口进行映射，将本地 8080 端口映射到容器内部的 80 端口
- **-d **： 设置容器在在后台一直运行
- **--entrypoint=‘bash’**：进入容器时所带的默认参数。$ docker exec -it nginx-test 等效与$ docker exec -it nginx-test bash

### 进入容器

```
$ docker exec -it nginx-test bash
$ docker exec -it <contaienr name>
```

参数说明：

- **--it**：i 是交互模式，t 显示终端，是一个伪`tty`终端。

- **-i** 保证容器的`STDIN`（持久的标准输入）是开启的。

- **-t** 为创建的容器分配一个伪 tty 终端

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

## 容器状态为 Exit（1）时的处理

1.第一步查看日志

```
docker logs -f <container name>
```

一般在这就能找到问题：可以看到是我们的配置文件有问题

```
[root@iz2ze7hl9oxqoqpukjw25 containers]# docker logs -f nginx2
nginx: [emerg] unknown directive "//显示索引" in /etc/nginx/nginx.conf:50
nginx: [emerg] unknown directive "//显示索引" in /etc/nginx/nginx.conf:50
nginx: [emerg] unexpected "}" in /etc/nginx/nginx.conf:52
nginx: [emerg] unknown directive "//显示索引" in /etc/nginx/nginx.conf:50
```

## 运行一些常用的容器

### redis

```
docker run -itd --name redis-test -p 3396:3396 redis
```

### mysql

```
docker run -itd --name mysql-niu -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql
```
