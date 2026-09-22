---
title: "View 视图"
category: skills
folderPath: "Python/Python_web/Django_web开发/Django"
folderTop: "Python"
tags: ["Python", "Web"]
featured: false
source: "Python/Python_web/Django_web开发/Django/View 视图.md"
updated: "2022-05-23"
readingTime: 22
summary: "toc  视图: 一类具有相同功能和模板的网页的集合 在 Django 中，网页和其他内容都是从视图派生而来。每一个视图表现为一个 Python 函数（或者说方法，如果是在基于类的视图里的话）。Django 将会根据用户请求的 URL 来选..."
---
[toc]

# 视图: 一类具有相同功能和模板的网页的集合

在 Django 中，网页和其他内容都是从视图派生而来。每一个视图表现为一个 Python 函数（或者说方法，如果是在基于类的视图里的话）。Django 将会根据用户请求的 URL 来选择使用哪个视图（更准确的说，是根据 URL 中域名之后的部分）。



- 视图的第一个参数必须为HttpRequest对象，还可能包含如下参数

  - 通过正则表达式组获取的位置参数
  - 通过正则表达式组获得的关键字参数
  
- 视图必须返回一个HttpResponse对象或子对象作为响应

  - 子对象： `JsonResponse`、 `HttpResponseRedirect`
  
- 视图负责接受Web请求  HttpRequest  ，进行逻辑处理，返回Web响应  HttpResponse 给请求者

  - 响应内容可以是`HTML内容`，`404错误`，`重定向`，`json数据`...

- 视图处理过程如下图：

  ![img](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/20210827101334.png)

> 使用视图时需要进行两步操作，两步操作不分先后
>
> 1. 配置`URLconf`
> 2. 在`应用/views.py`中定义视图



# X URLconf X 版本问题 X

- 在`settings.py`中：指定url配置

  ```mysql
  ROOT_URLCONF = 'bookmanager.urls'
  ```

- 在项目中`urls.py`

  - 匹配成功后，包含到应用的`urls.py`
  
    ```
    url(正则, include('应用.urls'))
    ```
  
  - 只要不是`admin/`就匹配成功，包含到应用中的`urls.py`
  
  ```mysql
  from django.conf.urls import url,include
  from django.contrib import admin
  
  urlpatterns = [
       url(r'^admin/', include(admin.site.urls)),
  
       # 只要不是‘admin/’就匹配成功，包含到应用中的urls.py
       url(r'^', include('book.urls')),
   ]
  ```

