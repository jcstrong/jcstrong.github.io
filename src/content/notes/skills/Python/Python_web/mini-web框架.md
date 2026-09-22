---
title: "mini-web框架"
category: skills
folderPath: "Python/Python_web"
folderTop: "Python"
tags: ["Python", "Web"]
featured: false
source: "Python/Python_web/mini-web框架.md"
updated: "2022-07-05"
readingTime: 16
summary: "miniweb框架 toc 前面已经学习过web服务器, 我们知道web服务器主要是接收用户的http请求,根据用户的请求返回不同的资源数据，但是之前我们开发的是静态web服务器，返回的都是静态资源数据，假如我们想要web服务器返回动态资源..."
---
# mini-web框架

[[toc]]



前面已经学习过web服务器, 我们知道web服务器主要是接收用户的http请求,根据用户的请求返回不同的资源数据，但是之前我们开发的是静态web服务器，返回的都是静态资源数据，假如我们想要web服务器返回动态资源那么该如何进行处理呢？

**web框架其实就是一个为web服务器提供服务的应用程序，专门负责处理用户的动态资源请求**

> 静态资源：不需要经常变化的资源，这种资源web服务器可以提前准备好，比如: png/jpg/css/js等文件。
>
> 动态资源：和静态资源相反, 这种资源会经常变化，比如: 我们在京东浏览商品时经常会根据条件进行筛选，选择不同条件, 浏览的商品就不同，这种资源web服务器无法提前准备好，需要web框架来帮web服务器进行准备，在这里web服务器可以把.html的资源请求认为是动态资源请求交由web框架进行处理。
>
> WSGI协议：web服务器和web框架之间进行协同工作的规则，WSGI协议规定web服务器把动态资源的请求信息传给web框架处理，web框架把处理好的结果返回给web服务器。

**动态资源判断**

- 根据请求资源路径的后缀名进行判断
  - 如果请求资源路径的后缀名是.html则是动态资源请求, 让web框架程序进行处理。
  - 否则是静态资源请求，让web服务器程序进行处理。

**framework.py**

```python
"""web框架的职责专门负责处理动态资源请求"""
import time


# 获取首页数据
def index():
    # 状态信息
    status = "200 OK"
    # 响应头信息
    response_header = [("Server", "PWS/1.1")]
    # web框架处理后的数据
    # 获取当前时间
    data = time.ctime()

    # 这里返回的是元组
    return status, response_header, data


# 处理没有找到的动态资源
def not_found():
    # 状态信息
    status = "404 Not Found"
    # 响应头信息
    response_header = [("Server", "PWS/1.1")]
    # web框架处理后的数据
    data = "not found"

    # 这里返回的是元组
    return status, response_header, data


# 处理动态资源请求
def handle_request(env):
    # 获取动态的请求资源路径
    request_path = env["request_path"]
    print("动态资源请求的地址:", request_path)
    # 判断请求的动态资源路径，选择指定的函数处理对应的动态资源请求
    if request_path == "/index.html":
        # 获取首页数据
        result = index()
        # 把处理后的结果返回给web服务器使用，让web服务器拼接响应报文时使用
        return result
    else:
        # 没有动态资源数据, 返回404状态信息
        result = not_found()
        # 把处理后的结果返回给web服务器使用，让web服务器拼接响应报文时使用
        return result

```

**web.py**

