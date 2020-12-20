## CICD

### 启动 runner：

```
 $ docker run -d --name gitlab-runner --restart always \
   -v /srv/gitlab-runner/config:/etc/gitlab-runner \
   -v /var/run/docker.sock:/var/run/docker.sock \
   gitlab/gitlab-runner:latest
```

### 注册 runner

```
gitlab-runner register

  --non-interactive \
  --tls-ca-file=/etc/gitlab/ssl/gitlab.example.com.crt  \
  --url "http://218.28.35.120:19081/" \
  --registration-token "EXY3_sPSpdVHXtMKYHej" \
  --executor "docker" \
  --docker-image node:latest \
  --description "runner " \
  --tag-list "run" \
  --run-untagged \
  --locked="false"


```

1. 输入 gitlab 的服务 URL
2. 输入 gitlab-ci 的 Toekn
3. 关于集成服务中对于这个 runner 的描述
4. 给这个 gitlab-runner 输入一个标记，这个 tag 非常重要，在后续的使用过程中需要使用这个 tag 来指定 gitlab-runner
5. 是否运行在没有 tag 的 build 上面。在配置 gitlab-ci 的时候，会有很多 job，每个 job 可以通过 tags 属性来选择 runner。这里为 true 表示如果 job 没有配置 tags，也执行
6. 是否锁定 runner 到当前项目
7. 选择执行器，gitlab-runner 实现了很多执行器，可用在不同场景中运行构建，详情可见[GitLab Runner Executors](https://docs.gitlab.com/runner/executors/README.html)，这里选用 Docker 模式

#CICD

### runner 的基本命令

```
查看状态
gitlab-runner status

查看runner服务
gitlab-ci-multi-runner list

重启runner，发现他会自动去执行触发runner的任务
执行gitlab-ci-multi-runner restart
```

### 编写.gitlab-ci.yml

```
# docker镜像
image: node
# 依赖的docker服务
services:
  - postgres
# 开始执行脚本前所需执行脚本
before_script:
  - bundle install
# 脚本执行完后的钩子，执行所需脚本
after_script:
  - rm secrets
# 该ci pipeline适合的场景
stages:
  - build
  - test
  - deploy
# 定义的任务1
job1:
  # 场景为构建
  stage: build
  # 所需执行的脚本
  script:
    - execute-script-for-job1
  # 在哪个分支上可用
  only:
    - master
  # 指定哪个ci runner跑该工作
  tags:
    - docker
```

### 解决 gitlab-runner 执行 docker 命令提示权限不足的问题

1. 将 gitlab-runner 用户添加到 docker 组

```javascript
sudo usermod -aG docker gitlab-runner
```

1. 验证是否生效：

```javascript
sudo -u gitlab-runner -H docker info
```

### 完整配置：

**Dockerfile**

```
FROM nginx
RUN mkdir /app
COPY /dist /app
COPY nginx.conf /etc/nginx/nginx.conf
```

打包完成后创建 nginx 镜像

步骤：

1. 在镜像的根目录创建 app 文件夹

2. 将打包后的文件复制过去 （/dist 指的是当前项目路径）

3. 将项目中的 nginx 配置文件作为镜像的配置文件

**nginx.conf**

```
user  nginx;
worker_processes  1;
error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;
events {
  worker_connections  1024;
}
http {
  include       /etc/nginx/mime.types;
  default_type  application/octet-stream;
  log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';
  access_log  /var/log/nginx/access.log  main;
  sendfile        on;
  keepalive_timeout  65;
  server {
    listen       80;
    server_name  localhost;
    location / {
      root   /app;
      index  index.html;
      try_files $uri $uri/ /index.html;
    }
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
      root   /usr/share/nginx/html;
    }
  }
}
```

**gitlab-ci.yml**

```yml
stages: # Stages 表示构建阶段，这里有两个阶段 install, deploy
  - build
  - deploy

project_build: # Jobs 表示构建工作，表示某个 Stage 里面执行的工作。
  stage: build
  only: # 定义了只有在被merge到了dev分支上 才会执行部署脚本。
    - njx-dev
  tags:
    - vue
  script:
    - echo "=====开始依赖安装======"
    - npm install --verbose --registry=https://registry.npm.taobao.org #安装依赖
    - echo "=====开始打包======"
    - npm run build
  artifacts: # 将这个job生成的依赖传递给下一个job。需要设置dependencies
    expire_in: 30 mins # artifacets 的过期时间，因为这些数据都是直接保存在 Gitlab 机器上的，过于久远的资源就可以删除掉了
    paths: # 需要被传递给下一个job的目录。
      - dist/

project_deploy:
  stage: deploy
  only:
    - njx-dev
  tags:
    - vue
  script:
    - echo "=====开始部署======"
    - ls
    - docker build . -t finance-vue:lastest
    - docker stop finance-vue-container
    - docker rm finance-vue-container
    - docker run -d -p 8084:80 --name finance-vue-container finance-vue:lastest
    # - sudo cp -r dist/* /usr/local
    # - sudo cd /usr/local
    - ls
    - echo "=====结束部署======"
```

### 修改 runner 详细配置

```
vi /etc/gitlab-runner/
concurrent = 4
check_interval = 0

[session_server]
    session_timeout = 1800

[[runners]]
    name = "myrunner with docker executor"
    url = "http://${gitlabIP}"  #gitlab地址
    #特别注意，这个token不是小本本上的token！！！
    token ="......"
    executor = "docker"
    [runners.docker]
        host = ""
        hostname = ""
        privileged = false
        tls_verify = false
        disable_entrypoint_overwrite = false
        oom_kill_disable = false
        disable_cache = true
        pull_policy = "if-not-present"
        #这是runner的默认镜像；具体镜像maven:3-jdk-8在.gitlab-ci.yml中配置
        image = "busybox:latest"
        helper_image = "gitlab-runner-helper:x86_64-f100a208"
        #映射maven配置
        volumes = ["/home/v_in_docker/:/usr/share/maven/conf2/:rw"]
        [runners.docker.sysctls]
            "net.ipv4.ip_forward" = "1"
    [runners.cache]
        [runners.cache.s3]
        [runners.cache.gc3]
12345678910111213141516171819202122232425262728293031
```

##### [runners.docker.sysctls] 作用等效于

```bash
sudo vi /etc/sysctl.conf
#加一行：
net.ipv4.ip_forward=1

sudo sysctl -p
```

### runner 执行器为 docker 时发生的问题：

#### 1、找不到 docker 命令

> \$ docker info
> /bin/bash: line 81: docker: command not found
> ERROR: Job failed: exit code 1

解决：在编写 gitlab-runner 的 docker-compose.yml 时候，加上挂载宿主机 docker 命令。实现`docker in docker`

```
  privileged: true
    volumes:
      # 映射docker命令
      - /var/run/docker.sock:/var/run/docker.sock
      - /bin/docker:/bin/docker

```

#### 2、没有 docker 权限

> Got permission denied while trying to connect to the Docker

解决：

```
#则需要把将当前用户加入docker组
sudo gpasswd -a ${USER} docker

#或者将当前用户直接加到文件中
sudo echo "docker:x:994:${USER}" >> /etc/group

#查看docker用户组成员
cat /etc/group |grep docker

#重新启动docker服务
sudo systemctl restart docker

# 赋予权限
sudo chmod a+rw /var/run/docker.sock

```

```
before_script:
  - docker info
  - docker login -u "gitlab-ci-token" -p "$CI_BUILD_TOKEN" "$CI_REGISTRY"
```
