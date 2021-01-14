# `vuepress`收藏夹

<p align="center">
    <a href="https://codeniu.github.io/lanbitou/"><img src="https://gitee.com/youngniu/pic-bed/raw/master/img/lanbitou.png" width="320px" height="320px"></img></a>
</p>

在开发学习过程中总会遇到各种各样的问题，当时解决之后，如果没能做好笔记，过一段时间之后很容易遗忘。养成了做笔记的习惯之后，就期望有一个很好的平台来保存笔记。我尝试过博客园，有道云笔记，象印笔记，语雀笔记等。有的平台确实比较好用，但是每次写笔记要么在浏览器中找网址，要么在电脑里找软件，等待打开，无形中增加了自己做这件事的时间成本。有的时候可能只是需要记录一句话。最终我选择了 Typora。简介。方便。下一步就是解决多平台同步的问题，github page 是一个很好的选择。搭配 vuepress 做成可以在线阅读的笔记本。

参考文章：

1.[github pages 与 travis ci 运作原理 - 陌上兮月 - 博客园](https://www.cnblogs.com/zhangnan35/p/10830010.html)

2.[PanJiaChen/awesome-bookmarks: A curated list of awesome things](https://github.com/PanJiaChen/awesome-bookmarks)

文档模板：

1.A magical documentation site generator. [docsify](https://docsify.js.org/#/)

2.Document Everythin.[gitbook](https://www.gitbook.com/)

3.Vue 驱动的静态网站生成器. [vuepress](https://vuepress.vuejs.org/zh/)

为什么选择 vuepress：

1.使用 vue 的时候比较多

2.vuepress 的界面比较符合我的审美



**1.创建仓库并设置仓库开启 github page**

setting->GitHub Pages 下做如下配置：

Source 栏目下：

Branch：gh-pages /root

gh-pages 分支是我们构建好的静态 vue 页面。这个分支在我们第一次提交代码后才会被创建，当然你也可以提前创建。



**2.克隆这个库在你本地**

使用 vuepress 进行初始化。

官方文档做了很详尽的说明https://vuepress.vuejs.org/zh/guide/getting-started.html



**3.完成构建后，可以在本地运行一下看下效果**



**4.部署**

**1.手动部署**

```
# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

#创建.nojekyll 防止Github Pages build错误
touch .nojekyll

git init
git add -A
git commit -m 'deploy'

# 推送到gh-pages分支
git push -f "https://${access_token}@github.com/Codeniu/lanbitou.git" master:gh-pages

```

**2.使用 Travis CI 实现自动化部署**

在每次提交时，让 Travis 替我们完成 buid 以及推动到 gh-pages 分支的工作。

打开官网[Travis CI](https://travis-ci.org/)，使用 GitHub 账号登录即可看到你的库了。激活你刚创建的库。并在该库的 setting 中将你刚生成的令牌添加到变量中去。

\${access_token}，access_token 就是我们取的变量的名字，变量的值是我们在 GitHub 中生成的一个个人令牌。

在你的项目中添加以下两个文件：

deploy.sh

```shell
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

#创建.nojekyll 防止Github Pages build错误
touch .nojekyll

git init
git add -A
git commit -m 'deploy'

git push -f "https://${access_token}@github.com/Codeniu/lanbitou.git" master:gh-pages

cd -

```

.travis.yml

```yml
sudo: required
language: node_js
node_js: stable
script: bash ./deploy.sh
branches:
  only:
    - master
notifications:
  email: false
```

关于 Travis CI 的工作原理，可以详细看一下[github pages 与 travis ci 运作原理 - 陌上兮月 - 博客园](https://www.cnblogs.com/zhangnan35/p/10830010.html)
