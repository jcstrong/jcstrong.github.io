---
title: "mac安装jdk"
category: skills
tags: ["开发工具", "效率"]
featured: false
source: "工具/mac安装jdk.md"
updated: 2021-08-12
readingTime: 1
summary: "toc  mac安装jdk  下载安装jdk 官网下载地址https://www.oracle.com/technetwork/java/javase/downloads/jdk8downloads2133151.html  验证 java..."
---
[toc]

# mac安装jdk

###### 下载安装jdk

[官网下载地址](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

###### 验证

`java -version`

###### 配置java环境

打开java安装路径 Mac默认路径为

`cd /Library/Java/JavaVirtualMachines/jdk1.8.0_201.jdk/Contents/Home`

修改配置文件

`sudo -i vi /etc/.bash_profile`

修改

JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_101.jdk/Contents/Home/

CLASSPAHT=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar

PATH=$JAVA_HOME/bin:$PATH:

export JAVA_HOME

export CLASSPATH

export PATH

输入`source /etc/.bash_profile`并回车，使配置生效

##### idea配置jdk

在项目页面使用 ⌘；

进入 `Project Structure`

添加已经安装的 jdk 到idea



使用 ⌘，进入偏好设置，找到 `Java Complier`



##### 其他情况

###### 移除已安装的jdk

```lua
sudo rm -rf /Library/Java/*

sudo rm -rf /Library/PreferencePanes/Java* 

sudo rm -rf /Library/Internet\ Plug-Ins/Java*`
```

