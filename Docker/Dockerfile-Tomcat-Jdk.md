# 使用Dockerfile制作tomcat-jdk镜像

### 1.下载文件

tomcat ：https://tomcat.apache.org/download-90.cgi

jdk ：http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html



### 2.Dockerfile

```dockerfile
# 指定操作的镜像
FROM centos:7

# 将 jdk 和 tomcat 添加到镜像centos的/usr/local/目录下
ADD jdk-8u141-linux-x64.tar.gz /usr/local/
ADD apache-tomcat-9.0.36.tar.gz /usr/local/

# 覆盖相关文件
#COPY server.xml /usr/local/apache-tomcat-8.5.50/conf/

# 添加环境变量
ENV JAVA_HOME /usr/local/jdk1.8.0_141
ENV CLASSPATH $JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
ENV CATALINA_HOME /usr/local/apache-tomcat-9.0.36
ENV PATH $PATH:$JAVA_HOME/bin:$CATALINA_HOME/lib:$CATALINA_HOME/bin
ENV TZ="Asia/Shanghai"
ENV JAVA_OPTS="\
    -server \
    -Xms3g \
    -Xmx3g \
    -Xmn512m \
    -Xss512K \
    -Dfile.encoding=UTF-8 \
    -verbose:gc \
    -XX:+UseConcMarkSweepGC \
    -XX:MaxTenuringThreshold=10 \
    -XX:+ExplicitGCInvokesConcurrent \
    -XX:GCTimeRatio=19 \
    -XX:+UseParNewGC \
    -XX:+UseCMSCompactAtFullCollection \
    -XX:CMSFullGCsBeforeCompaction=10 \
    -XX:+CMSClassUnloadingEnabled \
    -XX:+CMSParallelRemarkEnabled \
    -XX:CMSInitiatingOccupancyFraction=50 \
    -Xnoclassgc \
    -XX:SoftRefLRUPolicyMSPerMB=0"

# 暴露8080端口
EXPOSE 8080

# 容器启动时运行tomcat
CMD /usr/local/apache-tomcat-9.0.36/bin/catalina.sh run
```

### 3.build

```dockerfile
docker build -t youngniu/tomcat-9.0.36:v1 .
```

### 4.run

```
docker run -idt --name tomcat-isc -p 8100:8080 -v /home/tomcat-isc/webapps:/usr/local/tomcat/webapps -v /home/tomcat-isc/logs:/usr/local/tomcat/logs -v /home/tomcat-isc/conf:/usr/local/tomcat/conf tomcat-9.0.36:v1
```





说明：

\* -d 后台运行

\* --name mytomcat 容器名称
\* -v /server/webapps:/usr/local/tomcat/webapps/ 挂载当前项目的运行目录到tomcat下的webapps
\* -e TZ="Asia/Shanghai" 设置时区
\* --privileged=true 设置拥有容器中的真正的root权限
\* -p 8080:8080 映射端口（宿主机port : 容器port）
\* tomcat-8.5.50:v1 镜像的名称





```

docker run -idt --name tomcat-isc -p 8100:8080 -v /home/tomcat-isc/webapps:/usr/local/tomcat/webapps -v /home/tomcat-isc/logs:/usr/local/tomcat/logs -v /home/tomcat-isc/conf:/usr/local/tomcat/conf tomcat:v1

```