- 在应用中`urls.py`

  - 匹配成功后，调用`views.py`对应的函数

    ```
    url(正则, views.函数名)
    ```

  - 匹配`testproject/`成功就调用`views`中的`testproject`函数，测试项目逻辑

  ```mysql
    from django.conf.urls import url
    import views
  
    urlpatterns = [
        # 匹配`testproject/`成功就调用`views`中的`testproject`函数
        url(r'^testproject/$', views.testproject),
    ]
  ```

  - 视图：测试项目逻辑

    ```mysql
    from django.http import HttpResponse
    
      # 测试项目逻辑
      def testproject(request):
          return HttpResponse('测试项目逻辑')
    ```

  - 在models.py 文件中定义模型类

  ```mysql
  from django.db import models
  
  # Create your models here.
  # 准备书籍列表信息的模型类
  class BookInfo(models.Model):
      # 创建字段，字段类型...
      name = models.CharField(max_length=20, verbose_name='名称')
      pub_date = models.DateField(verbose_name='发布日期',null=True)
      readcount = models.IntegerField(default=0, verbose_name='阅读量')
      commentcount = models.IntegerField(default=0, verbose_name='评论量')
      is_delete = models.BooleanField(default=False, verbose_name='逻辑删除')
  
      class Meta:
          db_table = 'bookinfo'  # 指明数据库表名
          verbose_name = '图书'  # 在admin站点中显示的名称
  
      def __str__(self):
          """定义每个数据对象的显示信息"""
          return self.name
  
  # 准备人物列表信息的模型类
  class PeopleInfo(models.Model):
      GENDER_CHOICES = (
          (0, 'male'),
          (1, 'female')
      )
      name = models.CharField(max_length=20, verbose_name='名称')
      gender = models.SmallIntegerField(choices=GENDER_CHOICES, default=0, verbose_name='性别')
      description = models.CharField(max_length=200, null=True, verbose_name='描述信息')
      book = models.ForeignKey(BookInfo, on_delete=models.CASCADE, verbose_name='图书')  # 外键
      is_delete = models.BooleanField(default=False, verbose_name='逻辑删除')
  
      class Meta:
          db_table = 'peopleinfo'
          verbose_name = '人物信息'
  
      def __str__(self):
          return self.name
  ```

  - **生成迁移文件**、**同步到数据库中**

  ```python
  python manage.py makemigrations
  python manage.py migrate
  ```

  - **添加测试数据**

  ```sql
  insert into bookinfo(name, pub_date, readcount,commentcount, is_delete) values
  ('射雕英雄传', '1980-5-1', 12, 34, 0),
  ('天龙八部', '1986-7-24', 36, 40, 0),
  ('笑傲江湖', '1995-12-24', 20, 80, 0),
  ('雪山飞狐', '1987-11-11', 58, 24, 0);
  insert into peopleinfo(name, gender, book_id, description, is_delete)  values
      ('郭靖', 1, 1, '降龙十八掌', 0),
      ('黄蓉', 0, 1, '打狗棍法', 0),
      ('黄药师', 1, 1, '弹指神通', 0),
      ('欧阳锋', 1, 1, '蛤蟆功', 0),
      ('梅超风', 0, 1, '九阴白骨爪', 0),
      ('乔峰', 1, 2, '降龙十八掌', 0),
      ('段誉', 1, 2, '六脉神剑', 0),
      ('虚竹', 1, 2, '天山六阳掌', 0),
      ('王语嫣', 0, 2, '神仙姐姐', 0),
      ('令狐冲', 1, 3, '独孤九剑', 0),
      ('任盈盈', 0, 3, '弹琴', 0),
      ('岳不群', 1, 3, '华山剑法', 0),
      ('东方不败', 0, 3, '葵花宝典', 0),
      ('胡斐', 1, 4, '胡家刀法', 0),
      ('苗若兰', 0, 4, '黄衣', 0),
      ('程灵素', 0, 4, '医术', 0),
      ('袁紫衣', 0, 4, '六合拳', 0);
  ```



# 路由配置 URLconf

## `path()`[¶](https://docs.djangoproject.com/zh-hans/3.2/ref/urls/#path)

`path(route, view, kwargs=none, name=None)`

