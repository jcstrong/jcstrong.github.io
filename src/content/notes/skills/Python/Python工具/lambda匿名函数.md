---
title: "lambda匿名函数"
category: skills
folderPath: "Python/Python工具"
folderTop: "Python"
tags: ["Python", "工具"]
featured: false
source: "Python/Python工具/lambda匿名函数.md"
updated: 2022-07-05
readingTime: 1
summary: "toc  lambda匿名函数 冒号前是参数，可以有多个，用逗号隔开，冒号右边的返回值。lambda语句构建的其实是一个函数对象 例子 python def fx: \treturn x2 Python中使用lambda的话，等价于 pyth..."
---
[toc]

## lambda匿名函数

冒号前是参数，可以有多个，用逗号隔开，冒号右边的返回值。lambda语句构建的其实是一个函数对象

例子

```python
def f(x):
	return x**2
```

Python中使用lambda的话，等价于

```python
g = lambda x : x**2
```

例子

```python
>>> foo = [2, 18, 9, 22, 17, 24, 8, 12, 27]
>>> print filter(lambda x: x % 3 == 0, foo)
[18, 9, 24, 12, 27]
>>> print map(lambda x: x * 2 + 10, foo)
[14, 46, 28, 54, 44, 58, 26, 34, 64]
>>> print reduce(lambda x, y: x + y, foo)
139
```



**lambda和普通的函数相比**

不需要考虑命名的问题。

可以省去定义函数的过程，让代码更加精简。

使用Button传递数值时，需要用：
lambda: function(var1, var2, ……)。否则会直接执行，而不是按键后执行



## eval函数

eval是Python的一个内置函数，这个函数的作用是，返回传入字符串的表达式的结果。即变量赋值时，等号右边的表示是写成字符串的格式，返回值就是这个表达式的结果。


