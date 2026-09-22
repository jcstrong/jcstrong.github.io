---
title: "Template 模版"
category: skills
folderPath: "Python/Python_web/Django_web开发/Django"
folderTop: "Python"
tags: ["Python", "Web"]
featured: false
source: "Python/Python_web/Django_web开发/Django/Template 模版.md"
updated: 2022-05-23
readingTime: 6
summary: "title: tkinter date: 20210209 19:34:31 tags: python toc  Django使用自带模板 在工程中创建模板目录templates。 在settings.py配置文件中修改TEMPLATES配..."
---
title: tkinter
date: 2021-02-09 19:34:31
tags: python

[toc]



# Django使用自带模板

在工程中创建模板目录templates。

在settings.py配置文件中修改**TEMPLATES**配置项的DIRS值：

```python
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        # 'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'DIRS': [],
        # APP_DIRS让 DjangoTemplates 在每个 INSTALLED_APPS 文件夹中寻找 "templates" 子目录。
        # 这样无需修改 DIRS 设置，Django 也能正确找到 polls 的模板位置
        # app_directories
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

> 虽然我们现在可以将模板文件直接放在 `polls/templates` 文件夹中（而不是再建立一个 `polls`子文件夹），但是这样做不太好。Django 将会选择第一个匹配的模板文件，如果你有一个模板文件正好和另一个应用中的某个模板文件重名，Django 没有办法 *区分* 它们。我们需要帮助 Django 选择正确的模板，最好的方法就是把他们放入各自的 *命名空间* 中，也就是把这些模板放入一个和 *自身* 应用重名的子文件夹里。



## 模板渲染 render

调用模板分为两步骤：

1. 找到模板 loader.get_template(模板文件在模板目录中的相对路径) -> 返回模板对象
2. 渲染模板 模板对象.render(context=None, request=None) -> 返回渲染后的html文本字符串 context 为模板变量字典，默认值为None request 为请求对象，默认值为None

定义一个视图

```python
def index(request):
    # 展示数据库里以发布日期排序的最近 5 个投票问题
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    # 载入 polls/index.html 模板文件，并且向它传递一个上下文(context)。
    # 这个上下文是一个字典，它将模板内的变量映射为 Python 对象。
    template = loader.get_template('polls/index.html')
    context = { # 上下文。这里是个字典
        'latest_question_list': latest_question_list
    }
    # 直接在网页输出：
    # output = ', '.join([q.question_text for q in latest_question_list])
    # return HttpResponse(output)
    return HttpResponse(template.render(context, request))
```

**Django提供了一个函数render可以简写上述代码。**不再需要导入 loader 和 HttpResponse 

`render(request对象, 模板文件路径, 模板数据字典)`

```python
def index(request):
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    context = {'latest_question_list': latest_question_list}
    return render(request, 'polls/index.html', context)
```

### 404页面快捷函数 [`get_object_or_404()`](https://docs.djangoproject.com/zh-hans/3.2/topics/http/shortcuts/#django.shortcuts.get_object_or_404)[¶](https://docs.djangoproject.com/zh-hans/3.2/intro/tutorial03/#a-shortcut-get-object-or-404)

尝试用 [`get()`](https://docs.djangoproject.com/zh-hans/3.2/ref/models/querysets/#django.db.models.query.QuerySet.get) 函数获取一个对象，如果不存在就抛出 [`Http404`](https://docs.djangoproject.com/zh-hans/3.2/topics/http/views/#django.http.Http404) 错误

```python
def detail(request, question_id):
    # try:
    #     question = Question.objects.get(pk=question_id)
    # except Question.DoesNotExist:
    #     raise Http404("Question does not exist")
    question = get_object_or_404(Question, pk=question_id)
    return render(request, 'polls/detail.html', {'question': question})
```

> 也有 [`get_list_or_404()`](https://docs.djangoproject.com/zh-hans/3.2/topics/http/shortcuts/#django.shortcuts.get_list_or_404) 函数，工作原理和 [`get_object_or_404()`](https://docs.djangoproject.com/zh-hans/3.2/topics/http/shortcuts/#django.shortcuts.get_object_or_404) 一样，除了 [`get()`](https://docs.djangoproject.com/zh-hans/3.2/ref/models/querysets/#django.db.models.query.QuerySet.get) 函数被换成了 [`filter()`](https://docs.djangoproject.com/zh-hans/3.2/ref/models/querysets/#django.db.models.query.QuerySet.filter) 函数。如果列表为空的话会抛出 [`Http404`](https://docs.djangoproject.com/zh-hans/3.2/topics/http/views/#django.http.Http404) 异常。



## 模板语法

### 模板变量	{{ 变量 }}

变量名必须由字母、数字、下划线（不能以下划线开头）和点组成。

模板变量可以使python的内建类型，也可以是对象。

```python
def index(request):
    context = {
        'city': '北京',
        'adict': {
            'name': '西游记',
            'author': '吴承恩'
        },
        'alist': [1, 2, 3, 4, 5]
    }
    return render(request, 'index.html', context)
