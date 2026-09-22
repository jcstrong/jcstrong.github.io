---
title: "View 视图集"
category: skills
folderPath: "Python/Python_web/Django_web开发/DRF"
folderTop: "Python"
tags: ["Python", "Web"]
featured: false
source: "Python/Python_web/Django_web开发/DRF/View 视图集.md"
updated: "2022-05-23"
readingTime: 11
summary: "toc  视图集ViewSet  增强路由匹配规则  使用视图集ViewSet，可以将一系列逻辑相关的动作放到一个类中：    list 提供一组数据    retrieve 提供单个数据    create 创建数据    update ..."
---
[toc]



# 视图集ViewSet

- 增强路由匹配规则

- 使用视图集ViewSet，可以将一系列逻辑相关的动作放到**一个类**中：
  - list() 提供一组数据
  - retrieve() 提供单个数据
  - create() 创建数据
  - update() 保存数据
  - destory() 删除数据

- ViewSet视图集类不再实现get()、post()等方法，而是实现动作 **action** 如 list() 、create() 等。

	视图集只在使用as_view()方法的时候，才会将**action**动作与具体请求方式对应上。如：

  ```python
  class BookInfoViewSet(viewsets.ViewSet):
  
      def list(self, request):
          ...
  
      def retrieve(self, request, pk=None):
          ...
  ```



- **action属性**		获取当前请求视图集时的action动作是哪个。

  ```python
  def get_serializer_class(self):
      if self.action == 'create':
          return OrderCommitSerializer
      else:
          return OrderDataSerializer
  ```



## 视图集父类

#### ViewSet	继承自`APIView`	提供：身份认证、权限校验、流量管理

继承自`APIVIew`，在ViewSet中，没有提供任何动作action方法，需要我们自己实现action方法。

#### GenericViewSet	继承自`GenericAPIView`	提供：get_object、get_queryset

继承自`GenericAPIVIew`，作用也与GenericAPIVIew类似，便于列表视图与详情信息视图的开发。

#### ModelViewSet

继承自`GenericAPIVIew`，同时包括了ListModelMixin、RetrieveModelMixin、CreateModelMixin、UpdateModelMixin、DestoryModelMixin。

#### ReadOnlyModelViewSet

继承自`GenericAPIVIew`，同时包括了ListModelMixin、RetrieveModelMixin。





## 视图集中定义附加action动作

`rest_framework.decorators.action`装饰器。在视图集中，除了上述默认的方法动作外，还可以添加自定义动作。

以action装饰器装饰的方法名会作为action动作名，与list、retrieve等同。

action装饰器可以接收两个参数：

- **methods**: 该action支持的请求方式，列表传递

- **detail**

  : 表示是action中要处理的是否是视图资源的对象（即是否通过url路径获取主键）

  - True 表示使用通过URL获取的主键对应的数据对象
  - False 表示不使用URL获取主键

举例：

```python
from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet
from rest_framework.decorators import action

class BookInfoViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, GenericViewSet):
    queryset = BookInfo.objects.all()
    serializer_class = BookInfoSerializer

    # detail为False 表示不需要处理具体的BookInfo对象
    @action(methods=['get'], detail=False)
    def latest(self, request):
        """
        返回最新的图书信息
        """
        book = BookInfo.objects.latest('id')
        serializer = self.get_serializer(book)
        return Response(serializer.data)

    # detail为True，表示要处理具体与pk主键对应的BookInfo对象
    @action(methods=['put'], detail=True)
    def read(self, request, pk):
        """
        修改图书的阅读量数据
        """
        book = self.get_object()
        book.bread = request.data.get('read')
        book.save()
        serializer = self.get_serializer(book)
        return Response(serializer.data)
```

url的定义

```python
urlpatterns = [
    url(r'^books/$', views.BookInfoViewSet.as_view({'get': 'list'})),
    url(r'^books/latest/$', views.BookInfoViewSet.as_view({'get': 'latest'})),
    url(r'^books/(?P<pk>\d+)/$', views.BookInfoViewSet.as_view({'get': 'retrieve'})),
    url(r'^books/(?P<pk>\d+)/read/$', views.BookInfoViewSet.as_view({'put': 'read'})),
]
```



## 视图集的继承关系

![视图集的继承关系](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/20210909131216.png)





# 路由Routers

