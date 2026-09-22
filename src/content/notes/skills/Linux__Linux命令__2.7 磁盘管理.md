---
title: "2.7 磁盘管理"
category: skills
tags: ["Linux", "运维"]
featured: false
source: "Linux/Linux命令/2.7 磁盘管理.md"
updated: 2021-03-02
readingTime: 3
summary: "toc Linux磁盘管理https://www.cnblogs.com/fckneedu/p/7048971.html  在系统里面新增一个硬盘时…… 1、对磁盘进行分区，以创建可用的partition; 2、对该partition进行格..."
---
[toc]

[Linux磁盘管理](https://www.cnblogs.com/f-ck-need-u/p/7048971.html)

### 在系统里面新增一个硬盘时……

1、对磁盘进行分区，以创建可用的partition;
2、对该partition进行格式化(format)，以创建系统可用的filesystem; 
3、若想要仔细一点，则可对刚刚创建好的 filesystem 进行检验;
4、在Linux系统上，需要创建挂载点(亦即是目录)，并将他挂载上来;

### 

## 

## 确认系统中的磁盘设备

### [fdisk命令](2.7.1 fdisk命令.md) 

fdisk -l [磁盘设备]

```
---
设备       启动    起点      末尾      扇区      大小 Id 类型
/dev/sda1  *       2048   2099199   2097152    1G 83 Linux
/dev/sda2       2099200 251658239 249559040  119G 8e Linux LVM
---
```

Device:分区的设备文件名称。 
Boot:是否是引导分区，是则有“*”标识。 
Start:该分区在硬盘中的起始位置(柱面数)。 
End:该分区在硬盘中的结束位置(柱面数)。 
Blocks:分区的大小，以Blocks(块)为单位，默认 的块大小为1024字节。 
Id:分区类型的ID标记号，对于EXT3分区为83，LVM 分区为8e。

System:分区类型

## 规划硬盘中的分区

硬盘分区依照功能性的不同可分为主分区( Primary )、拓展分区(Extended)及逻辑分区( Logical ) 三种

1、硬盘最多可以分割成4个主分区或3个主分区+1个拓展分区
2、 拓展分区又可分成数个(没有限制，但总容量不得超过拓展分区大小)逻辑分区。 
3、 代号的使用:以IDE0(第一个硬盘，设备名称为/dev/hda)为例来说明
		主分区使用:hda[1-4] (包含拓展分区在内) 
		逻辑分区使用:hda[5-~] (请注意，逻辑分区一定由5开始计算)

> 已知Linux系统中的唯一一块硬盘是第一个IDE接口的master设备，该硬盘按顺序有3个主分区和一个扩展分区,这个扩展分区又划分了3个逻辑分区，则该硬盘上的第二个逻辑分区在Linux中的设备名称是?
>
> /dev/hda6

## 分区中创建文件系统

### mkfs命令

用途:Make Filesystem，创建文件系统(格式化)

格式:mkfs -t 文件系统类型 分区设备

作为其他几个分区命令的 前端工具，通过“-t ...”选 项指定文件系统类型

#### 格式化

```
[root@localhost ~]# mkfs -t ext3 /dev/sda2
mke2fs 1.45.4 (23-Sep-2019)
 /dev/sda2 有一个 LVM2_member 文件系统
Proceed anyway? (y,N) n
```

```
[root@localhost ~]# mkfs.ext3 /dev/sda1
mke2fs 1.45.4 (23-Sep-2019)
 /dev/sda1 有一个 ext4 文件系统
	上一次挂载于 /boot， 时间 Wed Feb 10 06:22:10 2021
Proceed anyway? (y,N) n
```



## 挂载、卸载文件系统

### [mount命令](2.7.3 mount命令.md) 

用途:挂载文件系统、ISO镜像到指定文件夹 格式:mount [ -t 类型 ] 存储设备 挂载点目录

mount -o loop ISO镜像文件 挂载点目录

一般挂载到/mnt目录下。现在mnt目录下创建一个目标目录，然后挂载

```
[root@localhost ~]# cd /mnt
[root@localhost mnt]# mkdir newd1
[root@localhost mnt]# mount /dev/sdd1 /mnt/newd1
[root@localhost mnt]# mount -t vfat /dev/sdd5 /mnt/newd5
```



### [umount命令](2.7.4 umount命令.md) 

用途:卸载已挂载的文件系统 格式:umount 存储设备位置

umount 挂载点目录

###  [du命令](2.7.2 du命令.md) 

### df命令

查看挂载点

```
[root@localhost mnt]# df
文件系统               1K-块    已用     可用 已用% 挂载点
devtmpfs              892396       0   892396    0% /dev
tmpfs                 921932       0   921932    0% /dev/shm
tmpfs                 921932    9944   911988    2% /run
tmpfs                 921932       0   921932    0% /sys/fs/cgroup
/dev/mapper/cl-root 52403200 5280632 47122568   11% /
/dev/mapper/cl-home 70175256  534052 69641204    1% /home
/dev/sda1             999320  197544   732964   22% /boot
tmpfs                 184384    1180   183204    1% /run/user/42
tmpfs                 184384    4656   179728    3% /run/user/1000
```



## 设置文件系统的自动挂载

### /etc/fstab配置文件

包含了需要开机后自动挂载的文件系统记录















