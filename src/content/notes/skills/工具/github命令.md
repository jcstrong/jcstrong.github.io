---
title: "github命令"
category: skills
folderPath: "工具"
folderTop: "工具"
tags: ["开发工具", "效率"]
featured: false
source: "工具/github命令.md"
updated: 2023-07-21
readingTime: 10
summary: "toc imghttps://s2.loli.net/2022/04/12/7z3l9UKjsd4VROA.jpg 30 天精通 Git 版本控管https://github.com/doggy8088/LearnGitin30days  ..."
---
[toc]

![img](https://s2.loli.net/2022/04/12/7z3l9UKjsd4VROA.jpg)

[30 天精通 Git 版本控管](https://github.com/doggy8088/Learn-Git-in-30-days)

## 配置git ssh公钥

```shell
 1025  git
 1026  git status 
 1028  git config --list
 1029  ssh-keygen -t rsa -C 976807720@qq.com
 1030  cat ~/.ssh/id_rsa.pub
 # 生成公钥后打开https://gitee.com/profile/sshkeys
 # 配置ssh公钥
 1032  ssh -T git@gitee.com
 1033  git config --global user.name jcstrong
 1034  git config --global user.email 976807720@qq.com
 # 仓库
 1035  git remote add origin https://gitee.com/jcstrong/leetcode.git
 1036  git push -u origin master
```

[refer](https://blog.csdn.net/weixin_46571373/article/details/107525877)

# Git

Git是分布式版本控制系统（Distributed Version Control System，简称 DVCS）

使用场景
开发某个网站。为实现某个新的需求，创建一个分支(dev)。在这个分支上开展工作。
正在此时， 你突然接到一个电话说有个很严重的问题需要紧急修补。 你将按照四下方式来处理:

- 切换到你的线上分支(master)
- 为这个紧急任务新建一个分支(fix) ，并在其中修复它。
- 在测试通过之后，切换回线上分支(master) ，然后合并这个修补分支(fix) ，最后将改动推送到线上分支(master)。
- 切换回你最初工作的分支上(dev)，继续工作。

三种操作

- Clone：克隆	将远程仓库复制到本地
- Push：推送	将本地仓库代码上传到远程仓库
- Pull：拉取	将远程仓库代码下载到本地仓库

工作目录中文件的两种状态
	untracked 未跟踪（未被纳入版本控制）
	tracked 已跟踪（被纳入版本控制）    
		Unmodified 未修改状态
		Modified 已修改状态
		Staged 已暂存状态
这些文件的状态会随着我们执行Git的命令发生变化

## 

![git-command](https://jcstrong.github.io/img/20210205164255.jpg)

> [pic](https://www.jianshu.com/p/b91f848655af)



## 本地仓库操作

### 把本地文件夹设置为git仓库

命令行打开本次仓库的文件夹目录或者直接创建
		cd !/（目录)

仓库初始化
		git init

### 将项目克隆到本地仓库	

​		git clone URL（仓库的地址）

### 更新远程仓库到本地：

​		先打开本地仓库的目录，要是程序文件夹的目录
​		然后输入更新代码命令：git pull 

### 将代码添加到暂存区（本地）

​		git add filename(未跟踪的)

### 从暂存区提交到本地仓库		

​		git commit -m “提交的描述”	
​		git commit									会直接打开一个文件来添加描述
​		git commit -a -m “提交的描述”	现添加修改再提交

### 从本地到远程仓库

​		git push origin master			或		git push

### 查看文件状态

​		git status
​		git status -s			输出简洁信息
​		git reset HEAD filename		修改文件状态为未跟踪状态（取消暂存）

### 删除本地文件

​		git rm			和在finder中删除有不同
在finder中删除的话不会把这次删除操作添加到暂存区，只会标记为删除，不能把这次删除commit到远程仓库。
在fider中删除的文件需要通过git add 重新加入缓存区，才能操作

### .gitignore文件

```
*.a
!lib.a				#不忽略lib.a 
/TODO					#忽略当前目录下的TODO文件
build/				#忽略build文件夹及其内部内容
doc/*.txt			#忽略doc目录下的txt文件
doc/**/*.pdf	#忽略doc目录及其子目录下的pdf文件
```

### 查看日志

​		git log			
​		git log -p		
​		git log --stat	



## 远程仓库操作

###   查看当前已经配置的远程仓库

​		git remote		如果已经克隆了远程仓库，会显示Git 克隆默认的仓库服务器名 origin
​		git remote -v	查看已经配置的远程仓库地址

###   添加远程仓库

​		git remote add [origin] [url]		添加一个新的远程 Git 仓库，同时指定一个可以引用的简写

注意：origin位置是仓库名，可以随意指定名称。远程和本地可以不同名；同一个地址可以指定多个名

###   从远程仓库克隆

​		git clone [url] 		默认配置下远程 Git 仓库中的每一个文件的每一个版本都将被拉取下来

```bash
git clone git@github.com:someone/symfony-docs-chs.git	
```



###   移除无效的远程仓库

​		git remote rm [reponame]		从本地移除远程仓库的记录,不会真正影响到远程仓库

###   从远程仓库中抓取与拉取 

​		git fetch 	 	从远程仓库获取最新版本到本地仓库。但是不会自动merge，需要手动合并

​		git merge origin/master		合并分支

​		git pull			是从远程仓库获取最新版本并merge到本地仓库	= fecth&merge

​		git pull origin master  --allow-unrelated-histories		会进入一个文件进行注释

注意：如果当前本地仓库不是从远程仓库克隆，而是本地创建的仓库，并且仓库中存在文件，此时再从远程仓库拉取文件的时候会报错（fatal: refusing to merge unrelated histories ），解决此问题可以在git pull命令后加入参数--allow-unrelated-histories

###   推送到远程仓库 

​		git git push [remote-name]\[branch-name]			将代码推送到远程仓库。 



## Git分支

几乎所有的版本控制系统都以某种形式支持分支。 使用分支意味着你可以把你的工作从开发主线上分离开来，以免影响开发主线。Git 的master分支并不是一个特殊分支。 它跟其它分支没有区别。 之所以几乎每一个仓库都有 master 分支，是因为git init 命令默认创建它，并且大多数人都懒得去改动它。

### 查看分支 

​		git branch [remote-name]\[branch-name]		列出所有本地分支，参数可选。默认为当前

​		git branch -r		列出所有远程分支

​		git branch -a		列出所有本地分支和远程分支

### 创建分支

​		git branch [分支名]

### 切换分支 

​		git checkout [分支名] 

### 合并分支 

​		git merge  [分支名]

如果你在两个不同的分支中，对同一个文件的同一个部分进行了不同的修改，Git 就没办法合并它们，同时会提示文件冲突。此时需要我们打开冲突的文件并修复冲突内容，手动解决冲突后执行git add命令

### 推送至远程仓库分支 

​		git push origin  [分支名]

### 删除本地分支

​		git branch -d  [分支名]

如果要删除的分支中进行了一些开发动作，此时执行上面的删除命令并不会删除分支，如果坚持要删除此分支，可以将命令中的-d参数改为-D

### 删除远程分支

​		git push origin –d branchName		删除远程仓库中的分支，可以使用命令	



## Git标签

版本控制，给某个提交添加标签，以示重要。常用来标记发布结点（v1.2...)

### 列出已有的标签

​		git tag 
​		git show [tagname]

### 创建新标签

​		git tag [tagname]		

### 将标签推送至远程仓库

​		git push origin [tagname]

### 检出标签

​		git checkout -b [branch]\[tagname]		新建一个分支指向一个tag

### 删除标签

​		git tag -d [tagname]		删除本地标签
​		git push origin :refs/tags/[tagname]		删除远程标签













# 忽略系统文件

**.DS_Store 是什么**

使用 Mac 的用户可能会注意到，系统经常会自动在每个目录生成一个隐藏的 `.DS_Store 文件`。`.DS_Store` (英文全称 Desktop Services Store)是一种由苹果公司的Mac OS X操作系统所创造的隐藏文件，目的在于存贮目录的自定义属性，例如文件们的图标位置或者是背景色的选择。相当于 Windows 下的 `desktop.ini`。

**删除 .DS_Store**

如果你的项目中还没有自动生成的 `.DS_Store` 文件，那么直接将 `.DS_Store` 加入到 `.gitignore` 文件就可以了。如果你的项目中已经存在 `.DS_Store` 文件，那就需要先从项目中将其删除，再将它加入到 `.gitignore`。如下：

```
#删除项目中的所有.DS_Store。这会跳过不在项目中的 .DS_Store
find . -name .DS_Store -print0 | xargs -0 git rm -f --ignore-unmatch
# 将 .DS_Store 加入到 .gitignore
echo .DS_Store >> ~/.gitignore
# 更新项目
git add --all
git commit -m '.DS_Store banished!'
# push到远程仓库
git push origin master
```

如果你只需要删除磁盘上的 `.DS_Store`，可以使用下面的命令来删除当前目录及其子目录下的所有` .DS_Store` 文件:

```
find . -name '*.DS_Store' -type f -delete
```



> refer:  [nodejh](https://github.com/nodejh/nodejh.github.io/issues/18)

# github无法联网

确认无法连接的结点，以下以raw.githubusercontent.com为例

https://site.ip138.com/raw.Githubusercontent.com/

输入raw.githubusercontent.com

查询IP地址

修改hosts Ubuntu，CentOS及macOS直接在终端输入

```
sudo vi /etc/hosts 
```



添加以下内容保存即可 （IP地址查询后相应修改，可以ping不同IP的延时 选择最佳IP地址）

\# GitHub Start
52.74.223.119 github.com
192.30.253.119 gist.github.com
54.169.195.247 api.github.com
185.199.111.153 assets-cdn.github.com
151.101.76.133 raw.githubusercontent.com
151.101.108.133 user-images.githubusercontent.com
151.101.76.133 gist.githubusercontent.com
151.101.76.133 cloud.githubusercontent.com
151.101.76.133 camo.githubusercontent.com
151.101.76.133 avatars0.githubusercontent.com
151.101.76.133 avatars1.githubusercontent.com
151.101.76.133 avatars2.githubusercontent.com
151.101.76.133 avatars3.githubusercontent.com
151.101.76.133 avatars4.githubusercontent.com
151.101.76.133 avatars5.githubusercontent.com
151.101.76.133 avatars6.githubusercontent.com
151.101.76.133 avatars7.githubusercontent.com
151.101.76.133 avatars8.githubusercontent.com
\# GitHub End

| 课程模块                          | 模块目标                                                     | 知识小节                                                     | 知识名称 | 具体包含的知识点 | 知识目标 | 是否作为考核目标 | 重点 | 难点 | 归属导师讲解的知识点 |
| --------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | -------- | ---------------- | -------- | ---------------- | ---- | ---- | -------------------- |
| Git                               | 通过学习Git课程，能够掌握代码管理的操作                      | Git概述                                                      | Git历史  | Git历史简介      |          | 否               |      |      |                      |
| Git与SVN对比                      | SVN特点 Git特点                                              |                                                              | 否       |                  |          |                  |      |      |                      |
| Git工作流程                       | Git工作流程                                                  |                                                              | 是       | √                |          |                  |      |      |                      |
| Git安装                           | Git下载 Git安装过程 Git Bash介绍 Git GUI介绍                 |                                                              | 否       |                  |          |                  |      |      |                      |
| Git代码托管服务                   | 常用的Git代码托管服务                                        | GitHub 码云 Gitlab                                           |          | 是               |          |                  |      |      |                      |
| 在码云注册账号                    | 在码云注册账号过程                                           |                                                              | 否       |                  |          |                  |      |      |                      |
| 登录码云并创建Git仓库             | 登录码云并创建仓库                                           |                                                              | 否       |                  |          |                  |      |      |                      |
| Git常用命令                       | 环境配置                                                     | 设置用户信息    git config --global user.name ""itcast""   git config --global user.email ""itcast"" 查看配置信息   git config --list   git config user.name |          | 是               | √        |                  |      |      |                      |
| 获取Git仓库                       | 在现有目录中初始化仓库   git init 克隆现有的仓库   git clone 仓库地址 |                                                              | 是       | √                |          |                  |      |      |                      |
| 工作目录、暂存区域以及Git仓库概念 | 工作目录 暂存区域 Git仓库                                    |                                                              | 是       | √                | √        |                  |      |      |                      |
| git工作目录下的文件的两种状态     | tracked已跟踪（被纳入版本控制）   Unmodified未修改状态   Modified已修改状态   Staged已暂存状态 Untracked未跟踪（未被纳入版本控制） |                                                              | 是       | √                | √        |                  |      |      |                      |
| 本地仓库操作                      | git status git status -s git add git reset git checkout git commit git rm 将文件添加至忽略列表 git log git log -p git log --stat |                                                              | 是       | √                |          |                  |      |      |                      |
| 远程仓库的使用                    | git remote git remote -v git remote show git remote add origin 仓库地址 git clone 仓库地址 git push git pull |                                                              | 是       | √                | √        |                  |      |      |                      |
| 分支                              | git branch git branch bName git checkout bName git merge bName |                                                              | 是       | √                | √        |                  |      |      |                      |
| Git命令综合使用案例               | 综合使用案例                                                 |                                                              | 是       | √                |          |                  |      |      |                      |
| 使用TortoiseGit管理文件版本       | TortoiseGit安装                                              | TortoiseGit安装                                              |          | 否               |          |                  |      |      |                      |
| TortoiseGit使用                   | 创建仓库 克隆仓库 将文件添加到暂存区 提交文件 推送本地仓库至远程仓库 拉取代码 创建分支 切换分支 合并分支 |                                                              | 否       |                  |          |                  |      |      |                      |
| 在IDEA中使用Git                   | 在IDEA中配置Git                                              | 在IDEA中配置Git                                              |          | 是               | √        |                  |      |      |                      |
| 在IDEA中使用Git                   | 在IDEA中创建工程并将工程添加至Git 将文件添加到暂存区 提交文件 将代码推送到远程仓库 从远程仓库克隆工程到本地 从远程拉取代码 版本对比 创建分支 切换分支 分支合并 |                                                              | 是       | √                | √        |                  |      |      |                      |
| 使用SSH协议传输数据               | Git支持的传输协议                                            | 本地协议（Local） HTTPS 协议 SSH（Secure Shell）协议 git 协议 |          | 是               |          |                  |      |      |                      |
| 使用SSH协议传输数据               | SSH介绍 SSH密钥生成 在远程仓库配置密钥                       |                                                              | 是       |                  |          |                  |      |      |                      |

# 多人协同开发

# 以远程仓库为准强制覆盖本地

```bash
  git fetch --all
  git reset --hard origin/master
  git pull
  # 或者
  git fetch --all && git reset --hard origin/master && git pull 
```



# github搜索方法

in:name example		名字中有“example”
in:readme example		readme中有“example”
in:description example	描述中有“example”

stars:1000		star1000
forks:1000		fork1000
pushed:2019-09-01		2019年9月1日后有更新的

language:java		用Java编写的项目



java项目

Controller控制页面------Service服务Controller--------- repository 数据库相关----------model 对象