```python
import socket
import os
import threading
import sys
import framework


# http协议的web服务器类
class HttpWebServer(object):
    def __init__(self, port):
        # 创建tcp服务端套接字
        tcp_server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        # 设置端口号复用，程序退出端口号立即释放
        tcp_server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, True)
        # 绑定端口号
        tcp_server_socket.bind(("", port))
        # 设置监听
        tcp_server_socket.listen(128)
        # 把tcp服务器的套接字作为web服务器对象的属性
        self.tcp_server_socket = tcp_server_socket

    # 处理客户端请求
    @staticmethod
    def handle_client_request(new_socket):
        # 接收客户端的请求信息
        recv_data = new_socket.recv(4096)
        # 判断接收的数据长度是否为0
        if len(recv_data) == 0:
            new_socket.close()
            return

        # 对二进制数据进行解码
        recv_content = recv_data.decode("utf-8")
        print(recv_content)

        # 对数据按照空格进行分割
        request_list = recv_content.split(" ", maxsplit=2)
        # 获取请求的资源路径
        request_path = request_list[1]
        print(request_path)

        # 判断请求的是否是根目录，如果是根目录设置返回的信息
        if request_path == "/":
            request_path = "/index.html"

        # 判断是否是动态资源请求，以后把后缀是.html的请求任务是动态资源请求
        if request_path.endswith(".html"):
            """动态资源请求"""
            # 动态资源请求找web框架进行处理，需要把请求参数给web框架
            # 准备给web框架的参数信息，都要放到字典里面
            env = {
                "request_path": request_path,
                # 传入请求头信息，额外的参数可以在字典里面在进行添加
            }
            # 使用框架处理动态资源请求,
            # 1. web框架需要把处理结果返回给web服务器，
            # 2. web服务器负责把返回的结果封装成响应报文发送给浏览器
            status, headers, response_body = framework.handle_request(env)
            print(status, headers, response_body)
            # 响应行
            response_line = "HTTP/1.1 %s\r\n" % status
            # 响应头
            response_header = ""
            for header in headers:
                response_header += "%s: %s\r\n" % header

            # 响应报文
            response_data = (response_line +
                             response_header +
                             "\r\n" +
                             response_body).encode("utf-8")

            # 发送响应报文数据给浏览器
            new_socket.send(response_data)
            # 关闭连接
            new_socket.close()

        else:
            """静态资源请求"""
            # 1. os.path.exits
            # os.path.exists("static/" + request_path)
            # 2. try-except

            try:
                # 打开文件读取文件中的数据, 提示：这里使用rb模式，兼容打开图片文件
                with open("static" + request_path, "rb") as file:  # 这里的file表示打开文件的对象
                    file_data = file.read()
                    # 提示： with open 关闭文件这步操作不用程序员来完成，系统帮我们来完成
            except Exception as e:
                # 代码执行到此，说明没有请求的该文件，返回404状态信息
                # 响应行
                response_line = "HTTP/1.1 404 Not Found\r\n"
                # 响应头
                response_header = "Server: PWS/1.0\r\n"
                # 读取404页面数据
                with open("static/error.html", "rb") as file:
                    file_data = file.read()

                # 响应体
                response_body = file_data

                # 把数据封装成http 响应报文格式的数据
                response = (response _line +
                            response_header +
                            "\r\n").encode("utf-8") + response_body

                # 发送给浏览器的响应报文数据
                new_socket.send(response)

            else:
                # 代码执行到此，说明文件存在，返回200状态信息
                # 响应行
                response_line = "HTTP/1.1 200 OK\r\n"
                # 响应头
                response_header = "Server: PWS/1.0\r\n"
                # 响应体
                response_body = file_data

                # 把数据封装成http 响应报文格式的数据
                response = (response_line +
                            response_header +
                            "\r\n").encode("utf-8") + response_body

                # 发送给浏览器的响应报文数据
                new_socket.send(response)
            finally:
                # 关闭服务于客户端的套接字
                new_socket.close()

    # 启动服务器的方法
    def start(self):
        # 循环等待接受客户端的连接请求
        while True:
            # 等待接受客户端的连接请求
            new_socket, ip_port = self.tcp_server_socket.accept()
            # 代码执行到此，说明连接建立成功
            sub_thread = threading.Thread(target=self.handle_client_request, args=(new_socket,))
            # 设置成为守护主线程
            sub_thread.setDaemon(True)
            # 启动子线程执行对应的任务
            sub_thread.start()


def main():

    # # 获取终端命令行参数
    # params = sys.argv
    # if len(params) != 2:
    #     print("执行的命令格式如下: python3 xxx.py 9000")
    #     return
    #
    # # 判断第二个参数是否都是由数字组成的字符串
    # if not params[1].isdigit():
    #     print("执行的命令格式如下: python3 xxx.py 9000")
    #     return
    #
    # # 代码执行到此，说明命令行参数的个数一定2个并且第二个参数是由数字组成的字符串
    # port = int(params[1])
    # 创建web服务器
    web_server = HttpWebServer(8000)
    # 启动服务器
    web_server.start()

# 判断是否是主模块的代码
if __name__ == '__main__':
    main()
```

## 模版替换

- 添加index.html的模板替换功能

  - 打开template目录下的index.html模板文件，读取模板文件数据
  - 把模板文件中的模板变量进行替换
  
  **framework.py**
  
  ```python
  # 获取首页数据
  def index():
      # 响应状态
      status = "200 OK";
      # 响应头
      response_header = [("Server", "PWS2.0")]
  
      # 1. 打开模板文件，读取数据.读取html模板文件
      with open("template/index.html", "r") as file:
          file_data = file.read()
  
      # 处理后的数据, 从数据库查询
      data = time.ctime()
      #  使用模拟数据替换模板变量
      result = file_data.replace("{%content%}", data)
  
      return status, response_header, result
  ```
  
