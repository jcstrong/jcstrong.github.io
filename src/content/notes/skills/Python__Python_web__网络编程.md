---
title: "网络编程"
category: skills
tags: ["Python", "Web"]
featured: false
source: "Python/Python_web/网络编程.md"
updated: 2022-07-05
readingTime: 26
summary: "toc  网络基础知识  IP 地址：标识网络中唯一的一台设备的    IPv4 是由点分十进制组成    IPv6 是由冒号十六进制组成    查看网卡信息：ifconfig    检查网络： ping     端口：是传输数据的通道，每..."
---
[[toc]]


## 网络基础知识

- **IP 地址：**标识网络中唯一的一台设备的

  - IPv4 是由点分十进制组成
  - IPv6 是由冒号十六进制组成
  - 查看网卡信息：ifconfig
  - 检查网络： ping

  

- **端口：**是传输数据的通道，每运行一个网络程序都会有一个端口，想要给对应的程序发送数据，找到对应的端口即可。

- **端口号：**标识唯一的一个端口。当运行一个程序默认会有一个端口号，当这个程序退出时，所占用的这个端口号就会被释放

  - **知名端口号:*：众所周知的端口号，范围从0到1023，一般固定分配给一些服务，比如21端口分配给FTP(文件传输协议)服务，25端口分配给SMTP（简单邮件传输协议）服务，80端口分配给HTTP服务。

  - **动态端口号：**一般程序员开发应用程序使用的端口号，范围是从1024到65535。如果程序员开发的程序没有设置端口号，操作系统会在动态端口号这个范围内随机生成一个给开发的应用程序使用。



- **TCP ：传输控制协议**(Transmission Control Protocol)，它是一种面向连接的、可靠的、基于字节流的传输层通信协议。

  - **面向连接：**通信双方必须先建立好连接才能进行数据的传输，数据传输完成后，双方必须断开此连接，以释放系统资源。

  - 可靠传输
    - TCP 采用发送应答机制

    - 超时重传

    - 错误校验

    - 流量控制和阻塞管理

      

- **socket：套接字**是进程之间通信的一个工具，负责进程之间的网络数据传输

  

- **HTTP协议：HyperText Transfer Protocol**是超文本传输协议

  - HTTP协议是一个基于TCP传输协议传输数据的

  - HTTP协议规定了**浏览器和 Web 服务器通信数据的格式**

    

- **URL：Uniform Resoure Locator**  统一资源定位符，即网络资源地址，也就是我们常说的网址。

  - **协议部分**:` https://、http://、ftp://`
  - **域名部分**: `news.163.com`
    - **IP地址的别名**，**使用域名目的就是方便的记住某台主机IP地址**。
  - **资源路径部分**: `/18/1122/10/E178J2O4000189FH.html`
  - **查询参数部分**: `?page=1&count=10`
    - ? 后面的 page 表示第一个参数，后面的参数都使用 & 进行连接

## TCP 网络应用程序开发

客户端程序是指运行在**用户设备上的程序** ，主动发起建立连接请求

服务端程序是指运行在**服务器设备上的程序**，等待为客户端提供数据服务。

<img src="https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/20210818102346.png" alt="20210818100707" style="zoom:80%;" />

### socket 类

导入 socket 模块 **import socket**

创建客户端 socket 对象 **socket.socket(AddressFamily, Type)**

**参数说明:**

- AddressFamily 表示IP地址类型, 分为TPv4和IPv6
- Type 表示传输协议类型

**客户端socket方法说明:**

- connect((host, port)) 表示和服务端套接字建立连接, host是服务器ip地址，port是应用程序的端口号
- send(data) 表示发送数据，data是二进制数据
- recv(buffersize) 表示接收数据, buffersize是每次接收数据的长度

**服务端socket方法说明:**

- bind((host, port)) 表示绑定端口号, host 是 ip 地址，port 是端口号，ip 地址一般不指定，表示本机的任何一个ip地址都可以。
- listen (backlog) 表示设置监听，backlog参数表示最大等待建立连接的个数。
- accept() 表示等待接受客户端的连接请求
- send(data) 表示发送数据，data 是二进制数据
- recv(buffersize) 表示接收数据, buffersize 是每次接收数据的长度

#### socket之send和recv原理剖析