```

```html
<h1>{{ city }}</h1>
<h1>{{ adict }}</h1>
<h1>{{ adict.name }}</h1>		 字典取值
<h1>{{ alist }}</h1>
<h1>{{ alist.0 }}</h1>	 列表取值
```

### for循环

```html
<h1>{{ question.question_text }}</h1>
<ul>
    {% for choice in question.choice_set.all %}
        <li>{{ choice.choice_text }}</li>
    {% endfor %}
</ul>
```

### if条件

```html
{% if a == 1 %}

{% elif ... %}

{% else ... %}

{% endif ... %}
```

比较运算符、布尔运算符（and、or、not）

**注意：运算符左右两侧不能紧挨变量或常量，必须有空格。**

```html
{% if a == 1 %}
```

### 注释

1）单行注释语法如下：

```html
{# ... #}
```

2）多行注释使用comment标签，语法如下：

```html
{% comment %}
	...
{% comment %}
```



# 过滤器[¶](https://docs.djangoproject.com/zh-hans/3.2/topics/templates/#filters)

语法如下:

- 使用管道符号|来应用过滤器，用于进行计算、转换操作，可以使用在变量、标签中。

- 如果过滤器需要参数，则使用冒号:传递参数。

- ```
  变量|过滤器:参数
  ```

列举几个如下：

- **safe**，禁用转义，告诉模板这个变量是安全的，可以解释执行

- **length**，长度，返回字符串包含字符的个数，或列表、元组、字典的元素个数。

- **default**，默认值，如果变量不存在时则返回默认值。

- ```
  data|default:'默认值'
  ```

- **date**，日期，用于对日期类型的值进行字符串格式化，常用的格式化字符如下：

  - Y表示年，格式为4位，y表示两位的年。

  - m表示月，格式为01,02,12等。

  - d表示日, 格式为01,02等。

  - j表示日，格式为1,2等。

  - H表示时，24进制，h表示12进制的时。

  - i表示分，为0-59。

  - s表示秒，为0-59。

  - value|date:"Y年m月j日  H时i分s秒"



# Django使用[jinja2](https://docs.djangoproject.com/zh-hans/3.2/topics/templates/)模板 

Jinja2：是 Python 下一个被广泛应用的模板引擎，是由Python实现的模板语言，他的设计思想来源于 Django 的模板引擎，并扩展了其语法和一系列强大的功能，尤其是Flask框架内置的模板语言

由于django默认模板引擎功能不齐全,速度慢，所以我们也可以在Django中使用jinja2, jinja2宣称比django默认模板引擎快10-20倍。

Django主流的第三方APP基本上也都同时支持Django默认模板及jinja2，所以要用jinja2也不会有多少障碍。

- 安装jinja2模块 

```bash
pip install jinja2
```

- Django配置jinja2 

1. 在项目文件中创建 jinja2_env.py 文件

```python
from jinja2 import Environment

def environment(**options):
    env = Environment(**options)python

    return env
```

2. 在settings.py文件

```python
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.jinja2.Jinja2',#修改1
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS':True,
        'OPTIONS':{
            'environment': 'jinja2_env.environment',# 修改2
            'context_processors':[
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
```



- jinja2模板的使用绝大多数和Django自带模板一样 

![for循环](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/20210901173322.png)



## jinja2自定义过滤器 

在jinja2_env.py文件中自定义过滤器

```python
from jinja2 import Environment

def environment(**options):
    env = Environment(**options)

    # 2.将自定义的过滤器添加到 环境中
    env.filters['do_listreverse'] = do_listreverse

    return env

# 1.自定义过滤器
def do_listreverse(li):
    if li == "B":
        return "哈哈"
```

pycharm 默认是Django模版，更改为Jinja2后要在`settings-->Language&Frameworks-->Template Language`里面修改