对于视图集ViewSet，我们除了可以自己手动指明请求方式与动作action之间的对应关系外，还可以使用Routers来帮助我们快速实现路由信息。

REST framework提供了两个router

- **SimpleRouter**
- **DefaultRouter**

1） 创建router对象，并注册视图集，例如

```python
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'books', BookInfoViewSet, base_name='book')
```

register(prefix, viewset, base_name)

- prefix 该视图集的路由前缀
- viewset 视图集
- base_name 路由名称的前缀

如上述代码会形成的路由如下：

```python
^books/$    name: book-list
^books/{pk}/$   name: book-detail
```

2）添加路由数据

可以有两种方式：

```python
urlpatterns = [
    ...
]
urlpatterns += router.urls
```

或

```python
urlpatterns = [
    ...
    url(r'^', include(router.urls))
]
```



## @action装饰器

```python
class BookInfoViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, GenericViewSet):
    queryset = BookInfo.objects.all()
    serializer_class = BookInfoSerializer

    @action(methods=['get'], detail=False)
    def latest(self, request):
        ...

    @action(methods=['put'], detail=True)
    def read(self, request, pk):
        ...
```

此视图集会形成的路由：

```python
^books/latest/$    name: book-latest
^books/{pk}/read/$  name: book-read
```

## action属性



## 路由router形成URL的方式

1） SimpleRouter

![SimpleRouter](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/20210909150926.png)

2）DefaultRouter	（继承自SimpleRouter）

![DefaultRouter](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/20210909150954.png)

DefaultRouter与SimpleRouter的区别是:
DefaultRouter会多附带一个默认的API根视图，返回一个包含所有列表视图的超链接响应数据。 

# 其他功能

## 认证Authentication

可以在配置文件中配置全局默认的认证方案

```python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.BasicAuthentication',   # 基本认证
        'rest_framework.authentication.SessionAuthentication',  # session认证
    )
}
```

也可以在每个视图中通过设置authentication_classess属性来设置

```python
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.views import APIView

class ExampleView(APIView):
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    ...
```

认证失败会有两种可能的返回值：

- 401 Unauthorized 未认证
- 403 Permission Denied 权限被禁止

## 权限Permissions

权限控制可以限制用户对于视图的访问和对于具体数据对象的访问。

- 在执行视图的dispatch()方法前，会先进行视图访问权限的判断
- 在通过get_object()获取具体对象时，会进行对象访问权限的判断

### 使用

可以在配置文件中设置默认的权限管理类，如

```python
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    )
}
```

如果未指明，则采用如下默认配置

```python
'DEFAULT_PERMISSION_CLASSES': (
   'rest_framework.permissions.AllowAny',
)
```

也可以在具体的视图中通过permission_classes属性来设置，如

```python
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

class ExampleView(APIView):
    permission_classes = (IsAuthenticated,)
    ...
```

### 提供的权限

- AllowAny 允许所有用户
- IsAuthenticated 仅通过认证的用户
- IsAdminUser 仅管理员用户
- IsAuthenticatedOrReadOnly 认证的用户可以完全操作，否则只能get读取

### 举例

```python
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import RetrieveAPIView

class BookDetailView(RetrieveAPIView):
    queryset = BookInfo.objects.all()
    serializer_class = BookInfoSerializer
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
```

## 限流Throttling

可以对接口访问的频次进行限制，以减轻服务器压力。

### 使用

可以在配置文件中，使用`DEFAULT_THROTTLE_CLASSES` 和 `DEFAULT_THROTTLE_RATES`进行全局配置，

```python
REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_CLASSES': (
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle'
    ),
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/day',
        'user': '1000/day'
    }
}
```

`DEFAULT_THROTTLE_RATES` 可以使用 `second`, `minute`, `hour` 或`day`来指明周期。

也可以在具体视图中通过throttle_classess属性来配置，如

```python
from rest_framework.throttling import UserRateThrottle
from rest_framework.views import APIView

class ExampleView(APIView):
    throttle_classes = (UserRateThrottle,)
    ...
```

> 只针对具体视图

### 可选限流类

1） AnonRateThrottle

限制所有匿名未认证用户，使用IP区分用户。

使用`DEFAULT_THROTTLE_RATES['anon']` 来设置频次

2）UserRateThrottle

限制认证用户，使用User id 来区分。

使用`DEFAULT_THROTTLE_RATES['user']` 来设置频次

