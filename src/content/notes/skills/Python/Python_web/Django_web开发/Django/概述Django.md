---
title: "概述Django"
category: skills
folderPath: "Python/Python_web/Django_web开发/Django"
folderTop: "Python"
tags: ["Python", "Web"]
featured: false
source: "Python/Python_web/Django_web开发/Django/概述Django.md"
updated: "2022-05-23"
readingTime: 20
summary: "toc  Django中文官方文档https://docs.djangoproject.com/zhhans/3.2/  本文视频地址https://www.bilibili.com/video/BV1cZ4y1p7sg/  2.3.12视..."
---
[toc]





# [Django中文官方文档](https://docs.djangoproject.com/zh-hans/3.2/)

## [本文视频地址](https://www.bilibili.com/video/BV1cZ4y1p7sg/)

## [2.3.12视频](https://www.bilibili.com/video/BV1vK4y1o7jH)

## [第三方翻译](https://yiyibooks.cn/qy/django2/index.html)

## [Django Github源码](https://github.com/django/django)

## [Django Book 教程](http://djangobook.com/)

## [Tange With Django 教程](http://www.tangowithdjango.com/book17/)

![](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/20210824160535.png)

Web程序框架的意义 ：

- 用于搭建Web应用程序
- 免去不同Web应用相同代码部分的重复编写，只需关心Web应用核心的业务逻辑实现

Web应用程序的本质 ：

- 接收并解析HTTP请求，获取具体的请求信息
- 处理本次HTTP请求，即完成本次请求的业务逻辑处理
- 构造并返回处理结果——HTTP响应

Web框架学习方法 ：

- 如何搭建工程程序
  - 工程的组建
  - 工程的配置
  - 路由定义
  - 视图函数定义
- 如何获取请求数据（操作request对象）
- 如何构造响应数据（构造response对象）
- 框架提供的其他功能组件的使用
  - 数据库
  - 模板
  - admin

# Django

Django的**主要目的是简便、快速的开发数据库驱动的网站。**它强调代码复用，多个组件可以很方便的以"插件"形式服务于整个框架，Django有许多功能强大的第三方插件，你甚至可以很方便的开发出自己的工具包。这使得Django具有很强的可扩展性。它还强调快速开发和DRY(DoNotRepeatYourself)原则。

特点 

- 重量级框架 

  - 对比Flask框架，Django原生提供了众多的**功能组件**，让开发更简便快速。

  - 提供项目工程管理的自动化脚本工具
  - 数据库ORM支持（对象关系映射，英语：Object Relational Mapping）
  - **模板、表单、Admin管理站点、文件管理、认证权限、session机制、缓存**



## MVC模式说明 

有一种程序设计模式叫**MVC**，其核心思想是**分工、解耦，让不同的代码块之间降低耦合，增强代码的可扩展性和可移植性，实现向后兼容**。

MVC是为了将传统的输入（input）、处理（processing）、输出（output）任务运用到图形化用户交互模型中而设计的。后来，MVC的思想被应用在了Ｗeb开发方面，被称为Ｗeb MVC框架。

![mvc](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/20210824162130.png)

- M全拼为Model，主要封装对数据库层的访问，对数据库中的数据进行增、删、改、查操作。
- V全拼为View，用于封装结果，生成页面展示的html内容。
- C全拼为Controller，用于接收请求，处理业务逻辑，与Model和View交互，返回结果。


## Django使用的MVT 

![mvt](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/20210824162148.png)

- M全拼为Model，与MVC中的M功能相同，负责和数据库交互，进行数据处理。
- V全拼为View，与MVC中的Controller功能相同，接收请求，进行业务处理，返回应答。
- T全拼为Template，与MVC中的V功能相同，负责封装构造要返回的html。

**注：差异就在于黑线黑箭头标识出来的部分**

![](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/20210825115532.png)



# 以下准备操作在pycharm上完成更方便

