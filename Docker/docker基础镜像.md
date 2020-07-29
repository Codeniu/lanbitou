yun install -y

```dockerfile
############################################
# version : Docker version1.10.3, build 3999ccb-unsupported
# desc : 当前版本安装的ssh，wget，curl
############################################

FROM docker.io/centos

# 一次性安装vim，wget，curl，ssh server等必备软件
RUN yum install-y vim wget curl openssh-server sudo
RUN mkdir-p /var/run/sshd

# 安装supervisor工具
RUN yum install-y Python-setuptools
RUN easy_install supervisor
RUN mkdir-p /var/log/supervisor

# 将sshd的UsePAM参数设置成no
RUN sed-i 's/UsePAM yes/UsePAM no/g' /etc/ssh/sshd_config
RUN ssh-keygen -t rsa -f /etc/ssh/ssh_host_rsa_key
RUN ssh-keygen -t dsa -f /etc/ssh/ssh_host_dsa_key

# 添加root账户的密码为123456
RUN echo "root:123456" | chpasswd


# 添加测试用户admin，密码admin，并且将此用户添加到sudoers里
RUN useradd admin
RUN echo"admin:admin" | chpasswd
RUN echo"admin  ALL=(ALL)      ALL" >> /etc/sudoers

# 添加 supervisord 的配置文件，并复制配置文件到对应目录下面。（supervisord.conf文件和Dockerfile文件在同一路径）
COPY supervisord.conf/etc/supervisor/supervisord.conf

# 容器需要开放SSH 22端口
EXPOSE22

# 执行supervisord来同时执行多个命令，使用 supervisord 的可执行路径启动服务。
CMD ["/usr/bin/supervisord"] 
```

supervisord.conf文件

```
# 配置文件包含目录和进程
# 第一段 supervsord 配置软件本身，使用 nodaemon 参数来运行。
# 第二段包含要控制的 2 个服务。每一段包含一个服务的目录和启动这个服务的命令。

[supervisord]
nodaemon=true

[program:sshd]
command=/usr/sbin/sshd -D
```

