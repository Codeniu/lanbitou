服务地址：

```
https://53h1x2vq.mirror.aliyuncs.com
```



```shell
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://53h1x2vq.mirror.aliyuncs.com"]
}
EOF
# 重载所有修改过的配置文件
sudo systemctl daemon-reload
sudo systemctl restart docker

```

