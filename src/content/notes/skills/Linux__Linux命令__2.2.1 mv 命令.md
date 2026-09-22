---
title: "2.2.1 mv 命令"
category: skills
tags: ["Linux", "运维"]
featured: false
source: "Linux/Linux命令/2.2.1 mv 命令.md"
updated: 2021-02-07
readingTime: 11
summary: "toc 熟悉了 复制命令，下一个相关的命令就是 mv 命令。当你想要将文件从一个位置移动到另一个地方并且不想复制它，那么mv 命令是完成这个任务的首选。 mv命令是move的缩写，可以用来移动文件或者将文件改名（move rename fi..."
---
[toc]

熟悉了 复制命令，下一个相关的命令就是 mv 命令。当你想要将文件从一个位置移动到另一个地方并且不想复制它，那么mv 命令是完成这个任务的首选。

mv命令是move的缩写，可以用来移动文件或者将文件改名（move (rename) files），是Linux系统下常用的命令，经常用来备份文件或者目录。

# 重命名mv命令

## 命令格式

mv [选项] 源文件或目录 目标文件或目录

## 命令功能

mv命令中第二个参数类型的不同（是目标文件还是目标目录），mv命令将文件重命名或将其移至一个新的目录中。当第二个参数类型是文件时，mv命令完成文件重命名，此时，源文件只能有一个（也可以是源目录名），它将所给的源文件或目录重命名为给定的目标文件名。当第二个参数是已存在的目录名称时，源文件或目录参数可以有多个，mv命令将各参数指定的源文件均移至目标目录中。在跨文件系统移动文件时，mv先拷贝，再将原有文件删除，而链至该文件的链接也将丢失。

## 命令参数：



-b ：若需覆盖文件，则覆盖前先行备份。

-f ：force 强制的意思，如果目标文件已经存在，不会询问而直接覆盖；

-i ：若目标文件 (destination) 已经存在时，就会询问是否覆盖！

-u ：若目标文件已经存在，且 source 比较新，才会更新(update)

-t ： --target-directory=DIRECTORY move all SOURCE arguments into DIRECTORY，即指定mv的目标目录，该选项适用于移动多个源文件到一个目录的情况，此时目标目录在前，源文件在后。

-v : 打印移动信息

## 命令实例：

### 实例1：文件改名

#### 命令：mv test.log test1.txt

输出：

```
[root@localhost test]# ll
总计 20drwxr-xr-x 6 root root 4096 10-27 01:58 scf
drwxrwxrwx 2 root root 4096 10-25 17:46 test3
drwxr-xr-x 2 root root 4096 10-25 17:56 test4
drwxr-xr-x 3 root root 4096 10-25 17:56 test5
-rw-r–r-- 1 root root 16 10-28 06:04 test.log
[root@localhost test]# mv test.log test1.txt
[root@localhost test]# ll
总计 20drwxr-xr-x 6 root root 4096 10-27 01:58 scf
-rw-r–r-- 1 root root 16 10-28 06:04 test1.txt
drwxrwxrwx 2 root root 4096 10-25 17:46 test3
drwxr-xr-x 2 root root 4096 10-25 17:56 test4
drwxr-xr-x 3 root root 4096 10-25 17:56 test5
```



说明：
将文件test.log重命名为test1.txt

### 实例2：移动文件

#### 命令:mv test1.txt test3

输出：

```
[root@localhost test]# ll
总计 20drwxr-xr-x 6 root root 4096 10-27 01:58 scf
-rw-r–r-- 1 root root 29 10-28 06:05 test1.txt
drwxrwxrwx 2 root root 4096 10-25 17:46 test3
drwxr-xr-x 2 root root 4096 10-25 17:56 test4
drwxr-xr-x 3 root root 4096 10-25 17:56 test5
[root@localhost test]# mv test1.txt test3
[root@localhost test]# ll
总计 16drwxr-xr-x 6 root root 4096 10-27 01:58 scf
drwxrwxrwx 2 root root 4096 10-28 06:09 test3
drwxr-xr-x 2 root root 4096 10-25 17:56 test4
drwxr-xr-x 3 root root 4096 10-25 17:56 test5
[root@localhost test]# cd test3
[root@localhost test3]# ll
总计 4
-rw-r–r-- 1 root root 29 10-28 06:05 test1.txt
[root@localhost test3]#
```

说明：
将test1.txt文件移到目录test3中

### 实例3：将文件log1.txt,log2.txt,log3.txt移动到目录test3中。

