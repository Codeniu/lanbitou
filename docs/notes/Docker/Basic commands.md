## Docker 的基本命令



```
容器运行状态
docker stats

查看运行的容器
docer ps -a

停止所有容器
docker stop $(docker ps -a -q)

删除所有已经停止的容器
docker rm $(docker ps -a -q)



```

文件复制

```
从主机复制到容器
sudo docker cp host_path containerID:container_path
从容器复制到主机
sudo docker cp containerID:container_path host_path
```

