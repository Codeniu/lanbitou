### 查看Windows端口占用

查看端口的命令运行

`netstat -aon|findstr "80"` 

`TCP 127.0.0.1:80 0.0.0.0:0 LISTENING 2448`

端口被进程号为2448的进程占用，继续执行下面命令：

`tasklist|findstr "2448"`

thread占用了你的端口,Kill it如果第二步查不到，那就开任务管理器，

进程—查看—选择列—pid（进程位标识符）打个勾就可以了看哪个进程是2448，

然后杀之即可。另外,强制终止进程： CMD命令:

`taskkill /F /pid 1408`

其实上面我都还没解决问题 最后发现有个http.d 这个是apache的进程 结束了这个进程nginx才启动了