搭建虚拟环境+创建项目+创建应用+安装应用+配置模板路径+本地化+mysql数据库+URLconf+视图

## 搭建虚拟环境

- 在开发过程中, 当需要使用python的某些工具包/框架时需要联网安装。比如联网安装Django框架django的1.11.11版本`sudo pip3 install django`

- 使用如上命令, 会将Django安装到`/usr/local/lib/python2.7/dist-packages`路径下

- 如果在一台电脑上, 想开发多个不同的项目, 需要用到同一个包的不同版本, 如果使用上面的命令, 在同一个目录下安装或者更新, 新版本会覆盖以前的版本, 其它的项目就无法运行了


  - 虚拟环境可以搭建独立的`python运行环境`, **使得单个项目的运行环境与其它项目互不影响.**
  - 所有的虚拟环境都位于`/home/`下的隐藏目录`.virtualenvs`下



### 虚拟环境搭建步骤

- [mac上搭建虚拟环境](https://www.cnblogs.com/youning/p/13232918.html)

1. sudo pip3 install virtualenv  # 安装虚拟环境

2. sudo pip3 install virtualenvwrapper  # 安装虚拟环境扩展包

3. vim .bash_profile  # 家目录下编辑.bash_profile文件,加入以下3句
4. 保存运行这个命令 source ~/.bash_profile

```
export WORKON_HOME='~/.virtualenvs'

export VIRTUALENVWRAPPER_PYTHON='/Library/Frameworks/Python.framework/Versions/3.8/bin/python3'

source /Library/Frameworks/Python.framework/Versions/3.8/bin/virtualenvwrapper.sh
```

> 第一句话是 定义**虚拟工作目录**文件夹的存放位置
>
> 第二句话是 需要填写 本机**python3 的安装位置** 具体可以` which python3`
>
> 第三句话是 需要填写 之前安装的虚拟机的 virtualenvwrapper.sh 的位置 具体可以 `which virtualenvwrapper.sh `查找，或者su用户使用`find / -name virtualenvwrapper.sh`查找

- linux安装虚拟环境的命令 :

```
sudo pip3 install virtualenv
sudo pip3 install virtualenvwrapper
```

> 安装完虚拟环境后，如果提示找不到mkvirtualenv命令，须配置环境变量：

```powershell
# 1、创建目录用来存放虚拟环境
mkdir $HOME/.virtualenvs

# 2、打开~/.bashrc文件，并添加如下：
export WORKON_HOME=$HOME/.virtualenvs
source /usr/local/bin/virtualenvwrapper.sh

# 3、运行
source ~/.bashrc
```

- 创建虚拟环境的命令 :

  - 提示：如果不指定python版本，默认安装的是python2的虚拟环境

  - 在python2中，创建虚拟环境

    ```
    mkvirtualenv \虚拟环境名称
    ```
    
  - 在python3中，创建虚拟环境

    ```
    mkvirtualenv -p python3 \虚拟环境名称
    ```
  
  > 创建虚拟环境需要联网
  > 创建成功后, 会自动工作在这个虚拟环境上
  > 工作在虚拟环境上, 提示符最前面会出现 “虚拟环境名称”
  
- 查看所有虚拟环境 :

```
workon
```

- 使用虚拟环境 :

```
workon 虚拟环境名称
```

- 退出虚拟环境的命令 :

```
deactivate
```

- 删除虚拟环境的命令 :

```
rmvirtualenv 虚拟环境名称
```

> 先退出再删除



### 在虚拟环境中安装工具包（ [文档](https://pip.pypa.io/en/stable/user_guide/) ）

- 工具包安装的位置 :
  - python2版本下：
    - `~/.virtualenvs/py_flask/lib/python2.7/site-packages/`
  - python3版本下：
    - `~/.virtualenvs/py3_flask/lib/python3.5/site-packages`
- python3版本下安装django-1.11.11的包 :

```powershell
pip install django==1.11.11
```

- 查看虚拟环境中安装的包 :

```
pip list
```



## 创建Django项目

- **创建Django项目**
  - `django-admin startproject 项目名`
- **创建子应用**
  - `python manage.py startapp 子应用名`

### 创建工程 

在使用Flask框架时，项目工程目录的组织与创建是需要我们自己手动创建完成的。

在django中，项目工程目录可以借助django提供的命令帮助我们创建。

例如：在桌面的code目录中创建一个名为bookmanager的项目工程，可执行如下命令：

```powershell
cd ~/Desktop/Code
django-admin startproject bookmanager
```

执行后，会多出一个新目录名为bookmanager，此即为新创建的工程目录。结构如下

```
(Django) chenjun@ubuntu:~/Documents/Python/bookmanager$ tree
.
├── bookmanager
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
└── manage.py
```

- **项目同名目录**
  - **项目同名目录**，此处为bookmanager。
    - **settings.py**是项目的整体配置文件。
    - **urls.py**是项目的URL配置文件。
    - **wsgi.py**是项目与WSGI兼容的Web服务器入口。
  - **manage.py**是项目管理文件，通过它管理项目。



运行开发服务器 

在开发阶段，为了能够快速预览到开发的效果，django提供了一个纯python编写的轻量级web服务器，仅在开发阶段使用。

运行服务器命令如下：

```powershell
python manage.py runserver ip:端口
-- 可以不写IP和端口，默认IP是127.0.0.1，默认端口为8000**。
```

在浏览器中输入网址“127.0.0.1:8000”便可看到效果。



### 创建子应用 

在Web应用中，通常有一些业务功能模块是在不同的项目中都可以复用的，故在开发中通常将工程项目拆分为不同的子功能模块，各功能模块间可以保持相对的独立，在其他工程项目中需要用到某个特定功能模块时，可以将该模块代码整体复制过去，达到复用。

在Flask框架中也有类似子功能应用模块的概念，即蓝图Blueprint。

**Django的视图编写是放在子应用中的。**

- 创建 

  在django中，创建子应用模块目录仍然可以通过命令来操作，即：

  ```
  python manage.py startapp 子应用名称
  ```

  **manage.py**为上述创建工程时自动生成的管理文件。

  例如，在刚才创建的bookmanager工程中，想要创建一个用户book子应用模块，可执行：

  ```
  cd ~/Desktop/code/book
  python manage.py startapp book
  ```

  执行后，可以看到工程目录中多出了一个名为book的子目录。

  ```
  .
  ├── book
  │   ├── admin.py
  │   ├── apps.py
  │   ├── __init__.py
  │   ├── migrations
  │   │   └── __init__.py
  │   ├── models.py
  │   ├── tests.py
  │   └── views.py
  ├── bookmanager
  │   ├── asgi.py
  │   ├── __init__.py
  │   ├── __pycache__
  │   │   ├── __init__.cpython-38.pyc
  │   │   ├── settings.cpython-38.pyc
  │   │   ├── urls.cpython-38.pyc
  │   │   └── wsgi.cpython-38.pyc
  │   ├── settings.py
  │   ├── urls.py
  │   └── wsgi.py
  ├── db.sqlite3
  └── manage.py
  ```

  - **admin.py**文件跟网站的后台管理站点配置相关。
  - **apps.py**文件用于配置当前子应用的相关信息。
  - **migrations**目录用于存放数据库迁移历史文件。
  - **models.py**文件用户保存数据库模型类。
  - **tests.py**文件用于开发测试用例，编写单元测试。
  - **views.py**文件用于编写Web应用视图。

- 注册安装子应用 

  创建出来的子应用目录文件虽然被放到了工程项目目录中，但是django工程并不能立即直接使用该子应用，需要注册安装后才能使用。

  在工程配置文件**settings.py**中，**INSTALLED_APPS**项保存了工程中已经注册安装的子应用，初始工程中的INSTALLED_APPS如下：

  **注册安装一个子应用的方法，即是将子应用的配置信息文件apps.py中的Config类添加到INSTALLED_APPS列表中。**

  例如，将刚创建的book子应用添加到工程中，可在INSTALLED_APPS列表中添加**'book.apps.BookConfig'**。



### 设置PyCharm，使用刚创建的虚拟环境

```powershell
(Django) chenjun@ubuntu:~/bookmanager$ which python
/home/chenjun/.virtualenvs/Django/bin/python
```

首先找到pycharm的设置选项---选择虚拟环境，或添加本地虚拟环境



# 配置文件	settings.py

### BASE_DIR 

```python
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
```

```python
abspath(__file__)
# abspath绝对路径
#/home/python/Desk top/42/bookmanager00/bookmanager00/settings. py

os.path.dirname(os.path.abspath(__file__))
# dirname 表示文件夹/文件目录
# /home/python/Desk top/42/bookmanager00/bookmanager00

os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# BASE_DIR  -- 两层 dirname(dirname())
# /home/python/Desk top/42/bookmanager00/
```

当前工程的根目录，Django会依此来定位工程内的相关文件，我们也可以使用该参数来构造文件路径。

### DEBUG 

- 修改代码文件，程序自动重启

- Django程序出现异常时，向前端显示详细的错误追踪信息，例如

- 在非调试模式下，仅返回Server Error (500)

  **注意：部署线上运行的Django不要运行在调式模式下，记得在settings.py中修改DEBUG=False和ALLOW_HOSTS。**

### 本地语言与时区 

Django支持本地化处理，即显示语言与时区支持本地化。

本地化是将显示的语言、时间等使用本地的习惯，这里的本地化就是进行中国化，中国大陆地区使用**简体中文**，时区使用**亚洲/上海**时区，注意这里不使用北京时区表示。

初始化的工程默认语言和时区为英语和UTC标准时区

```
LANGUAGE_CODE = 'en-us'  # 语言
TIME_ZONE = 'UTC'  # 时区# 时区
```

将语言和时区修改为中国大陆信息

```
LANGUAGE_CODE = 'zh-Hans'
TIME_ZONE = 'Asia/Shanghai'
```

### Allowed host

设置允许访问到本项目的host头值

- [] 空列表,表示只有请求头中host为 127.0.0.1，localhost时能访问本项目 - DEBUG = True 时有效

- [ '*']  表示任何请求头的host都能访问到当前项

- ['192.168.1.3', '127.0.0.1'] 表示只有当前两个host头的值能访问当前项

### ROOT_URLCONF

配置主url，一般为 ‘项目名.urls’

### MIDDLEWARE

中间件

### TEMPLATES

模版配置信息

### DTATABASE

配置数据库

### 自定义配置

配置项都可以在代码中引用

```python
from django.conf import settings
```





# 静态文件

项目中的CSS、图片、js都是静态文件。一般会放到一个单独的目录中，以方便管理。

一般放在子应用的static文件夹下的子文件夹里

<img src="/Users/chenjun/Desktop/Screenshot%202021-09-01%20at%203.19.22%20PM.png" alt="Screenshot 2021-09-01 at 3.19.22 PM" style="zoom:33%;" align="left" />

配置中关于静态文件的参数：

- **STATIC_URL**访问静态文件的URL前缀

```python
STATIC_URL = '/static/
```

> 更多关于设置和框架的资料，参考 [静态文件解惑](https://docs.djangoproject.com/zh-hans/3.2/howto/static-files/) 和 [静态文件指南](https://docs.djangoproject.com/zh-hans/3.2/ref/contrib/staticfiles/)。[部署静态文件](https://docs.djangoproject.com/zh-hans/3.2/howto/static-files/deployment/) 介绍了如何在真实服务器上使用静态文件。



# 应用配置  app.py

在每个应用目录中都包含了apps.py文件，用于保存该应用的相关信息。在创建应用时，Django会向apps.py文件中写入一个该应用的配置类，如

```
from django.apps import AppConfig


class BookConfig(AppConfig):
    name = 'book'
    verbose_name = '图书管理'    
```

此类被添加到工程settings.py中的INSTALLED_APPS列表中，表明注册安装具备此配置属性的应用。

- **AppConfig.name**属性表示这个配置类是加载到哪个应用的，每个配置类必须包含此属性，默认自动生成。

- **AppConfig.verbose_name**属性用于设置该应用的直观可读的名字，此名字在Django提供的Admin管理站点中会显示



# 站点管理 admin.py

- **站点**: 分为`内容发布`和`公共访问`两部分
- **内容发布**的部分由网站的管理员负责查看、添加、修改、删除数据
- `Django`能够根据定义的模型类自动地生成管理模块

### Django中的用户认证[¶](https://docs.djangoproject.com/zh-hans/3.2/topics/auth/#user-authentication-in-django)

#### 创建管理员 

- 创建管理员的命令 :

  ```
  python manage.py createsuperuser
  ```

  按提示输入用户名、邮箱、密码

- 忘记密码，重置密码
  `python manage.py changepassword 用户名`

- 登陆站点 :`http://127.0.0.1:8000/admin`


#### 注册模型类    admin.py

注册模型类之后才能在页面看到书籍和人物管理入口

- **导入模型模块** :`from book.models import BookInfo,PeopleInfo`

  ```python
  from django.contrib import admin
  
  from .models import Question
  
  admin.site.register(Question)
  ```

- 注册模型成功后, 就可以在站点管理界面方便快速的管理数据.

#### 发布内容到数据库 

![img](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/20210825110031.gif)

- 发布内容后，优化模型类展示

 ```python
  # 准备书籍列表信息的模型类
  class BookInfo(models.Model):
      # 创建字段，字段类型...
      name = models.CharField(max_length=10)
  
      def __str__(self):
          """将模型类以字符串的方式输出"""
          return self.name
 ```



官方案例：

```python
from django.contrib import admin

# Register your models here.
from django.contrib import admin

from polls.models import Question, Choice


# admin.site.register(Choice)
# StackedInline显示面积太大
# class ChoiceInline(admin.StackedInline):
# TabularInline关联对象以一种表格式的方式展示，显得更加紧凑
class ChoiceInline(admin.TabularInline):
    model = Choice
    # 默认提供 3 个额外的空插槽（选项字段）。
    extra = 3


# admin.site.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    # 这样修改使得 "Publication date" 字段显示在 "Question" 字段之前：
    # fields = ['pub_date', 'question_text']
    # 将表单分为几个字段集，这样每个字段集都有一个标题作为分割
    fieldsets = [
        (None,               {'fields': ['question_text']}),
        ('Date information', {'fields': ['pub_date'], 'classes': ['collapse']}),
    ]
    # 表明Choice 对象要在 Question 后台页面编辑。
    inlines = [ChoiceInline]

    # 展示系统中所有投票的页面      首页 › Polls › Questions
    list_display = ('question_text', 'pub_date', 'was_published_recently')
    # 添加一个“过滤器”侧边栏，允许人们以 pub_date 字段来过滤列表：
    # 因为 pub_date 是类 DateTimeField，
    # 所以Django 知道要提供哪个过滤器：“过去7天”，“这个月”和“今年”……
    list_filter = ['pub_date']


admin.site.register(Question, QuestionAdmin)
```

- 使用 display() 装饰器来改进方法

```python
@admin.display(
    boolean=True,
    ordering='pub_date',
    description='Published recently?',
)
def was_published_recently(self):
    now = timezone.now()
    # 是不是近一个月的
    # datetime.timedelta 两个时间之间的时间差
    # return now - self.pub_date <= datetime.timedelta(days=30)
    return now - datetime.timedelta(days=30) <= self.pub_date <= now
```

> 更多关于可通过装饰器设置的属性的信息，请参见 [`list_display`](https://docs.djangoproject.com/zh-hans/3.2/ref/contrib/admin/#django.contrib.admin.ModelAdmin.list_display)。
>
> 还可添加[`变更页分页`](https://docs.djangoproject.com/zh-hans/3.2/ref/contrib/admin/#django.contrib.admin.ModelAdmin.list_per_page), [`搜索框`](https://docs.djangoproject.com/zh-hans/3.2/ref/contrib/admin/#django.contrib.admin.ModelAdmin.search_fields), [`过滤器`](https://docs.djangoproject.com/zh-hans/3.2/ref/contrib/admin/#django.contrib.admin.ModelAdmin.list_filter), [`日期层次结构`](https://docs.djangoproject.com/zh-hans/3.2/ref/contrib/admin/#django.contrib.admin.ModelAdmin.date_hierarchy), 和 [`列标题排序`](https://docs.djangoproject.com/zh-hans/3.2/ref/contrib/admin/#django.contrib.admin.ModelAdmin.list_display) 



自定义为



# Django开发基本流程

## 项目准备 

- 创建项目+创建应用+安装应用+配置模板路径+本地化+mysql数据库+URLconf+视图

  ```mysql
  DATABASES = {
      'default': {
          'ENGINE': 'django.db.backends.mysql',
          'HOST': '127.0.0.1', # 数据库主机
          'PORT': 3306, # 数据库端口
          'USER': 'root', # 数据库用户名
          'PASSWORD': 'mysql', # 数据库用户密码
          'NAME': 'book' # 数据库名字
      }
  }
  ```

## 模型

- 当前项目的开发, 都是数据驱动的。

- 以下为书籍信息管理的数据关系：书籍和人物是 ：一对多关系

  ![img](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/20210825104907.png)

- 要先分析出项目中所需要的数据, 然后设计数据库表.

> 书籍信息表

| 字段名 | 字段类型  | 字段说明 |
| :----- | :-------- | :------- |
| id     | AutoField | 主键     |
| name   | CharField | 书名     |

| id   | name     |
| :--- | :------- |
| 1    | 西游记   |
| 2    | 三国演义 |

> 人物信息表

| 字段名 | 字段类型     | 字段说明 |
| :----- | :----------- | :------- |
| id     | AutoField    | 主键     |
| name   | CharField    | 人名     |
| gender | BooleanField | 性别     |
| book   | ForeignKey   | 外键     |

| id   | name   | gender | book |
| :--- | :----- | :----- | :--- |
| 1    | 孙悟空 | False  | 1    |
| 2    | 白骨精 | True   | 1    |
| 3    | 曹操   | False  | 2    |
| 4    | 貂蝉   | True   | 2    |

- 使用Django进行数据库开发的提示 ： 
  - `MVT`设计模式中的`Model`, 专门负责和数据库交互.对应`(models.py)`
  - 由于`Model`中内嵌了`ORM框架`, 所以不需要直接面向数据库编程.
  - 而是定义模型类, 通过`模型类和对象`完成数据库表的`增删改查`.
  - `ORM框架`就是把数据库表的行与相应的对象建立关联, 互相转换.使得数据库的操作面向对象.
    Object Relational Mapping

### Django进行数据库开发的步骤

1. 定义模型类
2. 模型迁移
3. 操作数据库

#### 定义模型类 

- 根据书籍表结构设计模型类:

  - 模型类：BookInfo
  - 书籍名称字段：name

- 根据人物表结构设计模型类：

  - 模型类：PeopleInfo
  - 人物姓名字段：name
  - 人物性别字段：gender
  - 外键约束：book
    - 外键要指定所属的模型类`book = models.ForeignKey(BookInfo)`

- 说明 :

  - 书籍-人物的关系为一对多. 一本书中可以有多个英雄.
  - 不需要定义主键字段, 在生成表时会自动添加, 并且值为自增长.

- 根据数据库表的设计

  - 在`models.py`中定义模型类,继承自`models.Model`

   ```python
    from django.db import models
    
    # Create your models here.
    # 准备书籍列表信息的模型类，继承自models.Model
    class BookInfo(models.Model):
        # 创建字段，字段类型...
        name = models.CharField(max_length=10)
    
    # 准备人物列表信息的模型类
    class PeopleInfo(models.Model):
        name = models.CharField(max_length=10)
        gender = models.BooleanField()
        # 外键约束：人物属于哪本书
        book = models.ForeignKey(BookInfo, on_delete=models.CASCADE)
   
   ```

#### 模型迁移 （建表） 

- 迁移由两步完成 :

  - 生成迁移文件：根据模型类生成创建表的语句

    ```
    python manage.py makemigrations
    ```

  - 执行迁移：根据第一步生成的语句**在数据库中创建表**

    ```
    python manage.py migrate
    ```


- **提示：默认采用**`sqlite3`**数据库来存储数据**




## 视图、URL 

- 站点管理页面做好了, 接下来就要做`公共访问`的页面了.

- 对于Django的设计框架MVT

  - 用户在URL中请求的是视图.
  - 视图接收请求后进行处理.
  - 并将处理的结果返回给请求者.

### 使用视图时需要进行两步操作

1.定义视图

2.配置URLconf

#### 定义视图 	views.py

- 视图就是一个`Python`函数，被定义在`应用`的`views.py`中.

- 视图的第一个参数是`HttpRequest`类型的对象`reqeust`，包含了所有`请求信息`.

- 视图必须返回`HttpResponse对象`，包含返回给请求者的`响应信息`.

- 需要导入`HttpResponse`模块 :`from django.http import HttpResponse`

- 定义视图函数 : 响应字符串`OK!`给客户端

  ```python
  ---views.py---
  from django.http import HttpResponse
  from django.shortcuts import render
  
  
  # Create your views here.
  def index(request):
      return HttpResponse('OK')
  ```
  
  > **思考 : 如何才能让请求找到视图?**

#### 配置URLconf 

- 查找视图的过程 :

  - 请求者在浏览器地址栏中输入URL, 请求到网站.

  - 网站获取URL信息，然后与编写好的URLconf逐条匹配.

  - 如果匹配成功则调用对应的视图，否则返回404错误.

- `URLconf`：可以在`settings.py`中的`ROOT_URLCONF`处修改。一般不修改保持默认

- 需要两步完成`URLconf`配置

  配置`http://127.0.0.1:8000/index/`的访问资源。
  通过下面的两步配置，访问这个url就会跳转到子应用`book/view.py`中的index函数。

  - **在**`项目`**中定义**`URLconf`

    ```python
    ---bookmanager/url.py---
    from django.contrib import admin
    from django.urls import path, include
    
    urlpatterns = [
        path('admin/', admin.site.urls),
        path('', include('book.urls')),	#不匹配的admin都会去book.urls里找
    ]
    ```

  - **在**`子应用`**中定义**`URLconf`

    ```python
    ---book/url.py---
    from django.urls import path, include
    from book.views import index
    
    urlpatterns = [
        path('index/', index),
    ]
    ```

    > 一条`URLconf`包括URL规则、视图两部分



- 视图处理过程如下图：

![img](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/20210825161225.png)



- 总结View和URL匹配流程

![](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/20210824163540.png)



## 模板 

可以把`html`、`css`、`js`.全都写到视图中, 作为`HttpResponse()`的参数,响应给客户端，但是会导致视图部分代码臃肿, 耦合度高，且代码没有错误提示

`MVT`设计模式中的`Template`**模版**是一个专门定义前端页面的地方, 效果可以及时展示,错误可以及时发现,并且可以降低模块间耦合度

### 模板使用步骤 

**在**`Django`**中, 将前端的内容定义在模板中, 然后再把模板交给视图调用, 各种漂亮、炫酷的效果就出现了.**

- 1.创建模板
- 2.设置模板查找路径
- 3.模板接收视图传入的数据
- 4.模板处理数据

#### 创建模板 html文件

`template/book/index.html`

<img src="https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/20210825164807.png" alt="Screenshot 2021-08-25 at 4.46.51 PM" style="zoom:50%;" align="left" />

> template下的文件夹要与子应用同名

#### 设置模板查找路径 

在`settigs.py`中设置

```python
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR), 'template'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
```

BASE_DIR：项目根目录

#### 视图将数据传入模版

`view.py`

```python
# Create your views here.
def index(request):
    name = 'Jun'
    context = {
        'name': name
    }
    return render(request, 'index.html', context)
    return HttpResponse('index')
```

#### 模板处理视图中的数据 

使用`{{	}}`获取

`<h1>{{ name }} you're Success!</h1>`



## View-Templates流程图

![](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/20210824163624.png)





# 案例：展示书籍列表 

- 需求 ：

- 实现步骤 
  - 1.创建视图
  - 2.创建模板
  - 3.配置URLconf

- 创建工程、子应用

  ```powershell
  (Django) chenjun@ubuntu:~$ django-admin startproject  bookmanager00
  (Django) chenjun@ubuntu:~$ cd bookmanager00/
  (Django) chenjun@ubuntu:~/bookmanager00$ python manage.py startapp book
  ```

  - 导入pycharm。设置interpreter为对应的虚拟环境

  - 在`setting.py`中注册子应用

- **定义模型**BookInfo。

  ```python
  ---models.py---
  class BookInfo(models.Model): # 要继承models.Model
      name = models.CharField(max_length=10)
  ```
  - 迁移模型。生成迁移文件、执行迁移语句。这样就能**得到`db.sqlite3`数据库表格**

- **创建视图** 

  ```python
  # select * from bookinfo,
  # ORM
  def booklist(request):
      # 查询数据库书籍列表数据
      books = BookInfo.objects.all()  #book
      # 构造上下文
      context = {'books': books}
      # 数据交给模板处理，处理完成后通过视图响应给客户端
      return render(request, 'index.html', context)
  ```

- 配置url

  - 在子应用中新建urls.py

    ```python
    from book.views import index
    
    urlpatterns = [
        path('index/', index),    
      	path('booklist/', booklist),
    
    ]
    ```

  - 在项目的urls.py中

    ```python
    urlpatterns = [
        path('admin/', admin.site.urls),
        path('', include('book.urls')),
    ]
    ```

- 创建后台管理员`python manage.py createsuperuser`

  - 在**admin.py**中注册模型后才能在后台中显示出bookinfo

    ```python
    # Register your models here.
    from book.models import BookInfo
    
    admin.site.register(BookInfo)
    ```

  - 在**models.py**中重写`__str__`，后台显示数据更友好

    ```python
    class BookInfo(models.Model):
        name = models.CharField(max_length=10)
    
        def __str__(self):
            return self.name
    ```

    

- **创建模板** 

  - 在settings.py中告知系统template位置`'DIRS': [os.path.join(BASE_DIR), 'template'],`

  - 在template文件夹中创建html模版

  ```html
  <ul>
      {% for book in books %}
          <li>{{ book.name }}</li>
      {% endfor %}
  </ul>
  ```

  

- 配置URLconf 
  - 进入`应用`中的`urls.py`文件

  ```python
  from django.conf.urls import url
  from book.views import index,bookList
  
  urlpatterns = [
      url(r'^$',index),
      # 匹配书籍列表信息的URL,调用对应的bookList视图
      url(r'^booklist/$',bookList)
  ]
  ```

  



  
