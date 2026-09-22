---
title: "python字符串"
category: skills
folderPath: "Python/Python语法"
folderTop: "Python"
tags: ["Python", "语法基础"]
featured: false
source: "Python/Python语法/python字符串.md"
updated: "2022-07-05"
readingTime: 6
summary: "字符串 toc python  str1='123456'  str1 '123456'  str10 '1'  maxstr1 '6'  lenstr1 6  str2='nihao'  str1+str2 '123456nihao'  ..."
---
# 字符串
[[toc]]


```python
>>> str1='123456'
>>> str1
'123456'
>>> str1[0]
'1'
>>> max(str1)
'6'
>>> len(str1)
6
>>> str2='nihao'
>>> str1+str2
'123456nihao'
>>> str2*3
'nihaonihaonihao'
```

三引号形式的字符串支持换行。

```python
a = ''' i am Tom, 
        nice to meet you! '''

b = """ i am Rose, 
        nice to meet you! """
```

## 下标

```python
name = "abcdef"

print(name[1])
print(name[0])
print(name[2])
```

## 切片

```
序列[开始位置下标:结束位置下标:步长]
```

> 注意：不包含结束位置下标对应的数据， 正负整数均可；
>
> ​			步长是选取间隔，正负整数均可，默认步长为1。

``` python
name = "abcdefg"

print(name[2:5:1])  # cde
print(name[2:5])  # cde
print(name[:5])  # abcde
print(name[1:])  # bcdefg
print(name[:])  # abcdefg
print(name[::2])  # aceg
print(name[:-1])  # abcdef, 负1表示倒数第一个数据
print(name[-4:-1])  # def
print(name[::-1])  # gfedcba
```



## 使用正则表达式切割字符串

```python
re.sub("[a-zA-Z0-9]", "", mystr) # 把字符串中的字母和数字都弄没
```

第一个参数，模式字符串
第二个参数，希望被替换成的字符串
第三个参数，希望被处理的原始字符串
返回处理过的字符串



## 使用切片

```python
s = s[:5]
```

只保留前5个字符
(不是下标！)

## 内置函数操作字符串

字符串的常用操作方法有查找、修改和判断三大类。

### find()	检测子串是否包含在这个字符串中，返回子串开始的下标，不在则返回-1。

``` python
字符串序列.find(子串, 开始位置下标, 结束位置下标)
```

> 注意：开始和结束位置下标可以省略，表示在整个字符串序列中查找。

2. 快速体验

``` python
mystr = "hello world and itcast and itheima and Python"

print(mystr.find('and'))  # 12
print(mystr.find('and', 15, 30))  # 23
print(mystr.find('ands'))  # -1
```

### index()	检测子串是否包含在这个字符串中，并返回子串开始的下标，不在则报异常。

``` python
字符串序列.index(子串, 开始位置下标, 结束位置下标)
```

> 注意：开始和结束位置下标可以省略，表示在整个字符串序列中查找。

快速体验

``` python
mystr = "hello world and itcast and itheima and Python"

print(mystr.index('and'))  # 12
print(mystr.index('and', 15, 30))  # 23
print(mystr.index('ands'))  # 报错
```



- rfind()： 和find()功能相同，但查找方向为==右侧==开始。
- rindex()：和index()功能相同，但查找方向为==右侧==开始。

### count('子串')    返回子串在字符串中出现的次数

``` python
字符串序列.count(子串, 开始位置下标, 结束位置下标)
```

> 注意：开始和结束位置下标可以省略，表示在整个字符串序列中查找。

``` python
mystr = "hello world and itcast and itheima and Python"

print(mystr.count('and'))  # 3
print(mystr.count('ands'))  # 0
print(mystr.count('and', 0, 20))  # 1
```

### **replace()	替换**

``` python
字符串序列.replace(旧子串, 新子串, 替换次数)
```

> 注意：替换次数如果查出子串出现次数，则替换次数为该子串出现次数。

2. 快速体验

``` python
mystr = "hello world and itcast and itheima and Python"

# 结果：hello world he itcast he itheima he Python
print(mystr.replace('and', 'he'))
# 结果：hello world he itcast and itheima and Python
print(mystr.replace('and', 'he', 1))
# 结果：hello world and itcast and itheima and Python
print(mystr)
```

> 注意：数据按照是否能直接修改分为==可变类型==和==不可变类型==两种。字符串类型的数据修改的时候==不能改变原有字符串==，属于不能直接修改数据的类型即是不可变类型。

### split()	按照指定字符分割字符串。

``` python
字符串序列.split(分割字符, num)
```

> 注意：num表示的是==分割字符出现的次==数，即将来返回数据个数为num+1个。

``` python
mystr = "hello world and itcast and itheima and Python"

# 结果：['hello world ', ' itcast ', ' itheima ', ' Python']
print(mystr.split('and'))
# 结果：['hello world ', ' itcast ', ' itheima and Python']
print(mystr.split('and', 2))
# 结果：['hello', 'world', 'and', 'itcast', 'and', 'itheima', 'and', 'Python']
print(mystr.split(' '))
# 结果：['hello', 'world', 'and itcast and itheima and Python']
print(mystr.split(' ', 2))
```

