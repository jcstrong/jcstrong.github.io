---
title: "02 用户注册"
category: skills
tags: ["Python", "Web"]
featured: false
source: "Python/Python_web/Django_web开发/商城项目前台/02 用户注册.md"
updated: 2022-05-23
readingTime: 8
summary: "toc  配置app路径、路由  创建用户模块子应用\tpython ../../manage.py startapp users    任何时候配置了子应用却找不到子应用时都会报错 ModuleNotFoundError:  注册子应用  ..."
---
[toc]



# 配置app路径、路由

- 创建用户模块子应用	**python ../../manage.py startapp users**

  - 任何时候配置了子应用却找不到子应用时都会报错 `ModuleNotFoundError:`

- 注册子应用

  - 查看系统路径		**print（sys.path)**
  - 追加导包路径        **sys.path.insert(0, os.path.join(BASE_DIR, 'apps'))**
  - 追加后，可以直接使用子应用名注册`INSTALLED_APPS`

- 视图Views.py

  ```python
  class RegisterView(View):
      """用户注册"""
  
      def get(self, request):
          """
          提供注册界面
          :param request: 请求对象
          :return: 注册界面
          """
          return render(request, 'register.html')
  ```

- 注册路由

  > **1.总路由**
  >
  > **include**(('子路由urls文件', 'app名'), namespace='命名空间')

  ```python
  urlpatterns = [
      path('', include(('users.urls', 'users'), namespace='users'))
  ]
  ```

  > **2.子路由**

  ```python
  urlpatterns = [
      path('register/', views.RegisterView.as_view(), name='register'),
  ]
  ```

  - [**命名空间 Namespace**](https://blog.csdn.net/huangql517/article/details/81014876)：是表示别名的作用范围。一个标识符可在多个命名空间中定义，它在不同命名空间中的含义是互不相干的。这样，在一个新的命名空间中可定义任何标识符，它们不会与任何已有的标识符发生冲突，因为已有的定义都处于其它命名空间中。 

    由于name没有作用域，Django在反解URL时，会在项目全局顺序搜索，当查找到第一个name指定URL时，便立即返回

    - 可以方便反解析   **reverse(users:register)	==	'/register/'**
  - 命名空间users，表明了register的作用范围在users下

# 定义用户模型类 - 使用Django认证系统提供的用户模型类

以ORM面向对象的方式对用户数据进行增删改查

### Django默认用户认证系统

处理用户账号、组、权限以及基于cookie的用户会话。

- Django认证系统位置
  - `django.contrib.auth`包含认证框架的核心和默认的模型。
  - `django.contrib.contenttypes`是Django内容类型系统，它允许权限与你创建的模型关联。
- Django认证系统同时处理**认证和授权**
  - 认证：验证一个用户是否它声称的那个人，可用于账号登录。
  - 授权：授权决定一个通过了认证的用户被允许做什么。
- Django认证系统包含的内容
  - 用户：**用户模型类**、用户认证。
  - 权限：标识一个用户是否可以做一个特定的任务，MIS系统常用到。
  - 组：对多个具有相同权限的用户进行统一管理，MIS系统常用到。
  - 密码：一个可配置的密码哈希系统，设置密码、密码校验。

#### Django默认用户模型类User

- Django认证系统用户模型类 位置：**django.contrib.auth.models.User**

- Django认证系统用户模型类 父类：**AbstractUser**

- **User对象基本属性**

  - 创建用户(注册用户)必选： `username、password`
  - 创建用户(注册用户)可选：`email、first_name、last_name、last_login、date_joined、is_active 、is_staff、is_superuse`
  - 判断用户是否通过认证(是否登录)：`is_authenticated`

- **User对象基本方法**

  - 创建用户(注册用户)的方法

    ```python
    user = User.objects.create_user(username, email, password, **extra_fields)
    ```

  - 用户认证(用户登录)的方法

    ```python
    from django.contrib.auth import authenticate
    user = authenticate(username=username, password=password, **kwargs)
    ```

  - 处理密码的方法

    - 设置密码：`set_password(raw_password)`
    - 校验密码：`check_password(raw_password)`

#### 自定义用户模型类 (继承AbstractUSer)

Django默认用户模型类中没有mobile字段，所以要自定义用户模型类。

```python
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    """自定义用户模型类"""
    mobile = models.CharField(max_length=11, unique=True, verbose_name='手机号')

    class Meta:
        db_table = 'tb_users'		# 自定义表名
        verbose_name = '用户'
        verbose_name_plural = verbose_name	# 复数的别名

    def __str__(self):
        return self.username
```

> - 继承自**AbstractUser**（可通过阅读Django默认用户模型类的源码得知） 。
> - 新增`mobile`字段。

- **HINT: Add or change a related_name argument to the definition for 'users.U**
  用户认证系统中的用户模型类，是通过全局配置项 **AUTH_USER_MODEL** 决定的。
  所以需要在settings.py里更改默认加载的模型类

  ```python
  # 指定自定义的用户模型类
  AUTH_USER_MODEL = 'users.User'
  ```

- **ValueError: Dependency on app with no migrations: users**

  需要生成迁移文件 `python ../../manage.py makemigrations`



# 用户注册

![img](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/20210910161607.png)

## 接口设计

- 明确要实现的业务逻辑
  注册过程包含一些子业务，如：判断用户名手机号是否重复、验证码是否正确等

- 明确接口的访问方式与返回数据
  - 请求方法
    - 前端向后端请求数据：**GET**
    - 前端向后端发送隐私数据：**POST**
    - 修改/删除后段数据：**PUT / DELETE**
  - 请求参数：（如路径参数、查询字符串、表单参数、JSON等）。
  - 请求地址
  - 响应数据（如HTML、JSON等）。

用户注册接口说明

> **1.请求方式**

| 选项         | 方案       |
| ------------ | ---------- |
| **请求方法** | POST       |
| **请求地址** | /register/ |

> **2.请求参数：表单参数**

| 参数名        | 类型   | 是否必传 | 说明             |
| ------------- | ------ | -------- | ---------------- |
| **username**  | string | 是       | 用户名           |
| **password**  | string | 是       | 密码             |
| **password2** | string | 是       | 确认密码         |
| **mobile**    | string | 是       | 手机号           |
| **sms_code**  | string | 是       | 短信验证码       |
| **allow**     | string | 是       | 是否同意用户协议 |

> **3.响应结果：HTML**`register.html`
>
> 注册成功：重定向到首页
> 注册失败：响应错误信息



## 前端：Vue响应操作、绑定Vue数据

- Vue绑定页面的套路
  - 导入Vue.js库和ajax请求的库
  - 准备div盒子标签      	`<div id="app">`
  - 准备js文件
  - html页面绑定变量、事件等
  - js文件定义变量、事件等

- **register.html**页面绑定**变量、事件、错误提示**等

  > 错误提示
  >
  > - 如果错误提示信息是固定的，可以把错误提示信息写死，再**通过v-show控制是否展示**
  > - 如果错误提示信息不是固定的，可以使用绑定的**变量动态**的展示错误提示信息，再通过v-show控制是否展示

- 注册JS文件：vue、axios
  
  ```html
  <script type="text/javascript" src="{{ static('js/vue-2.5.16.js') }}"></script> <script type="text/javascript" src="{{ static('js/axios-0.18.0.min.js') }}"></script>
  ```
  
  **注册register.js文件**
  
  ```html
  <script type="text/javascript" src="{{ static('js/register.js') }}"></script>
  ```

- 在`register.js`中编写Vue实例

  ```js
  let vm = new Vue({
      el: '#app',
      data: {
          // v-model
          // v-show
          // error_message
      },
      methods: {
          //事件方法
      }
  });
  ```


- 修改Vue变量的读取语法，避免和Django模板语法冲突
  `delimiters: ['[[', ']]']`

  >  **blur**	*v.* (使)变得模糊不清
  > ` @blur	`	是当元素失去焦点时所触发的事件
  > `@change`	当`checkbox`变化时触发事件
  > `@submit`	提交表单时触发事件
  > `@click`	点击时事件
  > `v-clock`	在表单中添加，只有当表单加载完毕时才显示，避免出现显示`{{  }}`的情况

## 后端

- 校验参数

  `all([ ])`	列表一空即为false

  ```
  if not all([username, password, password2, mobile, allow]):
  ```

- 保存数据到数据库

  这里使用Django认证系统用户模型类提供的 **create_user()** 方法创建新的用户。这里 **create_user()** 方法中封装了 **set_password()** 方法加密密码。

- 响应注册结果

  注册成功，重定向到首页

### 状态保持    login()方法

- 用户登入本质：**状态保持**

- 将通过认证的用户的唯一标识信息（比如：用户ID）写入到当前浏览器的 cookie 和服务端的 session 中。

- login()方法：
  - 在`django.contrib.auth.__init__.py`中
  - 由Django用户认证系统提供了`login()`方法。
  - 封装了写入session的操作，帮助我们快速登入一个用户，并实现状态保持。

  ```python
  login(request, user, backend=None)
  ```

- 状态保持 session 数据存储的位置：

  Redis数据库的1号库

  ```python
   SESSION_ENGINE = "django.contrib.sessions.backends.cache"
   SESSION_CACHE_ALIAS = "session"
  ```

**login()方法登入用户**

```python
# 保存注册数据
try:
    user = User.objects.create_user(username=username, password=password, mobile=mobile)
except DatabaseError:
    return render(request, 'register.html', {'register_errmsg': '注册失败'})

# 登入用户，实现状态保持
login(request, user)

# 响应注册结果
return redirect(reverse('contents:index'))
```

![img](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/20210914115153.png)

登入用户，并实现状态保持的方式：`login(request, user, backend=None)`



# 用户名重复注册

## 接口设计

请求方法：GET
请求地址：/usernames/(?P<username>[a-zA-Z0-9_-]{5,20})/count/
请求参数：username（路径参数）
响应数据：JSON（错误信息和记录的数量）
定义后端接口

## 后端：查询数据库	User.objects.filter().count()

```python
    def get(self, request, username):
        # 接受、校验参数在路由中完成了
        # 使用username查询数据记录
        count = User.objects.filter(username=username).count()  #
        # 响应结果
        return http.JsonResponse({'code': RETCODE.OK, 'errormsg': 'OK', 'count': count})
```

## 前端：axios发送ajax请求

处理用户交互（鼠标失去焦点、错误信息更新）
Ajax请求url获取json到response

```python
        check_username(){
          	"""正则判断输入格式👇"""
          	let re = /^[a-zA-Z0-9_-]{5,20}$/;
            if (re.test(this.username)) {
                this.error_name = false;
            } else {
                this.error_name_message = '请输入5-20个字符的用户名';
                this.error_name = true;
            }
          	"""格式正确👆，判断是否重复👇"""
            if(this.error_name == false){
                let url = '/usernames/' + this.username + '/count/'
                // axios通过url获取视图，视图返回json到response中
                axios.get(url, {
                    responseType: 'json'
                })
                    // .then(function(response){
                    .then(response => {     // 200成功状态
                        if (response.data.count == 1){	//	获得json中的count
                            this.error_name_message = '用户名已经被占用';
                            this.error_name = true;
                        }else{
                            this.error_name = false;
                        }
                    })
                    .catch(error => {   // 失败
                        console.log(error.response)
                    })
```

