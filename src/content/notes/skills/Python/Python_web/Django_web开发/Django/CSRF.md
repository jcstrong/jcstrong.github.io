---
title: "CSRF"
category: skills
folderPath: "Python/Python_web/Django_web开发/Django"
folderTop: "Python"
tags: ["Python", "Web"]
featured: false
source: "Python/Python_web/Django_web开发/Django/CSRF.md"
updated: 2022-05-23
readingTime: 7
summary: "toc  CSRF\tCross Site Request Forgery跨站请求伪造。 指攻击者盗用了你的身份，以你的名义发送恶意请求。  包括：以你名义发送邮件，发消息，盗取你的账号，甚至于购买商品，虚拟货币转账......  造成的问题..."
---
[toc]

# CSRF	Cross Site Request Forgery跨站请求伪造。

指攻击者盗用了你的身份，以你的名义发送恶意请求。

- 包括：以你名义发送邮件，发消息，盗取你的账号，甚至于购买商品，虚拟货币转账......

- 造成的问题：个人隐私泄露以及财产安全。

### CSRF攻击示意图

- 客户端访问服务器时没有同服务器做安全验证

![img](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/20210831135656.png)

### 防止 CSRF 攻击

1. 在客户端向后端请求界面数据的时候，后端会往响应中的 cookie 中设置 csrf_token 的值
2. 在 Form 表单中添加一个隐藏的的字段，值也是 csrf_token
3. 在用户点击提交的时候，会带上这两个值向后台发起请求
4. 后端接受到请求，会以下几件事件：
   - 从 cookie中取出 csrf_token
   - 从 表单数据中取出来隐藏的 csrf_token 的值
   - 进行对比
5. 如果比较之后两值一样，那么代表是正常的请求，如果没取到或者比较不一样，代表不是正常的请求，不执行下一步操作

### 代码演示 

##### 未进行 csrf 校验的 WebA

- 后端代码实现

```
#定义路由
from django.conf.urls  import url
from pay import views
urlpatterns = [
    url(r'^$',views.LoginView.as_view(),name='index'),   #登录路由 
    url(r'^transfer/$',views.TransferView.as_view(),name='transfer'), #转账路由
]

#定义视图
class LoginView(View):

    def post(self,request):

        # 取到表单中提交上来的参数
        username = request.POST.get("username")
        password = request.POST.get("password")

        if not all([username, password]):
            print('参数错误')
        else:
            print(username, password)
            if username == 'laowang' and password == '1234':
                # 状态保持，设置用户名到cookie中表示登录成功
                response = redirect(reverse('transfer'))
                response.set_cookie('username', username)
                return response
            else:
                print('密码错误')
        return render(request,'login.html')
    def get(self,request):
        return render(request,'login.html')

class TransferView(View):


    def post(self,request):
        # 从cookie中取到用户名
        username = request.COOKIES.get('username', None)
        # 如果没有取到，代表没有登录
        if not username:
            return redirect(reverse('index'))


        to_account = request.POST.get("to_account")
        money = request.POST.get("money")

        print('假装执行转操作，将当前登录用户的钱转账到指定账户')
        return HttpResponse('转账 %s 元到 %s 成功' % (money, to_account))

    def get(self, request):
        # 渲染转换页面
        response = render(request, 'transfer.html')

        return response
```

- 前端登录页面代码

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>登录</title>
</head>
<body>

<h1>我是网站A，登录页面</h1>

<form method="post">
    <label>用户名：</label><input type="text" name="username" placeholder="请输入用户名"><br/>
    <label>密码：</label><input type="password" name="password" placeholder="请输入密码"><br/>
    <input type="submit" value="登录">
</form>

</body>
</html>
```

- 前端转账页面代码

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>转账</title>
</head>
<body>
<h1>我是网站A，转账页面</h1>

<form method="post">
    <label>账户：</label><input type="text" name="to_account" placeholder="请输入要转账的账户"><br/>
    <label>金额：</label><input type="number" name="money" placeholder="请输入转账金额"><br/>
    <input type="submit" value="转账">
</form>

</body>
</html>
```

> 运行测试，如果在未登录的情况下，不能直接进入转账页面，测试转账是成功的

##### 攻击网站B的代码

- 后端代码实现

```
#定义路由
from django.conf.urls import url
from ads import views

urlpatterns = [
    url(r'^$',views.AdsView.as_view()),
]

#定义视图
class AdsView(View):

    def get(self,request):

        return render(request,'index.html')
```

- 前端代码实现

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<h1>我是网站B</h1>

<form method="post" action="http://127.0.0.1:9000/transfer/">
    <input type="hidden" name="to_account" value="黑客">
    <input type="hidden" name="money" value="190000" hidden>
    <input type="submit" value="点击领取优惠券">
</form>

</body>
</html>
```

> 运行测试，在用户登录网站A的情况下，点击网站B的按钮，可以实现伪造访问

### 在网站A中实现 csrf_token 校验的流程

- 导入生成 csrf_token 的函数

```
 from django.middleware.csrf import get_token
 csrf_token = get_token(request)
