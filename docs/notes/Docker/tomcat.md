## 使用tomcat容器部署项目

### 1.运行tomcat容器

```
docker run -idt -p 8081:8080 tomcat
```

`-p 8081:8080`	将本地8081端口映射到容器的8080端口

`-d`	diff的意思，官方解释：Inspect changes to files or directories on a container's filesystem。保存文件变更

### 2.进入tomcat容器

```
docker exec -it <container id>	bash
```

**初始化的tomcat `/usr/local/tomcat/webapps` 文件夹是空的，需要将`/usr/local/tomcat/webapps.dist`文件中的内容复制到替换过去。**

命令：

```
cd /usr/local/tomcat

rm webapps
rm <本地文件夹>

mv webapps.dist webapps
mv <文件> <更改名字>
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

查看tomcat容器uuid

```
docker inspect -f '{{.Id}}' <container name>
```

得到：容器长uuid

```js
fe3ce7d5fbc93c9cedafe362bd091a2ebed9babe610f52a3545ea85cd58a67a3
```

将本地文件复制到容器中

```js
docker cp <local path> <container long id:contanier path>
```

例子

```
docker cp /usr/local/niu/apache-tomcat-9.0.24/webapps/dams fe3ce7d5fbc93c9cedafe362bd091a2ebed9babe610f52a3545ea85cd58a67a3:/usr/local/tomcat/webapps
```

### 5我的部署

[niu](http://39.97.184.218:8081/niu/)

### 6 挂载目录



/home/tomcat-isc/webapps

/usr/local/tomcat/webapps



/home/tomcat-isc/logs

/usr/local/tomcat/logs

```
docker run -idt --name tomcat-isc -p 8100:8080 -v /home/tomcat-isc/webapps:/usr/local/tomcat/webapps -v /home/tomcat-isc/logs:/usr/local/tomcat/logs youngniu/tomcat:niu
```