- 添加center.html的模板替换功能

  再处理center.html的动态资源请求需要再添加一个函数和一个分支判断就可以实现了。

  **framework.py**

  ```python
  # 获取个人中心数据
  def center():
      # 响应状态
      status = "200 OK";
      # 响应头
      response_header = [("Server", "PWS2.0")]
  
      # 打开模板文件，读取数据
      with open("template/center.html", "r") as file:
          file_data = file.read()
  
      # 处理后的数据, 从数据库查询
      data = time.ctime()
      # 替换模板文件中的模板遍历
      result = file_data.replace("{%content%}", data)
  
      return status, response_header, result
    
  
  # 处理动态资源请求
  def handle_request(env):
      # 获取动态请求资源路径
      request_path = env["request_path"]
      print("接收到的动态资源请求:", request_path)
  
      if request_path == "/index.html":
          # 获取首页数据
          result = index()
          return result
      elif request_path == "/center.html":
          # 获取个人中心数据
          result = center()
          return result
      else:
          # 没有找到动态资源
          result = not_found()
          return result



## 路由

如果框架处理的页面请求路径再多一些，如40个甚至更多呢? 用普通的条件分支是很难进行的。解决办法: 可以使用路由

- 路由是请求的**URL**到url对应**处理函数**的映射
- 路由列表是用来保存每一个设置好的路由
- 用户的动态资源请求通过遍历路由列表找到对应的处理函数来完成。

**路由列表**

这么多的路由如何管理呢， 可以使用一个**路由列表**进行管理，通过路由列表保存每一个路由。

| 请求路径     | 处理函数   |
| :----------- | :--------- |
| /login.html  | login函数  |
| /index.html  | index函数  |
| /center.html | center函数 |

- 在路由列表添加路由

	**framework.py**

  ```python
  # 定义路由列表
  route_list = [
      ("/index.html", index),
      ("/center.html", center)
  ]
  ```

- 根据用户请求遍历路由列表处理用户请求

  **framework.py**

  ```python
  # 处理动态资源请求
  def handle_request(env):
      # 获取动态请求资源路径
      request_path = env["request_path"]
      print("接收到的动态资源请求:", request_path)
      # 遍历路由列表，选择执行的函数
      for path, func in route_list:
          if request_path == path:
              result = func()
              return result
      else:
          # 没有找到动态资源
          result = not_found()
          return result
  
      # if request_path == "/index.html":
      #     # 获取首页数据
      #     result = index()
      #     return result
      # elif request_path == "/center.html":
      #     # 获取个人中心数据
      #     result = center()
      #     return result
      # else:
      #     # 没有找到动态资源
      #     result = not_found()
      #     return result
  ```

  


### 装饰器方式将路由添加到路由列表

每次添加路由都需要手动添加来完成，接下来我们想要完成**路由的自动添加**，可以通过装饰器来实现，在使用装饰器对处理函数进行装饰的时候我们需要知道装饰的函数和那个请求路径进行关联，也就是说**装饰器需要接收一个url参数**，这样我们定义的装饰器是一个带有参数的装饰器。

**示例代码:**

```python
"""miniweb框架，负责处理动态资源请求"""
import time

# 定义路由列表
route_list = []


# 定义带有参数的装饰器
def route(path):
    # 装饰器
    def decorator(func):
        # 当执行装饰器装饰指定函数的时候，把路径和函数添加到路由列表
        route_list.append((path, func))

        def inner():
            # 执行指定函数
            return func()

        return inner
    # 返回装饰器
    return decorator


# 获取首页数据
@route("/index.html")	# => @decorator => index = decorator(index)
def index():
    # 响应状态
    status = "200 OK";
    # 响应头
    response_header = [("Server", "PWS2.0")]

    # 打开模板文件，读取数据
    with open("template/index.html", "r") as file:
        file_data = file.read()

    # 处理后的数据, 从数据库查询
    data = time.ctime()
    # 替换模板文件中的模板遍历
    result = file_data.replace("{%content%}", data)

    return status, response_header, result


# 获取个人中心数据
@route("/center.html")
def center():
    # 响应状态
    status = "200 OK";
    # 响应头
    response_header = [("Server", "PWS2.0")]

    # 打开模板文件，读取数据
    with open("template/center.html", "r") as file:
        file_data = file.read()

    # 处理后的数据, 从数据库查询
    data = time.ctime()
    # 替换模板文件中的模板遍历
    result = file_data.replace("{%content%}", data)

    return status, response_header, result


# 没有找到动态资源
def not_found():
    # 响应状态
    status = "404 Not Found";
    # 响应头
    response_header = [("Server", "PWS2.0")]
    # 处理后的数据
    data = "not found"

    return status, response_header, data


