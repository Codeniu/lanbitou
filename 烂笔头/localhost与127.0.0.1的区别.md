# localhost与127.0.0.1的区别 

localhost与127.0.0.1的区别是什么？相信有人会说是本地ip，曾有人说，用127.0.0.1比localhost好，可以减少一次解析。

看来这个入门问题还有人不清楚，其实这两者是有区别的。 

## 1:

localhost也叫local ，正确的解释是:本地服务器 127.0.0.1，

在windows等系统的正确解释是:本机地址(本机服务器) ，他们的解析通过本机的host文件，windows自动将localhost解析为127.0.0.1 

## 2:

localhot(local)是不经网卡传输！这点很重要，它不受网络防火墙和网卡相关的的限制。

127.0.0.1是通过网卡传输，依赖网卡，并受到网络防火墙和网卡相关的限制。

本机IP 也是通过网卡传输的，依赖网卡，并受到网络防火墙和网卡相关的限制。 

但是本机IP与127.0.0.1的区别是： 127.0.0.1 只能通过本机访问，而本机IP通过本机访问也能通过外部访问  

 

 

一般设置程序时本地服务用localhost是最好的，localhost不会解析成ip，也不会占用网卡、网络资源。

有时候用localhost可以，但用127.0.0.1就不可以。猜想localhost访问时，系统带的本机当前用户的权限去访问，

而用127.0.0.1的时候，等于本机是通过网络再去访问本机，用的到网络用户的权限。 





# 实例：

 \1. mysql -h 127.0.0.1 的时候，使用TCP/IP连接， mysql server 认为该连接来自于127.0.0.1或者是”localhost.localdomain” 

 \2. mysql -h localhost 的时候，是不使用TCP/IP连接的，而使用Unix socket； 此时，mysql server则认为该client是来自”localhost” 

 \3. mysql权限管理中的”localhost”有特定含义：

—— MySQL手册 5.6.4 ….. A Host value may be a hostname or an IP number, or ‘localhost’ to indicate the local host.  

注意：虽然两者连接方式有区别，但当localhost 为默认的127.0.0.1时，两种连接方式使用的权限记录都是以下的1.row的记录（因为记录在前，先被匹配）

*************************** 1. row ***************************                 

Host: localhost                 

User: root      

***************************2. row ***************************                 

Host: 127.0.0.1                 

User: root  

 

# 证明：

# **shell> mysql -h 127.0.0.1**

mysql> status;

Current user:           [root@127.0.0.1](mailto:root@127.0.0.1)

SSL:                    Not in use

Current pager:          stdout

Using outfile:          ”

Using delimiter:        ;

Server version:         5.1.33-log Source distribution

Protocol version:       10

Connection:          127.0.0.1 via TCP/IP

# **shell> mysql -h locahost**

mysql> status;

Current user:           [root@localhost](mailto:root@localhost)

SSL:                   Not in use

Current pager:          stdout

Using outfile:          ”

Using delimiter:        ;

Server version:         5.1.33-log Source distribution

Protocol version:       10

Connection:          Localhost via UNIX socket  

# **shell> mysql -h XXXX(ip）**

mysql> status;

Current user:           [root@ip](mailto:root@ip)

SSL:                    Not in use

Current pager:          stdout

Using outfile:          ”

Using delimiter:        ;

Server version:         5.1.33-log Source distribution

Protocol version:       10

Connection:          XXXX(ip) via TCP/IP