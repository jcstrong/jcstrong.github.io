---
title: "IDEA快捷键"
category: skills
tags: ["开发工具", "效率"]
featured: false
source: "工具/IDEA快捷键.md"
updated: 2022-05-23
readingTime: 2
summary: "toc  IDEA快捷键 设置IDEA Mac快捷键风格为Intellij IDEA Classic，如不是则首先需要在Preferences中切换  CMD + N 查找类  Alt + Enter / Option + Enter 引入..."
---
[toc]





# IDEA快捷键

设置IDEA Mac快捷键风格为`Intellij IDEA Classic`，如不是则首先需要在Preferences中切换

### CMD + N

查找类

### Alt + Enter / Option + Enter

引入本地变量（自动生成等号左边）

### Ctrl + H

查看继承树

### name.for + tabtab

foreach循环

### Ctrl + Alt + t

IDEA中try/catch快捷键

### Ctrl+Alt+V	/	Cmd+Opt+V

自动生成返回值

### Ctrl+Alt+L	/	Cmd+Opt+L

自动调整锁进

### Alt+7

打开窗口能看到类的所有函数

### Debug方法

设置断点

看Debugger窗口,代码执行到哪了、变量变化

Console窗口，执行过程的结果

step into按钮

### Generate -> 选择toString



## 修改servlet模版

**Settings -> File and Code Templates -> other -> Web -> Java code templates -> ServletClass.java ** 

# 带包编译&运行

带包编译:` javac –d . 类名.java`
`javac -d .com.heima.demo.HelloWorld.java`

带包运行:`java 包名+类名`
`java com.heima.demo.HelloWorld`

# 运算符

逻辑与 &，无论左边真假，右边都要执行。
短路与 &&，如果左边为真，右边执行; 如果左边为假，右边不执行。

逻辑或 I，无论左边真假，右边都要执行。
短路或 I，如果左边为假，右边执行; 如果左边为真，右边不执行。


# 设置导包路径的根路径

![Screenshot 2021-09-14 at 8.46.28 PM](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/20210914204641.png)
