```
gitlab-runner register \
  --non-interactive \
  --tls-ca-file=/etc/gitlab/ssl/gitlab.example.com.crt  \
  --url "http://218.28.35.120:19081/mcdb/dams/dams-vue/" \
  --registration-token "EXY3_sPSpdVHXtMKYHej" \
  --executor "docker" \
  --docker-image node:latest \
  --description "runner " \
  --tag-list "run" \
  --run-untagged \
  --locked="false"
```

1. 输入gitlab的服务URL
2. 输入gitlab-ci的Toekn
3. 关于集成服务中对于这个runner的描述
4. 给这个gitlab-runner输入一个标记，这个tag非常重要，在后续的使用过程中需要使用这个tag来指定gitlab-runner
5. 是否运行在没有tag的build上面。在配置gitlab-ci的时候，会有很多job，每个job可以通过tags属性来选择runner。这里为true表示如果job没有配置tags，也执行
6. 是否锁定runner到当前项目
7. 选择执行器，gitlab-runner实现了很多执行器，可用在不同场景中运行构建，详情可见[GitLab Runner Executors](https://docs.gitlab.com/runner/executors/README.html)，这里选用Shell模式