3）ScopedRateThrottle

限制用户对于每个视图的访问频次，使用ip或user id。

例如：

```
class ContactListView(APIView):
    throttle_scope = 'contacts'
    ...

class ContactDetailView(APIView):
    throttle_scope = 'contacts'
    ...

class UploadView(APIView):
    throttle_scope = 'uploads'
    ...
REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_CLASSES': (
        'rest_framework.throttling.ScopedRateThrottle',
    ),
    'DEFAULT_THROTTLE_RATES': {
        'contacts': '1000/day',
        'uploads': '20/day'
    }
}
```

### 实例

```python
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import RetrieveAPIView
from rest_framework.throttling import UserRateThrottle

class BookDetailView(RetrieveAPIView):
    queryset = BookInfo.objects.all()
    serializer_class = BookInfoSerializer
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    throttle_classes = (UserRateThrottle,)
```

## 过滤Filtering

对于列表数据可能需要根据字段进行过滤，我们可以通过添加django-fitlter扩展来增强支持。

```shel
pip insall django-filter
```

在配置文件中增加过滤后端的设置：

```python
INSTALLED_APPS = [
    ...
    'django_filters',  # 需要注册应用，
]

REST_FRAMEWORK = {
    'DEFAULT_FILTER_BACKENDS': ('django_filters.rest_framework.DjangoFilterBackend',)
}
```

在视图中添加filter_fields属性，指定可以过滤的字段

```python
class BookListView(ListAPIView):
    queryset = BookInfo.objects.all()
    serializer_class = BookInfoSerializer
    filter_fields = ('btitle', 'bread')

# 127.0.0.1:8000/books/?btitle=西游记
```

## 排序

对于列表数据，REST framework提供了**OrderingFilter**过滤器来帮助我们快速指明数据按照指定字段进行排序。

#### 使用方法：

在类视图中设置filter_backends，使用`rest_framework.filters.OrderingFilter`过滤器，REST framework会在请求的查询字符串参数中检查是否包含了ordering参数，如果包含了ordering参数，则按照ordering参数指明的排序字段对数据集进行排序。

前端可以传递的ordering参数的可选字段值需要在ordering_fields中指明。

示例：

```python
class BookListView(ListAPIView):
    queryset = BookInfo.objects.all()
    serializer_class = BookInfoSerializer
    filter_backends = [OrderingFilter]
    ordering_fields = ('id', 'bread', 'bpub_date')

# 127.0.0.1:8000/books/?ordering=-bread
```

## 分页Pagination

REST framework提供了分页的支持。

我们可以在配置文件中设置全局的分页方式，如：

```python
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS':  'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 100  # 每页数目
}
```

也可通过自定义Pagination类，来为视图添加不同分页行为。在视图中通过`pagination_clas`属性来指明。

```python
class LargeResultsSetPagination(PageNumberPagination):
    page_size = 1000
    page_size_query_param = 'page_size'
    max_page_size = 10000
class BookDetailView(RetrieveAPIView):
    queryset = BookInfo.objects.all()
    serializer_class = BookInfoSerializer
    pagination_class = LargeResultsSetPagination
```

**注意：如果在视图内关闭分页功能，只需在视图内设置**

```python
pagination_class = None
```

### **PageNumberPagination**分页器

前端访问网址形式：

```http
GET  http://api.example.org/books/?page=4
```

可以在子类中定义的属性：

- page_size 每页数目
- page_query_param 前端发送的页数关键字名，默认为"page"
- page_size_query_param 前端发送的每页数目关键字名，默认为None
- max_page_size 前端最多能设置的每页数量

```python
from rest_framework.pagination import PageNumberPagination

class StandardPageNumberPagination(PageNumberPagination):
    page_size_query_param = 'page_size'
    max_page_size = 10

class BookListView(ListAPIView):
    queryset = BookInfo.objects.all().order_by('id')
    serializer_class = BookInfoSerializer
    pagination_class = StandardPageNumberPagination

# 127.0.0.1/books/?page=1&page_size=2
```

### **LimitOffsetPagination**分页器

前端访问网址形式：

```http
GET http://api.example.org/books/?limit=100&offset=400
```

可以在子类中定义的属性：

- default_limit 默认限制，默认值与`PAGE_SIZE`设置一直
- limit_query_param limit参数名，默认'limit'
- offset_query_param offset参数名，默认'offset'
- max_limit 最大limit限制，默认None