#### 命令:mv log1.txt log2.txt log3.txt test3

#### mv -t /opt/soft/test/test4/ log1.txt log2.txt log3.txt

输出：

```
[root@localhost test]# ll
总计 28
-rw-r–r-- 1 root root 8 10-28 06:15 log1.txt
-rw-r–r-- 1 root root 12 10-28 06:15 log2.txt
-rw-r–r-- 1 root root 13 10-28 06:16 log3.txt
drwxrwxrwx 2 root root 4096 10-28 06:09 test3
[root@localhost test]# mv log1.txt log2.txt log3.txt test3
[root@localhost test]# ll
总计 16drwxrwxrwx 2 root root 4096 10-28 06:18 test3
[root@localhost test]# cd test3/
[root@localhost test3]# ll
总计 16
-rw-r–r-- 1 root root 8 10-28 06:15 log1.txt
-rw-r–r-- 1 root root 12 10-28 06:15 log2.txt
-rw-r–r-- 1 root root 13 10-28 06:16 log3.txt
-rw-r–r-- 1 root root 29 10-28 06:05 test1.txt
[root@localhost test3]#
[root@localhost test3]# ll
总计 20
-rw-r–r-- 1 root root 8 10-28 06:15 log1.txt
-rw-r–r-- 1 root root 12 10-28 06:15 log2.txt
-rw-r–r-- 1 root root 13 10-28 06:16 log3.txt
drwxr-xr-x 2 root root 4096 10-28 06:21 logs
-rw-r–r-- 1 root root 29 10-28 06:05 test1.txt
[root@localhost test3]# mv -t /opt/soft/test/test4/ log1.txt log2.txt log3.txt
[root@localhost test3]# cd …
[root@localhost test]# cd test4/
[root@localhost test4]# ll
总计 12
-rw-r–r-- 1 root root 8 10-28 06:15 log1.txt
-rw-r–r-- 1 root root 12 10-28 06:15 log2.txt
-rw-r–r-- 1 root root 13 10-28 06:16 log3.txt
[root@localhost test4]#
```

说明：
mv  log1.txt  log2.txt  log3.txt  test3  命令将log1.txt ，log2.txt， log3.txt 三个文件移到 test3目录中去，mv  -t  /opt/soft/test/test4/  log1.txt   log2.txt   log3.txt  命令又将三个文件移动到test4目录中去

### 实例4：将文件file1改名为file2，如果file2已经存在，则询问是否覆盖

#### 命令:mv  -i  log1.txt  log2.txt

输出：

```
[root@localhost test4]# ll
总计 12
-rw-r–r-- 1 root root 8 10-28 06:15 log1.txt
-rw-r–r-- 1 root root 12 10-28 06:15 log2.txt
-rw-r–r-- 1 root root 13 10-28 06:16 log3.txt
[root@localhost test4]# cat log1.txt
odfdfs
[root@localhost test4]# cat log2.txt
ererwerwer
[root@localhost test4]# mv -i log1.txt log2.txt
mv：是否覆盖“log2.txt”? y
[root@localhost test4]# cat log2.txt
odfdfs
[root@localhost test4]#
```



### 实例5：将文件file1改名为file2，即使file2存在，也是直接覆盖掉。

#### 命令：mv -f log3.txt log2.txt

输出：

```
[root@localhost test4]# ll
总计 8
-rw-r–r-- 1 root root 8 10-28 06:15 log2.txt
-rw-r–r-- 1 root root 13 10-28 06:16 log3.txt
[root@localhost test4]# cat log2.txt
odfdfs
[root@localhost test4]# cat log3
cat: log3: 没有那个文件或目录
[root@localhost test4]# ll
总计 8
-rw-r–r-- 1 root root 8 10-28 06:15 log2.txt
-rw-r–r-- 1 root root 13 10-28 06:16 log3.txt
[root@localhost test4]# cat log2.txt
odfdfs
[root@localhost test4]# cat log3.txt
dfosdfsdfdss
[root@localhost test4]# mv -f log3.txt log2.txt
[root@localhost test4]# cat log2.txt
dfosdfsdfdss
[root@localhost test4]# ll
总计 4
-rw-r–r-- 1 root root 13 10-28 06:16 log2.txt
[root@localhost test4]#
```

说明：
log3.txt的内容直接覆盖了log2.txt内容，-f 这是个危险的选项，使用的时候一定要保持头脑清晰，一般情况下最好不用加上它。

### 实例6：目录的移动

