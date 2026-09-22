---
title: "10 优化性能"
category: skills
tags: ["Python", "Web"]
featured: false
source: "Python/Python_web/Django_web开发/商城项目前台/10 优化性能.md"
updated: 2021-10-22
readingTime: 2
summary: "toc  页面静态化  首页到静态化  减少数据库查询次数。  提升页面响应效率。 方法：将动态渲染生成的页面结果保存成html文件，放到静态文件服务器中，用户直接去静态服务器，访问处理好的静态html文件。  用户相关数据不能静态化：  ..."
---
[toc]

# 页面静态化 

首页到静态化

- 减少数据库查询次数。
- 提升页面响应效率。

方法：将动态渲染生成的页面结果保存成html文件，放到静态文件服务器中，用户直接去静态服务器，访问处理好的静态html文件。

- 用户相关数据不能静态化：
  - 用户名、购物车等不能静态化。
- 动态变化的数据不能静态化：
  - 热销排行、新品推荐、分页排序数据等等。
- 不能静态化的数据处理：
  - 可以在用户得到页面后，在页面中向后端发送Ajax请求获取相关数据。
  - 直接使用模板渲染出来。
  - 其他合理的处理方式等等。



> **提示**：使用Python自带的`http.server`模块来模拟静态服务器，提供静态首页的访问测试。

```bash
# 进入到static上级目录
$ cd ~/projects/meiduo_project/meiduo_mall/meiduo_mall
# 开启测试静态服务器
$ python -m http.server 8080 --bind 127.0.0.1
```

[笔记](file:///Volumes/A256G/Python/阶段4-web开发/8商城项目/美多商城前台项目/笔记/wpo/html-static/static-html.html)



详情页的静态化

- 方案一：通过Python脚本手动一次性批量生成所有商品静态详情页。
- 方案二：后台运营人员修改了SKU信息时，异步的静态化对应的商品详情页面。



Python脚本

# MySQL读写分离

多台数据服务器中，主服务器只负责写入数据，从服务器只负责同步主服务器的数据

使用主从同步的优点：

- 提高读写性能
- 提高数据安全

Docker安装MySQL从机

```bash
sudo docker image pull mysql:5.7.22
```

```bash
sudo docker run --name mysql-slave -e MYSQL_ROOT_PASSWORD=7891 mysql:5.7.22
```

```
mysql -uroot -pmysql -h 127.0.0.1 --port=8306
```