参数：

 [`path()`](https://docs.djangoproject.com/zh-hans/3.2/ref/urls/#django.urls.path) 具有两个必须参数：`route` 和 `view`，两个可选参数：`kwargs` 和 `name`。现在，是时候来研究这些参数的含义了。

- route: 字符串类型，匹配的请求路径
  - 可以包含角括号来捕获 URL 的一部分,并将其作为关键字参数发送给视图
  - 角括号可以包含一个转换器规格 `<int:section>` ，它限制了匹配的字符，也可以改变传递给视图的变量的类型。
- views: 视图函数
- kwargs： 任意个关键字参数可以作为一个字典传递给目标视图函数
- name: url命名空间[¶](https://docs.djangoproject.com/zh-hans/3.2/topics/http/urls/#url-namespaces)。单个应用的每个实例拥有相同的命名空间（reverse反解析）

```python
    path('', views.index, name='index'),
    path('articles/<slug:title>/<int:section>/', views.section, name='article-section'),
```

## `re_path()`[¶](https://docs.djangoproject.com/zh-hans/3.2/ref/urls/#re-path)

包含正则表达式的path

`re_path(r'^bio/(?P<username>\w+)/$', views.bio, name='bio'),`

如：username为url传入的值，

```python
re_path(r'^usernames/(?P<username>[a-zA-Z0-9_-]{5,20})/count/$', 
        views.UsernameCountView.as_view())
```



### `include()`[¶](https://docs.djangoproject.com/zh-hans/3.2/ref/urls/#include)

当包括其它 URL 模式时你应该总是使用 `include()` ， `admin.site.urls` 是唯一例外。

- `include(*module*, *namespace=None*)`
- `include(*pattern_list*)`
- `include(*(pattern_list*, *app_namespace)*, *namespace=None*)`

- 参数:	
  - module -- URLconf 模块（或模块名称）
  - namespace (str) -- 包含的 URL 条目的实例命名空间。
  - pattern_list -- 可迭代的 path() 和／或 re_path() 实例。
  - app_namespace (str) -- 被包含的 URL 条目的应用命名空间

```python
path('polls/', include('polls.urls')),
```



## 为 URL 名称添加命名空间[¶](https://docs.djangoproject.com/zh-hans/3.2/intro/tutorial03/#namespacing-url-names)

```python
app_name = 'polls'
urlpatterns = [
    path('', views.index, name='index'),
    path('<int:question_id>/', views.detail, name='detail'),
    path('<int:question_id>/results/', views.results, name='results'),
    path('<int:question_id>/vote/', views.vote, name='vote'),
]
```



## 避免硬编码

硬编码和强耦合的链接，对于一个包含很多应用的项目来说，修改起来是十分困难的。

如在 `polls/index.html` 里编写投票链接时，链接是硬编码的：

```html
<li><a href="/polls/{{ question.id }}/">{{ question.question_text }}</a></li>
```

因为在 `polls.urls` 的 [`url()`](https://docs.djangoproject.com/zh-hans/3.2/ref/urls/#django.conf.urls.url) 函数中通过 name 参数为 URL 定义了名字，你可以使用 `{% url %}` 标签代替它：

```html
<li><a href="{% url 'detail' question.id %}">{{ question.question_text }}</a></li>
```

这个标签的工作方式是在 `polls.urls` 模块的 URL 定义中寻具有指定名字的条目。

具有名字 'detail' 的 URL 是在如下语句中定义的：

``` html
...
path('<int:question_id>/', views.detail, name='detail'),
...
```

如果你想改变投票详情视图的 URL，比如想改成 `polls/specifics/12/` ，你不用在模板里修改任何东西（包括其它模板），只要在 `polls/urls.py` 里稍微修改一下就行：

```html
...
path('specifics/<int:question_id>/', views.detail, name='detail'),
...
```





# 使用 PostMan 对请求进行测试

PostMan 是一款功能强大的网页调试与发送网页 HTTP 请求的 Chrome 插件，可以**直接对写出来的路由和视图函数进行调试**，作为后端程序员是必须要知道的一个工具。

> 安装方式1：去 Chrome 商店直接搜索 PostMan 扩展程序进行安装
> 安装方式2：[官网](https://www.getpostman.com/)下载桌面版
> 安装方式3：将已下载好的 PostMan 插件文件夹拖入到浏览器

# HttpRequest对象

用HTTP协议向服务器**传参的途径**

- 提取URL的特定部分，如/weather/beijing/2018，可以从服务器端的**路由**中用正则表达式截取；
- 查询字符串（query string)，形如**key1=value1&key2=value2；**
- 请求体（body）中发送的数据，比如**表单数据、json、xml；**
- 在http报文的头（**header**）中。

## URL路径参数

[获取url参数](https://docs.djangoproject.com/zh-hans/3.2/intro/tutorial03/)

- 如果想从URL中获取值，需要在正则表达式中使用`分组`，
- 获取值分为两种方式
  - 位置参数
    - 参数的位置不能错
  - 关键字参数
    - 参数的位置可以变，跟关键字保持一致即可
- 注意：两种参数的方式不要混合使用，在一个正则表达式中只能使用一种参数方式
- 分别使用以上两种获取URL值的方式提取出`18 188`
  - `http://127.0.0.1:8000/18/188/`

### 位置参数

- 应用中`urls.py`

  ```python
   url(r'^(\d+)/(\d+)/$', views.index),
  ```

- 视图中函数: 参数的位置不能错

  ```python
  def index(request, value1, value2):
        # 构造上下文
        context = {'v1':value1, 'v2':value2}
        return render(request, 'Book/index.html', context)
  ```

### 关键字参数

- 应用中`urls.py`

  其中`?P<value1>`部分表示为这个参数定义的名称为`value1`

  ```python
  url(r'^(?P<value1>\d+)/(?P<value2>\d+)/$', views.index),
  ```

- 视图中函数: 参数的位置可以变，跟关键字保持一致即可

  ```python
  def index(request, value2, value1):
        # 构造上下文
        context = {'v1':value1, 'v2':value2}
        return render(request, 'Book/index.html', context)
  ```



## Django中的QueryDict对象

HttpRequest对象的属性GET、POST都是QueryDict类型的对象

与python字典不同，QueryDict类型的对象用来处理**同一个键带有多个值**的情况

- 方法get()：根据键获取值

  如果一个键同时拥有多个值将获取最后一个值

  如果键不存在则返回None值，可以设置默认值进行后续处理

  ```python
  get('键',默认值)
  ```

- 方法getlist()：根据键获取值，值以列表返回，可以获取指定键的所有值

  如果键不存在则返回空列表[]，可以设置默认值进行后续处理

  ```python
  getlist('键',默认值)
  ```



## 查询字符串Query String

获取请求路径中的查询字符串参数（形如?k1=v1&k2=v2），可以通过request.GET属性获取，返回QueryDict对象。

```python
# /get/?a=1&b=2&a=3

def get(request):
    a = request.GET.get('a')
    b = request.GET.get('b')
    alist = request.GET.getlist('a')
    print(a)  # 3
    print(b)  # 2
    print(alist)  # ['1', '3']
    return HttpResponse('OK')
```

**重要：查询字符串不区分请求方式，即假使客户端进行POST方式的请求，依然可以通过request.GET获取请求中的查询字符串数据。**



## 请求体	request.POST

请求体数据格式不固定，可以是表单类型字符串，可以是JSON字符串，可以是XML字符串，应区别对待。

可以发送请求体数据的请求方式有**POST**、**PUT**、**PATCH**、**DELETE**。

**Django默认开启了CSRF防护**，会对上述请求方式进行CSRF防护验证，在测试时可以关闭CSRF防护机制，方法为在settings.py文件中注释掉CSRF中间件



### 表单类型 	Form Data、request.body

前端发送的表单类型的请求体数据，可以通过request.POST属性获取，返回QueryDict对象。

```python
def post(request):
    a = request.POST.get('a')
    b = request.POST.get('b')
    alist = request.POST.getlist('a')
    print(a)
    print(b)
    print(alist)
    return HttpResponse('OK')
```



### 非表单类型 Non-Form Data

非表单类型的请求体数据，Django无法自动解析，可以通过**request.body**属性获取最原始的请求体数据，自己按照请求体格式（JSON、XML等）进行解析。**request.body返回bytes类型。**

例如要获取请求体中的如下JSON数据

```json
{"a": 1, "b": 2}
```

可以进行如下方法操作：

```python
import json

def post_json(request):
    json_str = request.body
    json_str = json_str.decode()  # python3.6 无需执行此步
    req_data = json.loads(json_str)
    print(req_data['a'])
    print(req_data['b'])
    return HttpResponse('OK')
```



## 请求头	request.META

可以通过**request.META**属性获取请求头headers中的数据，**request.META为字典类型**。

常见的请求头如：

- `CONTENT_LENGTH`– The length of the request body (as a string).
- `CONTENT_TYPE`– The MIME type of the request body.
- `HTTP_ACCEPT`– Acceptable content types for the response.
- `HTTP_ACCEPT_ENCODING`– Acceptable encodings for the response.
- `HTTP_ACCEPT_LANGUAGE`– Acceptable languages for the response.
- `HTTP_HOST`– The HTTP Host header sent by the client.
- `HTTP_REFERER`– The referring page, if any.
- `HTTP_USER_AGENT`– The client’s user-agent string.
- `QUERY_STRING`– The query string, as a single (unparsed) string.
- `REMOTE_ADDR`– The IP address of the client.
- `REMOTE_HOST`– The hostname of the client.
- `REMOTE_USER`– The user authenticated by the Web server, if any.
- `REQUEST_METHOD`– A string such as`"GET"`or`"POST"`.
- `SERVER_NAME`– The hostname of the server.
- `SERVER_PORT`– The port of the server (as a string).

具体使用如:

```python
def get_headers(request):
    print(request.META['CONTENT_TYPE'])
    return HttpResponse('OK')
```



## 其他常用HttpRequest对象属性

- **method**：一个字符串，表示请求使用的HTTP方法，常用值包括：'GET'、'POST'。
- **user：请求的用户对象。**
- path：一个字符串，表示请求的页面的完整路径，不包含域名和参数部分。
- encoding：一个字符串，表示提交的数据的编码方式。
  - 如果为None则表示使用浏览器的默认设置，一般为utf-8。
  - 这个属性是可写的，可以通过修改它来修改访问表单数据使用的编码，接下来对属性的任何访问将使用新的encoding值。
- FILES：一个类似于字典的对象，包含所有的上传文件。



# HttpResponse对象 

视图在接收请求并处理后，必须返回HttpResponse对象或子对象。HttpRequest对象由Django创建，HttpResponse对象由开发人员创建。



## HttpResponse 

可以使用**django.http.HttpResponse**来构造响应对象。

```python
HttpResponse(content='响应体', content_type='响应体数据类型', status='状态码')
```

也可通过**HttpResponse**对象属性来设置响应体、响应体数据类型、状态码：

- content：表示返回的内容。
- status_code：返回的HTTP响应状态码。

响应头可以直接将HttpResponse对象当做字典进行响应头键值对的设置：

```python
response = HttpResponse()
response['itcast'] = 'Python'  # 自定义响应头Itcast, 值为Python
```

示例：

```python
from django.http import HttpResponse

def response(request):
    return HttpResponse('itcast python', status=400)
    或者
    response = HttpResponse('itcast python')
    response.status_code = 400
    response['itcast'] = 'Python'
    return response
```



## HttpResponse子类 

Django提供了一系列HttpResponse的子类，可以快速设置状态码

- HttpResponseRedirect 301
- HttpResponsePermanentRedirect 302
- HttpResponseNotModified 304
- HttpResponseBadRequest 400
- HttpResponseNotFound 404
- HttpResponseForbidden 403
- HttpResponseNotAllowed 405
- HttpResponseGone 410
- HttpResponseServerError 500



## JsonResponse 

若要返回json数据，可以使用JsonResponse来构造响应对象，作用：

- 帮助我们将数据转换为json字符串
- 设置响应头**Content-Type**为**application/json**

```
from django.http import JsonResponse

def response(request):
    return JsonResponse({'city': 'beijing', 'subject': 'python'})
```



## redirect重定向 

```
from django.shortcuts import redirect

def response(request):
    return redirect('/get_header')
```



# 状态保持 	Cookie&Session

- 浏览器请求服务器是无状态的。
- **无状态**：指一次用户请求时，浏览器、服务器无法知道之前这个用户做过什么，每次请求都是一次新的请求。
- **无状态原因**：浏览器与服务器是使用Socket套接字进行通信的，服务器将请求结果返回给浏览器之后，会关闭当前的Socket连接，而且服务器也会在处理页面完毕之后销毁页面对象。
- 有时需要保持下来用户浏览的状态，比如用户是否登录过，浏览过哪些商品等
- 实现状态保持主要有两种方式：
  - 在客户端存储信息使用`Cookie`
  - 在服务器端存储信息使用`Session`

## Cookie 

Cookie是由服务器端生成，发送给User-Agent（一般是浏览器），浏览器会将Cookie的**key/value**(**Cookie以键值对的格式进行信息的存储**)保存到某个目录下的文本文件内，下次请求同一网站时就发送该Cookie给服务器（前提是浏览器设置为启用cookie）。

Cookie名称和值可以由服务器端开发自己定义，这样服务器可以知道该用户是否是合法用户以及是否需要重新登录等。服务器可以利用Cookies包含信息的任意性来筛选并经常性维护这些信息，以判断在HTTP传输中的状态。Cookies最典型记住用户名。

Cookie是存储在浏览器中的一段纯文本信息，建议不要存储敏感信息如密码，因为电脑上的浏览器可能被其它人使用。

Cookie基于域名安全，不同域名的Cookie是不能互相访问的，如访问itcast.cn时向浏览器中写了Cookie信息，使用同一浏览器访问baidu.com时，无法访问到itcast.cn写的Cookie信息。

当浏览器请求某网站时，会将浏览器存储的跟网站相关的所有Cookie信息提交给网站服务器。



### 设置Cookie 

可以通过**HttpResponse**对象中的**set_cookie**方法来设置cookie。

```python
HttpResponse.set_cookie(cookie名, value=cookie值, max_age=cookie有效期)
```

- **max_age**单位为秒，默认为**None** 。如果是临时cookie，可将max_age设置为None。

示例：

```python
def cookie(request):
    response = HttpResponse('ok')
    response.set_cookie('itcast1', 'python1')  # 临时cookie
    response.set_cookie('itcast2', 'python2', max_age=3600)  # 有效期一小时
    return response
```



### 读取Cookie 

可以通过**HttpResponse**对象的**COOKIES**属性来读取本次请求携带的cookie值。**request.COOKIES为字典类型**。

```python
def cookie(request):
    cookie1 = request.COOKIES.get('itcast1')
    print(cookie1)
    return HttpResponse('OK')
```



### 删除Cookie 

可以通过**HttpResponse**对象中的delete_cookie方法来删除。

```python
response.delete_cookie('itcast2')
```





## Session 

**Django项目默认启用Session。**

可以在settings.py文件的中间件中查看，可以设置session数据的存储方式，可以保存在数据库、本地缓存等。

### Session 的存储

#### 默认将session存储在数据库 

存储在数据库中，如下设置可以写，也可以不写，**这是默认存储方式**。

```python
SESSION_ENGINE='django.contrib.sessions.backends.db'
```

如果存储在数据库中的django_session的table中，需要在项INSTALLED_APPS中安装Session应用。

<img src="https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/20210901171218.png" alt="Screenshot 2021-09-01 at 5.11.19 PM" style="zoom:33%;" align="left"/>

由表结构可知，操作Session包括三个数据：键，值，过期时间。



#### session存储在本机内存中

本地缓存，如果丢失则不能找回，比数据库的方式读写更快。

```python
SESSION_ENGINE='django.contrib.sessions.backends.cache'
```



#### 混合存储 

优先从本机内存中存取，如果没有则从数据库中存取。

```python
SESSION_ENGINE='django.contrib.sessions.backends.cached_db'
```



#### 在redis中保存session

需要引入第三方扩展，我们可以使用**django-redis**来解决。

[网络连接](https://django-redis-chs.readthedocs.io/zh_CN/latest/)

- 安装扩展

```
pip install django-redis
```

- 配置

在settings.py文件中做如下设置

```python
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379/1',
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        }
    }
}
SESSION_ENGINE = 'django.contrib.sessions.backends.cache'
SESSION_CACHE_ALIAS = 'default'
```

如果redis的ip地址不是本地回环127.0.0.1，而是其他地址，访问Django时，可能出现Redis连接错误**ConnectionError at /response/**

解决方法：

修改redis的配置文件，添加特定ip地址。

打开redis的配置文件

```
sudo vim /etc/redis/redis.conf
```

在如下配置项进行修改（如要添加10.211.55.5地址）

```
bind 127.0.0.1 10.211.55.5
```

重新启动redis服务

```
sudo service redis-server restart
```



## Session操作 

通过HttpRequest对象的session属性进行会话的读写操作。

1） 以键值对的格式**写session**。

```python
request.session['键']=值
```

2）根据键**读**取值。

```python
request.session.get('键',默认值)
```

3）删除值部分。

```python
request.session.clear()
```

4）删除session的整条数据

```python
request.session.flush()
```

5）只删除某个键及对应的值。

```python
del request.session['键']
```

6）设置session的有效期

```python
request.session.set_expiry(value)
```

- 如果value是一个整数，session将在value秒没有活动后过期。
- 如果value为0，那么用户session的Cookie将在用户的浏览器关闭时过期。
- 如果value为None，那么session有效期将采用系统默认值， **默认为两周**，可以通过在settings.py中设置**SESSION_COOKIE_AGE**来设置全局默认值。



# 类视图 

思考：一个视图，是否可以处理两种逻辑？比如get和post请求逻辑。



## 注册视图处理get和post请求 

以函数的方式定义的视图称为**函数视图**，函数视图便于理解。但是遇到一个视图对应的路径提供了多种不同HTTP请求方式的支持时，便需要在一个函数中编写不同的业务逻辑，代码可读性与复用性都不佳。

```python
def register(request):
    """处理注册"""

    # 获取请求方法，判断是GET/POST请求
    if request.method == 'GET':
        # 处理GET请求，返回注册页面
        return render(request, 'register.html')
    else:
        # 处理POST请求，实现注册逻辑
        return HttpResponse('这里实现注册逻辑')
```

## 类视图使用 

在Django中也可以使用类来定义一个视图，称为**类视图**。

使用类视图可以将视图对应的不同请求方式以类中的不同方法来区别定义。如下所示

```python
from django.views.generic import View

class RegisterView(View):
    """类视图：处理注册"""

    def get(self, request):
        """处理GET请求，返回注册页面"""
        return render(request, 'register.html')

    def post(self, request):
        """处理POST请求，实现注册逻辑"""
        return HttpResponse('这里实现注册逻辑')
```

类视图的好处：

- **代码可读性好**
- **类视图相对于函数视图有更高的复用性** ， 如果其他地方需要用到某个类视图的某个特定逻辑，直接继承该类视图即可

定义类视图需要继承自Django提供的父类**View**，可使用`from django.views.generic import View`或者`from django.views.generic.base import View`导入，定义方式如上所示。

**配置路由时，使用类视图的**`as_view()`**方法来添加**。

```python
urlpatterns = [
    # 视图函数：注册
    # url(r'^register/$', views.register, name='register'),
    # 类视图：注册
    url(r'^register/$', views.RegisterView.as_view(), name='register'),
]
```

## 类视图原理 

```python
@classonlymethod
    def as_view(cls, **initkwargs):
        """
        Main entry point for a request-response process.
        """
        ...省略代码...

        def view(request, *args, **kwargs):
            self = cls(**initkwargs)
            if hasattr(self, 'get') and not hasattr(self, 'head'):
                self.head = self.get
            self.request = request
            self.args = args
            self.kwargs = kwargs
            # 调用dispatch方法，按照不同请求方式调用不同请求方法
            return self.dispatch(request, *args, **kwargs)

        ...省略代码...

        # 返回真正的函数视图
        return view


    def dispatch(self, request, *args, **kwargs):
        # Try to dispatch to the right method; if a method doesn't exist,
        # defer to the error handler. Also defer to the error handler if the
        # request method isn't on the approved list.
        if request.method.lower() in self.http_method_names:
            handler = getattr(self, request.method.lower(), self.http_method_not_allowed)
        else:
            handler = self.http_method_not_allowed
        return handler(request, *args, **kwargs)
```

## 类视图的多继承重写dispatch 

```python
class CenterView(View):

    def get(self,request):
        return HttpResponse("OK")

    def post(self,request):
        return HttpResponse("OK")
```

使用面向对象多继承的特性。

```python
class CenterView(LoginRequireMixin,View):

    def get(self,request):
        return HttpResponse("OK")

    def post(self,request):
        return HttpResponse("OK")
```





# [通用视图](https://docs.djangoproject.com/zh-hans/3.2/ref/class-based-views/generic-display/#django.views.generic.list.ListView)

 [`ListView`](https://docs.djangoproject.com/zh-hans/3.2/ref/class-based-views/generic-display/#django.views.generic.list.ListView)：显示一个对象列表

[`DetailView`](https://docs.djangoproject.com/zh-hans/3.2/ref/class-based-views/generic-display/#django.views.generic.detail.DetailView)：显示一个特定类型对象的详细信息页面

```python
class IndexView(generic.ListView):
    template_name = 'polls/index.html'
    context_object_name = 'latest_question_list'

    def get_queryset(self):
        """Return the last five published questions."""
        return Question.objects.order_by('-pub_date')[:5]


class DetailView(generic.DetailView):
    model = Question
    template_name = 'polls/detail.html'


class ResultsView(generic.DetailView):
    model = Question
    template_name = 'polls/results.html'


def vote(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    try:
        selected_choice = question.choice_set.get(pk=request.POST['choice'])
    except (KeyError, Choice.DoesNotExist):
        # Redisplay the question voting form.
        return render(request, 'polls/detail.html', {
            'question': question,
            'error_message': "You didn't select a choice.",
        })
    else:
        selected_choice.votes = F('votes') + 1
        selected_choice.save()
        # Always return an HttpResponseRedirect after successfully dealing
        # with POST data. This prevents data from being posted twice if a
        # user hits the Back button.
        return HttpResponseRedirect(reverse('polls:results', args=(question.id,)))
```

DetailView 期望从 URL 中捕获名为 "pk" 的主键值，所以我们为通用视图把 question_id 改成 pk

```python
app_name = 'polls'
urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('<int:pk>/', views.DetailView.as_view(), name='detail'),
    path('<int:pk>/results/', views.ResultsView.as_view(), name='results'),
    path('<int:question_id>/vote/', views.vote, name='vote'),
]
```



# 中间件  MIDDLEWARE

Django中的中间件是一个轻量级、底层的插件系统，可以介入Django的请求和响应处理过程，修改Django的输入或输出。中间件的设计为开发者提供了一种无侵入式的开发方式，增强了Django框架的健壮性。

我们可以使用中间件，在Django处理视图的不同阶段对输入或输出进行干预。

[中间件 | Django 文档 )](https://docs.djangoproject.com/zh-hans/3.2/topics/http/middleware/)

## 中间件的定义方法 

定义一个中间件工厂函数，然后返回一个可以被调用的中间件。

中间件工厂函数需要接收一个可以调用的get_response对象。

返回的中间件也是一个可以被调用的对象，并且像视图一样需要接收一个request对象参数，返回一个response对象。

```python
def simple_middleware(get_response):
    # 此处编写的代码仅在Django第一次配置和初始化的时候执行一次。

    def middleware(request):
        # 此处编写的代码会在每个请求处理视图前被调用。

        response = get_response(request)

        # 此处编写的代码会在每个请求处理视图之后被调用。

        return response

    return middleware
```

例如，在book应用中新建一个middleware.py文件，

```python
def my_middleware(get_response):
    print('init 被调用')
    def middleware(request):
        print('before request 被调用')
        response = get_response(request)
        print('after response 被调用')
        return response
    return middleware
```

**定义好中间件后，需要在settings.py 文件中添加注册中间件**

```python
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    # 'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'book.middleware.my_middleware',  # 添加中间件
]
```

定义一个视图进行测试

```python
def middleware(request):
    print('view 视图被调用')
    return HttpResponse('OK')
```

执行结果

*（图片缺失：middlewareresult.png）*

**注意：Django运行在调试模式下，中间件init部分有可能被调用两次。**

## 2 多个中间件的执行顺序 

- 在请求视图被处理**前**，中间件**由上至下**依次执行
- 在请求视图被处理**后**，中间件**由下至上**依次执行

![img](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/20210901172622.png)

定义两个中间件

```python
def my_middleware(get_response):
    print('init 被调用')
    def middleware(request):
        print('before request 被调用')
        response = get_response(request)
        print('after response 被调用')
        return response
    return middleware

def my_middleware2(get_response):
    print('init2 被调用')
    def middleware(request):
        print('before request 2 被调用')
        response = get_response(request)
        print('after response 2 被调用')
        return response
    return middleware
```

注册添加两个中间件

```python
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    # 'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'users.middleware.my_middleware',  # 添加
    'users.middleware.my_middleware2',  # 添加
]
```

执行结果

```python
init2 被调用
init 被调用
before request 被调用
before request 2 被调用
view 视图被调用
after response 2 被调用
after response 被调用
```
