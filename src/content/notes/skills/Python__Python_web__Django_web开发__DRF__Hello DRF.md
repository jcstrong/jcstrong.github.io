---
title: "Hello DRF"
category: skills
tags: ["Python", "Web"]
featured: false
source: "Python/Python_web/Django_web开发/DRF/Hello DRF.md"
updated: 2022-05-23
readingTime: 8
summary: "toc  前后端分离 降低耦合度  前后端不分离 后端渲染页面或重定向 <img src=\"https://chenjunxs.osscnhangzhou.aliyuncs.com/img/20210901181050.png\" style..."
---
[toc]

# 前后端分离

降低耦合度

### 前后端不分离

后端渲染页面或重定向

<img src="https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/20210901181050.png" style="zoom: 33%;" />

直接将数据返回给页面

```python
return  render(request, 'index. html', context={'name': 'python'})
```

页面

```html
<div>
    <h1>{{ name }}</h1>
</div>
```



### 前后端分离

后端仅返回前端所需的数据

从后端请求的数据如何加载到前端中，都由前端自己决定，网页有网页的处理方式，App有App的处理方式，但无论哪种前端，所需的数据基本相同，后端仅需开发一套逻辑对外提供数据即可。

通常将后端开发的每个视图都称为一个**接口**，或者**API**，前端通过访问接口来对数据进行增删改查。

<img src="https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/20210901181044.png" alt="前后端分离" style="zoom:33%;" />

将JSON数据返回给前端。

```
return JsonResponse({‘name': ‘python'})
```

前端用JS(使用ajax)获取加载数据

```js
new Vue({
            el:'#app',
            data:{
                name:'',
                btitle:'',
                message:'',
                book_list:[]
            },)
```

> ### 序列化过程
>
> 将程序中的一个数据结构类型转换为其他格式
>
> 如：将Django中的模型类对象装换为JSON字符串
>
> ### 反序列化过程
>
> 将其他格式（字典、JSON、XML等）转换为程序中的数据
>
> 如：将JSON字符串转换为Django中的模型类对象

# Restful	API设计风格

API接口如何定义

例如对于后端数据库中保存了商品的信息，前端可能需要对商品数据进行增删改查，那相应的每个操作后端都需要提供一个API接口：

 ```
   1. POST /add-goods 增加商品
   2. POST /delete-goods 删除商品
   3. POST /update-goods 修改商品
   4. GET /get-goods 查询商品信息
 ```

对于接口的请求方式与路径，存在一种统一的定义方式，被广大开发人员接受认可的方式呢？

这就是被普遍采用的API的RESTful设计风格。

web接口由 **请求方式、请求路径、请求参数、返回结果** 组成。

例如一个登陆接口

```python
# 请求方式：GET
# 请求路径：login/?username=python
# 请求参数：username
# 返回结果：{'message':'ok'} json
```

### API部署

#### 域名

实际开发中，应该尽量将API部署在专用域名之下。

```http
https://api.example.com
```

如果确定API很简单，不会有进一步扩展，可以考虑放在主域名下。

```http
https://example.org/api/
```

#### 版本（Versioning）

应该将API的版本号放入URL。

```powershell
http://www.example.com/app/1.0/foo
http://www.example.com/app/1.1/foo
http://www.example.com/app/2.0/foo
```