# 处理动态资源请求
def handle_request(env):
    # 获取动态请求资源路径
    request_path = env["request_path"]
    print("接收到的动态资源请求:", request_path)
    # 遍历路由列表，选择执行的函数
    for path, func in route_list:
        if request_path == path:
            result = func()
            return result
    else:
        # 没有找到动态资源
        result = not_found()
        return result
```

### 用数据库查询到的数据替换模版变量

- 数据准备

  ```sql
  -- 创建数据库
  create database stock_db charset=utf8;
  -- 切换数据库
  use stock_db;
  -- 执行sql文件
  source stock_db.sql;
  ```

- 根据sql语句查询股票信息

  ```python
  # 获取首页数据
  @route("/index.html")
  def index():
      # 响应状态
      status = "200 OK";
      # 响应头
      response_header = [("Server", "PWS2.0")]
  
      # 打开模板文件，读取数据
      with open("template/index.html", "r") as file:
          file_data = file.read()
  
      # 处理后的数据, 从数据库查询
      conn = pymysql.connect(host="localhost",
                             port=3306,
                             user="root",
                             password="mysql",
                             database="stock_db",
                             charset="utf8")
  
      # 获取游标
      cursor = conn.cursor()
      # 查询sql语句
      sql = "select * from info;"
      # 执行sql
      cursor.execute(sql)
      # 获取结果集
      result = cursor.fetchall()
      print(result)
  ```

- 使用查询数据替换模板变量

  ```python
  # 获取首页数据
  @route("/index.html")
  def index():
    
    	-snip- 
  		result = cursor.fetchall()
      
      data = ""
      for row in result:
          data += '''<tr>
                      <td>%s</td>
                      <td>%s</td>
                      <td>%s</td>
                      <td>%s</td>
                      <td>%s</td>
                      <td>%s</td>
                      <td>%s</td>
                      <td>%s</td>
                      <td><input type="button" value="添加" id="toAdd" name="toAdd" systemidvaule="000007"></td>
                     </tr>''' % row		#这里需要一个元组(1,2,3,...),row刚好是一个元组
  
      # 替换模板文件中的模板遍历
      result = file_data.replace("{%content%}", data)
  
      return status, response_header, result
  ```

### 将数据转成json字符串并返回（数据接口开发）

- web框架程序还可以**开发数据接口**，为客户端程序提供数据服务。
  - 根据sql语句查询数据库
  - 把数据转成json字符串返回
  - 浏览器通过指定接口地址获取web框架提供的数据

- 根据sql语句查询个人中心数据

  ```python
  # 个人中心数据接口开发
  @route("/center_data.html")
  def center_data():
  
  		-snip-
  
      # 获取游标
      cursor = conn.cursor()
      # 查询sql语句
      sql = '''select i.code, i.short, i.chg, 
               i.turnover, i.price, i.highs, f.note_info 
               from info as i inner join focus as f on i.id = f.info_id;'''
      # 执行sql
      cursor.execute(sql)
      # 获取结果集
      result = cursor.fetchall()
      # 关闭游标
      cursor.close()
      # 关闭数据库连接
      conn.close()
      print(result)
  ```

  > 得到的数据是元组：`(('300268', ' 万福生科'，'-160.009%'，'0.27%'，DecimatL('31.77')，Decimat('13.57')，“'你确定要买这个? !)，('3609286' ， 南通俄压' ，'3.31%'，'0,......))`
  >
  > 转成列表里套字典：`[{'code': “396268'，'short' : '7#+#t', 'chg': '-10.00%', ‘turnover': '0.27%', ‘price’: Decimat('31.77')，'highs': Decimat('13.57')，"note_info':......}]`
  >
  > 转成JSON：

- json.dumps函数将个人中心数据转成json字符串并返回

   1. 函数的第一个参数表示要把指定对象转成json字符串
    2. 参数的第二个参数`ensure_ascii=False`表示不使用ascii编码，可以在控制台显示中文。
    3. `TypeError：'Decimal' is not JSON serializable`把浮点数强转成字符串即可
    4. 响应头添加Content-Type表示指定数据的编码格式

  ```python
  # 个人中心数据接口开发
  @route("/center_data.html")
  def center_data():
  		# 响应状态
      status = "200 OK";
      # 响应头
      response_header = [
        			("Server", "PWS2.0"), 
        			("Content-Type", "text/html;charset=utf-8")]
      
      -snip-
      
      # 个人中心数据列表
      center_data_list = list()
      # 遍历每一行数据，把元组转成列表字典
      for row in result:
          # 创建空的字典
          center_dict = dict()
          center_dict["code"] = row[0]
          center_dict["short"] = row[1]
          center_dict["chg"] = row[2]
          center_dict["turnover"] = row[3]
          center_dict["price"] = str(row[4])
          center_dict["highs"] = str(row[5])
          center_dict["note_info"] = row[6]
          # 添加每个字典信息
          center_data_list.append(center_dict)
  
      # 把列表字典转成json字符串, 并在控制台显示
      json_str = json.dumps(center_data_list,ensure_ascii=False)
      print(json_str)
      return status, response_header, json_str
  ```

## ajax请求数据渲染页面

- 根据用户请求返回个人中心空模板文件数据

  ```python
  # 获取个人中心数据
  @route("/center.html")
  def center():
      # 响应状态
      status = "200 OK"
      # 响应头
      response_header = [("Server", "PWS2.0")]
  
      # 打开模板文件，读取数据
      with open("template/center.html", "r") as file:
          file_data = file.read()
  
      # 替换模板文件中的模板遍历
      result = file_data.replace("{%content%}", "")
  
      return status, response_header, result
  ```

- 在个人中心模板文件**center.html**添加ajax请求获取个人中心数据

  ```js
  // 发送ajax请求获取个人中心页面数据
  // 路径写成 center_data.html，发送ajax的时候路径其实是http://ip地址:端口号/center.data.html
  $.get("center_data.html", function (data) {
          alert(data);
      }
  }, "json");//如果指定了json的格式，那data就是一个js对象
  ```

- 将个人中心数据在页面**center.html**完成展示

  ```js
  // 发送ajax请求获取个人中心页面数据
  $.get("center_data.html", function (data) {
  
      var data_array = data;
  
      // 获取table标签对象
      var $table = $(".table")
      for(var i = 0; i < data_array.length; i++){
          // 获取每一条对象
          var center_obj = data_array[i];
          var row_html = '<tr>' +
              '<td>'+ center_obj.code +'</td>' +
              '<td>'+ center_obj.short +'</td>' +
              '<td>'+ center_obj.chg +'</td>' +
              '<td>'+ center_obj.turnover +'</td>' +
              '<td>'+ center_obj.price +'</td>' +
              '<td>'+ center_obj.highs +'</td>' +
              '<td>'+ center_obj.note_info +'</td>' +
              '<td><a type="button" class="btn btn-default btn-xs" href="/update/000007.html"> <span class="glyphicon glyphicon-star" aria-hidden="true"></span> 修改 </a></td><td><input type="button" value="删除" id="toDel" name="toDel" systemidvaule="000007"></td></tr>';
        
          // 为table标签添加每一行组装的html数据
          $table.append(row_html);//追加
      }
  
  }, "json");
  ```

  - 根据用户请求返回个人中心空模板文件数据
  - 在个人中心模板文件添加ajax请求获取个人中心数据
  - 将个人中心数据在页面完成展示
  - 前后端分离



## 日志 	logging

**记录程序日志信息的目的是:**

方便的了解程序的运行情况；
可以分析用户的操作行为、喜好等信息
方便开发人员检查bug

日志等级可以分为5个，从低到高分别是:

- DEBUG：程序调试bug时使用
- INFO：程序正常运行时使用
- WARNING：程序未按预期运行时使用，但并不是错误，如:用户登录密码错误
- ERROR：程序出错误时使用，如:IO操作失败
- CRITICAL：特别严重的问题，导致程序不能再继续运行时使用，如:磁盘空间为空，一般很少使用

日志信息输出到控制台的示例代码:

```python
import logging

logging.debug('这是一个debug级别的日志信息')
logging.info('这是一个info级别的日志信息')
logging.warning('这是一个warning级别的日志信息')
logging.error('这是一个error级别的日志信息')
logging.critical('这是一个critical级别的日志信息')
```

> 输出：
> 		WARNING:root:这是一个warning级别的日志信息
> 		ERROR:root:这是一个error级别的日志信息
> 		CRITICAL:root:这是一个critical级别的日志信息
>
> 默认的是WARNING等级，当在WARNING或WARNING之上等级的才记录日志信息。

配置logging日志

```python
# logging日志等级和输出日志格式的设置
logging.basicConfig(level=logging.DEBUG,
                    format="%(asctime)s - %(filename)s[line:%(lineno)d] - %(levelname)s: %(message)s",
                    filename="log.txt",
										filemode="w")
# 当前时间、文件名、行数、日志级别、日志信息内容
# 将日志写入文件的参数
```

#### 在mini-web项目中使用logging
