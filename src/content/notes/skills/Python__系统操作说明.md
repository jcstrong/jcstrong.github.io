---
title: "系统操作说明"
category: skills
tags: ["Python", "系统操作"]
featured: false
source: "Python/系统操作说明.md"
updated: 2023-03-12
readingTime: 2
summary: "Neo4j 3.x   https://github.com/liuhuanyong/QASystemOnMedicalKG https://liuhuanyong.github.io https://mp.weixin.qq.com/s?..."
---
> Neo4j 3.x
>
> 



https://github.com/liuhuanyong/QASystemOnMedicalKG

https://liuhuanyong.github.io

https://mp.weixin.qq.com/s?__biz=MzAxMjc3MjkyMg==&mid=2648398227&idx=2&sn=ddc9258a9db01ee6d0bf93da00ee9a72&chksm=83834ac6b4f4c3d0e02e7cecd4dc7018e7077966ce0a8bf3eb15341b4e4b5590d5439c8edd29&scene=178&cur_album_id=2016530030821998594#rd





[neo4i 简单入门和前端可视化](https://qianxu.run/2021/11/10/neo4j-simple-tutorial/)

[conda迁移](http://t.csdn.cn/qnm9V)

AttributeError: 'NoneType' object has no attribute 'pool'





py2neo 链接5.x

```
self.g = Graph('http://localhost:7474', auth=('neo4j', 'chenjunchao'), name=('neo4j'))
```

py2neo 链接3.x

```
self.g = Graph(
host="127.0.0.1",  # neo4j 搭载服务器的ip地址，ifconfig可获取到
http_port=7474,  # neo4j 服务器监听的端口号
user="neo4j",  # 数据库user name，如果没有更改过，应该是neo4j
password="chenjunchao")
```





- 本案例只查询“单跳”关系，可以回答“胸闷可能是什么疾病”，但没法回答“胸闷应该去看哪个科室”或“胸闷应该做哪些检查”
- 本案例仅仅是对问题进行模板规则匹配和关键词提取，没有用到自然语言处理和深度学习领域最前沿的“命名实体识别”、“情感分析”、“关系抽取”、“语义匹配”等技术。
  - 例如，如果把问题从“胸闷吃点什么好”换成“前胸有一点点堵吃点什么好”，则无法匹配。
- 本案例没有用到图神经网络、图嵌入、图数据挖掘等前沿的人工智能和知识图谱技术。
- 本案例的数据仅是小规模的demo数据，如果有百万级节点和关系，将问答系统部署在服务器上，对外发布web应用，则对云数据库的数据存储与查询、分布式、多线程、高并发、容灾备份、弹性扩容等有更高的挑战。