另一种做法是，将版本号放在HTTP头信息中，但不如放入URL方便和直观。[Github](https://developer.github.com/v3/media/#request-specific-version)采用这种做法。

因为不同的版本，可以理解成**同一种资源的不同表现形式**，所以应该采用同一个URL。版本号可以在HTTP请求头信息的Accept字段中进行区分（参见[Versioning REST Services](http://www.informit.com/articles/article.aspx?p=1566460)）：

```powershell
Accept: vnd.example-com.foo+json; version=1.0
Accept: vnd.example-com.foo+json; version=1.1
Accept: vnd.example-com.foo+json; version=2.0
```

#### 路径（Endpoint）

路径又称"终点"（endpoint），表示API的具体网址，每个网址代表一种资源（resource）

- 资源作为网址，只能有名词，不能有动词，而且所用的名词往往与数据库的表名对应。
- API中的名词应该使用复数。无论子资源或者所有资源。

不好的例子:

```http
/getProducts
/listOrders
/retreiveClientByOrder?orderId=1
```

对于一个简洁结构，你应该**始终用名词**。 此外，利用的HTTP方法可以分离网址中的资源名称的操作。

```http
查	GET /products ：将返回所有产品清单
增	POST /products ：将产品新建到集合
查	GET /products/4 ：将获取产品 4
改	PUT /products/4 ：将更新产品 4	（或PATCH）
```

获取产品的API可以这样定义

```http
获取单个产品：http://127.0.0.1:8080/AppName/rest/products/1
获取所有产品: http://127.0.0.1:8080/AppName/rest/products
```

#### HTTP动词

对于资源的具体操作类型，由HTTP动词表示。

常用的HTTP动词有下面四个（括号里是对应的SQL命令）。

- GET（SELECT）：从服务器取出资源（一项或多项）。
- POST（CREATE）：在服务器新建一个资源。
- PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）。
- DELETE（DELETE）：从服务器删除资源。

还有三个不常用的HTTP动词。

- PATCH（UPDATE）：在服务器更新(更新)资源（客户端提供改变的属性）。
- HEAD：获取资源的元数据。
- OPTIONS：获取信息，关于资源的哪些属性是客户端可以改变的。

下面是一些例子。

```http
GET /zoos：									列出所有动物园
POST /zoos：									新建一个动物园（上传文件）
GET /zoos/ID：								获取某个指定动物园的信息
PUT /zoos/ID：								更新某个指定动物园的信息（提供该动物园的全部信息）
PATCH /zoos/ID：							更新某个指定动物园的信息（提供该动物园的部分信息）
DELETE /zoos/ID：						删除某个动物园
GET /zoos/ID/animals：				列出某个指定动物园的所有动物
DELETE /zoos/ID/animals/ID：	删除某个指定动物园的指定动物
```

#### 过滤信息（Filtering）

如果记录数量很多，服务器不可能都将它们返回给用户。API应该提供参数，过滤返回结果。

下面是一些常见的参数。

```http
?limit=10：指定返回记录的数量
?offset=10：指定返回记录的开始位置。
?page=2&per_page=100：指定第几页，以及每页的记录数。
?sortby=name&order=asc：指定返回结果按照哪个属性排序，以及排序顺序。
?animal_type_id=1：指定筛选条件
```

参数的设计允许存在冗余，即允许API路径和URL参数偶尔有重复。比如，GET /zoos/ID/animals 与 GET /animals?zoo_id=ID 的含义是相同的。

#### 状态码（Status Codes）

服务器向用户返回的状态码和提示信息，常见的有以下一些（方括号中是该状态码对应的HTTP动词）。

```js
200 OK - [GET]：服务器成功返回用户请求的数据
201 CREATED - [POST/PUT/PATCH]：用户新建或修改数据成功。
202 Accepted - [*]：表示一个请求已经进入后台排队（异步任务）
204 NO CONTENT - [DELETE]：用户删除数据成功。
400 INVALID REQUEST - [POST/PUT/PATCH]：用户发出的请求有错误，服务器没有进行新建或修改数据的操作
401 Unauthorized - [*]：表示用户没有权限（令牌、用户名、密码错误）。
403 Forbidden - [*] 表示用户得到授权（与401错误相对），但是访问是被禁止的。
404 NOT FOUND - [*]：用户发出的请求针对的是不存在的记录，服务器没有进行操作，该操作是幂等的。
406 Not Acceptable - [GET]：用户请求的格式不可得（比如用户请求JSON格式，但是只有XML格式）。
410 Gone -[GET]：用户请求的资源被永久删除，且不会再得到的。
422 Unprocesable entity - [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误。
500 INTERNAL SERVER ERROR - [*]：服务器发生错误，用户将无法判断发出的请求是否成功。
```

状态码的完全列表参见[这里](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html)或[这里](https://zh.wikipedia.org/wiki/HTTP状态码)。

#### 错误处理（Error handling）

如果状态码是4xx，服务器就应该向用户返回出错信息。一般来说，返回的信息中将error作为键名，出错信息作为键值即可。

```json
{
    error: "Invalid API key"
}
```

#### 返回结果

针对不同操作，服务器向用户返回的结果应该符合以下规范。

- GET /collection：返回资源对象的列表（数组）
- GET /collection/resource：返回单个资源对象
- POST /collection：返回新生成的资源对象
- PUT /collection/resource：返回完整的资源对象
- PATCH /collection/resource：返回完整的资源对象
- DELETE /collection/resource：返回一个空文档

服务器返回的数据格式，应该尽量使用JSON，避免使用XML。 



# Django REST framework

- Django REST framework 框架是一个用于构建Web API 的强大而又灵活的工具。

- 通常简称为DRF框架 或 REST framework。

- DRF框架是建立在Django框架基础之上，由Tom Christie大牛二次开发的开源项目。

![drf_logo](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/20210908114903.png)

Django REST framework可以帮助我们简化以下两部分的代码编写，大大提高REST API的开发速度。

- 在**序列化与反序列化**时，虽然操作的数据不尽相同，但是执行的过程却是相似的，也就是说这部分代码是可以复用简化编写的。

- 在**开发REST API的视图**中，虽然每个视图具体操作的数据不同，但增、删、改、查的实现流程基本套路化，所以这部分代码也是可以复用简化编写的：
  - **增**：校验请求数据 -> 执行反序列化过程 -> 保存数据库 -> 将保存的对象序列化并返回
  - **删**：判断要删除的数据是否存在 -> 执行数据库删除
  - **改**：判断要修改的数据是否存在 -> 校验请求的数据 -> 执行反序列化过程 -> 保存数据库 -> 将保存的对象序列化并返回
  - **查**：查询数据库 -> 将数据序列化并返回

Django REST framework 的特点

- 提供了定义序列化器Serializer的方法，可以快速根据 Django ORM 或者其它库自动序列化/反序列化；
- 提供了丰富的类视图、Mixin扩展类，简化视图的编写；
- 丰富的定制层级：函数视图、类视图、视图集合到自动生成 API，满足各种需要；
- 多种身份认证和权限认证方式的支持；
- 内置了限流系统；
- 直观的 API web 界面；
- 可扩展性，插件丰富

> [django-rest-framework官方文档](http://www.django-rest-framework.org/)、
> [Github源码](https://github.com/encode/django-rest-framework/tree/master)

## 安装使用DRF

- 安装

```powershell
pip install djangorestframework
```

- 添加rest_framework应用

我们利用在Django框架学习中创建的demo工程，在**settings.py**的**INSTALLED_APPS**中添加'rest_framework'。

```python
INSTALLED_APPS = [
    ...
    'rest_framework',
]
```

接下来就可以使用DRF进行开发了。



