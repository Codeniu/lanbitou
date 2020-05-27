[TOC]



### 1.拉取镜像

```
docker pull nginx
```



### 2.运行

```
docker run -it --name "nginx" -p 8080:80 -d nginx
```



### 3.验证

http://39.97.184.218:8080/



### 4.nginx的默认路径

```
(1) Nginx配置路径：/etc/nginx/
(2) PID目录：/var/run/nginx.pid
(3) 错误日志：/var/log/nginx/error.log
(4) 访问日志：/var/log/nginx/access.log
(5) 默认站点目录：/usr/share/nginx/html
```



### 5.把自己定义的 nginx.conf挂载在 docker 中的nginx

- 1.创建挂载目录

```
mkdir -p /usr/dokcer_nginx_data/{conf,conf.d,html,log}
```



- 2启动挂载后的容器

 ```
docker run --name nginx -d -p 8089:80 \
-v /usr/mynginx/conf/nginx.conf:/etc/nginx/nginx.conf:ro \
-v /usr/mynginx/log:/var/log/nginx \
-v /usr/mynginx/html:/usr/share/nginx/html \
-v /usr/mynginx/conf.d:/etc/nginx/conf.d \
nginx
 ```

*第一个-v：挂载nginx的主配置文件，以方便在宿主机上直接修改容器的配置文件*

*第二个-v：挂载容器内nginx的日志，容器运行起来之后，可以直接在宿主机的这个目录中查看nginx日志*

*第三个-v：挂载静态页面目录*



> 这里直接启动有个问题，报错如下,意思是：不能将一个文件夹挂载到一个文件上。（nginx.conf的锅）

```
......: Are you trying to mount a directory onto a file (or vice-versa)? Check if the specified host path exists and is the expected type.
```

> 试一下不挂载nginx.conf文件，能够挂载成功

```
docker run --name nginx-6601 -d -p 8900:6601\
  -v /usr/mynginx/log:/var/log/nginx\
  -v /usr/mynginx/html:/usr/share/nginx/html\
  -v /usr/mynginx/conf.d:/etc/nginx/conf.d\
  nginx
```



这一块有个很大的坑，docker是不推荐直接挂载文件的，使用-v命令，会首先会查询宿主主机上查看有没有你设置的目录，如果没有的话会自动创建一个，所以我们没必要在宿主主机上去创建挂载目录了。直接执行第二步，然后会报错，在宿主主机上找到mynginx文件夹删掉里边的`nginx.conf文件夹`，把你的`nginx.conf文件`放进去，删掉当前运行的容器，重新按第二步的命令进行启动。容器启动成功，挂载成功。



这个时候我们就可以直接对宿主主机进行操作了，更改完配置文件后，记得restart一下容器。



### 6.配置nginx实现负载

**nginx.conf**

```

events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;
    keepalive_timeout  65;
    client_max_body_size 200m;

#start
    server{
        listen 6501;
        server_name 39.97.184.218;

        location  / {
			root  /usr/share/nginx/html/fn1/dams;
            index  index.html;
		}
    }

    server{
        listen 6502;
        server_name 39.97.184.218;

        location  / {
			root  /usr/share/nginx/html/fn2/dams;
            index  index.html;
		}
    }

    upstream fn {
        server localhost:6501;
        server localhost:6502;
	}

    server {
        listen        80;
        server_name  localhost; 
        location / {  
            proxy_pass   http://fn;
            index  index.html index.htm;  
        }  
    }
#end
}
```

宿主主机的8089端口映射到了nginx的80

http://39.97.184.218:8089/

效果如下图：

1

[![tkMQ1A.png](https://s1.ax1x.com/2020/05/27/tkMQ1A.png)](https://imgchr.com/i/tkMQ1A)



2

![tkMufH.png](https://s1.ax1x.com/2020/05/27/tkMufH.png)