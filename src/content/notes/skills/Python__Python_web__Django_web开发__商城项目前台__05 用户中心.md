---
title: "05 用户中心"
category: skills
tags: ["Python", "Web"]
featured: false
source: "Python/Python_web/Django_web开发/商城项目前台/05 用户中心.md"
updated: 2022-05-23
readingTime: 3
summary: "toc https://chenjunxs.osscnhangzhou.aliyuncs.com/img/20210925202729.png  后端逻辑 1. 用户模型补充email_active字段 2. 查询并渲染用户基本信息 3. ..."
---
[toc]

![](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/20210925202729.png)

> 后端逻辑

1. 用户模型补充`email_active`字段
2. 查询并渲染用户基本信息
3. 添加邮箱
4. 发送邮箱验证邮件
5. 验证邮箱

# 添加邮箱接口设计



请求方法	PUT
请求地址	/email/	
请求参数：email		(string)
响应结果：JSON		{'code': RETCODE.OK, 'errmsg': '添加邮箱成功'}	



# Django发送邮件

![](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/20210926105130.png)

邮件内容：用户邮箱、激活链接

> **`send_mall()`方法**

- 在`django.core.mail`模块提供了`send_mail()`来发送邮件。
- 方法参数：`send_mail(subject, message, from_email, recipient_list, html_message=None)`

> **配置邮件服务器**

```python
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend' # 指定邮件后端
EMAIL_HOST = 'smtp.163.com' # 发邮件主机
EMAIL_PORT = 25 # 发邮件端口
EMAIL_HOST_USER = 'hmmeiduo@163.com' # 授权的邮箱
EMAIL_HOST_PASSWORD = 'hmmeiduo123' # 邮箱授权时获得的密码，非注册登录密码
EMAIL_FROM = '美多商城<hmmeiduo@163.com>' # 发件人抬头
```

> # ==SMTPAuthenticationError==



## 生成激活链接



## 收货地址

- 将省市区数据areas.sql导入mysql

  `mysql -h127.0.0.1 -uroot -p meiduo < areas.sql`

  -p可以直接写密码

  `mysql -h127.0.0.1 -uroot -p7890 meiduo < areas.sql`

  省市区数据是一个**自关联**的表，节省空间，但依然是一对多、多对一的关系

  <img src="https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/20210927152406.png" alt="Screenshot 2021-09-27 at 3.23.58 PM" style="zoom:50%;" align="left" />

- 将模型列表province_model_list转成字典列表province_list

  - 模型列表province_model_list

  ```python
  {QuerySet} <QuerySet [<Area: 北京市>, <Area: 天津市>, <Area: 河北省>, <Area: 山西省>, <Area: 内蒙古自治区>, <Area: 辽宁省>, <Area: 吉林省>，<Al. View……
  ```

  - 字典列表province_list

  ```json
  {
    "code":"0",
    "errmsg":"OK",
    "province_list":[
        {
            "id":110000,
            "name":"北京市"
        },
        {
            "id":120000,
            "name":"天津市"
        },
        {
            "id":130000,
            "name":"河北省"
        },
        ......
    ]
  }
  ```

- 查询省市区数据

  请求方法	GET
  请求地址	/areas/
  请求参数	查询参数
  响应结果	JSON

  > 如果前端没有传入area_id，表示用户需要省份数据
  > 如果前端传入了area_id，表示用户需要市或区数据

- 新增地址接口设计和定义

  请求方法	POST
  请求地址	/addresses/create/
  请求参数：JSON
      receiver	province_id	city_id	district_id	place	mobile	tel	email	
  响应结果：JSON
      code	errmsg	id	receiver	province	city	district	place	mobile	tel	email	

  > 一对多：外键设置在多的一边
  > `user = modeLs.ForeignKey(User， on_delete=models.CASCADE, related_name='addresses'`
  >
  > 一查多：用related_name查询

  

- 展示地址接口设计

  请求方法	GET
  请求地址	/addresses/
  响应结果	HTML		user_center_site.html

- 修改地址

- 删除地址

- 设置默认地址

  前端未成功显示

  `<em v-if="address.id===default_address_id">默认地址</em>`

- 修改地址标题

> 缓存工具
> - `from django.core.cache import cache`
> - 存储缓存数据：`cache.set('key', 内容, 有效期)`
> - 读取缓存数据：`cache.get('key')`
> - 删除缓存数据：`cache.delete('key')`
> - **注意：存储进去和读取出来的数据类型相同，所以读取出来后可以直接使用。**

# **==修改密码==**

前端？？？？

==这个做出来就行了==
