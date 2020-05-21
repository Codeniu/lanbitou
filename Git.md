### 相关命令详解

- **git clone**

```php
git clone <版本库的网址> 
git clone <版本库的网址> <本地目录名> // 指定本地目录名
git clone -o romoteBranchName <版本库的网址> //指定远程分支名称
```

clone 命令会创建指定本地目录名的文件夹把版本库的内容更新下来，默认创建本地分支 master 和远程分支 origin 并绑定；
 `-o` 可以指定远程分支名称；
 不指定本地目录名则创建与版本库目录名一样的目录。

- **git remote**

```csharp
git remote //命令列出所有远程主机
git remote -v //列出所有远程主机并展示远程主机的网址
git remote show <主机名> //查看远程分支的详细状况
git remote add <主机名> <网址> //添加远程主机名
git remote rm <主机名> // 删除远程主机
git remote rename <原主机名> <新主机名> // 修改远程主机名
```

- **git branch**

```cpp
git branch //查看本地分支 现在所在的分支会有 * 号标注
git branch -r //查看远程分支
git branch -a //查看所有分支（本地+远程）
```

- **git checkout**

```cpp
git checkout 分支名 //切换到指定分支
//指定本地分支切出新分支并切换。不指定分支时根据当前分支切新分支
git checkout -b newBrach 远程分支/本地已有分支 
```

- **git merge**

```cpp
git merge 本地分支名 //合并本地分支
//合并本地分支，用于取 fetch 后的内容
git merge 远程分支/本地分支 
```

- **git pull**

```jsx
//把指定远程主机名远程分支的内容拉取到指定的本地分支
git pull <远程主机名> <远程分支名>:<本地分支名>
//把指定分支内容拉取到当前本地分支，相当于先 fetch 再 merge
git pull <远程主机名> <远程分支名> 
```

- **git push**

```jsx
//把指定本地分支的 commit 推到指定的远程主机远程分支上
git push <远程主机名> <本地分支名>:<远程分支名>
//把本地分支推送与之存在"追踪关系"的远程分支（通常两者同名），如果该远程分支不存在，则会被新建。
git push <远程主机名> <远程分支名> 
//删除指定的远程分支，等同于推送一个空的本地分支到远程分支
git push <远程主机名>:<远程分支名>
//指定默认主机，下次直接 git push 即可
git push -u <远程主机名> <本地分支名>
```