> 注意：如果分割字符是原有字符串中的子串，分割后则丢失该子串。



### join() 	用一个字符或子串合并字符串，即是将多个字符串合并为一个新的字符串。

``` python
字符或子串.join(多字符串组成的序列)
```

``` python
list1 = ['chuan', 'zhi', 'bo', 'ke']
t1 = ('aa', 'b', 'cc', 'ddd')
# 结果：chuan_zhi_bo_ke
print('_'.join(list1))
# 结果：aa...b...cc...ddd
print('...'.join(t1))
```

### capitalize()	字符串第一个字符转换大写。

``` python
mystr = "hello world and itcast and itheima and Python"

# 结果：Hello world and itcast and itheima and python
print(mystr.capitalize())
```

> 注意：capitalize()函数转换后，只字符串第一个字符大写，其他的字符全都小写。

### title()	单词首字母转换成大写。

``` python
mystr = "hello world and itcast and itheima and Python"

# 结果：Hello World And Itcast And Itheima And Python
print(mystr.title())
```

### lower()	所有大写转小写。



``` python
mystr = "hello world and itcast and itheima and Python"

# 结果：hello world and itcast and itheima and python
print(mystr.lower())
```

### upper()	所有小写转大写。

``` python
mystr = "hello world and itcast and itheima and Python"

# 结果：HELLO WORLD AND ITCAST AND ITHEIMA AND PYTHON
print(mystr.upper())
```

### lstrip()	删除字符串左侧空白字符。

```python
mystr = "        hello world and itcast and itheima and Python     "

# 结果：hello world and itcast and itheima and Python      
print(mystr.lstrip())
```

### rstrip()	删除字符串右侧空白字符。

```python
mystr = "hello world and itcast and itheima and Python        "

# 结果：hello world and itcast and itheima and Python
print(mystr.upper())
```

### strip()	删除字符串两侧空白字符。

```python
mystr = "           hello world and itcast and itheima and Python         "

# 结果：hello world and itcast and itheima and Python
print(mystr.strip())
```

### ljust()	返回一个原字符串左对齐,并使用指定字符(默认空格)填充至对应长度 的新字符串。

``` python
字符串序列.ljust(长度, 填充字符)
```

*（图片缺失：image-20190130141125560.png）*



```python
mystr = "hello"

mystr.ljust(10,'.')# 结果：'hello.....'
mystr.ljust(10)# 结果：'hello     '
```

### rjust()：返回一个原字符串右对齐,并使用指定字符(默认空格)填充至对应长度 的新字符串，语法和ljust()相同。

### center()：返回一个原字符串居中对齐,并使用指定字符(默认空格)填充至对应长度 的新字符串，语法和ljust()相同。

*（图片缺失：image-20190130141442074.png）*



```python
mystr = "hello"

# 结果：'..hello...'
mystr.center(10,'.')
# 结果：'  hello   '
mystr.center(10)
```



### startswith()	检查字符串是否是以指定子串开头，

如果设置开始和结束位置下标，则在指定范围内检查。

``` python
字符串序列.startswith(子串, 开始位置下标, 结束位置下标)
```

``` python
mystr = "hello world and itcast and itheima and Python   "

# 结果：True
print(mystr.startswith('hello'))

# 结果False
print(mystr.startswith('hello', 5, 20))
```

### endswith()	检查字符串是否是以指定子串结尾

如果设置开始和结束位置下标，则在指定范围内检查。

``` python
字符串序列.endswith(子串, 开始位置下标, 结束位置下标)
```

``` python
mystr = "hello world and itcast and itheima and Python"

# 结果：True
print(mystr.endswith('Python'))

# 结果：False
print(mystr.endswith('python'))

# 结果：False
print(mystr.endswith('Python', 2, 20))
```

### isalpha()	如果所有字符都是字母且字符串至少有一个字符则返回 True

``` python
mystr1 = 'hello'
mystr2 = 'hello12345'

# 结果：True
print(mystr1.isalpha())

# 结果：False
print(mystr2.isalpha())
```

### isdigit()	如果字符串只包含数字则返回 True 

``` python
mystr1 = 'aaa12345'
mystr2 = '12345'

# 结果： False
print(mystr1.isdigit())

# 结果：False
print(mystr2.isdigit())
```

### isalnum()	所有字符都是字母或数字且字符串至少有一个字符并且则返回 True

``` python
mystr1 = 'aaa12345'
mystr2 = '12345-'

# 结果：True
print(mystr1.isalnum())

# 结果：False
print(mystr2.isalnum())
```

### isspace()	如果字符串中只包含空白，则返回 True

``` python
mystr1 = '1 2 3 4 5'
mystr2 = '     '

# 结果：False
print(mystr1.isspace())

# 结果：True
print(mystr2.isspace())
```

