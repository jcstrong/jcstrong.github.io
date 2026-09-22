---
title: "2.6 压缩与归档"
category: skills
tags: ["Linux", "运维"]
featured: false
source: "Linux/Linux命令/2.6 压缩与归档.md"
updated: 2022-05-23
readingTime: 1
summary: "toc  压缩 tar2.6.1 tar命令.md  截屏20210209 下午7.07.19https://chenjunxs.osscnhangzhou.aliyuncs.com/img/%E6%88%AA%E5%B1%8F202102..."
---
[toc]

### 压缩 [tar](2.6.1 tar命令.md) 

![截屏2021-02-09 下午7.07.19](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/%E6%88%AA%E5%B1%8F2021-02-09%20%E4%B8%8B%E5%8D%887.07.19.png)



#### [gzip命令](2.6.2 gzip命令.md) bzip2命令

用途:制作压缩文件、解开压缩文件 

格式: gzip [-9] 文件名...
 		bzip [-9] 文件名...

gzip -d  .gz格式的压缩文件 

bzip2 -d  *.bz2格式的压缩文件

##### 常用命令选项

-9 :表示高压缩比，多在创建压缩包时用 

-d :用于解开已经压缩过的文件