#### 命令：mv dir1 dir2

输出：

```
[root@localhost test4]# ll
-rw-r–r-- 1 root root 13 10-28 06:16 log2.txt
[root@localhost test4]# ll
-rw-r–r-- 1 root root 13 10-28 06:16 log2.txt
[root@localhost test4]# cd …
[root@localhost test]# ll
drwxr-xr-x 6 root root 4096 10-27 01:58 scf
drwxrwxrwx 3 root root 4096 10-28 06:24 test3
drwxr-xr-x 2 root root 4096 10-28 06:48 test4
drwxr-xr-x 3 root root 4096 10-25 17:56 test5
[root@localhost test]# cd test3
[root@localhost test3]# ll
drwxr-xr-x 2 root root 4096 10-28 06:21 logs
-rw-r–r-- 1 root root 29 10-28 06:05 test1.txt
[root@localhost test3]# cd …
[root@localhost test]# mv test4 test3
[root@localhost test]# ll
drwxr-xr-x 6 root root 4096 10-27 01:58 scf
drwxrwxrwx 4 root root 4096 10-28 06:54 test3
drwxr-xr-x 3 root root 4096 10-25 17:56 test5
[root@localhost test]# cd test3/
[root@localhost test3]# ll
drwxr-xr-x 2 root root 4096 10-28 06:21 logs
-rw-r–r-- 1 root root 29 10-28 06:05 test1.txt
drwxr-xr-x 2 root root 4096 10-28 06:48 test4
[root@localhost test3]#
```

说明：
如果目录dir2不存在，将目录dir1改名为dir2；否则，将dir1移动到dir2中。

### 实例7：移动当前文件夹下的所有文件到上一级目录

#### 命令：mv * …/

输出：

```
[root@localhost test4]# ll
-rw-r–r-- 1 root root 25 10-28 07:02 log1.txt
-rw-r–r-- 1 root root 13 10-28 06:16 log2.txt
[root@localhost test4]# mv * …/
[root@localhost test4]# ll
[root@localhost test4]# cd …
[root@localhost test3]# ll
-rw-r–r-- 1 root root 25 10-28 07:02 log1.txt
-rw-r–r-- 1 root root 13 10-28 06:16 log2.txt
drwxr-xr-x 2 root root 4096 10-28 06:21 logs
-rw-r–r-- 1 root root 29 10-28 06:05 test1.txt
drwxr-xr-x 2 root root 4096 10-28 07:02 test4
```



### 实例8：把当前目录的一个子目录里的文件移动到另一个子目录里

#### 命令：mv  test3/*.txt  test5

不用../test5的话能找到吗？？？？

输出：

```
[root@localhost test]# ll
drwxr-xr-x 6 root root 4096 10-27 01:58 scf
drwxrwxrwx 4 root root 4096 10-28 07:02 test3
drwxr-xr-x 3 root root 4096 10-25 17:56 test5
[root@localhost test]# cd test3
[root@localhost test3]# ll
-rw-r–r-- 1 root root 25 10-28 07:02 log1.txt
-rw-r–r-- 1 root root 13 10-28 06:16 log2.txt
drwxr-xr-x 2 root root 4096 10-28 06:21 logs
-rw-r–r-- 1 root root 29 10-28 06:05 test1.txt
drwxr-xr-x 2 root root 4096 10-28 07:02 test4
[root@localhost test3]# cd …
[root@localhost test]# mv test3/*.txt test5
[root@localhost test]# cd test5
[root@localhost test5]# ll
-rw-r–r-- 1 root root 25 10-28 07:02 log1.txt
-rw-r–r-- 1 root root 13 10-28 06:16 log2.txt
-rw-r–r-- 1 root root 29 10-28 06:05 test1.txt
drwxr-xr-x 2 root root 4096 10-25 17:56 test5-1
[root@localhost test5]# cd …
[root@localhost test]# cd test3/
[root@localhost test3]# ll
drwxr-xr-x 2 root root 4096 10-28 06:21 logs
drwxr-xr-x 2 root root 4096 10-28 07:02 test4
[root@localhost test3]#


```



##### **1.移动文件**

移动文件时需要注意的是文件的源地址和目标地址必须不同。这里有个例子，想要将file_1.txt文件从当前目录移动到其它目录，以/home/pungki/为例，语法应该如下：

> $ mv file_1.txt /home/pungki/office

如我们所见，当我们移动 file_1.txt 文件时，先前目录的 file_1.txt 就被删除了。



##### **2.移动多个文件**