```

- 在渲染转账页面的，做以下几件事情：

  1. 生成 csrf_token 的值
  2. 在返回转账页面的响应里面设置 csrf_token 到 cookie 中
  3. 将 csrf_token 保存到表单的隐藏字段中

  ```
   def get(self, request):
          # 生成csrf_token
          from django.middleware.csrf import get_token
          csrf_token = get_token(request)
  
          # 渲染转换页面，传入 csrf_token 到模板中
          response = render(request, 'transfer.html',context={'csrf_token':csrf_token})
  
          # 设置csrf_token到cookie中，用于提交校验
          response.set_cookie('csrf_token', csrf_token)
  
          return response
  ```

- 在转账模板表单中添加 csrf_token 隐藏字段

```
<head>
    <meta charset="UTF-8">
    <title>转账</title>
</head>
<body>
<h1>我是网站A，转账页面</h1>

<form method="post">
    <input type="hidden" name="csrftoken" value="{{ csrf_token }}">
    <label>账户：</label><input type="text" name="to_account" placeholder="请输入对方账户"><br/>
    <label>金额：</label><input type="number" name="money" placeholder="请输入转账金额"><br/>
    <input type="submit" value="转账">
</form>

</body>
</html>
```

运行测试，进入到转账页面之后，查看 cookie 和 html 源代码

*（图片缺失：CSRF_TOKEN%E8%AE%BE%E7%BD%AE%E5%80%BC.png）*

- 在执行转账逻辑之前进行 csrf_token 的校验

```
 # 取出表单中的 csrf_token
 form_csrf_token = request.POST.get("csrftoken")
 # 取出 cookie 中的 csrf_token
 cookie_csrf_token = request.COOKIES.get('csrf_token')
 # 进行对比
 if cookie_csrf_token != form_csrf_token:
     return HttpResponse('token校验失败，可能是非法操作')
```

运行测试，用户直接在网站 A 操作没有问题，再去网站B进行操作，发现转账不成功，因为网站 B 获取不到表单中的 csrf_token 的隐藏字段，而且浏览器有**同源策略**，网站B是获取不到网站A的 cookie 的，所以就解决了**跨站请求伪造**的问题

## 在 Django项目中解决 CSRF 攻击 

Django默认是开启CSRF的，在settings.py的中间件MIIDDLEWARE里

模板中设置 CSRF 令牌

```
{% csrf_token %}
或者
<input type="hidden" value="{{ csrf_token }}">
```







一个 POST 表单具有修改数据的作用，我们要小心**跨站点请求伪造**。

 Django 自带防御系统

所有针对内部 URL 的 POST 表单都应该使用 [`{% csrf_token %}`](https://docs.djangoproject.com/zh-hans/3.2/ref/templates/builtins/#std:templatetag-csrf_token) 模板标签。

**表单** 

当有人选择一个单选按钮并提交表单提交时，它将发送一个 POST 数据 choice=# ，其中# 为选择的 Choice 的 ID

- 无论何时，当你需要创建一个改变服务器端数据的表单时，请使用 "method="post"

```html
<form action="{% url 'polls:vote' question.id %}" method="post">
    {% csrf_token %}
    <fieldset>{#带标题的框框，legend 元素为 fieldset 元素定义标题#}
        <legend><h1>{{ question.question_text }}</h1></legend>
        {% if error_message %}<p><strong>{{ error_message }}</strong></p>{% endif %}
        {% for choice in question.choice_set.all %}
{#            forloop.counter 指示 for 标签已经循环多少次。#}
            <input type="radio" name="choice" id="choice{{ forloop.counter }}" value="{{ choice.id }}">
            <label for="choice{{ forloop.counter }}">{{ choice.choice_text }}</label><br>
        {% endfor %}
    </fieldset>
    <input type="submit" value="Vote">
</form>
```



**vote按钮函数**

- 在成功处理 POST 数据后，应该始终返回` HttpResponseRedirect`。这个技巧不只专门针对 Django 。

```python
def vote(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    try:
        selected_choice = question.choice_set.get(pk=request.POST['choice'])
    except (KeyError, Choice.DoesNotExist):
      	# 重新显示选项
        return render(request, 'polls/detail.html', {
            'question': question,
            'error_message': "You didn't select a choice.",
        })
    else:
        selected_choice.votes += 1
        selected_choice.save()
        return HttpResponseRedirect(reverse('polls:results', args=(question.id,))
```



### [`request.POST`](https://docs.djangoproject.com/zh-hans/3.2/ref/request-response/#django.http.HttpRequest.POST) 

是一个类字典对象，让你可以通过关键字的名字获取提交的数据。 这个例子中， `request.POST['choice']` 以字符串形式返回选择的 Choice 的 ID。 [`request.POST`](https://docs.djangoproject.com/zh-hans/3.2/ref/request-response/#django.http.HttpRequest.POST) 的值永远是字符串。

### [`HttpResponseRedirect`](https://docs.djangoproject.com/zh-hans/3.2/ref/request-response/#django.http.HttpResponseRedirect) 

只接收一个参数：用户将要被重定向的 URL

### reverse()[¶](https://docs.djangoproject.com/zh-hans/3.2/ref/urlresolvers/#reverse)

**reverse(viewname, *urlconf=None*, *args=None*, *kwargs=None*, *current_app=None*)**

polls/urls.py

```
path('<int:question_id>/vote/', views.vote, name='vote'),
```

`reverse('polls:results', args=(question.id,)`返回`/polls/3/results/`字符串

