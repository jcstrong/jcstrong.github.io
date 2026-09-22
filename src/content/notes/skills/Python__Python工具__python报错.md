---
title: "python报错"
category: skills
tags: ["Python", "工具"]
featured: false
source: "Python/Python工具/python报错.md"
updated: 2021-05-12
readingTime: 2
summary: "toc  PYGAME  Invalid rectstyle object （0，0，0）解释器并没有把他当成一个参数，因为后面还有rect = None,的默认参数，所以必须要把（0，0，0）单独括起来，才能把它作为一个元组。 （（255..."
---
[toc]

# PYGAME

# Invalid rectstyle object

（0，0，0）解释器并没有把他当成一个参数，因为后面还有rect = None,的默认参数，所以必须要把（0，0，0）单独括起来，才能把它作为一个元组。

（（255，255，255））

# 树莓派

# SyntaxError: Non-ASCII character '\xe5' in file

报错原因：python默认的是ASCII编码，使用 中文等非英语字符 就会报上述错误。

解决办法：设置编码为UTF-8。
在文件顶部加上 

```python
#conding:utf-8
```

# IndentationError: unindent does not match any outer indentation level

报错原因：没有对齐、tab和空格混用

解决方法：在视图中找到`显示空格与制表符`，查找错误位置

# IndexError: tuple index out of range

报错原因:元组索引越界

# ModuleNotFoundError: *No* *module* *named* '*tkinter*'

报错原因：未发现包

解决方法：在geany中执行如下代码查看包的路径

```python
import sys
print(sys.path)
```

[geany找不到包](https://blog.csdn.net/jd_457619512/article/details/81179788)

# TypeError: test() argument after * must be an iterable, not int

调用threading.Thread 报错

```python
t = threading.Thread(target = test,args = (5))
```

报错原因：在使用多线程时，会调用多线程类中的run()函数，这个函数需要传入一个可迭代对象，当我们的参数只有一个整数时，单独的整数不可迭代，所以报错

解决办法：这里参数后面要加逗号（5,）

```python
t = threading.Thread(target=test,args=(5,))
```



# The channel sent is invalid on a Raspberry Pi

不是GPIO引脚
多半是GPIO.BCM写成BAORD的原因



# NameError: global name 'xxx' is not defined

全局变量声明和定义的位置出错可能会使其他线程无法访问全局变量。还可能出现下面的错误

## SyntaxWarning: name 'dist' is assigned to before global declaration

如下是正确使用全局变量的方法

在global之前先赋值，在会修改的函数内声明global。

```python
dist = 0
def thread_dist():
    global dist
    while True:
        time.sleep(1.0)
        dist = int(ultraSonic.checkdist(6,5))
        print(dist)
def thread_show():
    while True:
        LED.fun4LED(LED_PINS,dist)
```

# IOError: [Errno 121] Remote I/O error

I2C设备接线没接好