---
title: "云笔记项目"
category: skills
tags: ["Python", "Web"]
featured: false
source: "Python/Python_web/Django_web开发/Django/云笔记项目.md"
updated: 2021-08-31
readingTime: 4
summary: "toc  user/views.py 写好一个views里的函数，就要配置一下urls，还有相关的页面templates  注册  哈希处理密码明文  验证密码是否一致  session免密登陆一天 python def reg_viewr..."
---
[toc]



## user/views.py

写好一个views里的函数，就要配置一下urls，还有相关的页面templates

### 注册

- 哈希处理密码明文
- 验证密码是否一致
- session免密登陆一天

```python
def reg_view(request):
    #注册
    ##########
    # TODO：密码是否规范
    # 当前用户名是否可用、用户名的长度、敏感词都在这里过滤
    # 也可以在前端异步校验
    ##########
    if request.method == 'GET':
        # GET   返回页面
        return render(request, 'user/register.html')
    elif request.method == 'POST':
        # POST  处理提交数据
        username = request.POST['username']
        password_1 = request.POST['password_1']
        password_2 = request.POST['password_2']
        #   1,两个密码要保持一致
        if password_1 != password_2:
            return HttpResponse('两次密码输入不一致')
        # 明文处理密码：
        # User.objects.create(username=username, password=password_1)
        # return HttpResponse('注册成功' )

        #哈希算法处理密码
        # 给定明文，计算出一段定长的，不可逆的值; md5,sha-256
        # 1, 定长输出： 不管明文输入长度为多少， 哈希值都是定长的, md5 - 32位16进制
        # 2, 不可逆： 无法反向计算出 对应的 明文
        # 3, 雪崩效应： 输入改变 , 输出必然变
        # 场景： 1, 密码处理 2, 文件完整性校验
        # ipython可以在终端计算md5，这里引入hashlib
        m = hashlib.md5()
        m.update(password_1.encode())
        password_m = m.hexdigest()

        #   2,当前用户名是否可用
        old_users = User.objects.filter(username=username)
        if old_users:
            return HttpResponse('用户名已注册')

        #   3,插入数据 [明文处理密码]
        try:
            user = User.objects.create(username=username, password=password_m)
        except Exception as e:
            # 有可能报错 - 重复插入 [唯一索引注意并发写入问题]
            print('--create user error %s'%(e))
            return HttpResponse('用户名已注册')

        # 免登录一天
        request.session['username'] = username
        request.session['uid'] = user.id
        # TODO 修改session存储时间为1天

        return HttpResponseRedirect('/index')
```

### 登陆

- 记住用户名

```python
def login_view(request):
    if request.method == 'GET':
        # 检查登录状态
        # 检查session
        if request.session.get('username') and request.session.get('uid'):# 看session里有没有name和id
            # return HttpResponse('已登录')
            return HttpResponseRedirect('/index')
        # 检查Cookies
        c_username = request.COOKIES.get('username')
        c_uid = request.COOKIES.get('uid')
        if c_username and c_uid:
            # 回写session
            request.session['username'] = c_username
            request.session['uid'] = c_uid
            return HttpResponseRedirect('/index')
        # 没登录
        return render(request, 'user/login.html')
    elif request.method == 'POST':
        # 处理数据
        username = request.POST['username']
        password = request.POST['password']

        try:
            user = User.objects.get(username=username)
        except Exception as e:
            print('--login user error %s' % (e))
            return HttpResponse('用户名或密码错误')

        # 比对密码
        m = hashlib.md5()
        m.update(password.encode())

        if m.hexdigest() != user.password:
            return HttpResponse('用户名或密码错误')

        # 记录会话状态
        request.session['username'] = username
        request.session['uid'] = user.id

        resp = HttpResponseRedirect('/index')
        # 判断用户是否 点选了 ‘记住用户名’
        if 'remember' in request.POST:
            resp.set_cookie('username', username, 3600 * 24 * 3)
            resp.set_cookie('uid', user.id, 3600 * 24 * 3)
        # 点选了 ->  Cookies 存储 username,uid 时间3天
        return resp
```

### 退出登陆

```python
def logout_view(request):
    # 删除session值
    if 'username' in request.session:
        del request.session['username']
    if 'uid' in request.session:
        del request.session['uid']
    # 删除Cookies
    resp = HttpResponseRedirect('/index')
    if 'username' in request.COOKIES:
        resp.delete_cookie('username')
    if 'uid' in request.COOKIES:
        resp.delete_cookie('uid')
    return resp
```





## index/views.py 首页

## index.templates.index.html

- 模版里操作request
  - 直接在首页的html里进行登陆状态的判断
- 退出登陆

```
<body>

{% if request.session.username %}
<p>
    欢迎 {{ request.session.username }}
</p>
<p>
    <a href="/user/logout">退出登录</a>
</p>
<p>
    <a href="">进入我的笔记</a>
</p>
{% else %}
    {% if request.COOKIES.username %}
    <p>
    欢迎 {{ request.COOKIES.username }}
    </p>
    <p>
        <a href="/user/logout">退出登录</a>
    </p>
    <p>
        <a href="">进入我的笔记</a>
    </p>
    {% else %}
    <p>
        <a href="/user/login">登录</a>
    </p>
    <p>
        <a href="/user/reg">注册</a>
    </p>
    {% endif %}

{% endif %}

</body>
```

# note

## note/models.py	笔记模型类

```python
class Note(models.Model):

    title = models.CharField('标题', max_length=100)
    content = models.TextField('内容')
    created_time = models.DateTimeField('创建时间', auto_now_add=True)
    updated_time = models.DateTimeField('更新时间', auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
```

## note/list_note.html	列表页

## note/views.py

装饰器登陆校验

### 添加

