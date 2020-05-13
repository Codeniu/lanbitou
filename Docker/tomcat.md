

### 1.运行tomcat容器

```
docker run -idt -p 8081:8080 tomcat
```

`-p 8081:8080`	将本地8081端口映射到容器的8080端口

### 2.进入tomcat容器

```
docker exec -it <container id>	bash
```

**初始化的tomcat `/usr/local/tomcat/webapps` 文件夹是空的，需要将`/usr/local/tomcat/webapps.dist`文件中的内容复制到替换过去。**

命令：

```
cd /usr/local/tomcat

rm webapps<本地文件夹>

mv webapps.dist<源文件> webapps<要更改的名字>
```

这时才可以访问tomcat的欢迎页面

### 3.保存修改后的容器

语法：

```
docker commit -m="<comment>" -a="<author>" <container id> <author>/<new container name>:<tag>
```

例子

```
docker commit -m="has update" -a="runoob" e218edb10161 runoob/ubuntu:v2
```

### 4.把项目部署到tomcat

