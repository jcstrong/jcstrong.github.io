---
title: "git"
category: practice
tags: ["Git"]
featured: false
source: "工作实用指南/git.md"
updated: 2023-07-25
readingTime: 2
summary: "本地版本控制：每次更新都记录一个快照或补丁文件，个人使用 集中版本控制 SVN：所有的版本数据都保存在服务器上，所有开发者从服务器上同步更新或上传自己的修改  SVN的服务器down了可能会有风险，需要定期备份 分布式版本控制 GIT：所有..."
---
本地版本控制：每次更新都记录一个快照或补丁文件，个人使用

集中版本控制 SVN：所有的版本数据都保存在服务器上，所有开发者从服务器上同步更新或上传自己的修改

- SVN的服务器down了可能会有风险，需要定期备份

分布式版本控制 GIT：所有版本信息仓库全部同步到本地的每个用户，这样就可以在本地查看所有版本历史，可以离线在本地提交，只需在连网时push到相应的服务器或其他用户那里。由于每个用户那里保存的都是所有的版本数据，只要有一个用户的设备没有问题就可以恢复所有的数据，但这增加了本地存储空间的占用。

- GIT的隐患是每个人也都有全部的版本，容易有泄露风险
- 自己在电脑上改了文件A，其他人也在电脑上改了文件A，这时、只需把各自的修改推送给对方，就可以互相看到对方的修改了。Git可以直接看到更新了哪些代码和文件！

## 安装GIT

[git](https://git-scm.com/)

所有东西下载慢的话就可以去找镜像！

官网下载太慢，我们可以使用淘宝镜像下载：http://npm.taobao.org/mirrors/git-for-windows/

### 环境配置

设置用户信息

```python
git config --global user.name jcstrong
git config --global user.email 976807720@qq.com
ssh-keygen -t rsa -C “你的邮箱”		//可选
```

查看配置信息

```python
	git config --global --list
  git config --system --list
  git config --list
	git config user.name
```

通过上面的命令设置的信息会保存在~/.gitconfig文件中。windows在用户文件夹中

## git 工作流程



![图片](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/640.png)

版本库：.git文件夹

- 工作区workspace：带.git的本地文件夹
- 暂存区stage：.git文件夹中的index文件
- 本地仓库local repository：开发人员自己电脑上的Git仓库
- 远程仓库remote repository：在远程服务器上的Git仓库

本地的三个区域确切的说应该是git仓库中HEAD指向的版本：