如果想一次移动多个文件，我们可以将他们放在一行并用空格分开。

> $ mv file_2.txt file_3.txt file_4.txt /home/pungki/office

如果你的文件有规律可循的话那么你就可以使用通配符。比如，为了移除所有以.txt为扩展名的文件，我们可以用下面的命令：

> $ mv *.txt /home/pungki/office



##### **3.移动目录**

不同于复制命令，用 mv 命令移动目录相当直接。移动目录你可以使用不带选项的 mv 命令。看下面的截图就一目了然了。



##### **4.重命名文件或目录**

我们也用 mv 命令来重命名文件或目录。不过目标位置和源位置必须相同才可以。然后文件名必须不同。

假定我们当前所在目录为/home/pungki/Documents，而我们想将file_1.txt重命名为file_2.txt。那么命令应该如下：

> $ mv file_1.txt file_2.txt

如果是绝对路径，它应该像下面这样：

> $ mv /home/pungki/Documents/file_1.txt /home/pungki/Documents/file_2.txt



##### **5. 重命名目录**

上一段的规则同样适用于目录。请看这个例子：

> $ mv directory_1/ directory_2/



##### **6. 打印移动信息**

当你移动或重命名一大堆文件或目录时，你可能会想在不去目标位置去查看的情况下知道你自己的命令是否成功地执行了。这就要用到-v选项了。

> $ mv -v *.txt /home/pungki/office

该方法同样适用于目录。



##### **7. 使用交互模式**

当你将文件移动到其它位置，而那个位置恰好有同样的文件，这时 mv 命令会覆盖掉原来的文件。对于mv的这一行为一般不会有什么提示。如果想产生一个关于覆盖文件的提示，我们可以使用-i选项。（译注：通常发行版会通过alias命令，将-i作为默认选项，所以会有提示。）

假设我们想将 file_1.txt 移动到 /home/pungki/office。同时，/home/pungki/office 目录下已经有file_1.txt文件了。

> $ mv -i file_1.txt /home/pungki/office

这个提示会让我们知道目标位置处file_1.txt的存在。如果我们按y键，那么那个文件将会被删除，否则不会。



##### **8. 使用更新选项**

-i 选项会提示我们关于覆盖文件的提示，而 -u 则只在源文件比目标文件新时才执行更新。让我们看一看下面的例子：

假如 file_1.txt 和 file_2.txt有如下特点：

> File_1.txt has 84 bytes file size **and** it last modified time **is** 12:00
>
> File_2.txt has 0 bytes file size **and** it last modified time **is** 11:59



我们想将它们移动到 /home/pungki/office 目录下。但是目标地址已经有file_1.txt和file_2.txt了。

我们用下面的命令将file_1.txt 和file_2.txt从当前目录移动到/home/pungki/office

> $ mv -uv *.txt /home/pungki/office



可以看到这些文件被移动了。能移动这些文件是因为它们最近的修改时间戳比 /home/pungki/office 目录中的文件新。

##### **9.不要覆盖任何已存在的文件**

如果-i选项询问我们是否要覆盖文件，那么 -n 选项将不会允许我们覆盖任何已存在的文件。

继续使用第8点中的例子，如果我们将-u 换成 -n同时加上-v选项，那么我们会看到没有任何文件移动到了 /home/pungki/office 目录下。

> $ mv -vn *.txt /home/pungki/office



##### **10. 复制时创建备份**

默认情况下，移动文件将会覆盖已存在的目标文件。但是如果我们移动错了文件而目标文件已经被新的文件覆盖了，这时应该怎么办才好呢？有没有一种方法可以恢复之前的文件呢？答案是肯定的。我们可以用-b选项。该选项会在新文件覆盖旧文件时将旧文件做备份。这里我们还以第8点为例。



> $ mv -bv *.txt /home/pungki/office



在 /home/pungki/office 目录下出现了名为file_1.txt~ 和 file_2.txt~ 的文件。那个波浪符号（～）意味着这些文件是备份文件。从它们的属性中我们可以看到，这些文件比file_1.txt和file_2.txt要旧。



##### **11. 无条件覆盖已经存在的文件**

当你希望无论如何都覆盖已经存在的文件或目录时，你可以使用 -f 选项。如果同时指定了 -f 选项和 -i 或 -n 选项，则 -f 选项会覆盖它们——即不进行任何提示而覆盖，所以，在使用此参数时，知道你在做什么。

> $ mv -f *.txt /home/pungki/office

## 