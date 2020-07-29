**linux查看服务： 
一、利用进程来查看** 
命令里 ps -aux ｜ grep xxx 是查看某个进程或者服务是否存在。 
**二、利用services命令** 
1.查看单个服务的运行状态： 
service 服务名 status 
如：[root@localhost ~]# service sshd status 
openssh-daemon (pid 3701) 正在运行… 
2.查看所有服务的运行状态： 
service –status -all  



**nginx启动指定配置文件**

 在启动nginx的时候，/export/servers/nginx/sbin/nginx 
如果不跟配置文件的路径，默认读取的是：/usr/local/nginx/conf/nginx.conf文件如果需要指定自己的配置文件需要在启动的时候加上参数 -c nginx.conf 



 reboot 							   重启
  uname 							 查看操作系统
  lsb_release -a         		  查看版本信息
  mkdir 文件名                               --创建文件夹
  ls                                                --显示目录下文件信息
  ps -ef | grep 程序                        --查某个程序的进程
  kill -s 9 进程id                             --杀进程
  vi 文件名                                     --编辑文件
  tail -f 文件                                  -- 实时的得到新追加到文件中的信息，常用来跟踪日志文件
  netstat -ntlp                              --查看当前所有tcp端口
  netstat -nuplf |grep 3306            --这个表示查找处于监听状态的，端口号为3306的进程 



 linux:直接启动war项目 
    nohup java -jar coral-base-0.0.1-SNAPSHOT.war > ./nohup.out 2>&1 & 