```python
from rest_framework.pagination import LimitOffsetPagination

class BookListView(ListAPIView):
    queryset = BookInfo.objects.all().order_by('id')
    serializer_class = BookInfoSerializer
    pagination_class = LimitOffsetPagination

# 127.0.0.1:8000/books/?offset=3&limit=2
```

# 异常处理 Exceptions

REST framework提供了异常处理，我们可以自定义异常处理函数。

```python
from rest_framework.views import exception_handler

def custom_exception_handler(exc, context):
    # 先调用REST framework默认的异常处理方法获得标准错误响应对象
    response = exception_handler(exc, context)

    # 在此处补充自定义的异常处理
    if response is not None:
        response.data['status_code'] = response.status_code

    return response
```

**在配置文件中声明自定义的异常处理**

```python
REST_FRAMEWORK = {
    'EXCEPTION_HANDLER': 'my_project.my_app.utils.custom_exception_handler'
}
```

如果未声明，会采用默认的方式，如下

```python
REST_FRAMEWORK = {
    'EXCEPTION_HANDLER': 'rest_framework.views.exception_handler'
}
```

例如：

补充上处理关于数据库的异常

```python
from rest_framework.views import exception_handler as drf_exception_handler
from rest_framework import status
from django.db import DatabaseError

def exception_handler(exc, context):
    response = drf_exception_handler(exc, context)

    if response is None:
        view = context['view']
        if isinstance(exc, DatabaseError):
            print('[%s]: %s' % (view, exc))
            response = Response({'detail': '服务器内部错误'}, status=status.HTTP_507_INSUFFICIENT_STORAGE)

    return response
```

### REST framework定义的异常

- APIException 所有异常的父类
- ParseError 解析错误
- AuthenticationFailed 认证失败
- NotAuthenticated 尚未认证
- PermissionDenied 权限决绝
- NotFound 未找到
- MethodNotAllowed 请求方式不支持
- NotAcceptable 要获取的数据格式不支持
- Throttled 超过限流次数
- ValidationError 校验失败 

# 自动生成接口文档

REST framework可以自动帮助我们生成接口文档。

接口文档以网页的方式呈现。

自动接口文档能生成的是继承自`APIView`及其子类的视图。

## 1. 安装依赖

REST framewrok生成接口文档需要`coreapi`库的支持。

```python
pip install coreapi
```

## 2. 设置接口文档访问路径

在总路由中添加接口文档路径。

文档路由对应的视图配置为`rest_framework.documentation.include_docs_urls`，

参数`title`为接口文档网站的标题。

```python
from rest_framework.documentation import include_docs_urls

urlpatterns = [
    ...
    url(r'^docs/', include_docs_urls(title='My API title'))
]
```

## 3. 文档描述说明的定义位置

1） 单一方法的视图，可直接使用类视图的文档字符串，如

```python
class BookListView(generics.ListAPIView):
    """
    返回所有图书信息.
    """
```

2）包含多个方法的视图，在类视图的文档字符串中，分开方法定义，如

```python
class BookListCreateView(generics.ListCreateAPIView):
    """
    get:
    返回所有图书信息.

    post:
    新建图书.
    """
```

3）对于视图集ViewSet，仍在类视图的文档字符串中分开定义，但是应使用action名称区分，如

```python
class BookInfoViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, GenericViewSet):
    """
    list:
    返回图书列表数据

    retrieve:
    返回图书详情数据

    latest:
    返回最新的图书数据

    read:
    修改图书的阅读量
    """
```

## 4. 访问接口文档网页

浏览器访问 127.0.0.1:8000/docs/，即可看到自动生成的接口文档。

*（图片缺失：%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3%E7%BD%91%E9%A1%B5.png）*

#### 两点说明：

1） 视图集ViewSet中的retrieve名称，在接口文档网站中叫做read

2）参数的Description需要在模型类或序列化器类的字段中以help_text选项定义，如：

```python
class BookInfo(models.Model):
    ...
    bread = models.IntegerField(default=0, verbose_name='阅读量', help_text='阅读量')
    ...
```

或

```python
class BookReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookInfo
        fields = ('bread', )
        extra_kwargs = {
            'bread': {
                'required': True,
                'help_text': '阅读量'
            }
        }
```
