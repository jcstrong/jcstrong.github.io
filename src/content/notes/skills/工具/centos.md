---
title: "centos"
category: skills
folderPath: "工具"
folderTop: "工具"
tags: ["开发工具", "效率"]
featured: false
source: "工具/centos.md"
updated: "2022-07-06"
readingTime: 1
summary: "toc  centos8 yum换源 下载新的 CentOSBase.repo 到 /etc/yum.repos.d/ groovy  进入yum目录 cd /etc/yum.repos.d  删除目录下所有文件注意完整复制，不要漏了那个点..."
---
[toc]

## centos8 yum换源

下载新的 CentOS-Base.repo 到 /etc/yum.repos.d/

```groovy
# 进入yum目录
cd /etc/yum.repos.d

# 删除目录下所有文件(注意完整复制，不要漏了那个点)
rm -rf ./*

# 安装正确的源
wget -O /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-vault-8.5.2111.repo

# 生成缓存
yum makecache
```

## yum安装卸载


```bash
yum -y update
yum install xxx
yum remove xxx

yum search xxx
yum list updates
yum list installed
```



## centos8 开放80端口

```powershell
firewall-cmd --zone=public --add-port=8080/tcp --permanent 
// 永久开放 8080 端口
firewall-cmd --zone=public --query-port=8080/tcp 
// 查看指定端口是否开放
firewall-cmd --zone=public --remove-port=8080/tcp 
// 删除已开放的 8080 端口
firewall-cmd --zone=public --list-ports 
// 查询所有已开放端口
```

> https://blog.csdn.net/weixin_40006265/article/details/110600230

