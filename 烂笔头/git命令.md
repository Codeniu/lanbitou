## 1 暂存`stash`

**官方文档对该问题的描述：**

*储藏（Stashing）*

*经常有这样的事情发生，当你正在进行项目中某一部分的工作，里面的东西处于一个比较杂乱的状态，而你想转到其他分支上进行一些工作。问题是，你不想提交进行了一半的工作，否则以后你无法回到这个工作点。解决这个问题的办法就是`git stash`命令。*

*“‘储藏”“可以获取你工作目录的中间状态——也就是你修改过的被追踪的文件和暂存的变更——并将它保存到一个未完结变更的堆栈中，随时可以重新应用。*

 [stashing-储藏](https://git-scm.com/book/zh/v1/Git-工具-储藏（Stashing）) 



1. 查看当前工作区的状态`git status`

2. 将当前修改后的文件或者暂存`git add`的更改记录**储藏**起来

   `git stash`

3. 查看储藏的内容

   `git stash list`

4. 查看储藏的详细变更

   `git stash show `

5. 应用储藏

   `git stash apply`

6. 丢弃储藏

   `git stash drop stash@{0}`

7. 清空储藏栈

   `git stash clear`

   

   **常用git stash命令：**

   （1）`git stash save "save message"` : 执行存储时，添加备注，方便查找，只有git stash 也要可以的，但查找时不方便识别。

   （2）`git stash list` ：查看stash了哪些存储

   （3）`git stash show` ：显示做了哪些改动，默认show第一个存储,如果要显示其他存贮，后面加stash@{$num}，比如第二个 git stash show stash@{1}

   （4）`git stash show -p` : 显示第一个存储的改动，如果想显示其他存存储，命令：git stash show stash@{$num} -p ，比如第二个：git stash show stash@{1} -p

   （5）**git stash apply** :应用某个存储,但不会把存储从存储列表中删除，默认使用第一个存储,即stash@{0}，如果要使用其他个，git stash apply stash@{$num} ， 比如第二个：git stash apply stash@{1} 

   （6）**git stash pop** ：命令恢复之前缓存的工作目录，将缓存堆栈中的对应stash删除，并将对应修改应用到当前的工作目录下,默认为第一个stash,即stash@{0}，如果要应用并删除其他stash，命令：git stash pop stash@{$num} ，比如应用并删除第二个：git stash pop stash@{1}

   （7）**git stash drop** stash@{$num} ：丢弃stash@{$num}存储，从列表中删除这个存储

   （8）`git stash clear `删除所有缓存的stash



## 2 撤回`commit`

[git commit之后，想撤销commit](https://www.cnblogs.com/lfxiao/p/9378763.html)

执行完commit后，想撤回commit：

`git reset --soft HEAD^`



HEAD^的意思是上一个版本，也可以写成HEAD~1

如果你进行了2次commit，想都撤回，可以使用HEAD~2



 **至于这几个参数：**

`git reset --mixed HEAD^`

意思是：不删除工作空间改动代码，撤销commit，并且撤销git add . 操作

这个为默认参数,git reset --mixed HEAD^ 和 git reset HEAD^ 效果是一样的。

 `git reset --soft HEAD^`

不删除工作空间改动代码，撤销commit，不撤销git add . 

 `git reset --hard HEAD^`

删除工作空间改动代码，撤销commit，撤销git add . 

注意完成这个操作后，就恢复到了上一次的commit状态。

**顺便说一下，如果commit注释写错了，只是想改一下注释，只需要：**

`git commit --amend`

此时会进入默认vim编辑器，修改注释完毕后保存就好了。

# 3.Git Log命令

## 单行

```
git log --oneline
```

## 按日期

```shell
git log --after="2020-15-05"

git log --after="2020-15-05" --before="2020-25-05"

git log --after="yesterday" // shows only commits from yeserday

git log --after="today" // shows only today commits

git log --before="10 day ago" // omits last 10 days commits

git log --after="1 week ago" //show only commits from last week

git log --after="2 week ago"

git log --after="2 month ago" // shows only last 2 months commits
```



## git日志与差异更改

```shell
git log -p
```

此命令将显示具有差异更改的日志。这样您就可以知道每次提交中所做的更改。

在上图中，您可以看到git diff的变化。

## 按作者过滤提交

```shell
git log --author="Srebalaji"
```

上面的命令将过滤出特定
作者所做的提交。请注意，Git按正则表达式模式过滤掉。因此，不必担心
确切的名称匹配或区分大小写。

Git日志可以采用多个选项，因此您可以根据需要组合选项。例如，

```shell
git log --after="1 week ago" --author="srebalji" -p
```

## 通过日志消息过滤提交

有时，您需要通过日志消息过滤提交。Git接受一个
正则表达式模式来搜索日志消息并显示所有
匹配的提交。

```
git log --grep="ISSUE-43560"
```

## 按文件过滤提交

有时，您需要进行所有已影响某些特定文件的提交更改。这将在许多地方出现。

```
git log main.rb
```

## 仅显示合并提交

此命令有助于我们了解对当前分支所做的合并。

```
git log --merges
```

上面的命令将仅显示当前分支中的合并提交。而已。

## 显示分支之间的差异

我们已经在以前的问题之一中看到了此命令。

```
git log master..develop
```

该命令将帮助您显示所有来自development的提交，但这些提交不在master分支中。这样，您可以知道有多少新提交添加到了master分支中不存在的develop分支中。并在比较之前确保您具有本地的更新更改。