- TCP socket的发送和接收缓冲区
  当创建一个TCP socket对象的时候会有一个**发送缓冲区**和一个**接收缓冲区**，**这个发送和接收缓冲区指的就是内存中的一片空间。**

- send原理：send不是直接把数据发给服务端。要想发数据，必须得**通过网卡发送数据**，应用程序是无法直接通过网卡发送数据的，它需要调用操作系统接口，也就是说，应用程序把发送的数据先写入到**发送缓冲区**(内存中的一片空间)，再**由操作系统控制网卡把发送缓冲区的数据发送给服务端网卡** 。

recv原理：recv不是直接从客户端接收数据。**应用软件是无法直接通过网卡接收数据的**，它需要调用操作系统接口，**由操作系统通过网卡接收数据**，把接收的数据**写入到接收缓冲区**(内存中的一片空间），应用程序**再从接收缓存区获取客户端发送的数据**。

![send和recv原理剖析图](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/20210818115442.png)

**说明:**

- 发送数据是发送到发送缓冲区
- 接收数据是从接收缓冲区 获取
- 

不管是recv还是send都不是直接接收到对方的数据和发送数据到对方，**发送数据和接收数据最终是由操作系统控制网卡来完成。**



### TCP 客户端程序开发

**步骤说明:**

1. 创建服务端端套接字对象
2. 绑定端口号
3. 设置监听
4. 等待接受客户端的连接请求
5. 接收数据
6. 发送数据
7. 关闭客户端套接字

```python
import socket


if __name__ == '__main__':

    # 1. 创建tcp客户端套接字
    # AF_INET: ipv4地址类型
    # SOCK_STREAM： tcp传输协议类型
    tcp_client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    # 提示: 客户端程序不强制要求绑定端口号
    # tcp_client_socket.bind(("", 8900))
    
    # 2. 和服务端套接字建立连接
    tcp_client_socket.connect(("192.168.22.78", 9090))
    send_content = "你好,我是客户端小白!!" # input()
    # 对字符串进程编码成为二进制数据
    send_data = send_content.encode("gbk")

    # 3. 发送数据到服务端
    # windows里面的网络调试助手使用的gbk编码
    # linux 里面的络调试助手使用的utf-8编码
    tcp_client_socket.send(send_data)
    
    # 4. 接收服务端的数据
    # 1024：表示每次接收的最大字节数
    recv_data = tcp_client_socket.recv(1024)		#	b'hello'
    # 对二进制数据进行解码
    recv_content = recv_data.decode("utf-8")
    print("接收服务端的数据为:", recv_content)
    
    # 5. 关闭套接字
    tcp_client_socket.close()
```

> encode：字符串编码成为二进制
> decode：二进制解码成为字符串



### TCP 服务端程序开发

**步骤说明:**

1. 创建服务端端套接字对象
2. 绑定端口号
3. 设置监听
4. 等待接受客户端的连接请求
5. 接收数据
6. 发送数据
7. 关闭套接字

```python
import socket

if __name__ == '__main__':

    # 1. 创建tcp服务端套接字
    # AF_INET: ipv4 , AF_INET6: ipv6
    tcp_server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    
    # 2. 绑定端口号
    # 第一个参数表示ip地址，一般不用指定，表示本机的任何一个ip即可
    # 第二个参数表示端口号
    tcp_server_socket.bind(("", 9090))
    
    # 3. 设置监听
    # 128: 表示最大等待建立连接的个数
    tcp_server_socket.listen(128)
    
    # 4. 等待接受客户端的连接请求
    # 🌈每次当客户端和服务端建立连接成功都会返回一个新的套接字
    # tcp_server_socket只负责等待接收客户端的连接请求，收发消息不使用该套接字
    new_client, ip_port = tcp_server_socket.accept()
    print("客户端的ip和端口号为:", ip_port)    # 代码执行到此，说明客户端和服务端建立连接成功
    
    # 5. 接收客户端的数据
    # 收发消息都使用返回的这个新的套接字
    recv_data = new_client.recv(1024)
    # 对二进制数据进行解码变成字符串
    recv_content = recv_data.decode("gbk")
    print("接收客户端的数据为:", recv_content)

    send_content = "问题正在处理中..."
    # 对字符串进行编码
    send_data = send_content.encode("gbk")
    
    # 6. 发送数据到客户端
    new_client.send(send_data)
    # 关闭服务与客户端套接字，表示和客户端终止通信
    new_client.close()
    
    # 7. 关闭服务端套接字， 表示服务端以后不再等待接受客户端的连接请求
    tcp_server_socket.close()
```

> 每次当客户端和服务端建立连接成功都会返回一个新的套接字
>  tcp_server_socket只负责等待接收客户端的连接请求，收发消息使用该套接字返回的新套接字

#### 解决端口号复用：OSError: [Errno 48] Address already in use

```python
import socket

if __name__ == '__main__':

    # 1. 创建tcp服务端套接字
    # AF_INET: ipv4 , AF_INET6: ipv6
    tcp_server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    # 设置端口号复用，表示意思： 服务端程序退出端口号立即释放
    # 1. SOL_SOCKET: 表示当前套接字
    # 2. SO_REUSEADDR： 表示复用端口号的选项
    # 3. True： 确定复用
    tcp_server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, True)
    
-snip-
```



### TCP网络应用程序的注意点介绍

1. TCP 客户端程序一般不需要绑定端口号，因为客户端是主动发起建立连接的。
2. **TCP 服务端程序必须绑定端口号**，否则客户端找不到这个 TCP 服务端程序。
3. listen 后的套接字是**被动套接字**，**只负责接收新的客户端的连接请求，不能收发消息。**
4. 当 TCP 客户端程序和 TCP 服务端程序连接成功后， TCP 服务器端程序会产生一个**新的套接字**，收发客户端消息使用该套接字。
5. **关闭 accept 返回的新套接字意味着和这个客户端已经通信完毕**。
6. **关闭 listen 后的套接字意味着服务端的套接字关闭了，会导致新的客户端不能连接服务端，但是之前已经接成功的客户端还能正常通信。**
7. **当客户端的套接字调用 close 后，服务器端的 recv 会解阻塞，返回的数据长度为0**，服务端可以通过返回数据的长度来判断客户端是否已经下线，反之**服务端关闭套接字，客户端的 recv 也会解阻塞，返回的数据长度也为0**。







## 案例：多任务版TCP服务端程序开发

需求：开发一个多任务版的TCP服务端程序能够服务于多个客户端

​			完成多任务，可以使用**线程**，比进程更加节省内存资源。

实现步骤：

1. 编写一个TCP服务端程序，循环等待接受客户端的连接请求

2. 当客户端和服务端建立连接成功，创建子线程，使用子线程专门处理客户端的请求，防止主线程阻塞

3. 把创建的子线程设置成为守护主线程，防止主线程无法退出。

   

```python
import socket
import threading


# 处理客户端请求的任务
def handle_client_request(ip_port, new_client):
    print("客户端的ip和端口号为:", ip_port)
    # 5. 接收客户端的数据
    # 收发消息都使用返回的这个新的套接字
    
    # 循环等待接收客户端的消息
    while True:    
        recv_data = new_client.recv(1024)
        if recv_data:
            print("接收的数据长度是:", len(recv_data))
            # 对二进制数据进行解码变成字符串
            recv_content = recv_data.decode("gbk")
            print("接收客户端的数据为:", recv_content, ip_port)

            send_content = "问题正在处理中..."
            # 对字符串进行编码
            send_data = send_content.encode("gbk")
            # 6. 发送数据到客户端
            new_client.send(send_data)
        else:
            # 客户端关闭连接
            print("客户端下线了:", ip_port)
            break
    # 关闭服务与客户端套接字，表示和客户端终止通信
    new_client.close()


if __name__ == '__main__':

    # 1. 创建tcp服务端套接字
    # AF_INET: ipv4 , AF_INET6: ipv6
    tcp_server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    # 服务端程序退出，端口号立即释放
    tcp_server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, True)
    # 2. 绑定端口号
    tcp_server_socket.bind(("", 9090))
    # 3. 设置监听
    # 128: 表示最大等待建立连接的个数
    tcp_server_socket.listen(128)
    
    
    # 4. 循环等待接受客户端的连接请求
    while True:
        new_client, ip_port = tcp_server_socket.accept()
        # 代码执行到此，说明客户端和服务端建立连接成功
        # 当客户端和服务端建立连接成功，创建子线程，让子线程专门负责接收客户端的消息
        sub_thread = threading.Thread(target=handle_client_request, 
                                      args=(ip_port, new_client))
        # 设置守护主线程，主线程退出子线程直接销毁
        sub_thread.setDaemon(True)	#否则子线程一直等待接收
        # 启动子线程执行对应的任务
        sub_thread.start()

    # 7. 关闭服务端套接字， 表示服务端以后不再等待接受客户端的连接请求
    # tcp_server_socket.close()  # 因为服务端的程序需要一直运行，所以关闭服务端套接字的代码可以省略不写
```

### 总结

1. 编写一个TCP服务端程序，循环等待接受客户端的连接请求

   ```python
    while True:
        service_client_socket, ip_port = tcp_server_socket.accept()
   ```

2. 当客户端和服务端建立连接成功，创建子线程，使用子线程专门处理客户端的请求，防止主线程阻塞

   ```python
    while True:
        service_client_socket, ip_port = tcp_server_socket.accept() 
        sub_thread = threading.Thread(target=handle_client_request, args=(service_client_socket, ip_port))
        sub_thread.start()
   ```

3. 把创建的子线程设置成为守护主线程，防止主线程无法退出。

   ```python
    while True:
        service_client_socket, ip_port = tcp_server_socket.accept() 
        sub_thread = threading.Thread(target=handle_client_request, args=(service_client_socket, ip_port))
        sub_thread.setDaemon(True) 
        sub_thread.start()
   ```



## HTTP协议的通信过程

- **alt+command+i**  **开发者工具的标签选项说明:**
  - 元素（Elements）：用于查看或修改HTML标签
  - 控制台（Console）：执行js代码
  - 源代码（Sources）：查看静态资源文件，断点调试JS代码
  - 网络（Network）：查看http协议的通信过程

- 开发者工具的Headers选项总共有三部分组成:
  1. General: 主要信息
  2. Response Headers: 响应头
  3. Request Headers: 请求头
- Response选项是查看响应体信息的

### HTTP 请求报文

**HTTP最常见的请求报文有两种:**

1. GET 方式的请求报文
2. POST 方式的请求报文

**说明:**

- GET: 获取web服务器数据
- POST: 向web服务器提交数据

- 一个HTTP请求报文可以由**请求行、请求头、空行和请求体**4个部分组成。
- 请求行是由三部分组成:
  1. **请求方式**
  2. **请求资源路径**
  3. **HTTP协议版本**
- **GET方式的请求报文没有请求体，只有请求行、请求头、空行组成**。
- **POST方式的请求报文可以有请求行、请求头、空行、请求体四部分组成，注意:POST方式可以允许没有请求体，但是这种格式很少见**。

**GET和POST请求对比效果图:**

![get和post请求报文](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/20210818151513.png)

**GET 请求报文说明:**

```http
---- 请求行 ----
GET / HTTP/1.1  # GET请求方式 请求资源路径 HTTP协议版本
---- 请求头 -----
Host: www.itcast.cn  # 服务器的主机地址和端口号,默认是80
Connection: keep-alive # 和服务端保持长连接
Upgrade-Insecure-Requests: 1 # 让浏览器升级不安全请求，使用https请求
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36  # 用户代理，也就是客户端的名称
Accept:text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8 # 可接受的数据类型
Accept-Encoding: gzip, deflate # 可接受的压缩格式
Accept-Language: zh-CN,zh;q=0.9 #可接受的语言
Cookie: pgv_pvi=1246921728; # 登录用户的身份标识

---- 空行 ----
```

**GET 请求原始报文说明:**

```http
GET / HTTP/1.1\r\n
Host: www.itcast.cn\r\n  
Connection: keep-alive\r\n
Upgrade-Insecure-Requests: 1\r\n
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36\r\n
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8\r\n
Accept-Encoding: gzip, deflate\r\n
Accept-Language: zh-CN,zh;q=0.9\r\n
Cookie: pgv_pvi=1246921728; \r\n
\r\n  (请求头信息后面还有一个单独的’\r\n’不能省略)
```

> **说明：**每项数据之间使用:**\r\n**



**POST 请求报文说明:**

```http
---- 请求行 ----
POST /xmweb?host=mail.itcast.cn&_t=1542884567319 HTTP/1.1 # POST请求方式 请求资源路径 HTTP协议版本
---- 请求头 ----
Host: mail.itcast.cn # 服务器的主机地址和端口号,默认是80
Connection: keep-alive # 和服务端保持长连接
Content-Type: application/x-www-form-urlencoded  # 告诉服务端请求的数据类型
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36 # 客户端的名称
---- 空行 ----
---- 请求体 ----
username=hello&pass=hello # 请求参数
```

**POST 请求原始报文说明:**

```http
POST /xmweb?host=mail.itcast.cn&_t=1542884567319 HTTP/1.1\r\n
Host: mail.itcast.cn\r\n
Connection: keep-alive\r\n
Content-Type: application/x-www-form-urlencoded\r\n
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36\r\n
\r\n(请求头信息后面还有一个单独的’\r\n’不能省略)
username=hello&pass=hello
```

> **说明：**每项数据之间使用:**\r\n**



### HTTP响应报文

![响应报文](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/20210818151722.png)

- 一个HTTP响应报文是由**响应行、响应头、空行和响应体**4个部分组成。 
- 响应行是由三部分组成：**HTTP协议版本 状态码 状态描述**，最常见的状态码是200

**响应报文说明:**

```http
--- 响应行/状态行 ---
HTTP/1.1 200 OK # HTTP协议版本 状态码 状态描述
--- 响应头 ---
Server: Tengine # 服务器名称
Content-Type: text/html; charset=UTF-8 # 内容类型
Transfer-Encoding: chunked # 发送给客户端内容不确定内容长度，发送结束的标记是0\r\n, Content-Length表示服务端确定发送给客户端的内容大小，但是二者只能用其一。
Connection: keep-alive # 和客户端保持长连接
Date: Fri, 23 Nov 2018 02:01:05 GMT # 服务端的响应时间
--- 空行 ---
--- 响应体 ---
<!DOCTYPE html><html lang=“en”> …</html> # 响应给客户端的数据
```

**原始响应报文说明:**

```http
HTTP/1.1 200 OK\r\n
Server: Tengine\r\n
Content-Type: text/html; charset=UTF-8\r\n
Transfer-Encoding: chunked\r\n
Connection: keep-alive\r\n
Date: Fri, 23 Nov 2018 02:01:05 GMT\r\n
\r\n(响应头信息后面还有一个单独的’\r\n’不能省略)
<!DOCTYPE html><html lang=“en”> …</html>
```

> **说明:**每项数据之间使用:**\r\n**



- **HTTP 状态码**：是用于表示web服务器响应状态的3位数字代码。
	| 状态码 | 说明                             |
  | :----- | :------------------------------- |
  | 200    | 请求成功                         |
  | 307    | 重定向                           |
  | 400    | 错误的请求，请求地址或者参数有误 |
  | 404    | 请求资源在服务器不存在           |
  | 500    | 服务器内部源代码出现错误         |



## 静态Web服务器

- 静态Web服务器是为发出请求的浏览器提供静态文档的程序，
- 搭建Python自带的Web服务器使用python3 –m http.server 端口号 这个命令即可，端口号不指定默认是8000

### Python自带的静态Web服务器

- 搭建Python自带的静态Web服务器使用 **python3 -m http.server 端口号**, 效果图如下:

  ![搭建web服务器](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/20210818152532.png)

  -m表示**运行包里面的模块**，执行这个命令的时候，需要进入你**自己指定静态文件的目录**，然后通过浏览器就能访问对应的 html文件了，这样一个静态的web服务器就搭建好了。

- 访问搭建的静态Web服务器

  ![搭建web服务器](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/20210818152633.png)

- 查看浏览器和搭建的静态Web服务器的通信过程

  查看http的通信过程,效果图如下:

  <img src="https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/20210818152659.png" alt="搭建web服务器" style="zoom:33%;" />

### 自己编写静态Web服务器

**实现步骤:**

1. 编写一个TCP服务端程序

     ```python
     tcp_server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
     # 循环接受客户端的连接请求
     while True:
         conn_socket, ip_port = tcp_server_socket.accept()
     ```

  2. 获取浏览器发送的http请求报文数据

     ```python
     client_request_data = conn_socket.recv(4096)
     ```

  3. 读取固定页面数据，把页面数据组装成HTTP响应报文数据发送给浏览器。

     ```python
     response_data = (response_line + response_header + "\r\n").encode("utf-8") 
     															 + response_body
     conn_socket.send(response_data)
     ```

  4. HTTP响应报文数据发送完成以后，关闭服务于客户端的套接字。

     ```python
     conn_socket.close()
     ```

#### 返回固定页面

```python
import socket

if __name__ == '__main__':
    tcp_server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    tcp_server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, True)
    tcp_server_socket.bind(("", 8000))
    tcp_server_socket.listen(128)
    
    # 循环等待接受客户端的连接请求
    while True:
        new_socket, ip_port = tcp_server_socket.accept()
        # 接收客户端的请求信息
        recv_data = new_socket.recv(4096)
        print(recv_data)

        # 打开文件读取文件中的数据
        with open("static/index.html", "r") as file: # 这里的file表示打开文件的对象
            file_data = file.read()
        # 提示： with open 关闭文件这步操作不用程序员来完成，系统帮我们来完成

        # 响应行
        response_line = "HTTP/1.1 200 OK\r\n"
        # 响应头
        response_header = "Server: PWS/1.0\r\n"
        # 响应体
        response_body = file_data

        # 把数据封装成http 响应报文格式的数据
        response = response_line + response_header + "\r\n" + response_body
        response_data = response.encode("utf-8")
        # 发送给浏览器的响应报文数据
        new_socket.send(response_data)
        new_socket.close()
```

#### 返回指定页面

**实现步骤:**

1. 获取用户请求资源的路径

    ```py
     request_list = client_request_conent.split(” ”,  maxsplit=2)
     request_path = request_list[1]
    ```

2. 根据请求资源的路径，读取请求指定文件的数据

    ```py
     with open("static" + request_path, "rb") as file:
     file_data = file.read()
    ```

3. 组装指定文件数据的响应报文，发送给浏览器

    ```py
     response_data = (response_line + response_header + "\r\n").encode("utf-8") + response_body
     conn_socket.send(response_data)
    ```

4. 判断请求的文件在服务端不存在，组装404状态的响应报文，发送给浏览器

    ```py
     try:
         # 打开指定文件,代码省略...
     except Exception as e:
         conn_socket.send(404响应报文数据)
    ```

```python
import socket
import os


def main():
    tcp_server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    tcp_server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, True)
    tcp_server_socket.bind(("", 8000))
    tcp_server_socket.listen(128)
    while True:
        new_socket, ip_port = tcp_server_socket.accept()
        recv_data = new_socket.recv(4096)
        # 判断接收的数据长度是否为0
        if len(recv_data) == 0:
            new_socket.close()
            return

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

        # 1. os.path.exits
        # os.path.exists("static/" + request_path)
        # 2. try-except

        # 打开文件读取文件中的数据, 提示：这里使用rb模式，兼容打开图片文件
        with open("static" + request_path, "rb") as file:  # 这里的file表示打开文件的对象
            file_data = file.read()

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

        # 关闭服务于客户端的套接字
        new_socket.close()


# 判断是否是主模块的代码
if __name__ == '__main__':
    main()
```

> 路径中有中文时需要转码：
> `bytes(request_path,encoding = "utf8").decode("utf8")`



#### 返回404页面

```python
import socket
import os


def main():
    # 创建tcp服务端套接字
    tcp_server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    # 设置端口号复用，程序退出端口号立即释放
    tcp_server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, True)
    # 绑定端口号
    tcp_server_socket.bind(("", 8000))
    # 设置监听
    tcp_server_socket.listen(128)
    # 循环等待接受客户端的连接请求
    while True:
        # 等待接受客户端的连接请求
        new_socket, ip_port = tcp_server_socket.accept()
        # 代码执行到此，说明连接建立成功
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

        # 1. os.path.exits
        # os.path.exists("static/" + request_path)
        # 2. try-except

        try:
            # 打开文件读取文件中的数据, 提示：这里使用rb模式，兼容打开图片文件
            with open("/Users/chenjun/PycharmProjects/Python课程/2/课件" + bytes(request_path,encoding = "utf8").decode("utf8"), "rb") as file:  # 这里的file表示打开文件的对象
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
            response = (response_line +
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


# 判断是否是主模块的代码
if __name__ == '__main__':
    main()
```

### 多任务版静态web服务器

目前的Web服务器，不能支持多用户同时访问，只能在一个客户端的请求完成后才能继续处理下一个

多任务版的web服务器同时处理多个客户端的请求，可以使用**多线程**，比进程更加节省内存资源。

**实现步骤:**

1. 当客户端和服务端建立连接成功，创建子线程，使用子线程专门处理客户端的请求，防止主线程阻塞。

   ```python
    while True:
        conn_socket, ip_port = tcp_server_socket.accept()
        # 开辟子线程并执行对应的任务
        sub_thread = threading.Thread(target=handle_client_request, args=(conn_socket,))
   ```

2. 把创建的子线程设置成为守护主线程，防止主线程无法退出。

   ```python
    # 开辟子线程并执行对应的任务
    sub_thread = threading.Thread(target=handle_client_request, args=(conn_socket,))
    sub_thread.setDaemon(True) # 设置守护主线程
    sub_thread.start()
   ```

```python
import socket
import threading


# 处理客户端的请求
def handle_client_request(new_socket):
    recv_client_data = new_socket.recv(4096)
    if len(recv_client_data) == 0:
        print("关闭浏览器了")
        new_socket.close()
        return

    # 对二进制数据进行解码
    recv_client_content = recv_client_data.decode("utf-8")
    print(recv_client_content)
    # 根据指定字符串进行分割， 最大分割次数指定2
    request_list = recv_client_content.split(" ", maxsplit=2)

    # 获取请求资源路径
    request_path = request_list[1]
    print(request_path)

    # 判断请求的是否是根目录，如果条件成立，指定首页数据返回
    if request_path == "/":
        request_path = "/index.html"

    try:
        # 动态打开指定文件
        with open("static" + request_path, "rb") as file:
            # 读取文件数据
            file_data = file.read()
    except Exception as e:
        # 请求资源不存在，返回404数据
        # 响应行
        response_line = "HTTP/1.1 404 Not Found\r\n"
        # 响应头
        response_header = "Server: PWS1.0\r\n"
        with open("static/error.html", "rb") as file:
            file_data = file.read()
        # 响应体
        response_body = file_data

        # 拼接响应报文
        response_data = (response_line + response_header + "\r\n").encode("utf-8") + response_body
        # 发送数据
        new_socket.send(response_data)
    else:
        # 响应行
        response_line = "HTTP/1.1 200 OK\r\n"
        # 响应头
        response_header = "Server: PWS1.0\r\n"

        # 响应体
        response_body = file_data

        # 拼接响应报文
        response_data = (response_line + response_header + "\r\n").encode("utf-8") + response_body
        # 发送数据
        new_socket.send(response_data)
    finally:
        # 关闭服务与客户端的套接字
        new_socket.close()


# 程序入口函数
def main():
    # 创建tcp服务端套接字
    tcp_server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    # 设置端口号复用, 程序退出端口立即释放
    tcp_server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, True)
    # 绑定端口号
    tcp_server_socket.bind(("", 9000))
    # 设置监听
    tcp_server_socket.listen(128)

    while True:
        # 等待接受客户端的连接请求
        new_socket, ip_port = tcp_server_socket.accept()
        print(ip_port)
        # 当客户端和服务器建立连接程，创建子线程
        sub_thread = threading.Thread(target=handle_client_request, args=(new_socket,))
        # 设置守护主线程
        sub_thread.setDaemon(True)
        # 启动子线程执行对应的任务
        sub_thread.start()


if __name__ == '__main__':
    main()
```

### 面向对象版静态web服务器

**实现步骤:**

1. 把提供服务的Web服务器抽象成一个类(HTTPWebServer)
2. 提供Web服务器的初始化方法，在初始化方法里面创建socket对象
3. 提供一个开启Web服务器的方法，让Web服务器处理客户端请求操作。

```python
import socket
import threading


# 定义web服务器类
class HttpWebServer(object):
    def __init__(self):
        # 创建tcp服务端套接字
        tcp_server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        # 设置端口号复用, 程序退出端口立即释放
        tcp_server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, True)
        # 绑定端口号
        tcp_server_socket.bind(("", 9000))
        # 设置监听
        tcp_server_socket.listen(128)
        # 保存创建成功的服务器套接字
        self.tcp_server_socket = tcp_server_socket

    # 处理客户端的请求
    @staticmethod
    def handle_client_request(new_socket):
        # 代码执行到此，说明连接建立成功
        recv_client_data = new_socket.recv(4096)
        if len(recv_client_data) == 0:
            print("关闭浏览器了")
            new_socket.close()
            return

        # 对二进制数据进行解码
        recv_client_content = recv_client_data.decode("utf-8")
        print(recv_client_content)
        # 根据指定字符串进行分割， 最大分割次数指定2
        request_list = recv_client_content.split(" ", maxsplit=2)

        # 获取请求资源路径
        request_path = request_list[1]
        print(request_path)

        # 判断请求的是否是根目录，如果条件成立，指定首页数据返回
        if request_path == "/":
            request_path = "/index.html"

        try:
            # 动态打开指定文件
            with open("static" + request_path, "rb") as file:
                # 读取文件数据
                file_data = file.read()
        except Exception as e:
            # 请求资源不存在，返回404数据
            # 响应行
            response_line = "HTTP/1.1 404 Not Found\r\n"
            # 响应头
            response_header = "Server: PWS1.0\r\n"
            with open("static/error.html", "rb") as file:
                file_data = file.read()
            # 响应体
            response_body = file_data

            # 拼接响应报文
            response_data = (response_line + response_header + "\r\n").encode("utf-8") + response_body
            # 发送数据
            new_socket.send(response_data)
        else:
            # 响应行
            response_line = "HTTP/1.1 200 OK\r\n"
            # 响应头
            response_header = "Server: PWS1.0\r\n"

            # 响应体
            response_body = file_data

            # 拼接响应报文
            response_data = (response_line + response_header + "\r\n").encode("utf-8") + response_body
            # 发送数据
            new_socket.send(response_data)
        finally:
            # 关闭服务与客户端的套接字
            new_socket.close()

    # 启动web服务器进行工作
    def start(self):
        while True:
            # 等待接受客户端的连接请求
            new_socket, ip_port = self.tcp_server_socket.accept()
            # 当客户端和服务器建立连接程，创建子线程
            sub_thread = threading.Thread(target=self.handle_client_request, args=(new_socket,))
            # 设置守护主线程
            sub_thread.setDaemon(True)
            # 启动子线程执行对应的任务
            sub_thread.start()


# 程序入口函数
def main():
    # 创建web服务器对象
    web_server = HttpWebServer()
    # 启动web服务器进行工作
    web_server.start()


if __name__ == '__main__':
    main()
```

#### 命令行启动动态绑定端口号

**实现步骤:**

1. 获取执行python程序的终端**命令行参数**
2. 判断参数的类型，设置端口号必须是整型
3. 给Web服务器类的初始化方法添加一个端口号参数，用于绑定端口号

##### 获取命令行参数

```python
import sys
params = sys.argv
print(params,type(params))
```

```powershell
cj@chenjundeMBP pythonProject % python3 main.py 
['main.py'] <class 'list'>

cj@chenjundeMBP pythonProject % python3 main.py 9000                           
['main.py', '9000'] <class 'list'>

cj@chenjundeMBP pythonProject % python3 main.py 9001
['main.py', '9001'] <class 'list'>

cj@chenjundeMBP pythonProject % python3 main.py 9002 3 3 3 3 3 3 
['main.py', '9002', '3', '3', '3', '3', '3', '3'] <class 'list'>
```




```python
# 定义web服务器类
class HttpWebServer(object):
  
  -snip-
  
# 程序入口函数
def main():

    print(sys.argv)
    # 判断命令行参数是否等于2,
    if len(sys.argv) != 2:
        print("执行命令如下: python3 xxx.py 8000")
        return

    # 判断字符串是否都是数字组成
    if not sys.argv[1].isdigit():
        print("执行命令如下: python3 xxx.py 8000")
        return

    # 获取终端命令行参数
    port = int(sys.argv[1])
    # 创建web服务器对象，指定端口号
    web_server = HttpWebServer(port)
    # 启动web服务器进行工作
    web_server.start()


if __name__ == '__main__':
    main()
```



