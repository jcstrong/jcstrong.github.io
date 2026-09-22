---
title: "2.4.1 useradd命令"
category: skills
tags: ["Linux", "运维"]
featured: false
source: "Linux/Linux命令/2.4.1 useradd命令.md"
updated: 2021-02-09
readingTime: 3
summary: "toc  useradd  创建一个新用户或更新默认新用户信息。 补充说明 useradd命令用于建立用户帐号，帐号建好之后，需用passwd设定帐号的密码。使用useradd指令所建立的帐号，实际上是保存在/etc/passwd文本文件中..."
---
[toc]

## useradd ##

创建一个新用户或更新默认新用户信息。

**补充说明**

useradd命令用于建立用户帐号，帐号建好之后，需用passwd设定帐号的密码。使用useradd指令所建立的帐号，实际上是保存在/etc/passwd文本文件中。可用userdel删除帐号。

**语法**

	useradd [options] LOGIN

**选项**

	-c<备注>：加上备注文字。备注文字会保存在passwd的备注栏位中；
	-d<登入目录>：指定用户登入时的启始目录；
	-D：变更预设值；
	-e<有效期限>：指定帐号的有效期限；
	-f<缓冲天数>：指定在密码过期后多少天即关闭该帐号；
	-g<群组>：指定用户所属的群组；
	-G<群组>：指定用户所属的附加群组；
	-m：自动建立用户的登入目录；
	-M：不要自动建立用户的登入目录；
	-n：取消建立以用户名称为名的群组；
	-r：建立系统帐号；
	-s<shell>：指定用户登入后所使用的shell；
	-u<uid>：指定用户id。

**参数** 

- 用户名：要创建的用户名。

### 实例

### 1.	创建一个账户为testuser的用户

	# useradd testuser
	查找/etc/passwd文件中有关“testuser”用户的信息。
	# cat /etc/passwd | grep testuser

### 2.	创建一个名为admin的系统账户，配置其登录目录为/home/admin

	# useradd -r -d /home/admin admin 命令执行后，执行以下命令查看创建是否成功。
	# cat /etc/passwd | grep admin







## userdel ##

用于删除给定的用户以及与用户相关的文件

**补充说明**

userdel命令 用于删除给定的用户，以及与用户相关的文件。若不加选项，则仅删除用户帐号，而不删除相关文件。

**语法**

	userdel(选项)(参数)

**选项**

	-d：删除密码，仅有系统管理者才能使用；
	-f：强制执行；
	-k：设置只有在密码过期失效后，方能更新；
	-l：锁住密码；
	-s：列出密码的相关信息，仅有系统管理者才能使用；
	-u：解开已上锁的帐号。

**参数** 

- f：强制删除用户，即使用户当前已登录；
- r：删除用户的同时，删除与用户相关的所有文件。


###  实例

### 现在有个用户linuxde，其家目录位于/var目录中，现在我们来删除这个用户

	# userdel linuxde       # 删除用户linuxde，但不删除其/home目录及文件；
	# userdel -r linuxde    # 删除用户linuxde，其/home目录及文件一并删除；

请不要轻易用-r选项；他会删除用户的同时删除用户所有的文件和目录，切记如果用户目录下有重要的文件，在删除前请备份。

其实也有最简单的办法，但这种办法有点不安全，也就是直接在/etc/passwd中删除您想要删除用户的记录；
但最好不要这样做，/etc/passwd是极为重要的文件，可能您一不小心会操作失误。

### 将普通用户加入到sudoers文件夹

```

```

